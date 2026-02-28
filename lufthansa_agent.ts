import { google } from "npm:@ai-sdk/google";
import { generateText } from "npm:ai";

const API_KEY = Deno.env.get("LH_CLIENT_ID") || "YOUR_CLIENT_ID";
const API_SECRET = Deno.env.get("LH_CLIENT_SECRET") || "YOUR_CLIENT_SECRET";
const BASE_URL = "https://api.lufthansa.com/v1";
// GOOGLE_GENERATIVE_AI_API_KEY is read automatically by @ai-sdk/google

// --- Types ---

interface EventResult {
  title: string;
  date: string;
  venue: string;
  description: string;
  ticketUrl?: string;
}

// 1a. Public API token (for flight schedules & status)
async function getAuthToken(): Promise<string> {
  const body = new URLSearchParams();
  body.append("client_id", API_KEY);
  body.append("client_secret", API_SECRET);
  body.append("grant_type", "client_credentials");

  const response = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await response.json();
  if (!data.access_token) throw new Error("Failed to get token: " + JSON.stringify(data));
  return data.access_token;
}

// 1b. Partner API token (for deep links) — requires Partner API plan subscription
// Same credentials, different endpoint. Subscribe at developer.lufthansa.com/partner_apis
async function getPartnerToken(): Promise<string> {
  const body = new URLSearchParams();
  body.append("client_id", Deno.env.get("LH_PARTNER_CLIENT_ID") || API_KEY);
  body.append("client_secret", Deno.env.get("LH_PARTNER_CLIENT_SECRET") || API_SECRET);
  body.append("grant_type", "client_credentials");

  const response = await fetch(`${BASE_URL}/partners/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const data = await response.json();
  if (!data.access_token) throw new Error("Failed to get partner token: " + JSON.stringify(data));
  return data.access_token;
}

// 2. Check live flight status on a route, print results, return any delayed flight numbers
async function checkRouteStatus(token: string, origin: string, dest: string, date: string): Promise<string[]> {
  console.log(`\n🔍 [LIVE STATUS] Checking flights ${origin} → ${dest} on ${date}...`);
  const url = `${BASE_URL}/operations/flightstatus/route/${origin}/${dest}/${date}`;

  const response = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
  });

  if (!response.ok) {
    console.log(`⚠️ No flights found. Status: ${response.status}`);
    return [];
  }

  const data = await response.json();
  const flights = data.FlightStatusResource.Flights.Flight;
  const list = Array.isArray(flights) ? flights : [flights];
  const delayed: string[] = [];

  console.log(`✅ ${list.length} flight(s) found:\n`);
  for (const f of list) {
    const carrier = f.MarketingCarrier.AirlineID + f.MarketingCarrier.FlightNumber;
    const dep = f.Departure.ScheduledTimeLocal.DateTime.slice(11, 16);
    const arr = f.Arrival.ScheduledTimeLocal.DateTime.slice(11, 16);
    const depCode = f.Departure.TimeStatus.Code;
    const depStatus = f.Departure.TimeStatus.Definition;
    const gate = f.Arrival.Terminal?.Gate ? ` | Gate ${f.Arrival.Terminal.Gate}` : "";
    const flag = depCode === "DL" ? " 🚨" : depCode === "CD" ? " ❌" : "";
    console.log(`  ✈️  ${carrier}  ${dep} → ${arr}  [${depStatus}${gate}]${flag}`);
    if (depCode === "DL" || depCode === "CD") delayed.push(carrier);
  }

  return delayed;
}

// 3. Post-Event Check: Verify Flight Status for Delays using real API data only
async function checkFlightStatusAndClaim(token: string, flightNumber: string, date: string) {
  console.log(`\n🕒 [POST-EVENT CHECK] Checking status for flight ${flightNumber} on ${date}...`);

  const url = `${BASE_URL}/operations/flightstatus/${flightNumber}/${date}`;
  const response = await fetch(url, { headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" } });

  if (!response.ok) {
    console.log(`⚠️ Failed to fetch status for ${flightNumber}. Code: ${response.status}`);
    return;
  }

  const data = await response.json();
  const flight = Array.isArray(data.FlightStatusResource.Flights.Flight)
    ? data.FlightStatusResource.Flights.Flight[0]
    : data.FlightStatusResource.Flights.Flight;

  const depStatus = flight.Departure.TimeStatus.Code;
  const flightStatus = flight.FlightStatus.Code;

  console.log(`✈️  Flight Status: ${flight.FlightStatus.Definition}`);
  console.log(`🛫 Departure Status: ${flight.Departure.TimeStatus.Definition}`);

  // Trigger EU261 if Delayed (DL) or Cancelled (CD)
  if (depStatus === "DL" || depStatus === "CD" || flightStatus === "CD") {
    console.log(`🚨 Disruption Detected! Initiating EU261 Claim Protocol...`);
    generateEU261Email(flight);
  } else {
    console.log("✅ Flight was on time. No compensation required.");
  }
}

// 4. Generate EU261 Compensation Email
function generateEU261Email(flight: any) {
  const carrier = flight.OperatingCarrier ?? flight.MarketingCarrier;
  const flightNum = `${carrier.AirlineID}${carrier.FlightNumber}`;
  const origin = flight.Departure.AirportCode;
  const dest = flight.Arrival.AirportCode;
  const schedDep = flight.Departure.ScheduledTimeLocal.DateTime;
  const isCancel = flight.FlightStatus.Code === "CD";

  const emailTemplate = `
--------------------------------------------------
DRAFT EU261 COMPENSATION EMAIL (To: customer.relations@lufthansa.com)
--------------------------------------------------
Subject: Claim for Compensation under EU Regulation 261/2004 - Flight ${flightNum}

Dear Lufthansa Customer Service,

I am writing to claim compensation under EU Regulation 261/2004 for the ${isCancel ? "cancellation" : "significant delay"} of my flight ${flightNum} from ${origin} to ${dest}, scheduled to depart on ${schedDep}.

Your live Operations API confirms the flight was officially recorded as: ${flight.FlightStatus.Definition}.
${isCancel ? "As the flight was cancelled, I am entitled to a full refund or re-routing plus statutory compensation." : "Given the delay exceeded 3 hours upon arrival, I am entitled to statutory compensation under EU261."}

Please find my booking reference and bank details attached. I expect your response within 14 days.

Best regards,
[Passenger Name]
--------------------------------------------------`;
  console.log(emailTemplate);
}

// 5. Resolve IATA airport code → English city name via LH Reference Data API
async function getCityName(token: string, airportCode: string): Promise<string> {
  const url = `${BASE_URL}/mds-references/airports/${airportCode}?lang=EN`;
  const response = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" },
  });
  if (!response.ok) return airportCode;

  const data = await response.json();
  const airport = data?.AirportResource?.Airports?.Airport;
  if (!airport) return airportCode;

  const names = airport.Names?.Name;
  if (Array.isArray(names)) {
    const en = names.find((n: any) => n["@LanguageCode"] === "EN");
    return en?.["$"] ?? airportCode;
  }
  return names?.["$"] ?? airportCode;
}

// 6. Search for events at the flight destination using @ai-sdk/google + Google Search grounding
//
//  destinationAirport  — IATA code of the arrival airport (e.g. "MUC")
//  eventPreferences    — what the user enjoys (e.g. ["rock concerts", "live music"])
async function searchDestinationEvents(
  lhToken: string,
  destinationAirport: string,
  eventPreferences: string[],
): Promise<void> {
  console.log(
    `\n🎵 [EVENT SEARCH] Looking for events at ${destinationAirport}...`,
  );

  const cityName = await getCityName(lhToken, destinationAirport);
  console.log(`📍 Destination resolved: ${cityName} (${destinationAirport})`);

  const prefs = eventPreferences.join(", ");
  const prompt =
    `Search for upcoming ${prefs} events in ${cityName} happening. ` +
    `Return ONLY a JSON array — no surrounding text — where each element has these fields:\n` +
    `{ "title": string, "date": string, "venue": string, "description": string, "ticketUrl": string | null }\n\n` +
    `Only include real, confirmed events with known dates. If none are found, return an empty array [].`;

  const { text: rawText, sources } = await generateText({
    model: google("gemini-2.0-flash"),
    tools: {
      google_search: google.tools.googleSearch({}),
    },
    prompt,
  });

  // Extract the JSON array from the model output (grounding may add surrounding text)
  const jsonMatch = rawText.match(/\[[\s\S]*\]/);
  let events: EventResult[] = [];
  if (jsonMatch) {
    try {
      events = JSON.parse(jsonMatch[0]);
    } catch {
      // non-JSON fallback below
    }
  }

  if (events.length === 0) {
    console.log(`\n📋 Event summary:\n${rawText}`);
  } else {
    console.log(`\n🎉 Found ${events.length} event(s) in ${cityName}:\n`);
    for (const ev of events) {
      console.log(`  🎫 ${ev.title}`);
      console.log(`     📅 ${ev.date}`);
      console.log(`     📍 ${ev.venue}`);
      if (ev.description) console.log(`     📝 ${ev.description}`);
      if (ev.ticketUrl)   console.log(`     🔗 ${ev.ticketUrl}`);
      console.log();
    }
  }

  if (sources && sources.length > 0) {
    console.log(`🔍 Grounded search sources:`);
    for (const src of sources.slice(0, 5)) {
      console.log(`  • ${src.title ?? src.url}: ${src.url}`);
    }
  }
}

// Main Execution Flow
async function main() {
  try {
    const publicToken = await getAuthToken();
    let partnerToken: string | null = null;
    try { partnerToken = await getPartnerToken(); } catch { console.log("⚠️ Partner API not available — subscribe at developer.lufthansa.com/partner_apis"); }

    const today = new Date().toISOString().slice(0, 10);

    // --- REAL: Check live status on LHR→MUC, auto-detect any delays ---
    const lhrMucDelayed = await checkRouteStatus(publicToken, "LHR", "MUC", today);
    for (const flight of lhrMucDelayed) {
      await checkFlightStatusAndClaim(publicToken, flight, today);
    }

    // --- REAL: Scan FRA→BER known to have delays, run EU261 on any found ---
    const fraBerDelayed = await checkRouteStatus(publicToken, "FRA", "BER", today);
    for (const flight of fraBerDelayed) {
      await checkFlightStatusAndClaim(publicToken, flight, today);
    }






    // --- EVENT SEARCH: Find matching events at the flight destination ---
    // Customise destinationAirport, and eventPreferences to match the user's trip.
    await searchDestinationEvents(
      publicToken,
      "MUC",           // destination airport (IATA code from the flight)
      ["rock concerts", "live music festivals"],  // user's event preferences
    );

  } catch (error) {
    console.error("Error running Agent:", error);
  }
}

main();
