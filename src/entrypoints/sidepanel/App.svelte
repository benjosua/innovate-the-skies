<script lang="ts">
  import './app.css';
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Calendar } from '$lib/components/ui/calendar/index.js';
  import * as Popover from '$lib/components/ui/popover/index.js';
  import { CalendarDate, getLocalTimeZone, today, type DateValue } from '@internationalized/date';
  import ArrowLeft from '@lucide/svelte/icons/arrow-left';
  import Brain from '@lucide/svelte/icons/brain';
  import ShieldQuestionMark from '@lucide/svelte/icons/shield-question-mark';
  import Loader2 from '@lucide/svelte/icons/loader-2';

  interface HoverRecord {
    label: string;
    count: number;
    firstSeen: number;
    lastSeen: number;
  }

  interface EventData {
    destinationAirport: string;
    eventName: string;
    eventDate: string;
    eventDescription: string;
    flightDate: string;
    eventUrl: string;
  }

  interface FlightLeg {
    flightNumber: string;
    origin: string;
    destination: string;
    departure: string;
    arrival: string;
    terminal?: string;
  }

  interface FlightOption {
    duration: string;
    stops: number;
    legs: FlightLeg[];
  }

  // --- view: 'main' | 'interests' ---
  let view = $state<'main' | 'interests'>('main');

  // --- pipeline ---
  let pipelineLoading = $state(false);
  let statusMessage = $state('');
  let allPrefs = $state<HoverRecord[]>([]);
  let eventData = $state<EventData | null>(null);
  let flights = $state<FlightOption[]>([]);
  let errorMsg = $state('');

  // --- interest summary ---
  let summaryLoading = $state(false);
  let summary = $state('');

  // --- date range ---
  let dateFrom = $state<DateValue | undefined>(undefined);
  let dateTo = $state<DateValue | undefined>(undefined);
  let fromOpen = $state(false);
  let toOpen = $state(false);

  const tz = getLocalTimeZone();
  const todayDate = today(tz);

  const directFlights = $derived(flights.filter(f => f.stops === 0));
  const displayedFlights = $derived(directFlights.length > 0 ? directFlights : flights);
  const hasOnlyConnecting = $derived(directFlights.length === 0 && flights.length > 0);

  onMount(async () => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === 'PIPELINE_STATUS') statusMessage = msg.status;
    });
    await loadPrefs();
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'local' && 'lh_hover_prefs' in changes) loadPrefs();
    });
  });

  async function loadPrefs() {
    const result = await chrome.storage.local.get('lh_hover_prefs');
    const prefs: Record<string, HoverRecord> = result['lh_hover_prefs'] ?? {};
    allPrefs = Object.values(prefs).sort((a, b) => b.count - a.count);
  }

  async function generateSummary() {
    summaryLoading = true;
    summary = '';
    chrome.runtime.sendMessage({ type: 'GENERATE_SUMMARY' }, (response) => {
      summaryLoading = false;
      if (response?.success) summary = response.summary;
      else summary = 'Failed to generate summary.';
    });
  }

  async function clearPrefs() {
    await chrome.storage.local.remove('lh_hover_prefs');
    allPrefs = [];
    summary = '';
  }

  async function getRecommendations() {
    pipelineLoading = true;
    eventData = null;
    flights = [];
    errorMsg = '';
    statusMessage = 'Starting event discovery engine...';

    chrome.runtime.sendMessage(
      {
        type: 'TRIGGER_RECOMMENDATIONS',
        dateFrom: dateFrom?.toString(),
        dateTo: dateTo?.toString(),
      },
      (response) => {
        pipelineLoading = false;
        if (response?.success) {
          eventData = response.eventData;
          flights = response.flights;
          statusMessage = '';
        } else {
          errorMsg = response?.error ?? 'Failed to generate recommendation.';
          statusMessage = '';
        }
      }
    );
  }

  function formatDateValue(d: DateValue | undefined) {
    if (!d) return undefined;
    return d.toDate(tz).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function formatIsoDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function formatTs(ts: number) {
    return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
</script>

<div class="flex h-screen flex-col overflow-hidden bg-gray-50">

  <!-- ── HEADER ── -->
  <div class="bg-[#05164d] px-5 py-3 text-white shrink-0 flex items-center justify-between">
    <div class="flex items-center gap-2">
      {#if view === 'interests'}
        <button
          onclick={() => (view = 'main')}
          class="mr-1 rounded p-1 hover:bg-white/10 transition-colors"
          aria-label="Back"
        >
          <ArrowLeft class="h-4 w-4" />
        </button>
      {/if}
      <div>
        <h1 class="text-base font-bold tracking-tight leading-tight">Innovate the Skies</h1>
        <p class="text-[10px] text-blue-200 leading-tight">
          {view === 'interests' ? 'Interest Debug' : 'Flash Booking Agent'}
        </p>
      </div>
    </div>

    {#if view === 'main'}
      <div class="flex items-center gap-1.5">
        <!-- Info / summary button -->
        <button
          onclick={generateSummary}
          disabled={summaryLoading || allPrefs.length === 0}
          class="rounded-full p-1.5 hover:bg-white/10 transition-colors disabled:opacity-40"
          title="Generate traveler profile summary"
          aria-label="Generate interest summary"
        >
          {#if summaryLoading}
            <Loader2 class="h-4 w-4 animate-spin" />
          {:else}
            <Brain class="h-4 w-4" />
          {/if}
        </button>
        <!-- Interests debug page button -->
        <button
          onclick={() => (view = 'interests')}
          class="rounded-full p-1.5 hover:bg-white/10 transition-colors"
          title="View all tracked interests"
          aria-label="Debug interests"
        >
          <ShieldQuestionMark class="h-4 w-4" />
        </button>
      </div>
    {/if}
  </div>

  <!-- ── MAIN VIEW ── -->
  {#if view === 'main'}
  <div class="flex-1 overflow-y-auto p-4 space-y-4">

    <!-- LLM summary banner -->
    {#if summary}
      <div class="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 leading-relaxed">
        <div class="flex items-start gap-2">
          <span class="mt-0.5 shrink-0">✨</span>
          <p>{summary}</p>
        </div>
        <button onclick={() => (summary = '')} class="mt-1.5 text-blue-400 hover:text-blue-600 text-[10px]">Dismiss</button>
      </div>
    {/if}

    <!-- Interests chips (compact, top 5 only) -->
    {#if allPrefs.length > 0}
      <section>
        <div class="mb-2 flex items-center justify-between">
          <h2 class="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Interests ({allPrefs.length})
          </h2>
          <button onclick={() => (view = 'interests')} class="text-[10px] text-blue-400 hover:text-blue-600">
            View all →
          </button>
        </div>
        <div class="flex flex-wrap gap-1.5">
          {#each allPrefs.slice(0, 5) as pref}
            <span class="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs text-blue-800">
              {pref.label}
              <span class="rounded-full bg-blue-200 px-1 text-[10px] font-bold text-blue-900">{pref.count}</span>
            </span>
          {/each}
          {#if allPrefs.length > 5}
            <span class="rounded-full border border-gray-200 bg-gray-100 px-2.5 py-0.5 text-xs text-gray-400">
              +{allPrefs.length - 5} more
            </span>
          {/if}
        </div>
      </section>
    {:else}
      <p class="text-xs text-gray-400">
        No interests tracked yet. Visit
        <a href="https://www.lufthansa.com/de/de/articles/explore-the-world" target="_blank" rel="noreferrer" class="text-blue-500 underline">Lufthansa Explore</a>
        and hover over destinations.
      </p>
    {/if}

    <!-- Date range -->
    <section>
      <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Event Date Range <span class="normal-case font-normal text-gray-300">(optional)</span>
      </h2>
      <div class="flex gap-2">
        <Popover.Root bind:open={fromOpen}>
          <Popover.Trigger>
            {#snippet child({ props })}
              <button {...props} class="flex-1 flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs shadow-sm hover:border-blue-300 transition-colors">
                <span class="text-gray-400">From</span>
                <span class="font-medium text-gray-700 truncate">{formatDateValue(dateFrom) ?? '—'}</span>
              </button>
            {/snippet}
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0" align="start">
            <Calendar type="single" bind:value={dateFrom} minValue={todayDate} maxValue={dateTo as CalendarDate | undefined} onValueChange={() => { fromOpen = false; }} class="rounded-lg border-0" />
            {#if dateFrom}
              <div class="border-t p-2">
                <button onclick={() => { dateFrom = undefined; fromOpen = false; }} class="w-full text-xs text-gray-400 hover:text-red-500 transition-colors">Clear</button>
              </div>
            {/if}
          </Popover.Content>
        </Popover.Root>

        <Popover.Root bind:open={toOpen}>
          <Popover.Trigger>
            {#snippet child({ props })}
              <button {...props} class="flex-1 flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-xs shadow-sm hover:border-blue-300 transition-colors">
                <span class="text-gray-400">To</span>
                <span class="font-medium text-gray-700 truncate">{formatDateValue(dateTo) ?? '—'}</span>
              </button>
            {/snippet}
          </Popover.Trigger>
          <Popover.Content class="w-auto p-0" align="end">
            <Calendar type="single" bind:value={dateTo} minValue={(dateFrom ?? todayDate) as CalendarDate} onValueChange={() => { toOpen = false; }} class="rounded-lg border-0" />
            {#if dateTo}
              <div class="border-t p-2">
                <button onclick={() => { dateTo = undefined; toOpen = false; }} class="w-full text-xs text-gray-400 hover:text-red-500 transition-colors">Clear</button>
              </div>
            {/if}
          </Popover.Content>
        </Popover.Root>
      </div>
    </section>

    <!-- CTA -->
    <Button
      onclick={getRecommendations}
      disabled={pipelineLoading}
      class="w-full rounded-xl bg-[#ffaa00] py-5 text-base font-bold text-[#05164d] shadow-md transition-all hover:bg-[#e69900] disabled:opacity-60"
    >
      {#if pipelineLoading}
        <span class="animate-pulse">Analyzing...</span>
      {:else}
        ✈️ Get Flash Recommendation
      {/if}
    </Button>

    <!-- Loading -->
    {#if pipelineLoading}
      <div class="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div class="h-6 w-6 shrink-0 animate-spin rounded-full border-[3px] border-[#05164d] border-t-[#ffaa00]"></div>
        <p class="text-sm text-[#05164d]">{statusMessage}</p>
      </div>
    {/if}

    <!-- Error -->
    {#if errorMsg}
      <div class="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        <strong>Error:</strong> {errorMsg}
      </div>
    {/if}

    <!-- Results -->
    {#if eventData}
      <section class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div class="bg-[#05164d] px-4 py-3">
          <p class="text-[10px] font-semibold uppercase tracking-widest text-blue-300">Recommended Event</p>
          <h3 class="text-base font-bold text-white">{eventData.eventName}</h3>
        </div>
        <div class="p-4 space-y-2">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-400">📅</span>
            <span class="font-medium text-gray-700">{formatIsoDate(eventData.eventDate)}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-400">📍</span>
            <span class="font-medium text-gray-700">{eventData.destinationAirport}</span>
          </div>
          <p class="text-sm text-gray-600">{eventData.eventDescription}</p>
          {#if eventData.eventUrl}
            <a href={eventData.eventUrl} target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline">
              🔗 View event
            </a>
          {/if}
        </div>
      </section>

      <section>
        <div class="mb-2 flex items-baseline justify-between">
          <h2 class="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Flights FRA → {eventData.destinationAirport} · {formatIsoDate(eventData.flightDate)}
          </h2>
          {#if hasOnlyConnecting}
            <span class="text-[10px] text-amber-600 font-medium">connecting only</span>
          {/if}
        </div>

        {#if flights.length === 0}
          <div class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            No Lufthansa group flights found for this date.
          </div>
        {:else}
          <div class="space-y-2">
            {#each displayedFlights as option}
              <div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <div class="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                  <span class="text-xs font-semibold text-gray-500">
                    {option.stops === 0 ? 'Direct' : `${option.stops} stop`}
                  </span>
                  <span class="text-xs text-gray-400">{option.duration}</span>
                </div>
                <div class="divide-y divide-gray-50">
                  {#each option.legs as leg}
                    <div class="flex items-center gap-3 px-4 py-2.5">
                      <span class="w-16 text-xs font-bold text-[#05164d] shrink-0">{leg.flightNumber}</span>
                      <div class="flex-1 flex items-center gap-1 text-sm">
                        <span class="font-semibold text-gray-800">{leg.origin}</span>
                        <span class="text-gray-400 text-xs">{leg.departure}</span>
                        <span class="flex-1 border-t border-dashed border-gray-300 mx-1"></span>
                        <span class="text-gray-400 text-xs">{leg.arrival}</span>
                        <span class="font-semibold text-gray-800">{leg.destination}</span>
                      </div>
                      {#if leg.terminal}
                        <span class="text-[10px] text-gray-400 shrink-0">T{leg.terminal}</span>
                      {/if}
                    </div>
                  {/each}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </section>
    {/if}

  </div>
  {/if}

  <!-- ── INTERESTS DEBUG VIEW ── -->
  {#if view === 'interests'}
  <div class="flex-1 overflow-y-auto">
    {#if allPrefs.length === 0}
      <p class="p-6 text-center text-sm text-gray-400">No interests tracked yet.</p>
    {:else}
      <!-- Summary row -->
      <div class="border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
        <p class="text-xs text-gray-500">{allPrefs.length} items · {allPrefs.reduce((s, p) => s + p.count, 0)} total hovers</p>
        <button
          onclick={clearPrefs}
          class="text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          Clear all
        </button>
      </div>

      <!-- Table -->
      <table class="w-full text-xs">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50 text-left text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            <th class="px-4 py-2">#</th>
            <th class="px-2 py-2">Label</th>
            <th class="px-2 py-2 text-right">Hovers</th>
            <th class="px-2 py-2 text-right">First seen</th>
            <th class="px-2 py-2 text-right">Last seen</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          {#each allPrefs as pref, i}
            <tr class="bg-white hover:bg-gray-50 transition-colors">
              <td class="px-4 py-2.5 text-gray-300 font-mono">{i + 1}</td>
              <td class="px-2 py-2.5 font-medium text-gray-800 max-w-[140px] truncate" title={pref.label}>{pref.label}</td>
              <td class="px-2 py-2.5 text-right">
                <span class="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">{pref.count}</span>
              </td>
              <td class="px-2 py-2.5 text-right text-gray-400">{formatTs(pref.firstSeen)}</td>
              <td class="px-2 py-2.5 text-right text-gray-400">{formatTs(pref.lastSeen)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
  {/if}

</div>
