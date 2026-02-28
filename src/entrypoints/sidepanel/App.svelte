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
  import Check from '@lucide/svelte/icons/check';
  import Plane from '@lucide/svelte/icons/plane';
  import CalendarIcon from '@lucide/svelte/icons/calendar';
  import MapPin from '@lucide/svelte/icons/map-pin';
  import ExternalLink from '@lucide/svelte/icons/external-link';
  import Clock from '@lucide/svelte/icons/clock';
  import ChevronRight from '@lucide/svelte/icons/chevron-right';
  import Sparkles from '@lucide/svelte/icons/sparkles';
  import X from '@lucide/svelte/icons/x';

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
    price: number;
  }

  // --- view ---
  let view = $state<'main' | 'interests'>('main');

  // --- stepper: 0=discover, 1=results, 2=book ---
  let step = $state(0);

  // --- pipeline ---
  let pipelineLoading = $state(false);
  let statusMessage = $state('');
  let allPrefs = $state<HoverRecord[]>([]);
  let eventData = $state<EventData | null>(null);
  let flights = $state<FlightOption[]>([]);
  let errorMsg = $state('');
  let events = $state<EventData[]>([]);
  let currentEventIdx = $state(0);
  let flightsLoading = $state(false);
  let selectedFlight = $state<number | null>(null);

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

  // --- price filter ---
  let maxPrice = $state(9999);

  const directFlights = $derived(flights.filter(f => f.stops === 0));
  const baseFlights = $derived(directFlights.length > 0 ? directFlights : flights);
  const hasOnlyConnecting = $derived(directFlights.length === 0 && flights.length > 0);
  const highestPrice = $derived(baseFlights.length ? Math.max(...baseFlights.map(f => f.price)) : 9999);
  const displayedFlights = $derived(baseFlights.filter(f => f.price <= maxPrice));
  const currentEvent = $derived(events[currentEventIdx] ?? null);
  const hasMoreEvents = $derived(currentEventIdx < events.length - 1);

  const steps = ['Discover', 'Results', 'Book'];

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
    events = [];
    currentEventIdx = 0;
    errorMsg = '';
    selectedFlight = null;
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
          events = response.events;
          currentEventIdx = 0;
          statusMessage = '';
        } else {
          errorMsg = response?.error ?? 'Failed to generate recommendations.';
          statusMessage = '';
        }
      }
    );
  }

  function dismissEvent() {
    if (hasMoreEvents) {
      currentEventIdx++;
    } else {
      events = [];
      currentEventIdx = 0;
    }
  }

  function selectEventAndGetFlights() {
    if (!currentEvent) return;
    eventData = currentEvent;
    flightsLoading = true;
    flights = [];
    errorMsg = '';
    selectedFlight = null;
    maxPrice = 9999;
    statusMessage = `Checking Lufthansa flights FRA → ${currentEvent.destinationAirport}...`;

    chrome.runtime.sendMessage(
      { type: 'GET_FLIGHTS_FOR_EVENT', eventData: currentEvent },
      (response) => {
        flightsLoading = false;
        statusMessage = '';
        if (response?.success) {
          flights = response.flights;
          events = [];
          step = 1;
        } else {
          errorMsg = response?.error ?? 'Failed to load flights.';
        }
      }
    );
  }

  function selectFlight(idx: number) {
    selectedFlight = idx;
    step = 2;
  }

  function backToResults() {
    step = 1;
    selectedFlight = null;
  }

  function backToDiscover() {
    step = 0;
    eventData = null;
    flights = [];
    errorMsg = '';
    selectedFlight = null;
    events = [];
    currentEventIdx = 0;
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

  function bookOnLufthansa() {
    chrome.tabs.create({ url: 'https://www.lufthansa.com/de/en/booking/new' });
  }
</script>

<div class="flex h-screen flex-col overflow-hidden bg-gray-50">

  <!-- ── HEADER ── -->
  <div class="bg-[#05164d] px-4 pt-3 pb-0 text-white shrink-0">
    <div class="flex items-center justify-between mb-3">
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
          <h1 class="text-sm font-bold tracking-tight leading-tight">Innovate the Skies</h1>
          <p class="text-[10px] text-blue-300 leading-tight">
            {view === 'interests' ? 'Interest Debug' : 'Flash Booking Agent'}
          </p>
        </div>
      </div>

      {#if view === 'main'}
        <div class="flex items-center gap-1">
          <button
            onclick={generateSummary}
            disabled={summaryLoading || allPrefs.length === 0}
            class="rounded-full p-1.5 hover:bg-white/10 transition-colors disabled:opacity-40"
            title="Generate traveler profile summary"
          >
            {#if summaryLoading}
              <Loader2 class="h-3.5 w-3.5 animate-spin" />
            {:else}
              <Brain class="h-3.5 w-3.5" />
            {/if}
          </button>
          <button
            onclick={() => (view = 'interests')}
            class="rounded-full p-1.5 hover:bg-white/10 transition-colors"
            title="View all tracked interests"
          >
            <ShieldQuestionMark class="h-3.5 w-3.5" />
          </button>
        </div>
      {/if}
    </div>

    <!-- Stepper (only on main view) -->
    {#if view === 'main'}
      <div class="flex items-center pb-3">
        {#each steps as label, i}
          <div class="flex items-center flex-1 last:flex-none">
            <!-- Step circle -->
            <button
              onclick={() => {
                if (i === 0) backToDiscover();
                else if (i === 1 && step >= 1) { step = 1; selectedFlight = null; }
              }}
              disabled={i > step}
              class="flex items-center gap-1.5 group disabled:cursor-default"
            >
              <div class={[
                'h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shrink-0',
                i < step ? 'bg-[#ffaa00] text-[#05164d]' :
                i === step ? 'bg-white text-[#05164d] ring-2 ring-white/30' :
                'bg-white/10 text-white/40'
              ].join(' ')}>
                {#if i < step}
                  <Check class="h-3 w-3" />
                {:else}
                  {i + 1}
                {/if}
              </div>
              <span class={[
                'text-[10px] font-medium transition-colors',
                i === step ? 'text-white' : i < step ? 'text-[#ffaa00]' : 'text-white/30'
              ].join(' ')}>{label}</span>
            </button>

            <!-- Connector -->
            {#if i < steps.length - 1}
              <div class="flex-1 mx-2 h-px transition-colors {i < step ? 'bg-[#ffaa00]' : 'bg-white/15'}"></div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- ── MAIN VIEW ── -->
  {#if view === 'main'}
  <div class="flex-1 overflow-y-auto">

    <!-- ── STEP 0: DISCOVER ── -->
    {#if step === 0}
    <div class="p-4 space-y-4">

      <!-- LLM summary banner -->
      {#if summary}
        <div class="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 leading-relaxed">
          <div class="flex items-start gap-2">
            <Sparkles class="h-3.5 w-3.5 mt-0.5 shrink-0 text-blue-500" />
            <p>{summary}</p>
          </div>
          <button onclick={() => (summary = '')} class="mt-1.5 text-blue-400 hover:text-blue-600 text-[10px]">Dismiss</button>
        </div>
      {/if}

      <!-- Interests chips -->
      {#if allPrefs.length > 0}
        <section>
          <div class="mb-2 flex items-center justify-between">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Your Interests
            </h2>
            <button onclick={() => (view = 'interests')} class="text-[10px] text-blue-400 hover:text-blue-600">
              View all ({allPrefs.length}) →
            </button>
          </div>
          <div class="flex flex-wrap gap-1.5">
            {#each allPrefs.slice(0, 6) as pref}
              <span class="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs text-blue-800">
                {pref.label}
                <span class="rounded-full bg-blue-200 px-1 text-[10px] font-bold text-blue-900">{pref.count}</span>
              </span>
            {/each}
          </div>
        </section>
      {:else}
        <div class="rounded-xl border border-dashed border-gray-200 bg-white p-5 text-center">
          <Plane class="h-8 w-8 mx-auto mb-2 text-gray-200" />
          <p class="text-sm font-medium text-gray-500 mb-1">No interests tracked yet</p>
          <p class="text-xs text-gray-400">
            Visit
            <a href="https://www.lufthansa.com/de/de/articles/explore-the-world" target="_blank" rel="noreferrer" class="text-blue-500 underline">Lufthansa Explore</a>
            and hover over destinations to build your profile.
          </p>
        </div>
      {/if}

      <!-- Date range -->
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Travel Window <span class="normal-case font-normal text-gray-300">(optional)</span>
        </h2>
        <div class="flex gap-2">
          <Popover.Root bind:open={fromOpen}>
            <Popover.Trigger>
              {#snippet child({ props })}
                <button {...props} class="flex-1 flex flex-col items-start rounded-xl border border-gray-200 bg-white px-3 py-2 text-left shadow-sm hover:border-blue-300 transition-colors">
                  <span class="text-[9px] font-semibold uppercase tracking-wider text-gray-400">From</span>
                  <span class="text-xs font-semibold text-gray-700 mt-0.5">{formatDateValue(dateFrom) ?? '—'}</span>
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
                <button {...props} class="flex-1 flex flex-col items-start rounded-xl border border-gray-200 bg-white px-3 py-2 text-left shadow-sm hover:border-blue-300 transition-colors">
                  <span class="text-[9px] font-semibold uppercase tracking-wider text-gray-400">To</span>
                  <span class="text-xs font-semibold text-gray-700 mt-0.5">{formatDateValue(dateTo) ?? '—'}</span>
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
      <button
        onclick={getRecommendations}
        disabled={pipelineLoading || flightsLoading}
        class="w-full rounded-2xl bg-[#ffaa00] py-4 text-sm font-bold text-[#05164d] shadow-lg transition-all hover:bg-[#e69900] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {#if pipelineLoading}
          <Loader2 class="h-4 w-4 animate-spin" />
          <span class="animate-pulse">Analyzing your profile…</span>
        {:else}
          <Sparkles class="h-4 w-4" />
          Find My Perfect Trip
        {/if}
      </button>

      <!-- Event browsing cards -->
      {#if currentEvent && !pipelineLoading}
        <div class="relative rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <!-- Counter -->
          <div class="absolute top-3 left-4 z-10">
            <span class="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white">{currentEventIdx + 1} / {events.length}</span>
          </div>
          <!-- Dismiss button -->
          <button
            onclick={dismissEvent}
            class="absolute top-2.5 right-3 z-10 rounded-full bg-white/20 p-1.5 hover:bg-white/30 transition-colors"
            aria-label="Skip this event"
          >
            <X class="h-4 w-4 text-white" />
          </button>
          <!-- Card header -->
          <div class="bg-gradient-to-br from-[#05164d] to-[#0a2d7a] px-4 pt-9 pb-5 relative overflow-hidden">
            <Plane class="absolute -right-3 -bottom-3 h-20 w-20 text-white/5 rotate-12" />
            <p class="text-[9px] font-bold uppercase tracking-widest text-[#ffaa00] mb-1">AI Recommended Event</p>
            <h3 class="text-base font-bold text-white leading-tight">{currentEvent.eventName}</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-blue-100">
                <CalendarIcon class="h-2.5 w-2.5" />
                {formatIsoDate(currentEvent.eventDate)}
              </span>
              <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-blue-100">
                <MapPin class="h-2.5 w-2.5" />
                {currentEvent.destinationAirport}
              </span>
            </div>
          </div>
          <!-- Card body -->
          <div class="bg-white px-4 py-3 space-y-2">
            <p class="text-xs text-gray-500 leading-relaxed">{currentEvent.eventDescription}</p>
            {#if currentEvent.eventUrl}
              <a href={currentEvent.eventUrl} target="_blank" rel="noreferrer" class="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                View event details
                <ExternalLink class="h-3 w-3" />
              </a>
            {/if}
            <button
              onclick={selectEventAndGetFlights}
              disabled={flightsLoading}
              class="w-full rounded-xl bg-[#ffaa00] py-2.5 text-xs font-bold text-[#05164d] flex items-center justify-center gap-2 hover:bg-[#e69900] active:scale-[0.98] transition-all disabled:opacity-60"
            >
              {#if flightsLoading}
                <Loader2 class="h-3.5 w-3.5 animate-spin" />
                Loading flights…
              {:else}
                <Plane class="h-3.5 w-3.5" />
                Find Flights for This Event
              {/if}
            </button>
            {#if !hasMoreEvents}
              <p class="text-center text-[10px] text-gray-400">Last suggestion — dismiss to start over</p>
            {/if}
          </div>
        </div>
      {/if}

      <!-- Loading state -->
      {#if pipelineLoading || flightsLoading}
        <div class="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm space-y-3">
          <div class="flex items-center gap-3">
            <div class="h-5 w-5 shrink-0 animate-spin rounded-full border-[3px] border-[#05164d] border-t-[#ffaa00]"></div>
            <p class="text-xs font-medium text-[#05164d]">{statusMessage}</p>
          </div>
          <!-- Skeleton steps -->
          <div class="space-y-2 pl-8">
            {#each (pipelineLoading ? ['Scanning your interests', 'Finding 3 matching events', 'Preparing suggestions'] : ['Connecting to Lufthansa', 'Checking available flights', 'Sorting results']) as hint, i}
              <div class="flex items-center gap-2 text-[10px] text-gray-400">
                <div class="h-1.5 w-1.5 rounded-full {i === 0 ? 'bg-[#ffaa00] animate-pulse' : 'bg-gray-200'}"></div>
                {hint}
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Error -->
      {#if errorMsg}
        <div class="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">
          <p class="font-semibold mb-0.5">Something went wrong</p>
          <p class="text-red-500">{errorMsg}</p>
        </div>
      {/if}

    </div>
    {/if}

    <!-- ── STEP 1: RESULTS ── -->
    {#if step === 1 && eventData}
    <div class="p-4 space-y-4">

      <!-- Event card -->
      <div class="rounded-2xl overflow-hidden shadow-md border border-gray-100">
        <!-- Card header -->
        <div class="bg-gradient-to-br from-[#05164d] to-[#0a2d7a] px-4 pt-4 pb-5 relative overflow-hidden">
          <!-- Decorative plane -->
          <Plane class="absolute -right-3 -bottom-3 h-20 w-20 text-white/5 rotate-12" />
          <p class="text-[9px] font-bold uppercase tracking-widest text-[#ffaa00] mb-1">AI Recommended Event</p>
          <h3 class="text-lg font-bold text-white leading-tight">{eventData.eventName}</h3>
          <div class="mt-2 flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-blue-100">
              <CalendarIcon class="h-2.5 w-2.5" />
              {formatIsoDate(eventData.eventDate)}
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-blue-100">
              <MapPin class="h-2.5 w-2.5" />
              {eventData.destinationAirport}
            </span>
          </div>
        </div>
        <!-- Card body -->
        <div class="bg-white px-4 py-3">
          <p class="text-xs text-gray-500 leading-relaxed">{eventData.eventDescription}</p>
          {#if eventData.eventUrl}
            <a href={eventData.eventUrl} target="_blank" rel="noreferrer" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
              View event details
              <ExternalLink class="h-3 w-3" />
            </a>
          {/if}
        </div>
      </div>

      <!-- Flights header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xs font-bold text-gray-700">Available Flights</h2>
          <p class="text-[10px] text-gray-400">FRA → {eventData.destinationAirport} · {formatIsoDate(eventData.flightDate)}</p>
        </div>
        {#if hasOnlyConnecting}
          <span class="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">Connecting only</span>
        {:else if directFlights.length > 0}
          <span class="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700">{directFlights.length} direct</span>
        {/if}
      </div>

      <!-- Price filter + disclaimer -->
      {#if baseFlights.length > 0}
        <div class="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Max price</span>
              <span class="text-xs font-bold text-[#05164d]">€{maxPrice >= highestPrice ? 'Any' : maxPrice}</span>
            </div>
            <input
              type="range"
              min={Math.min(...baseFlights.map(f => f.price))}
              max={highestPrice}
              step="10"
              bind:value={maxPrice}
              class="w-full h-1.5 rounded-full accent-[#05164d] cursor-pointer"
            />
          </div>
        </div>
        <p class="text-[10px] text-gray-400 -mt-2 flex items-center gap-1">
          <span class="italic">~ Est. prices only — live fares require partner API access</span>
        </p>
      {/if}

      <!-- Flight ticket cards -->
      {#if flights.length === 0}
        <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 text-center">
          <Plane class="h-8 w-8 mx-auto mb-2 text-amber-300" />
          No Lufthansa group flights found for this date.
        </div>
      {:else}
        <div class="space-y-3">
          {#each displayedFlights as option, idx}
            <!-- Boarding pass style card -->
            <button
              onclick={() => selectFlight(idx)}
              class="w-full text-left rounded-2xl border-2 transition-all overflow-hidden shadow-sm hover:shadow-md active:scale-[0.98] border-gray-200 bg-white hover:border-[#05164d]"
            >
              <!-- Ticket header strip -->
              <div class="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-dashed border-gray-200">
                <div class="flex items-center gap-2">
                  <span class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold {option.stops === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}">
                    {option.stops === 0 ? 'Direct' : `${option.stops} stop${option.stops > 1 ? 's' : ''}`}
                  </span>
                </div>
                <div class="flex items-center gap-1 text-xs text-gray-400">
                  <Clock class="h-3 w-3" />
                  {option.duration}
                </div>
              </div>

              <!-- Flight legs -->
              <div class="px-4 py-3 space-y-3">
                {#each option.legs as leg, legIdx}
                  {#if legIdx > 0}
                    <div class="border-t border-dashed border-gray-100 pt-3"></div>
                  {/if}
                  <div class="flex items-center gap-3">
                    <!-- Origin -->
                    <div class="text-center w-12 shrink-0">
                      <p class="text-base font-black text-[#05164d]">{leg.origin}</p>
                      <p class="text-[10px] font-bold text-gray-400">{leg.departure}</p>
                    </div>

                    <!-- Route line -->
                    <div class="flex-1 flex flex-col items-center gap-0.5">
                      <p class="text-[9px] font-semibold text-gray-400 tracking-wide">{leg.flightNumber}</p>
                      <div class="w-full flex items-center gap-1">
                        <div class="h-px flex-1 bg-gray-300"></div>
                        <Plane class="h-3 w-3 text-[#05164d] shrink-0" />
                        <div class="h-px flex-1 bg-gray-300"></div>
                      </div>
                      {#if leg.terminal}
                        <p class="text-[9px] text-gray-300">T{leg.terminal}</p>
                      {/if}
                    </div>

                    <!-- Destination -->
                    <div class="text-center w-12 shrink-0">
                      <p class="text-base font-black text-[#05164d]">{leg.destination}</p>
                      <p class="text-[10px] font-bold text-gray-400">{leg.arrival}</p>
                    </div>
                  </div>
                {/each}
              </div>

              <!-- Ticket footer -->
              <div class="flex items-center justify-between px-4 py-2.5 bg-[#05164d]/5 border-t border-gray-100">
                <div class="flex items-center gap-1.5">
                  <span class="text-sm font-black text-[#05164d]">~€{option.price}</span>
                  <span class="text-[9px] text-gray-400 font-medium">est.</span>
                </div>
                <span class="flex items-center gap-1 text-xs font-bold text-[#05164d]">
                  Select
                  <ChevronRight class="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          {/each}
        </div>
      {/if}

      <button
        onclick={backToDiscover}
        class="w-full text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors"
      >
        ← Start over
      </button>

    </div>
    {/if}

    <!-- ── STEP 2: BOOK ── -->
    {#if step === 2 && eventData && selectedFlight !== null}
    {@const chosenFlight = displayedFlights[selectedFlight]}
    <div class="p-4 space-y-4">

      <!-- Confirmation header -->
      <div class="rounded-2xl bg-gradient-to-br from-[#05164d] to-[#0a2d7a] p-4 text-white shadow-lg relative overflow-hidden">
        <Plane class="absolute -right-4 -top-4 h-24 w-24 text-white/5 rotate-12" />
        <p class="text-[9px] font-bold uppercase tracking-widest text-[#ffaa00] mb-1">Ready to Book</p>
        <h3 class="text-base font-bold leading-tight">{eventData.eventName}</h3>
        <p class="text-xs text-blue-200 mt-1">{formatIsoDate(eventData.eventDate)} · {eventData.destinationAirport}</p>
      </div>

      <!-- Selected boarding pass -->
      <div>
        <p class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Your Flight</p>
        <!-- Full boarding pass -->
        <div class="rounded-2xl overflow-hidden border-2 border-[#05164d] shadow-md bg-white">
          <!-- Pass header -->
          <div class="bg-[#05164d] px-4 py-3 flex items-center justify-between">
            <div>
              <p class="text-[9px] font-bold uppercase tracking-widest text-[#ffaa00]">Boarding Pass</p>
              <p class="text-xs font-bold text-white mt-0.5">
                {chosenFlight.stops === 0 ? 'Direct Flight' : `${chosenFlight.stops} Stop${chosenFlight.stops > 1 ? 's' : ''}`}
              </p>
            </div>
            <div class="text-right">
              <p class="text-[9px] text-blue-300 uppercase tracking-wide">Est. price</p>
              <p class="text-xs font-bold text-[#ffaa00]">~€{chosenFlight.price} <span class="text-[9px] font-normal text-blue-300">est.</span></p>
              <p class="text-[9px] text-blue-300 uppercase tracking-wide mt-1">Duration</p>
              <p class="text-xs font-bold text-white">{chosenFlight.duration}</p>
            </div>
          </div>

          <!-- Perforation line -->
          <div class="flex items-center">
            <div class="h-3 w-3 rounded-full bg-gray-50 -ml-1.5 border border-gray-200 shrink-0"></div>
            <div class="flex-1 border-t-2 border-dashed border-gray-200"></div>
            <div class="h-3 w-3 rounded-full bg-gray-50 -mr-1.5 border border-gray-200 shrink-0"></div>
          </div>

          <!-- Pass body -->
          <div class="px-4 py-3 space-y-4">
            {#each chosenFlight.legs as leg, i}
              {#if i > 0}
                <div class="border-t border-dashed border-gray-100 pt-3"></div>
              {/if}
              <div class="flex items-center gap-4">
                <div class="text-center">
                  <p class="text-2xl font-black text-[#05164d]">{leg.origin}</p>
                  <p class="text-xs font-bold text-gray-500">{leg.departure}</p>
                </div>
                <div class="flex-1 flex flex-col items-center">
                  <p class="text-[9px] font-semibold text-gray-400 mb-1">{leg.flightNumber}</p>
                  <div class="w-full flex items-center gap-1">
                    <div class="h-px flex-1 bg-gray-300"></div>
                    <Plane class="h-3.5 w-3.5 text-[#ffaa00] shrink-0" />
                    <div class="h-px flex-1 bg-gray-300"></div>
                  </div>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-black text-[#05164d]">{leg.destination}</p>
                  <p class="text-xs font-bold text-gray-500">{leg.arrival}</p>
                </div>
              </div>
              {#if leg.terminal}
                <div class="flex justify-end">
                  <span class="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">Terminal {leg.terminal}</span>
                </div>
              {/if}
            {/each}
          </div>

          <!-- Perforation line -->
          <div class="flex items-center">
            <div class="h-3 w-3 rounded-full bg-gray-50 -ml-1.5 border border-gray-200 shrink-0"></div>
            <div class="flex-1 border-t-2 border-dashed border-gray-200"></div>
            <div class="h-3 w-3 rounded-full bg-gray-50 -mr-1.5 border border-gray-200 shrink-0"></div>
          </div>

          <!-- Barcode area -->
          <div class="px-4 py-3 flex items-center justify-between">
            <div>
              <p class="text-[9px] text-gray-400 uppercase tracking-wide">Flight Date</p>
              <p class="text-xs font-bold text-gray-700">{formatIsoDate(eventData.flightDate)}</p>
            </div>
            <!-- Mini barcode visual -->
            <div class="flex gap-px items-end h-8 opacity-30">
              {#each [3,5,2,7,4,6,2,5,3,7,4,5,2,6,3,4,7,5,2,4] as h}
                <div class="w-px bg-gray-800" style="height: {h * 4}px"></div>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Book CTA -->
      <button
        onclick={bookOnLufthansa}
        class="w-full rounded-2xl bg-[#ffaa00] py-4 text-sm font-bold text-[#05164d] shadow-lg transition-all hover:bg-[#e69900] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Plane class="h-4 w-4" />
        Book on Lufthansa.com
      </button>

      <button
        onclick={backToResults}
        class="w-full text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors"
      >
        ← Choose a different flight
      </button>

    </div>
    {/if}

  </div>
  {/if}

  <!-- ── INTERESTS DEBUG VIEW ── -->
  {#if view === 'interests'}
  <div class="flex-1 overflow-y-auto">
    {#if allPrefs.length === 0}
      <p class="p-6 text-center text-sm text-gray-400">No interests tracked yet.</p>
    {:else}
      <div class="border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
        <p class="text-xs text-gray-500">{allPrefs.length} items · {allPrefs.reduce((s, p) => s + p.count, 0)} total hovers</p>
        <button onclick={clearPrefs} class="text-xs text-red-400 hover:text-red-600 transition-colors">
          Clear all
        </button>
      </div>

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
