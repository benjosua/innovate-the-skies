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
      // Return true to keep the message channel open for the async response
      return true;
    }
  });
});
