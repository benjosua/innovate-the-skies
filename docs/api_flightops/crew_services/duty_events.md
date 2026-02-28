Title: Lufthansa Developer Center - Duty Events

URL Source: https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Duty_Events

Markdown Content:
### Summary

Duty plan events for logged in crew member for a given period in time. Based on the roster pairing information calendar events are generated.

### Request

#### Code snippet: URL

`GET /v1/flight_operations/crew_services/COMMON_DUTY_EVENTS`
### Parameters

| Name | Type | Description | Required | Schema / Format |
| --- | --- | --- | --- | --- |
| fromDate | Query | Beginning of required duty plan period in UTC (date included) | Yes | xsd:date |
| toDate | Query | End of required duty plan period in UTC (date included) | Yes | xsd:date |

### Responses

| Code | Description | Content-Type | Schema |
| --- | --- | --- | --- |
| 200 | Duty events matching the filter. | application/json | → [Roster](https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Duty_Events#roster) Model |
| 404 | No duty plan found for the requesting person. | application/json | → [Processing Errors](https://developer.lufthansa.com/docs/api_flightops/common_crew_services/Processing_Errors_Model) Model |
| 500 | Any other error | application/json | → [Processing Errors](https://developer.lufthansa.com/docs/api_flightops/common_crew_services/Processing_Errors_Model) Model |

### [](https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Duty_Events)Roster

#### Code snippet: Payload

```
{
    "pkNumber" → xsd:string
    "fromDate" → xsd:date
    "toDate" → xsd:date
    "rosterDays" → [
        {
            "day" → xsd:date
            events → [
                {
                    "eventType" → "briefing" | "flight" | "hotel" | "ground_event"
                    "eventCategory" → "flight" | "flight_other" | "off" | "frs"
                    "eventDetails" → xsd:string
                    "wholeDay" → xsd:boolean
                    "startTime" → xsd:dateTime
                    "startLocation" → xsd:string
                    "startTimeZoneOffset" → xsd:integer
                    "endTime" → xsd:dateTime
                    "endLocation" → xsd:string
                    "endTimeZoneOffset" → xsd:integer
                    "eventAttributes" → {
                        "anyKey" → "anyValue"
                        ... more key-value-pairs ...
                    },
                    "_links" → {
                        "crewList" → {
                            "href" → xsd:anyURI
                        },
                        "flightInfo" → {
                            "href" → xsd:anyURI
                        },
                        "checkInTimes" → {
                            "href" → xsd:anyURI
                        },
                        "landingReport" → {
                            "href" → xsd:anyURI
                        },
                     }
                },
                {
                    ... next event ...
                }
            ]
        },
        {
            ... next day ...
        }
    ]
```

| Name | Description | Required | Schema / Format |
| --- | --- | --- | --- |
| pkNumber | Staff identifier (German: Personalkennziffer) of the person requesting the duty plan. | yes | xsd:string [0-9]{6}[A-Z] |
| fromDate | Beginning of required duty plan period in UTC (date included). | yes | xsd:date [0-9]{4}[-][0-9]{2}[-][0-9]{2}Z _YYYY-MM-DD_**Z** |
| toDate | End of required duty plan period in UTC (date included). | yes | xsd:date [0-9]{4}[-][0-9]{2}[-][0-9]{2}Z _YYYY-MM-DD_**Z** |
| rosterDays | An array of days belonging to the duty plan. | yes |  |
| rosterDays[] → day | Date of the duty day. | yes | xsd:date [0-9]{4}[-][0-9]{2}[-][0-9]{2}Z _YYYY-MM-DD_**Z** |
| rosterDays[] → events | An array of events within the day. | yes |  |
| rosterDays[] → events[] → eventType | One of: * BRIEFING → Briefing before the flight. * FLIGHT → The actual flight. * HOTEL → Layover in a hotel. * GROUNDEVENT → Activity on the ground. | yes | xsd:string |
| rosterDays[] → events[] → eventCategory | One of: * flight → Flight (on duty) * flight_other → Flight (DH, KT, PT etc.) * off → OFF * frs → FRS * lic → licence event * res → standby/reserve * sim → Simulator * duty → ground duty * abs → abscence * vac → vacaction default → Event could not be assigned to a category | yes | xsd:string |
| rosterDays[] → events[] → eventDetails | Textual details as delivered by the planning system. For flight events: Airline + Flight Number + Operational Suffix. For ground events: label as delivered by the CAS system. For non off-duty events: Activity Type + Flight Number + Operational Suffix, where the Activity Type may be one of: DH, SB, GT, KT, PT. | yes | xsd:string |
| rosterDays[] → events[] → wholeDay | "1" or "yes" or "true" → the event covers the whole day "0" or "no" or "false" → otherwise | yes | xsd:boolean |
| rosterDays[] → events[] → startTime | The beginning of the event in UTC. |  | xsd:dateTime [0-9]{4}[-][0-9]{2}[-][0-9]{2}T[0-9]{2}[:][0-9]{2}[:][0-9]{2}Z _YYYY-MM-DD_**T**_HH:MM:SS_**Z** |
| rosterDays[] → events[] → startLocation | F or ground events: Origin. For flight events: Departure Airport (IATA 3-letter-code). | yes (if eventDetails is not "X") | xsd:string |
| rosterDays[] → events[] → startTimeZoneOffset | Time zone offset in minutes (in relation to UTC) in the start location. |  | xsd:integer |
| rosterDays[] → events[] → endTime | The end time of the event in UTC. |  | xsd:dateTime [0-9]{4}[-][0-9]{2}[-][0-9]{2}T[0-9]{2}[:][0-9]{2}[:][0-9]{2}Z _YYYY-MM-DD_**T**_HH:MM:SS_**Z** |
| rosterDays[] → events[] → endLocation | F or ground events: Destination For flight events: Arrival Airport (IATA 3-letter-code). |  | xsd:string |
| rosterDays[] → events[] → endTimeZoneOffset | Time zone offset in minutes (in relation to UTC) in the end location. |  | xsd:integer |
| rosterDays[] → events[] → eventAttributes | Collection of event-specific attributes. |  |  |
| rosterDays[] → events[] → eventAttributes → rotationId | Identifier of the rotation, which the event belongs to. | yes (if eventAttribute present) | xsd:integer |
| rosterDays[] → events[] → eventAttributes → dayOfShift | The consecutive day number of the shift. The information helps with legs grouping and is transported from the underlying shift model. | yes (if eventAttribute present) | xsd:integer |
| rosterDays[] → events[] → _links | Links to related documents. |  |  |
| rosterDays[] → events[] → _links → crewList | Link to the crew list for the respective flight event. |  |  |
| rosterDays[] → events[] → _links → crewList → href | The actual URI to the document. | yes (if crewList present) | xsd:anyURI |
| rosterDays[] → events[] → _links → flightInfo | Link to the flight information of the respective flight event. |  |  |
| rosterDays[] → events[] → _links → flightInfo → href | The actual URI to the document. | yes (if flightInfo present) | xsd:anyURI |
| rosterDays[] → events[] → _links → checkInTimes | Link to the checkIn times document for the respective flight event. Will only be added if this is the first flight within the rotation |  |  |
| rosterDays[] → events[] → _links → checkInTimes→ href | The actual URI to the document. | yes (if checkInTimes present) | xsd:anyURI |
| rosterDays[] → events[] → _links → landingReport | Link to the landing report of the respective flight event. Only for COC Crewmember |  |  |
| rosterDays[] → events[] → _links → landingReport→ href | The actual URI to the document. | yes (if landingReport present) | xsd:anyURI |

### Example

#### Request

##### Code snippet: Get request

`GET /v1/flight_operations/crew_services/COMMON_DUTY_EVENTS?fromDate=2016-10-01Z&toDate=2016-10-31Z`
#### Response

#### Code snippet: Json

```
{
  "pkNumber": "123456A",
  "fromDate": "2016-10-01Z",
  "toDate": "2016-10-31Z",
  "rosterDays": [{
    "day": "2016-10-01Z",
    "events": [{
        "eventType": "ground",
        "eventCategory": "off",
        "eventDetails": "off",
        "wholeDay": true,
        "startTime": "2017-02-13T00:00Z",
        "startLocation": "FRA",
        "startTimeZoneOffset": 60,
        "endTime": "2017-02-13T23:59Z",
        "endLocation": "FRA",
        "endTimeZoneOffset": 60
        "eventAttributes": {},
        "_links": {}
    }]
  },
  {
    "day": "2016-10-02Z",
    "events": [{
      "eventType": "flight",
      "eventCategory": "flight",
      "eventDetails": "LH400",
      "wholeDay": false,
      "startTime": "2017-02-14T12:00Z",
      "startLocation": "FRA",
      "startTimeZoneOffset": 60,
      "endTime": "2016-02-14T23:00Z",
      "endLocation": "JFK",
      "endTimeZoneOffset": -300,
      "eventAttributes": {
        "rotationId": "123456",
        "dayOfShift": 1
      },
      "_links": {
        "flightInfo": {
          "href": "./COMMON_FLIGHT_LEG_DETAILS?flightDesignator=LH400&flightDate=2016-10-20Z&departureAirport=FRA&arrivalAirport=JFK"
        },
        "crewList" {
          "href": "./COMMON_CREWLIST?flightDesignator=LH400&flightDate=2016-10-20Z&departureAirport=FRA&arrivalAirport=JFK&accessCode=n56shdfg3"
        }
        "checkInTimes": {
          "href": "./COMMON_CHECKIN_TIMES?flightDesignator=LH400&flightDate=02OCT16Z&departureAirport=FRA&arrivalAirport=JFK&..."
        },
        "landingReport" {
          "href": "./COMMON_LANDING_REPORT?flightDesignator=LH400&flightDate=02OCT16Z&departureAirport=FRA&arrivalAirport=JFK"
        }
      }
    }]
  },
  ...
  ]
}
```

version 10 as of 7 years ago by Alexander Fuss
