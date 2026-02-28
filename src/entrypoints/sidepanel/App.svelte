<script lang="ts">
  import './app.css';
  import { onMount } from 'svelte';
  import { Button } from '$lib/components/ui/button/index.js';

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

  let pipelineLoading = $state(false);
  let statusMessage = $state('');
  let allPrefs = $state<HoverRecord[]>([]);
  let eventData = $state<EventData | null>(null);
  let flights = $state<FlightOption[]>([]);
  let errorMsg = $state('');

  onMount(async () => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === 'PIPELINE_STATUS') {
        statusMessage = msg.status;
      }
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

  async function getRecommendations() {
    pipelineLoading = true;
    eventData = null;
    flights = [];
    errorMsg = '';
    statusMessage = 'Starting event discovery engine...';

    chrome.runtime.sendMessage({ type: 'TRIGGER_RECOMMENDATIONS' }, (response) => {
      pipelineLoading = false;
      if (response?.success) {
        eventData = response.eventData;
        flights = response.flights;
        statusMessage = '';
      } else {
        errorMsg = response?.error ?? 'Failed to generate recommendation.';
        statusMessage = '';
      }
    });
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Only show direct flights by default, fall back to all if none
  const directFlights = $derived(flights.filter(f => f.stops === 0));
  const displayedFlights = $derived(directFlights.length > 0 ? directFlights : flights);
  const hasOnlyConnecting = $derived(directFlights.length === 0 && flights.length > 0);
</script>

<div class="flex h-screen flex-col overflow-hidden bg-gray-50">
  <!-- Header -->
  <div class="bg-[#05164d] px-5 py-4 text-white shrink-0">
    <h1 class="text-lg font-bold tracking-tight">Innovate the Skies</h1>
    <p class="text-xs text-blue-200">Flash Booking Agent</p>
  </div>

  <div class="flex-1 overflow-y-auto p-4 space-y-4">

    <!-- Interests -->
    {#if allPrefs.length > 0}
      <section>
        <h2 class="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Detected Interests ({allPrefs.length})
        </h2>
        <div class="flex flex-wrap gap-1.5">
          {#each allPrefs as pref}
            <span class="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs text-blue-800">
              {pref.label}
              <span class="rounded-full bg-blue-200 px-1 text-[10px] font-bold text-blue-900">{pref.count}</span>
            </span>
          {/each}
        </div>
      </section>
    {:else}
      <p class="text-xs text-gray-400">
        No interests tracked yet. Visit
        <a
          href="https://www.lufthansa.com/de/de/articles/explore-the-world"
          target="_blank"
          rel="noreferrer"
          class="text-blue-500 underline"
        >Lufthansa Explore</a>
        and hover over destinations.
      </p>
    {/if}

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
      <!-- Event Card -->
      <section class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div class="bg-[#05164d] px-4 py-3">
          <p class="text-[10px] font-semibold uppercase tracking-widest text-blue-300">Recommended Event</p>
          <h3 class="text-base font-bold text-white">{eventData.eventName}</h3>
        </div>
        <div class="p-4 space-y-2">
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-400">📅</span>
            <span class="font-medium text-gray-700">{formatDate(eventData.eventDate)}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span class="text-gray-400">📍</span>
            <span class="font-medium text-gray-700">{eventData.destinationAirport}</span>
          </div>
          <p class="text-sm text-gray-600">{eventData.eventDescription}</p>
        </div>
      </section>

      <!-- Flights -->
      <section>
        <div class="mb-2 flex items-baseline justify-between">
          <h2 class="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Flights FRA → {eventData.destinationAirport} · {formatDate(eventData.flightDate)}
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
                <!-- Option header -->
                <div class="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-100">
                  <span class="text-xs font-semibold text-gray-500">
                    {option.stops === 0 ? 'Direct' : `${option.stops} stop`}
                  </span>
                  <span class="text-xs text-gray-400">{option.duration}</span>
                </div>
                <!-- Legs -->
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
</div>
