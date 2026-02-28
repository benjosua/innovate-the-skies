<script lang="ts">
  import { onMount } from 'svelte';

  interface HoverRecord {
    label: string;
    count: number;
    firstSeen: number;
    lastSeen: number;
  }

  let preferences: HoverRecord[] = [];
  let loading = true;

  async function loadPreferences() {
    loading = true;
    const result = await chrome.storage.local.get('lh_hover_prefs');
    const prefs: Record<string, HoverRecord> = result['lh_hover_prefs'] ?? {};
    preferences = Object.values(prefs).sort((a, b) => b.count - a.count);
    loading = false;
  }

  async function clearPreferences() {
    await chrome.storage.local.remove('lh_hover_prefs');
    preferences = [];
  }

  function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  onMount(() => {
    loadPreferences();
    // Live-update whenever storage changes (e.g. while browsing the LH page)
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && 'lh_hover_prefs' in changes) {
        loadPreferences();
      }
    });
  });
</script>

<div class="container">
  <header>
    <h1>Innovate the Skies</h1>
    <p class="subtitle">Lufthansa Explore Preferences</p>
  </header>

  <main>
    <div class="section-header">
      <h2>Hover Preferences</h2>
      <div class="actions">
        <button class="icon-btn" on:click={loadPreferences} title="Refresh">&#8635;</button>
        {#if preferences.length > 0}
          <button class="icon-btn danger" on:click={clearPreferences} title="Clear data">&#128465;</button>
        {/if}
      </div>
    </div>

    {#if loading}
      <p class="hint">Loading…</p>
    {:else if preferences.length === 0}
      <p class="hint">
        No data yet. Visit
        <a href="https://www.lufthansa.com/de/de/articles/explore-the-world" target="_blank" rel="noreferrer">
          Explore the World
        </a>
        and hover over destinations or articles.
      </p>
    {:else}
      <ul class="pref-list">
        {#each preferences as pref, i}
          <li class="pref-item">
            <span class="rank">#{i + 1}</span>
            <div class="pref-body">
              <span class="pref-label" title={pref.label}>{pref.label}</span>
              <span class="pref-meta">
                {pref.count} hover{pref.count !== 1 ? 's' : ''} &middot; last {formatDate(pref.lastSeen)}
              </span>
            </div>
            <span class="pref-count">{pref.count}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </main>

  <footer>
    <p>Tracking hovers on Lufthansa&nbsp;Explore page</p>
  </footer>
</div>

<style>
  :global(*, *::before, *::after) {
    box-sizing: border-box;
  }

  .container {
    min-height: 100vh;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #0066cc 0%, #004499 100%);
    color: white;
    font-family: system-ui, sans-serif;
  }

  header {
    text-align: center;
    margin-bottom: 24px;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0 0 4px 0;
    font-weight: 700;
  }

  .subtitle {
    font-size: 0.85rem;
    opacity: 0.85;
    margin: 0;
  }

  main {
    flex: 1;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  h2 {
    font-size: 1rem;
    margin: 0;
    font-weight: 600;
  }

  .actions {
    display: flex;
    gap: 6px;
  }

  .icon-btn {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    border-radius: 6px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    transition: background 0.15s;
  }

  .icon-btn:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  .icon-btn.danger:hover {
    background: rgba(220, 50, 50, 0.5);
  }

  .hint {
    font-size: 0.85rem;
    opacity: 0.8;
    line-height: 1.5;
  }

  .hint a {
    color: #aad4ff;
  }

  .pref-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pref-item {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    padding: 10px 12px;
  }

  .rank {
    font-size: 0.7rem;
    opacity: 0.6;
    width: 24px;
    flex-shrink: 0;
    text-align: center;
  }

  .pref-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .pref-label {
    font-size: 0.9rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pref-meta {
    font-size: 0.72rem;
    opacity: 0.7;
  }

  .pref-count {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 0.8rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  footer {
    margin-top: 20px;
    text-align: center;
    font-size: 0.75rem;
    opacity: 0.6;
  }
</style>
