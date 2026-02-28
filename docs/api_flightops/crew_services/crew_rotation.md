Title: Lufthansa Developer Center - Crew Rotation

URL Source: https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Crew_Rotation

Markdown Content:
### Summary

Detailed information about one or more (up to six) rotations of the logged in crew member.

### Request

#### Code snippet: URL

`GET /v1/flight_operations/crew_services/COMMON_CREW_ROTATION`
### Parameters

| Name | Type | Description | Required | Schema / Format |
| --- | --- | --- | --- | --- |
| RN | Query | Crew Rotation Number | Yes | xsd:int / [0-9]{1-6} |
| RN_2 ... RN_6 | Query | Crew Rotation Numbers 2 to 6 | No | xsd:int / [0-9]{1-6} |

### Responses

| Code | Description | Content-Type | Schema |
| --- | --- | --- | --- |
| 200 | The crew rotations have been generated as requested. | application/json | → [Crew Rotation](https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Crew_Rotation#crewrotation) Model |
| 401 |  | application/json | → [Processing Errors](https://developer.lufthansa.com/docs/api_flightops/common_crew_services/Processing_Errors_Model) Model |
| 403 |  | application/json | → [Processing Errors](https://developer.lufthansa.com/docs/api_flightops/common_crew_services/Processing_Errors_Model) Model |
| 404 |  | application/json | → [Processing Errors](https://developer.lufthansa.com/docs/api_flightops/common_crew_services/Processing_Errors_Model) Model |
| 500 | Any other error | application/json | → [Processing Errors](https://developer.lufthansa.com/docs/api_flightops/common_crew_services/Processing_Errors_Model) Model |
| 503 | Service unavailable: A backend system used by this service is not responding | application/json | → [Processing Errors](https://developer.lufthansa.com/docs/api_flightops/common_crew_services/Processing_Errors_Model) Model |

### [](https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Crew_Rotation)Crew Rotation

#### Code snippet: Payload

```
{
    "rotations" : [ {
        "rotationNumber" → xsd:int,
        "airlineCode" → xsd:string,
        "rotationArea" → xsd:string,
        "fleets" → [ xsd:string, ... ],
        "homebase" → xsd:string,
        "requiredVisas" → [ xsd:string, ... ],
        "tropic" → xsd:boolean,
        "warning" → xsd:string,
        "shifts" : [ {
            "shiftNumber" → xsd:int,
            "shiftChanged" → xsd:boolean,
            "shiftBegin" → xsd:dateTime,
            "shiftEnd" → xsd:dateTime,
            "briefingBeginCoc" → xsd:dateTime,
            "briefingBeginCab" → xsd:dateTime,
            "startShiftType" → xsd:string,
            "endShiftType" → xsd:string,
            "legs" : [ {
                "dutyCode" → xsd:string,
                "flightDesignator" → xsd:string,
                "gdorOffset" → xsd:int,
                "departureAirport" → xsd:string,
                "arrivalAirport" → xsd:string,
                "depatureDate" → xsd:dateTime,
                "arrivalDate" → xsd:dateTime,
                "aircraftType" → xsd:string,
                "aircraftSubtype" → xsd:string,
                "aircraftRegistration" → xsd:string,
                "aircraftChanged" → xsd:boolean,
                "firstCapacity" → xsd:int,
                "businessCapacity" → xsd:int,
                "premiumEcoCapacity" → xsd:int,
                "ecoCapacity" → xsd:int,
                "transit" → xsd:int,
                "pickupTime" → xsd:dateTime,
                "hotelName" → xsd:string,
                "airportRoom" → xsd:boolean,
                "hotel" → xsd:boolean
            }, ...],
            "attributes" : {
                "..." → xsd:int,
                ...
            }
        }, ... ],
        "crewComplements" : [ {
            "crewFunction" → xsd:string,
            "count" → xsd:int
        }, ... ],
        "attributes" : {
            "..." → xsd:int,
            ...
        },
        "dirty" → xsd:boolean
    } ]
}
```

| Name | Description | Required | Schema / Format |
| --- | --- | --- | --- |
| rotations[] → rotationNumber | rotation number | yes | xsd:int [0-9]{1,6} |
| rotations[] → airlineCode | airline code: "LH" (Lufthansa Passage) or "FM" (Lufthansa Cargo) | yes | xsd:string [0-9A-Z]{2} |
| rotations[] → rotationArea | rotation area (aka "pattern area"), e.g. "EA", "FE", "IN" | yes | xsd:string [0-9A-Z]{2} |
| rotations[] → fleets | aircraft type(s) of the rotation (max. 3) | yes | xsd:string |
| rotations[] → homebase | crew's homebase | yes | xsd:string [A-Z]{3} |
| rotations[] → tropic | tropic indicator | yes | xsd:boolean |
| rotations[] → requiredVisas | required visas on the rotation | yes | xsd:string |
| rotations[] → warning | possible warning | no | xsd:string |
| rotations[] → shifts[] → shiftNumber | number of the shift | yes | xsd:int |
| rotations[] → shifts[] → shiftChanged | indicator whether the shift was changed | yes | xsd:boolean |
| rotations[] → shifts[] → shiftBegin | beginning of the shift | yes | xsd:dateTime [0-9]{4}[-][0-9]{2}[-][0-9]{2}T[0-9]{2}[:][0-9]{2}[:][0-9]{2}Z _YYYY-MM-DD_**T**_HH:MM:SS_**Z** |
| rotations[] → shifts[] → shiftEnd | end of the shift | yes | xsd:dateTime [0-9]{4}[-][0-9]{2}[-][0-9]{2}T[0-9]{2}[:][0-9]{2}[:][0-9]{2}Z _YYYY-MM-DD_**T**_HH:MM:SS_**Z** |
| rotations[] → shifts[] → briefingBeginCoc | briefing time for cockpit | yes | xsd:dateTime [0-9]{4}[-][0-9]{2}[-][0-9]{2}T[0-9]{2}[:][0-9]{2}[:][0-9]{2}Z _YYYY-MM-DD_**T**_HH:MM:SS_**Z** |
| rotations[] → shifts[] → briefingBeginCab | briefing time for cabin | yes | xsd:dateTime [0-9]{4}[-][0-9]{2}[-][0-9]{2}T[0-9]{2}[:][0-9]{2}[:][0-9]{2}Z _YYYY-MM-DD_**T**_HH:MM:SS_**Z** |
| rotations[] → shifts[] → startShiftType | type of the shift start, e.g. "PT" = pseudo transport at the beginning of a rotation | no | xsd:string |
| rotations[] → shifts[] → endShiftType | type of the shift end: "KT" = sick transport, "PT" = pseudo transport at the end of a rotation | no | xsd:string |
| rotations[] → shifts[] → legs[] → dutyCode | duty code for the leg. All duty codes except "OD" are shown ("DH" = deadhead, "GT" = ground transport, "SB" = standby, "KT" = sick transport). For "OD" the attribute remains empty | no | xsd:string |
| rotations[] → shifts[] → legs[] → flightDesignator | flight number for the leg, including airline code and optional suffix | yes | xsd:string [0-9A-Z]{2}[0-9]{1,4}[A-Z]? |
| rotations[] → shifts[] → legs[] → gdorOffset | day offset in case the flight ID date (i.e. the departure date of the first leg of the flight in UTC) differs from the shift date (UTC or LT) in the date row. In this case the difference in days is displayed in the format "/+n" or "/-n" (n=number of days) | no | xsd:int |
| rotations[] → shifts[] → legs[] → departureAirport | departure airport (origin), e.g. "FRA" | yes | xsd:string [A-Z]{3} |
| rotations[] → shifts[] → legs[] → arrivalAirport | arrival airport (destination), e.g. "HAM" | yes | xsd:string [A-Z]{3} |
| rotations[] → shifts[] → legs[] → depatureDate | scheduled time of departure (STD) | yes | xsd:dateTime [0-9]{4}[-][0-9]{2}[-][0-9]{2}T[0-9]{2}[:][0-9]{2}[:][0-9]{2}Z _YYYY-MM-DD_**T**_HH:MM:SS_**Z** |
| rotations[] → shifts[] → legs[] → arrivalDate | scheduled time of arrival (STA) | yes (if crewList present) | xsd:dateTime [0-9]{4}[-][0-9]{2}[-][0-9]{2}T[0-9]{2}[:][0-9]{2}[:][0-9]{2}Z _YYYY-MM-DD_**T**_HH:MM:SS_**Z** |
| rotations[] → shifts[] → legs[] → aircraftType | aircraft type of the leg | yes | xsd:string |
| rotations[] → shifts[] → legs[] → aircraftSubtype | aircraft subtype (ACS) of the leg, e.g. "346". Remains empty if the ACS is not known | no | xsd:string |
| rotations[] → shifts[] → legs[] → aircraftRegistration | registration of the aircraft, e.g. "DAIMA" | no | xsd:string [A-Z]{5} |
| rotations[] → shifts[] → legs[] → aircraftChanged | true if an aircraft change happens after this leg | yes | xsd:boolean |
| rotations[] → shifts[] → legs[] → firstCapacity | seating capacity in first class | no | xsd:int |
| rotations[] → shifts[] → legs[] → businessCapacity | seating capacity in business class | no | xsd:int |
| rotations[] → shifts[] → legs[] → premiumEcoCapacity | seating capacity in premium economy class | no | xsd:int |
| rotations[] → shifts[] → legs[] → ecoCapacity | seating capacity in economy class | no | xsd:int |
| rotations[] → shifts[] → legs[] → transit | transit time in minutes. Remains empty if no transit is necessary (e.g. last leg of a shift). | no | xsd:int |
| rotations[] → shifts[] → legs[] → pickupTime | pickup time for the transport from the hotel to the airport | no | xsd:dateTime [0-9]{4}[-][0-9]{2}[-][0-9]{2}T[0-9]{2}[:][0-9]{2}[:][0-9]{2}Z _YYYY-MM-DD_**T**_HH:MM:SS_**Z** |
| rotations[] → shifts[] → legs[] → hotelName | name of the hotel in case of a hotel stay. Remains empty if the airport crew rest room is used or no hotel stay is required | no | xsd:string |
| rotations[] → shifts[] → legs[] → airportRoom | true if a crew rest room at the airport is used | no | xsd:boolean |
| rotations[] → shifts[] → legs[] → hotel | deprecated: hotel indicator (always set to "false") | no | xsd:boolean |
| rotations[] → shifts[] → attributes | various shift times in minutes (see [table below](https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Crew_Rotation#shifttimes)) | no | xsd:int |
| rotations[] → crewComplements[] -> crewFunction | crew function, e.g. CP, PU, etc. | yes | xsd:string [A-Z]{2} |
| rotations[] → crewComplements[] -> count | number of crew members | yes | xsd:int |
| rotations[] → attributes | various rotation times in minutes (see[table below](https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Crew_Rotation#rotationtimes)) | no | xsd:int |
| rotations[] → dirty | true if the rotation is in conflict. In this case the data are incorrect because some flights have changed, e.g. cancelled | no | xsd:boolean |

#### [](https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Crew_Rotation)Rotation times

**Attribute Name****Description**
COC_BZW_ACT"Bezahlwirksame Minuten" in starting month of the rotation (cockpit)
COC_BZW_NXT"Bezahlwirksame Minuten" in the following month of the rotation, in case the rotation does not end within the same month (cockpit)
COC_LSW_ACT"Leistungswirksame Minuten" in starting month of the rotation (cockpit)
COC_LSW_NXT"LeistungswirksameMinuten" in the following month of the rotation, in case the rotation does not end within the same month (cockpit)
COC_RZHB_LAW"Ruhezeit" homebase according to legal regulations (cockpit)
COC_RZHB_MTV"Ruhezeit" homebase according to MTV (cockpit)
COC_SRZ"Sonderruhezeit" (cockpit)
CAB_BZW_ACT"Bezahlwirksame Minuten" in starting month of the rotation (cabin)
CAB_BZW_NXT"Bezahlwirksame Minuten" in the following month of the rotation, in case the rotation does not end within the same month (cabin)
CAB_LSW_ACT"Leistungswirksame Minuten" in starting month of the rotation (cabin)
CAB_LSW_NXT"LeistungswirksameMinuten" in the following month of the rotation, in case the rotation does not end within the same month (cabin)
CAB_LSW_FAK_ACT n/a
CAB_RZHB_LAW"Ruhezeit" homebase according to legal regulations (cabin)
CAB_RZHB_MTV"Ruhezeit" homebase according to MTV (cabin)
CAB_FZM"Freizeitmodell" (number of days)
CAB_SRZ"Sonderruhezeit" (cabin)

#### [](https://developer.lufthansa.com/docs/read/api_flightops/common_crew_services/Crew_Rotation)Shift times

**Attribute Name****Description**
COC_MTV_FDZ"Flugdientszeit" of the current shift according to MTV (cockpit)
COC_LAW_FDZ"Flugdientszeit" of the current shift according to legal regulations (cockpit)
COC_MTV_MAX Maximum "Flugdienstzeit" according to MTV (cockpit)
COC_LAW_MAX Maximum "Flugdienstzeit" according to legal regulations (cockpit)
COC_MTV_RZ"Ruhezeit" for all previous shifts including the current one, according to MTV (cockpit)
COC_MTV_RZ_ACTUAL n/a
COC_LAW_RZ"Ruhezeit" for all previous shifts including the current one, according to legal regulations (cockpit)
CAB_MTV_FDZ"Flugdientszeit" of the current shift according to MTV (cabin)
CAB_LAW_FDZ"Flugdientszeit" of the current shift according to legal regulations (cabin)
CAB_MTV_MAX Maximum "Flugdienstzeit" according to MTV (cabin)
CAB_LAW_MAX Maximum "Flugdienstzeit" according to legal regulations (cabin)
CAB_MTV_RZ"Ruhezeit" for all previous shifts including the current one, according to MTV (cabin)
CAB_MTV_RZ_ACTUAL n/a
CAB_LAW_RZ"Ruhezeit" for all previous shifts including the current one, according to legal regulations (cabin)

### Example

#### Request

##### Code snippet: Get request

`GET /v1/flight_operations/crew_services/COMMON_CREW_ROTATION?RN=189378`
#### Response

#### Code snippet: JSON

```
{
  "rotations" : [ {
    "rotationNumber" : 189378,
    "airlineCode" : "LH",
    "rotationArea" : "EA",
    "fleets" : [ "A320" ],
    "homebase" : "FRA",
    "requiredVisas" : [ ],
    "tropic" : false,
    "warning" : null,
    "shifts" : [ {
      "shiftNumber" : 1,
      "shiftChanged" : false,
      "shiftBegin" : "2016-12-02T05:40:00Z",
      "shiftEnd" : "2016-12-02T18:35:00Z",
      "briefingBeginCoc" : null,
      "briefingBeginCab" : "2016-12-02T05:40:00Z",
      "briefingBeginCocLT" : null,
      "briefingBeginCabLT" : "2016-12-02T06:40:00Z",
      "startShiftType" : null,
      "endShiftType" : null,
      "legs" : [ {
        "dutyCode" : "",
        "flightDesignator" : "LH900",
        "gdorOffset" : 0,
        "departureAirport" : "FRA",
        "arrivalAirport" : "LHR",
        "depatureDate" : "2016-12-02T06:55:00Z",
        "arrivalDate" : "2016-12-02T08:40:00Z",
        "aircraftType" : "A320",
        "aircraftSubtype" : "321",
        "aircraftRegistration" : "",
        "aircraftChanged" : false,
        "firstCapacity" : 0,
        "businessCapacity" : 200,
        "premiumEcoCapacity" : 0,
        "ecoCapacity" : 0,
        "transit" : 50,
        "pickupTime" : null,
        "hotelName" : null,
        "airportRoom" : false,
        "hotel" : false
      }, {
        "dutyCode" : "",
        "flightDesignator" : "LH901",
        "gdorOffset" : 0,
        "departureAirport" : "LHR",
        "arrivalAirport" : "FRA",
        "depatureDate" : "2016-12-02T09:30:00Z",
        "arrivalDate" : "2016-12-02T11:05:00Z",
        "aircraftType" : "A320",
        "aircraftSubtype" : "321",
        "aircraftRegistration" : "",
        "aircraftChanged" : true,
        "firstCapacity" : 0,
        "businessCapacity" : 200,
        "premiumEcoCapacity" : 0,
        "ecoCapacity" : 0,
        "transit" : 70,
        "pickupTime" : null,
        "hotelName" : null,
        "airportRoom" : false,
        "hotel" : false
      }, {
        "dutyCode" : "",
        "flightDesignator" : "LH1306",
        "gdorOffset" : 0,
        "departureAirport" : "FRA",
        "arrivalAirport" : "BEY",
        "depatureDate" : "2016-12-02T12:15:00Z",
        "arrivalDate" : "2016-12-02T16:05:00Z",
        "aircraftType" : "A320",
        "aircraftSubtype" : "32M",
        "aircraftRegistration" : "",
        "aircraftChanged" : false,
        "firstCapacity" : 0,
        "businessCapacity" : 200,
        "premiumEcoCapacity" : 0,
        "ecoCapacity" : 0,
        "transit" : 0,
        "pickupTime" : null,
        "hotelName" : "MOEVENPICK BEY",
        "airportRoom" : false,
        "hotel" : true
      } ],
      "attributes" : {
        "CAB_MTV_RZ" : 720,
        "CAB_MTV_FDZ" : 655,
        "CAB_LAW_MAX" : 750,
        "CAB_LAW_RZ" : 640,
        "CAB_MTV_MAX" : 840,
        "CAB_LAW_FDZ" : 625
      }
    }, {
      "shiftNumber" : 3,
      "shiftChanged" : false,
      "shiftBegin" : "2016-12-04T02:00:00Z",
      "shiftEnd" : "2016-12-04T11:55:00Z",
      "briefingBeginCoc" : null,
      "briefingBeginCab" : "2016-12-04T02:00:00Z",
      "briefingBeginCocLT" : null,
      "briefingBeginCabLT" : "2016-12-04T04:00:00Z",
      "startShiftType" : null,
      "endShiftType" : null,
      "legs" : [ {
        "dutyCode" : "",
        "flightDesignator" : "LH1307",
        "gdorOffset" : 0,
        "departureAirport" : "BEY",
        "arrivalAirport" : "FRA",
        "depatureDate" : "2016-12-04T03:00:00Z",
        "arrivalDate" : "2016-12-04T07:30:00Z",
        "aircraftType" : "A320",
        "aircraftSubtype" : "32M",
        "aircraftRegistration" : "",
        "aircraftChanged" : true,
        "firstCapacity" : 0,
        "businessCapacity" : 200,
        "premiumEcoCapacity" : 0,
        "ecoCapacity" : 0,
        "transit" : 135,
        "pickupTime" : null,
        "hotelName" : null,
        "airportRoom" : false,
        "hotel" : false
      }, {
        "dutyCode" : "DH",
        "flightDesignator" : "LH180",
        "gdorOffset" : 0,
        "departureAirport" : "FRA",
        "arrivalAirport" : "TXL",
        "depatureDate" : "2016-12-04T09:45:00Z",
        "arrivalDate" : "2016-12-04T10:55:00Z",
        "aircraftType" : "A320",
        "aircraftSubtype" : "32M",
        "aircraftRegistration" : "",
        "aircraftChanged" : false,
        "firstCapacity" : 0,
        "businessCapacity" : 200,
        "premiumEcoCapacity" : 0,
        "ecoCapacity" : 0,
        "transit" : 0,
        "pickupTime" : null,
        "hotelName" : "SCHWEIZERHOF",
        "airportRoom" : false,
        "hotel" : true
      } ],
      "attributes" : {
        "CAB_MTV_RZ" : 600,
        "CAB_MTV_FDZ" : 360,
        "CAB_LAW_MAX" : 660,
        "CAB_LAW_RZ" : 600,
        "CAB_MTV_MAX" : 960,
        "CAB_LAW_FDZ" : 330
      }
    }, {
      "shiftNumber" : 4,
      "shiftChanged" : false,
      "shiftBegin" : "2016-12-05T04:45:00Z",
      "shiftEnd" : "2016-12-05T10:30:00Z",
      "briefingBeginCoc" : null,
      "briefingBeginCab" : "2016-12-05T04:45:00Z",
      "briefingBeginCocLT" : null,
      "briefingBeginCabLT" : "2016-12-05T05:45:00Z",
      "startShiftType" : null,
      "endShiftType" : null,
      "legs" : [ {
        "dutyCode" : "",
        "flightDesignator" : "LH173",
        "gdorOffset" : 0,
        "departureAirport" : "TXL",
        "arrivalAirport" : "FRA",
        "depatureDate" : "2016-12-05T05:45:00Z",
        "arrivalDate" : "2016-12-05T06:55:00Z",
        "aircraftType" : "A320",
        "aircraftSubtype" : "321",
        "aircraftRegistration" : "",
        "aircraftChanged" : false,
        "firstCapacity" : 0,
        "businessCapacity" : 200,
        "premiumEcoCapacity" : 0,
        "ecoCapacity" : 0,
        "transit" : 55,
        "pickupTime" : null,
        "hotelName" : null,
        "airportRoom" : false,
        "hotel" : false
      }, {
        "dutyCode" : "SB",
        "flightDesignator" : "LH9002S",
        "gdorOffset" : 0,
        "departureAirport" : "FRA",
        "arrivalAirport" : "FRA",
        "depatureDate" : "2016-12-05T07:50:00Z",
        "arrivalDate" : "2016-12-05T09:30:00Z",
        "aircraftType" : "A320",
        "aircraftSubtype" : "321",
        "aircraftRegistration" : "",
        "aircraftChanged" : false,
        "firstCapacity" : 0,
        "businessCapacity" : 200,
        "premiumEcoCapacity" : 0,
        "ecoCapacity" : 0,
        "transit" : 0,
        "pickupTime" : null,
        "hotelName" : null,
        "airportRoom" : false,
        "hotel" : false
      } ],
      "attributes" : {
        "CAB_MTV_RZ" : 720,
        "CAB_MTV_FDZ" : 285,
        "CAB_LAW_MAX" : 765,
        "CAB_LAW_RZ" : 720,
        "CAB_MTV_MAX" : 840,
        "CAB_LAW_FDZ" : 285
      }
    } ],
    "crewComplements" : [ {
      "crewFunction" : "PU",
      "count" : 1
    }, {
      "crewFunction" : "FB",
      "count" : 2
    } ],
    "attributes" : {
      "CAB_RZHB_LAW" : 720,
      "CAB_LSW_FAK_NXT" : 0,
      "CAB_FZM" : 2,
      "CAB_BZW_NXT" : 0,
      "CAB_LSW_NXT" : 0,
      "CAB_LSW_FAK_ACT" : 847,
      "CAB_BZW_ACT" : 805,
      "CAB_RZHB_MTV" : 720,
      "CAB_LSW_ACT" : 770
    },
    "dirty" : false
  } ]
}
```
