import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

const LH_CLIENT_ID = import.meta.env.VITE_LH_CLIENT_ID as string;
const LH_CLIENT_SECRET = import.meta.env.VITE_LH_CLIENT_SECRET as string;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const LH_BASE_URL = 'https://api.lufthansa.com/v1';

function getGoogleProvider() {
  return createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY });
}

export async function getLufthansaAuthToken(): Promise<string> {
  console.log('[LH Auth] Requesting OAuth token...');
  const body = new URLSearchParams({
    client_id: LH_CLIENT_ID,
    client_secret: LH_CLIENT_SECRET,
    grant_type: 'client_credentials',
  });

  const response = await fetch(`${LH_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const data = await response.json();
  console.log('[LH Auth] Response status:', response.status, '| has token:', !!data.access_token);
  if (!data.access_token) {
    console.error('[LH Auth] Full error response:', JSON.stringify(data));
    throw new Error('Failed to get LH token: ' + JSON.stringify(data));
  }
  console.log('[LH Auth] Token obtained successfully.');
  return data.access_token;
}

export interface EventRecommendation {
  destinationAirport: string;
  eventName: string;
  eventDate: string;
  eventDescription: string;
  flightDate: string;
  eventUrl: string;
}

export async function getGeminiEventRecommendation(
  preferences: string[],
): Promise<EventRecommendation> {
  console.log('[Gemini] Finding event for preferences:', preferences);
  const google = getGoogleProvider();

  const { text } = await generateText({
    model: google('gemini-2.0-flash'),
    tools: {
      google_search: google.tools.googleSearch({}),
    },
    prompt: `The user is looking to travel and has been browsing these topics: ${preferences.join(', ')}.
Using Google Search, find ONE major upcoming event (concert, festival, sports match) related to these interests in a major European or global city.

Return ONLY a raw JSON object with no markdown formatting or backticks. The JSON must have the following keys:
- "destinationAirport": 3-letter IATA code of the nearest major airport to the event.
- "eventName": Name of the event.
- "eventDate": Date of the event (YYYY-MM-DD).
- "eventDescription": Short 1-sentence description.
- "flightDate": A recommended departure date 1-2 days before the event (YYYY-MM-DD).
- "eventUrl": A direct URL to the official event page or the best available ticketing/info page.`,
  });

  console.log('[Gemini] Raw event response:', text);
  const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanedText) as EventRecommendation;
  console.log('[Gemini] Parsed event:', parsed);
  return parsed;
}

// A single leg within a journey (direct or part of connection)
export interface FlightLeg {
  flightNumber: string;
  origin: string;
  destination: string;
  departure: string; // HH:MM
  arrival: string;   // HH:MM
  terminal?: string;
}

// A full itinerary (1 leg = direct, 2+ legs = connecting)
export interface FlightOption {
  duration: string;        // e.g. "2h 50m"
  stops: number;
  legs: FlightLeg[];
}

function parseDuration(iso: string): string {
  // PT2H50M → "2h 50m", PT45M → "45m"
  const h = iso.match(/(\d+)H/)?.[1];
  const m = iso.match(/(\d+)M/)?.[1];
  return [h ? `${h}h` : '', m ? `${m}m` : ''].filter(Boolean).join(' ');
}

function parseLeg(f: any): FlightLeg {
  return {
    flightNumber: f.MarketingCarrier.AirlineID + f.MarketingCarrier.FlightNumber,
    origin: f.Departure.AirportCode,
    destination: f.Arrival.AirportCode,
    departure: f.Departure.ScheduledTimeLocal?.DateTime?.slice(11, 16) ?? '??:??',
    arrival: f.Arrival.ScheduledTimeLocal?.DateTime?.slice(11, 16) ?? '??:??',
    terminal: f.Departure.Terminal?.Name,
  };
}

export async function getScheduledFlights(
  token: string,
  origin: string,
  dest: string,
  date: string,
): Promise<FlightOption[]> {
  const url = `${LH_BASE_URL}/operations/schedules/${origin}/${dest}/${date}`;
  console.log(`[LH Schedules] GET ${url}`);

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  });

  console.log(`[LH Schedules] Response status: ${response.status}`);

  if (!response.ok) {
    const body = await response.text();
    console.warn(`[LH Schedules] Failed. Status: ${response.status} | Body: ${body}`);
    return [];
  }

  const data = await response.json();
  console.log('[LH Schedules] Raw response:', JSON.stringify(data, null, 2));

  const raw: any[] = data?.ScheduleResource?.Schedule ?? [];
  const schedules = Array.isArray(raw) ? raw : [raw];
  console.log(`[LH Schedules] ${schedules.length} schedule(s) found.`);

  const options: FlightOption[] = schedules.map((s: any) => {
    // Flight can be a single object (direct) or an array (connecting)
    const flightRaw = s.Flight;
    const legs: FlightLeg[] = Array.isArray(flightRaw)
      ? flightRaw.map(parseLeg)
      : [parseLeg(flightRaw)];

    const stops = legs.length - 1;
    const duration = parseDuration(s.TotalJourney?.Duration ?? '');

    console.log(`  ${stops === 0 ? 'Direct' : `${stops} stop`} | ${duration} | ${legs.map(l => `${l.flightNumber} ${l.origin}${l.departure}→${l.destination}${l.arrival}`).join(' + ')}`);

    return { duration, stops, legs };
  });

  // Sort: direct flights first, then by total duration
  return options.sort((a, b) => {
    if (a.stops !== b.stops) return a.stops - b.stops;
    return a.duration.localeCompare(b.duration);
  });
}
