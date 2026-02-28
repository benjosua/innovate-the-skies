export default defineContentScript({
  matches: ['*://www.lufthansa.com/de/de/articles/explore-the-world*'],
  runAt: 'document_idle',

  main() {
    // Minimum ms the cursor must dwell on an element before counting as a hover
    const DWELL_MS = 600;
    // Debounce repeated messages for the same element within this window
    const DEBOUNCE_MS = 2000;

    let dwellTimer: ReturnType<typeof setTimeout> | null = null;
    let lastTracked = '';
    let lastTrackedAt = 0;

    /**
     * Walk up the DOM from `el` to find the nearest element that looks like
     * an article / destination card and return a human-readable label for it.
     */
    function extractLabel(el: Element): string | null {
      // Selectors that typically represent a card or article tile on the LH
      // explore page (best-effort – may need tweaking as the site evolves).
      const cardSelectors = [
        '[data-testid]',
        'article',
        '[class*="card"]',
        '[class*="tile"]',
        '[class*="article"]',
        '[class*="destination"]',
        '[class*="teaser"]',
        'a[href*="/articles/"]',
        'a[href*="/destinations/"]',
      ];

      let node: Element | null = el;

      while (node && node !== document.body) {
        for (const sel of cardSelectors) {
          if (node.matches(sel)) {
            return deriveLabel(node);
          }
        }
        node = node.parentElement;
      }
      return null;
    }

    /** Pull the best available text label from a card element. */
    function deriveLabel(card: Element): string {
      // Priority order: aria-label, heading text, img alt, link text, testid
      const ariaLabel = card.getAttribute('aria-label');
      if (ariaLabel?.trim()) return ariaLabel.trim();

      const heading = card.querySelector('h1,h2,h3,h4,h5,h6');
      if (heading?.textContent?.trim()) return heading.textContent.trim();

      const img = card.querySelector('img[alt]');
      const alt = img?.getAttribute('alt')?.trim();
      if (alt) return alt;

      const testid = card.getAttribute('data-testid');
      if (testid) return testid;

      // Fallback: first 60 chars of visible text inside the card
      const text = card.textContent?.replace(/\s+/g, ' ').trim().slice(0, 60);
      return text || 'unknown';
    }

    function sendHoverEvent(label: string) {
      chrome.runtime.sendMessage({
        type: 'LH_HOVER_EVENT',
        label,
        url: location.href,
        timestamp: Date.now(),
      });
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as Element;
      const label = extractLabel(target);
      if (!label) return;

      const now = Date.now();
      // Skip if same label was just tracked within debounce window
      if (label === lastTracked && now - lastTrackedAt < DEBOUNCE_MS) {
        console.debug(`[ITS] debounce skip: "${label}"`);
        return;
      }

      // Clear any pending dwell timer
      if (dwellTimer !== null) clearTimeout(dwellTimer);

      console.debug(`[ITS] dwell started: "${label}" (${DWELL_MS}ms)`);

      dwellTimer = setTimeout(() => {
        lastTracked = label;
        lastTrackedAt = Date.now();
        console.log(`[ITS] hover confirmed: "${label}"`);
        sendHoverEvent(label);
        dwellTimer = null;
      }, DWELL_MS);
    }

    function onMouseOut() {
      if (dwellTimer !== null) {
        clearTimeout(dwellTimer);
        dwellTimer = null;
      }
    }

    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    console.log('[Innovate the Skies] Hover tracker active on explore-the-world page');
  },
});
