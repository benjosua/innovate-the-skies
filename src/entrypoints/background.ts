import {
  getLufthansaAuthToken,
  getGeminiEventRecommendation,
  getScheduledFlights,
  generateInterestSummary,
} from '../lib/services';

export interface HoverRecord {
  label: string;
  count: number;
  firstSeen: number;
  lastSeen: number;
}

export type HoverPrefs = Record<string, HoverRecord>;

const STORAGE_KEY = 'lh_hover_prefs';

async function recordHover(label: string, timestamp: number) {
  const result = await chrome.storage.local.get(STORAGE_KEY);
  const prefs: HoverPrefs = result[STORAGE_KEY] ?? {};

  const existing = prefs[label];
  prefs[label] = existing
    ? { ...existing, count: existing.count + 1, lastSeen: timestamp }
    : { label, count: 1, firstSeen: timestamp, lastSeen: timestamp };

  await chrome.storage.local.set({ [STORAGE_KEY]: prefs });
}

export default defineBackground(() => {
  console.log('Background service worker started');

  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'open-sidepanel') {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.windowId) {
        await chrome.sidePanel.open({ windowId: tab.windowId });
      }
    }
  });

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message?.type === 'LH_HOVER_EVENT') {
      recordHover(message.label as string, message.timestamp as number)
        .then(() => sendResponse({ ok: true }))
        .catch((err) => {
          console.error('[Innovate the Skies] Failed to record hover', err);
          sendResponse({ ok: false });
        });
      return true;
    }

    if (message?.type === 'GENERATE_SUMMARY') {
      (async () => {
        try {
          const result = await chrome.storage.local.get(STORAGE_KEY);
          const prefs: HoverPrefs = result[STORAGE_KEY] ?? {};
          const interests = Object.values(prefs)
            .sort((a, b) => b.count - a.count)
            .map((p) => ({ label: p.label, count: p.count }));

          if (interests.length === 0) {
            sendResponse({ success: true, summary: 'No browsing data yet — visit the Lufthansa Explore page to build your profile.' });
            return;
          }

          const summary = await generateInterestSummary(interests);
          sendResponse({ success: true, summary });
        } catch (error: unknown) {
          const msg = error instanceof Error ? error.message : String(error);
          console.error('[Summary] Error:', msg);
          sendResponse({ success: false, error: msg });
        }
      })();
      return true;
    }

    if (message?.type === 'TRIGGER_RECOMMENDATIONS') {
      (async () => {
        try {
          console.log('[Pipeline] Step 1: Loading hover preferences...');
          chrome.runtime.sendMessage({ type: 'PIPELINE_STATUS', status: 'Analyzing your recent interests...' });

          const result = await chrome.storage.local.get(STORAGE_KEY);
          const prefs: HoverPrefs = result[STORAGE_KEY] ?? {};
          const allInterests = Object.values(prefs).sort((a, b) => b.count - a.count);

          const topInterests = allInterests.slice(0, 5).map((p) => p.label);
          if (topInterests.length === 0) {
            topInterests.push('Adventure', 'City breaks');
          }
          console.log('[Pipeline] Top interests:', topInterests);

          console.log('[Pipeline] Step 2: Fetching 3 event options in parallel...');
          chrome.runtime.sendMessage({ type: 'PIPELINE_STATUS', status: `Finding 3 event options for: ${topInterests.join(', ')}...` });

          const events = await Promise.all([
            getGeminiEventRecommendation(topInterests, message.dateFrom as string | undefined, message.dateTo as string | undefined),
            getGeminiEventRecommendation(topInterests, message.dateFrom as string | undefined, message.dateTo as string | undefined),
            getGeminiEventRecommendation(topInterests, message.dateFrom as string | undefined, message.dateTo as string | undefined),
          ]);

          console.log('[Pipeline] Events found:', events.map(e => e.eventName));
          sendResponse({ success: true, events });
        } catch (error: unknown) {
          const msg = error instanceof Error ? error.message : String(error);
          console.error('[Pipeline] Error:', msg, error);
          sendResponse({ success: false, error: msg });
        }
      })();
      return true;
    }

    if (message?.type === 'GET_FLIGHTS_FOR_EVENT') {
      (async () => {
        try {
          const eventData = message.eventData as { destinationAirport: string; flightDate: string };
          console.log(`[Flights] FRA → ${eventData.destinationAirport} on ${eventData.flightDate}`);
          chrome.runtime.sendMessage({ type: 'PIPELINE_STATUS', status: `Checking Lufthansa flights FRA → ${eventData.destinationAirport}...` });

          const lhToken = await getLufthansaAuthToken();
          const flights = await getScheduledFlights(lhToken, 'FRA', eventData.destinationAirport, eventData.flightDate);
          console.log(`[Flights] ${flights.length} flight(s) found`);

          sendResponse({ success: true, flights });
        } catch (error: unknown) {
          const msg = error instanceof Error ? error.message : String(error);
          console.error('[Flights] Error:', msg, error);
          sendResponse({ success: false, error: msg });
        }
      })();
      return true;
    }
  });
});
