Title: Lufthansa Developer Center - Flight Schedules

URL Source: https://developer.lufthansa.com/docs/read/api_details/flight_schedules

Markdown Content:
This API provides Lufthansa Groups flight schedule information (limited to LH - Lufthansa, EN - Air Dolomiti, LX - Swiss, OS - Austrian, WK - Edelweiss, SN - Brussels Airlines and 4Y - Eurowings Discover).

A search functionality is available based on a number of criteria:

*   airlines
*   flight number
*   start and end date
*   days of operation
*   origin and destination
*   aircraft types

Access to view passenger flights is open. **Listing all flight schedules or cargo schedules is restricted.**

The flights returned are date-wise aggregated. Their structure and attributes follow the standards and definitions provided by the IATA Standard Schedules Information Manual (SSIM, Chapter 2).

### Request and Respone Structure

For details on the request and respons structure, please see the API Specification of **Flight Schedules API** within the[Playground](https://developer.lufthansa.com/io-docs)

### Request Example

```
GET /flight-schedules/flightschedules/passenger?airlines=LH&flightNumberRanges=400-405&startDate=05DEC19&endDate=10DEC19&daysOfOperation=1234567&timeMode=UTC
```

### Response Example

[
    {
        "airline": "LH",
        "flightNumber": 400,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "05DEC19",
            "endDate": "05DEC19",
            "daysOfOperation": "   4   "
        },
        "periodOfOperationLT": {
            "startDate": "05DEC19",
            "endDate": "05DEC19",
            "daysOfOperation": "   4   "
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "FRA",
                "destination": "JFK",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "74H",
                "aircraftConfigurationVersion": "F8C80E32M244",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 590,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 650,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": 60,
                "aircraftArrivalTimeUTC": 1120,
                "aircraftArrivalTimeDateDiffUTC": 0,
                "aircraftArrivalTimeLT": 820,
                "aircraftArrivalTimeDateDiffLT": 0,
                "aircraftArrivalTimeVariation": -300
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8841/ET1610/SN7230/TG7700"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    },
    {
        "airline": "LH",
        "flightNumber": 400,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "06DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12  567"
        },
        "periodOfOperationLT": {
            "startDate": "06DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12  567"
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "FRA",
                "destination": "JFK",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "74H",
                "aircraftConfigurationVersion": "F8C80E32M244",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 590,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 650,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": 60,
                "aircraftArrivalTimeUTC": 1120,
                "aircraftArrivalTimeDateDiffUTC": 0,
                "aircraftArrivalTimeLT": 820,
                "aircraftArrivalTimeDateDiffLT": 0,
                "aircraftArrivalTimeVariation": -300
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8841/ET1610/SN7230/TG7700"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    },
    {
        "airline": "LH",
        "flightNumber": 401,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "05DEC19",
            "endDate": "05DEC19",
            "daysOfOperation": "   4   "
        },
        "periodOfOperationLT": {
            "startDate": "05DEC19",
            "endDate": "05DEC19",
            "daysOfOperation": "   4   "
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "JFK",
                "destination": "FRA",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "74H",
                "aircraftConfigurationVersion": "F8C80E32M244",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 1260,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 960,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": -300,
                "aircraftArrivalTimeUTC": 270,
                "aircraftArrivalTimeDateDiffUTC": 1,
                "aircraftArrivalTimeLT": 330,
                "aircraftArrivalTimeDateDiffLT": 1,
                "aircraftArrivalTimeVariation": 60
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8840/SN7231"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    },
    {
        "airline": "LH",
        "flightNumber": 401,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "06DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12  567"
        },
        "periodOfOperationLT": {
            "startDate": "06DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12  567"
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "JFK",
                "destination": "FRA",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "74H",
                "aircraftConfigurationVersion": "F8C80E32M244",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 1260,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 960,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": -300,
                "aircraftArrivalTimeUTC": 270,
                "aircraftArrivalTimeDateDiffUTC": 1,
                "aircraftArrivalTimeLT": 330,
                "aircraftArrivalTimeDateDiffLT": 1,
                "aircraftArrivalTimeVariation": 60
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8840/SN7231"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    },
    {
        "airline": "LH",
        "flightNumber": 402,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "05DEC19",
            "endDate": "06DEC19",
            "daysOfOperation": "   45  "
        },
        "periodOfOperationLT": {
            "startDate": "05DEC19",
            "endDate": "06DEC19",
            "daysOfOperation": "   45  "
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "FRA",
                "destination": "EWR",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "74H",
                "aircraftConfigurationVersion": "F8C80E32M244",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 755,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 815,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": 60,
                "aircraftArrivalTimeUTC": 1275,
                "aircraftArrivalTimeDateDiffUTC": 0,
                "aircraftArrivalTimeLT": 975,
                "aircraftArrivalTimeDateDiffLT": 0,
                "aircraftArrivalTimeVariation": -300
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8839/AC9443"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "B"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    },
    {
        "airline": "LH",
        "flightNumber": 402,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "07DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12   67"
        },
        "periodOfOperationLT": {
            "startDate": "07DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12   67"
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "FRA",
                "destination": "EWR",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "74H",
                "aircraftConfigurationVersion": "F8C80E32M244",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 755,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 815,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": 60,
                "aircraftArrivalTimeUTC": 1275,
                "aircraftArrivalTimeDateDiffUTC": 0,
                "aircraftArrivalTimeLT": 975,
                "aircraftArrivalTimeDateDiffLT": 0,
                "aircraftArrivalTimeVariation": -300
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8839/AC9443"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "B"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    },
    {
        "airline": "LH",
        "flightNumber": 403,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "05DEC19",
            "endDate": "06DEC19",
            "daysOfOperation": "   45  "
        },
        "periodOfOperationLT": {
            "startDate": "05DEC19",
            "endDate": "06DEC19",
            "daysOfOperation": "   45  "
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "EWR",
                "destination": "FRA",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "74H",
                "aircraftConfigurationVersion": "F8C80E32M244",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 1400,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 1100,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": -300,
                "aircraftArrivalTimeUTC": 400,
                "aircraftArrivalTimeDateDiffUTC": 1,
                "aircraftArrivalTimeLT": 460,
                "aircraftArrivalTimeDateDiffLT": 1,
                "aircraftArrivalTimeVariation": 60
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8838/AC9444"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "B"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    },
    {
        "airline": "LH",
        "flightNumber": 403,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "07DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12   67"
        },
        "periodOfOperationLT": {
            "startDate": "07DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12   67"
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "EWR",
                "destination": "FRA",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "74H",
                "aircraftConfigurationVersion": "F8C80E32M244",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 1400,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 1100,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": -300,
                "aircraftArrivalTimeUTC": 400,
                "aircraftArrivalTimeDateDiffUTC": 1,
                "aircraftArrivalTimeLT": 460,
                "aircraftArrivalTimeDateDiffLT": 1,
                "aircraftArrivalTimeVariation": 60
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8838/AC9444"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "B"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    },
    {
        "airline": "LH",
        "flightNumber": 404,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "05DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12 4567"
        },
        "periodOfOperationLT": {
            "startDate": "05DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12 4567"
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "FRA",
                "destination": "JFK",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "346",
                "aircraftConfigurationVersion": "F8C56E28M189",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 985,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 1045,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": 60,
                "aircraftArrivalTimeUTC": 90,
                "aircraftArrivalTimeDateDiffUTC": 1,
                "aircraftArrivalTimeLT": 1230,
                "aircraftArrivalTimeDateDiffLT": 0,
                "aircraftArrivalTimeVariation": -300
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8843/SN7232"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    },
    {
        "airline": "LH",
        "flightNumber": 405,
        "suffix": "",
        "periodOfOperationUTC": {
            "startDate": "05DEC19",
            "endDate": "10DEC19",
            "daysOfOperation": "12 4567"
        },
        "periodOfOperationLT": {
            "startDate": "04DEC19",
            "endDate": "09DEC19",
            "daysOfOperation": "1 34567"
        },
        "legs": [
            {
                "sequenceNumber": 1,
                "origin": "JFK",
                "destination": "FRA",
                "serviceType": "J",
                "aircraftOwner": "LH",
                "aircraftType": "346",
                "aircraftConfigurationVersion": "F8C56E28M189",
                "registration": "",
                "op": true,
                "aircraftDepartureTimeUTC": 200,
                "aircraftDepartureTimeDateDiffUTC": 0,
                "aircraftDepartureTimeLT": 1340,
                "aircraftDepartureTimeDateDiffLT": 0,
                "aircraftDepartureTimeVariation": -300,
                "aircraftArrivalTimeUTC": 650,
                "aircraftArrivalTimeDateDiffUTC": 0,
                "aircraftArrivalTimeLT": 710,
                "aircraftArrivalTimeDateDiffLT": 1,
                "aircraftArrivalTimeVariation": 60
            }
        ],
        "dataElements": [
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 10,
                "value": "UA8842/ET1617/SN7233/TG7701"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 98,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 99,
                "value": "1"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 106,
                "value": "FAJCDZPGENYBMUHQVWSTLK"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 109,
                "value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 504,
                "value": "S"
            },
            {
                "startLegSequenceNumber": 1,
                "endLegSequenceNumber": 1,
                "id": 505,
                "value": "ET"
            }
        ]
    }
]

[

{

"airline": "LH",

"flightNumber": 400,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "05DEC19",

"endDate": "05DEC19",

"daysOfOperation": "4"

},

"periodOfOperationLT": {

"startDate": "05DEC19",

"endDate": "05DEC19",

"daysOfOperation": "4"

},

"legs": [

{

"sequenceNumber": 1,

"origin": "FRA",

"destination": "JFK",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "74H",

"aircraftConfigurationVersion": "F8C80E32M244",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 590,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 650,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": 60,

"aircraftArrivalTimeUTC": 1120,

"aircraftArrivalTimeDateDiffUTC": 0,

"aircraftArrivalTimeLT": 820,

"aircraftArrivalTimeDateDiffLT": 0,

"aircraftArrivalTimeVariation": -300

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8841/ET1610/SN7230/TG7700"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

},

{

"airline": "LH",

"flightNumber": 400,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "06DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 567"

},

"periodOfOperationLT": {

"startDate": "06DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 567"

},

"legs": [

{

"sequenceNumber": 1,

"origin": "FRA",

"destination": "JFK",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "74H",

"aircraftConfigurationVersion": "F8C80E32M244",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 590,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 650,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": 60,

"aircraftArrivalTimeUTC": 1120,

"aircraftArrivalTimeDateDiffUTC": 0,

"aircraftArrivalTimeLT": 820,

"aircraftArrivalTimeDateDiffLT": 0,

"aircraftArrivalTimeVariation": -300

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8841/ET1610/SN7230/TG7700"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

},

{

"airline": "LH",

"flightNumber": 401,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "05DEC19",

"endDate": "05DEC19",

"daysOfOperation": "4"

},

"periodOfOperationLT": {

"startDate": "05DEC19",

"endDate": "05DEC19",

"daysOfOperation": "4"

},

"legs": [

{

"sequenceNumber": 1,

"origin": "JFK",

"destination": "FRA",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "74H",

"aircraftConfigurationVersion": "F8C80E32M244",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 1260,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 960,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": -300,

"aircraftArrivalTimeUTC": 270,

"aircraftArrivalTimeDateDiffUTC": 1,

"aircraftArrivalTimeLT": 330,

"aircraftArrivalTimeDateDiffLT": 1,

"aircraftArrivalTimeVariation": 60

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8840/SN7231"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

},

{

"airline": "LH",

"flightNumber": 401,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "06DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 567"

},

"periodOfOperationLT": {

"startDate": "06DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 567"

},

"legs": [

{

"sequenceNumber": 1,

"origin": "JFK",

"destination": "FRA",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "74H",

"aircraftConfigurationVersion": "F8C80E32M244",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 1260,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 960,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": -300,

"aircraftArrivalTimeUTC": 270,

"aircraftArrivalTimeDateDiffUTC": 1,

"aircraftArrivalTimeLT": 330,

"aircraftArrivalTimeDateDiffLT": 1,

"aircraftArrivalTimeVariation": 60

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8840/SN7231"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

},

{

"airline": "LH",

"flightNumber": 402,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "05DEC19",

"endDate": "06DEC19",

"daysOfOperation": "45 "

},

"periodOfOperationLT": {

"startDate": "05DEC19",

"endDate": "06DEC19",

"daysOfOperation": "45 "

},

"legs": [

{

"sequenceNumber": 1,

"origin": "FRA",

"destination": "EWR",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "74H",

"aircraftConfigurationVersion": "F8C80E32M244",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 755,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 815,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": 60,

"aircraftArrivalTimeUTC": 1275,

"aircraftArrivalTimeDateDiffUTC": 0,

"aircraftArrivalTimeLT": 975,

"aircraftArrivalTimeDateDiffLT": 0,

"aircraftArrivalTimeVariation": -300

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8839/AC9443"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "B"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

},

{

"airline": "LH",

"flightNumber": 402,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "07DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 67"

},

"periodOfOperationLT": {

"startDate": "07DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 67"

},

"legs": [

{

"sequenceNumber": 1,

"origin": "FRA",

"destination": "EWR",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "74H",

"aircraftConfigurationVersion": "F8C80E32M244",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 755,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 815,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": 60,

"aircraftArrivalTimeUTC": 1275,

"aircraftArrivalTimeDateDiffUTC": 0,

"aircraftArrivalTimeLT": 975,

"aircraftArrivalTimeDateDiffLT": 0,

"aircraftArrivalTimeVariation": -300

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8839/AC9443"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "B"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

},

{

"airline": "LH",

"flightNumber": 403,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "05DEC19",

"endDate": "06DEC19",

"daysOfOperation": "45 "

},

"periodOfOperationLT": {

"startDate": "05DEC19",

"endDate": "06DEC19",

"daysOfOperation": "45 "

},

"legs": [

{

"sequenceNumber": 1,

"origin": "EWR",

"destination": "FRA",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "74H",

"aircraftConfigurationVersion": "F8C80E32M244",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 1400,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 1100,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": -300,

"aircraftArrivalTimeUTC": 400,

"aircraftArrivalTimeDateDiffUTC": 1,

"aircraftArrivalTimeLT": 460,

"aircraftArrivalTimeDateDiffLT": 1,

"aircraftArrivalTimeVariation": 60

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8838/AC9444"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "B"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

},

{

"airline": "LH",

"flightNumber": 403,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "07DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 67"

},

"periodOfOperationLT": {

"startDate": "07DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 67"

},

"legs": [

{

"sequenceNumber": 1,

"origin": "EWR",

"destination": "FRA",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "74H",

"aircraftConfigurationVersion": "F8C80E32M244",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 1400,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 1100,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": -300,

"aircraftArrivalTimeUTC": 400,

"aircraftArrivalTimeDateDiffUTC": 1,

"aircraftArrivalTimeLT": 460,

"aircraftArrivalTimeDateDiffLT": 1,

"aircraftArrivalTimeVariation": 60

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8838/AC9444"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "B"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

},

{

"airline": "LH",

"flightNumber": 404,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "05DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 4567"

},

"periodOfOperationLT": {

"startDate": "05DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 4567"

},

"legs": [

{

"sequenceNumber": 1,

"origin": "FRA",

"destination": "JFK",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "346",

"aircraftConfigurationVersion": "F8C56E28M189",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 985,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 1045,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": 60,

"aircraftArrivalTimeUTC": 90,

"aircraftArrivalTimeDateDiffUTC": 1,

"aircraftArrivalTimeLT": 1230,

"aircraftArrivalTimeDateDiffLT": 0,

"aircraftArrivalTimeVariation": -300

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8843/SN7232"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

},

{

"airline": "LH",

"flightNumber": 405,

"suffix": "",

"periodOfOperationUTC": {

"startDate": "05DEC19",

"endDate": "10DEC19",

"daysOfOperation": "12 4567"

},

"periodOfOperationLT": {

"startDate": "04DEC19",

"endDate": "09DEC19",

"daysOfOperation": "1 34567"

},

"legs": [

{

"sequenceNumber": 1,

"origin": "JFK",

"destination": "FRA",

"serviceType": "J",

"aircraftOwner": "LH",

"aircraftType": "346",

"aircraftConfigurationVersion": "F8C56E28M189",

"registration": "",

"op": true,

"aircraftDepartureTimeUTC": 200,

"aircraftDepartureTimeDateDiffUTC": 0,

"aircraftDepartureTimeLT": 1340,

"aircraftDepartureTimeDateDiffLT": 0,

"aircraftDepartureTimeVariation": -300,

"aircraftArrivalTimeUTC": 650,

"aircraftArrivalTimeDateDiffUTC": 0,

"aircraftArrivalTimeLT": 710,

"aircraftArrivalTimeDateDiffLT": 1,

"aircraftArrivalTimeVariation": 60

}

],

"dataElements": [

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 10,

"value": "UA8842/ET1617/SN7233/TG7701"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 98,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 99,

"value": "1"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 106,

"value": "FAJCDZPGENYBMUHQVWSTLK"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 109,

"value": "FMM/AMM/JMM/CMM/DMM/ZMM/PMM/GMM/EMM/NMM/YMS/BMS/MMS/UMS/HMS/QMS/VMS/WMS/SMS/TMS/LMS/KMS"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 504,

"value": "S"

},

{

"startLegSequenceNumber": 1,

"endLegSequenceNumber": 1,

"id": 505,

"value": "ET"

}

]

}

]
