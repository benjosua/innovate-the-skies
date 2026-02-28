Title: Lufthansa Developer Center - Seat Maps

URL Source: https://developer.lufthansa.com/docs/read/api_details/offers/Seat_Maps

Markdown Content:
The _seatmaps_ resource describes the layout of an aircraft’s cabin. It provides characteristics of each seat and gives the location of other cabin items such as lavatories, gallies, stairs and exits.

You must specify the cabin class in the request. If more than one cabin class is required, multiple requests must be issued. Not all cabin classes are available on all flights; generally there will be "C" (Business) and "M" (Economy). Some flights also have "F" (First) and "E" (Premium Economy). The response contains an element _<SeatDisplay><CabinType><Code>_ which describes exactly which seat map has been returned. In addition, seat row numbers will not necessarily be returned consequtively (e.g. sometimes, rows 13 and/or 17 are missing, ...).

There is no method in the current version of the API to find which cabin classes are available on a given flight.

### Request URI

#### Code snippet: Call

```
GET /offers/seatmaps/{flightNumber}/{origin}/{destination}/{departureDate}/{cabinTypeCode}
```

| Variable | Description | Format |
| --- | --- | --- |
| _{flightNumber}_ | The flight number, including carrier code and any suffix. | e.g. LH200, BA400X. |
| _{origin}_ | The departure airport. | 3-letter IATA code, e.g. “FRA”. |
| _{destination}_ | The arrival airport. | 3-letter IATA code, e.g. "JFK". |
| _{departureDate}_ | The departure date in the local time of the departure airport. | yyyy-MM-dd. |
| _{cabinClass}_ | Return the seat map for this cabin class. Not every cabin class is available on every flight. The most common values are: 'F' (First), 'C' (Business), 'E' (Premium Economy) and 'M' (Economy). | Single-character IATA PADIS 9800 reservation booking designator. |

### Request Examples

#### Code snippet: Call

```
GET /offers/seatmaps/LH400/FRA/JFK/2019-07-15/C
GET /offers/seatmaps/LH400/FRA/JFK/2019-07-15/F
```

### Response Structure Definition

| Key | Description |
| --- | --- |
| SeatAvailabilityResource | Root element of the seat map response. |
| .Flights | Flights container. There will only be one flight in a seat map response. |
| ..Flight[] | Details of the flight. |
| ...Departure | Details of the origin. |
| ....AirportCode | 3-letter IATA code of the origin airport. |
| ....ScheduledTimeLocal | Scheduled local time of departure from origin. |
| .....DateTime | Scheduled time of departure: Format: yyyy-MM-ddTHH:mm. Sample: 2014-11-15T10:50. | Key | Description | | --- | --- | | 2014 | year | | 11 | month of the year, always two digit | | 15 | day of month, always 2 digits | | T | indicating time follows after | | 10 | hour in 24 hrs format | | 50 | minutes of the hour | |
| ...Arrival | Details of the destination. |
| ....AirportCode | 3-letter IATA code of the destination airport. |
| ...MarketingCarrier | Marketing-specific flight details, may differ from operating carrier details. |
| ....AirlineID | 2-letter IATA airline code. |
| ....FlightNumber | Flight number. |
| ...Equipment | Type of aircraft operating this flight. |
| ....AircraftCode | 3-character IATA aircraft code. |
| .CabinLayout | Describes key elements of the cabin layout such as the position of the wing or the location of exits. |
| ..WingPosition | Which rows are above the aircraft’s wings. |
| ...Rows | Grouping first and last row of where the wing is positioned. |
| ....First | Number of first row over wing. |
| ....Last | Number of last row over wing. |
| ...ExitRowPosition[] | Which are the exit rows. |
| ...Rows | Grouping first and last row of where an exit is positioned. |
| ....First | Number of first row where this exit is positioned. |
| ....Last | Number of last row where this exit is positioned. |
| .SeatDisplay[] | Specifying the grid of the cabin type: number of columns and number of rows. |
| ..Columns[] | One item per column. |
| @Positions | Assigning the ‘name’ of the column such as column ‘A’, column ‘C’, etc. |
| ...Rows | Grouping all rows of this cabin layout i.e. all rows of cabin class ‘First’ or ‘Business’ etc. |
| ....First | Number of first row of this cabin. |
| ....Last | Number of last row of this cabin. |
| ...Component | Defining non-seat components of a cabin in relation to one specific row. NOTE: if a component definition shows up more than once with the same row number it is to be read as follows: First component with relation R (rear) to row 44 is located behind row 44. Second component with relation R (rear) to row 44 is located behind the first component that is located behind row 44..... and so on. |
| ....Locations | Grouping the locations. |
| .....Location[] | Exact location of a component. Example: Galley at row ‘86’ at center section. |
| ......Row | Defines the one row which this component’s location is related to. Example: the component maybe in front of this row. |
| .......Position | Actual row number which this component’s location is related to and which the orientation is referring to. |
| .......Orientation | Defining the relation to the row number. |
| ........Code | One letter code qualifying the row location, for list of all codes refer to following list: IATA PADIS 9976. Example: ‘F’ for front. This means the component that is specified here is found in front of row given in row.position. ‘R’ would say the component is located rear i.e. behind the row specified in row .position. |
| ......Column | Defining the column where the component is located. |
| .......Position | Giving the position of the column. NOTE: the position code is NOT the name of the column as specified in SeatDisplay.Columns@Position! It is a more generic name. |
| ........Code | One or two letter code specifying the location where on this row this component is located, for list of all codes refer to following list: IATA PADIS 3227. NOTE: only the following codes will be seen here: ‘C’ for Center Section ‘L’ for Left side section ‘LC’ for Left center section ‘R’ for Right side section ‘RC’ for Right center section |
| ......Type | Specifying the type of component at this location. |
| .......Code | One, two or three letter code specifying the cabin facilities characteristics i.e. component type, for list of all codes refer to following list: IATA PADIS 9978. Example: ‘G’ for Galley, ‘LA’ for Lavatory. |
| ...CabinType | Specifying the type of cabin. |
| ....Code | One letter code specifying the cabin type, for list of all codes refer to following list: IATA PADIS 9800. Example: ‘F’ for first class, ‘C’ for Business class. |
| .SeatDetails[] | Holds all characteristics of one seat at a defined location. Example: Seat at column ‘A’; row ‘22’. |
| ..Location | Element specifying the seat location: what column, what row. |
| ...Column | Name of the column. Is a value of SeatDisplay.Columns found in this response. |
| ...Row | Describing the seat details. |
| ....Number | Number of the row, together with the column value this defines one and only one seat. |
| ....Characteristics | List of all characteristics of a seat. |
| .....Characteristic[] | Such a characteristic comprises of column characteristics and seat characteristics. |
| ......Code | One or two letter code specifying the column characteristic, for list of all codes refer to following list: IATA PADIS 9882. Example: ‘9’ for ‘Center seat (not window, not aisle)’ OR One or two letter code specifying the seat characteristic, for list of all codes refer to following list: IATA PADIS 9825. Example: ‘W’ for ‘Window seat’; ‘UP’ for ‘Upper Deck’. |
| ....Type | Specifies the type of a complete row hence the elements column, availability, characteristics are obsolete. |
| .....Code | One letter code specifying the row characteristics, for list of all codes refer to following list: IATA PADIS 9864. Example: ‘Z’ for ‘row does not exist’. |
| .Meta | Element containing meta data. |
| ..Link[] | Element specifying links. |
| @Href | Link to actual a resource. |
| @Rel | Specifying kind of link such as ‘self’ (link that returned this response), ‘alternate’ (link that points to another resource) or ‘related’ (link that points to related resource). |

### Characteristic codes

| Carrier | Code | Text | Characteristic Type |
| --- | --- | --- | --- |
| LH | 1 | Restricted seat - General | Seat characteristic |
| LH | 1A | Seat not allowed for infant | Seat characteristic |
| LH | 1D | Restricted recline seat | Seat characteristic |
| LH | 1W | Window seat without window | Seat characteristic |
| LH | 8 | No seat at this location | Seat characteristic |
| LH | 9 | Center seat (not window, not aisle) | Seat characteristic |
| LH | A | Aisle seat | Seat characteristic |
| LH | B | Seat with bassinet facility | Seat characteristic |
| LH | BC | Business Class Bed Seat | Seat characteristic |
| LH | E | Exit row seat | Seat characteristic |
| LH | EP | Economy Plus Seat | Seat characteristic |
| LH | ES | Economy Seat | Seat characteristic |
| LH | H | Seat with facilities for handicapped/incapacitated passenger | Seat characteristic |
| LH | I | Seat suitable for adult with an infant | Seat characteristic |
| LH | IE | Seat not suitable for child | Seat characteristic |
| LH | JP | Jump Seat | Seat characteristic |
| LH | K | Bulkhead seat | Seat characteristic |
| LH | L | Leg space seat | Seat characteristic |
| LH | LS | Left side of aircraft | Seat characteristic |
| LH | O | Preferential seat | Seat characteristic |
| LH | OW | Overwing seat(s) | Seat characteristic |
| LH | Q | Seat in a quiet zone | Seat characteristic |
| LH | RS | Right side of aircraft | Seat characteristic |
| LH | UP | Upper deck | Seat characteristic |
| LH | W | Window seat | Seat characteristic |
| LH | WA | Window and Aisle together | Seat characteristic |
| LH | Z | Buffer zone seat | Seat characteristic |
|  |  |  |  |
| LH | F | Front, precedes first row number within cabin class/compartment. | Component row location |
| LH | M | Middle, between row numbers within a cabin class/compartment | Component row location |
| LH | R | Rear, follows last row number within cabin class/compartment | Component row location |
|  |  |  |  |
| LH | C | Center Section | Component column location |
| LH | L | Left side section | Component column location |
| LH | LC | Left center section | Component column location |
| LH | R | Right side section | Component column location |
| LH | RC | Right center section | Component column location |
|  |  |  |  |
| LH | AR | Airphone | Component characteristic |
| LH | BA | Bar | Component characteristic |
| LH | BK | Bulkhead | Component characteristic |
| LH | CL | Closet | Component characteristic |
| LH | D | Exit Door | Component characteristic |
| LH | E | Emergency Exit | Component characteristic |
| LH | G | Galley | Component characteristic |
| LH | LA | Lavatory | Component characteristic |
| LH | LG | Luggage Storage | Component characteristic |
| LH | MV | Movie Screen | Component characteristic |
| LH | SO | Storage Space | Component characteristic |
| LH | ST | Stairs to upper deck | Component characteristic |
| LH | TA | Table | Component characteristic |

| Characteristic Type | Maps to ... |
| --- | --- |
| Seat characteristic | <SeatDetails><Location><Row><Characteristics><Characteristic><Code> |
| Component row location | <SeatDisplay><Component><Locations><Location><Row><Orientation><Code> relative to <SeatDisplay><Component><Locations><Location><Row><Position> |
| Component column location | <SeatDisplay><Component><Locations><Location><Column><Position><Code> |
| Component characteristic | <SeatDisplay><Component><Locations><Location><Type><Code> |

### Response Example

```
<?xml version="1.0" encoding="UTF-8"?>
<SeatAvailabilityResource>
  <Flights>
    <Flight>
      <Departure>
        <AirportCode>FRA</AirportCode>
        <ScheduledTimeLocal>
          <DateTime>2015-04-24T10:50</DateTime>
        </ScheduledTimeLocal>
      </Departure>
      <Arrival>
        <AirportCode>JFK</AirportCode>
      </Arrival>
      <MarketingCarrier>
        <AirlineID>LH</AirlineID>
        <FlightNumber>0400</FlightNumber>
      </MarketingCarrier>
      <Equipment>
        <AircraftCode>388</AircraftCode>
      </Equipment>
    </Flight>
  </Flights>
  <CabinLayout>
    <WingPosition>
      <Rows>
        <First>61</First>
        <Last>79</Last>
      </Rows>
    </WingPosition>
    <ExitRowPosition>
      <Rows>
        <First>75</First>
        <Last>76</Last>
      </Rows>
    </ExitRowPosition>
  </CabinLayout>
  <SeatDisplay>
    <Rows>
      <First>60</First>
      <Last>94</Last>
    </Rows>
    <Component>
      <Locations>
        <Location>
          <Row>
            <Position>60</Position>
            <Orientation>
              <Code>F</Code>
            </Orientation>
          </Row>
          <Column>
            <Position>
              <Code>L</Code>
            </Position>
          </Column>
          <Type>
            <Code>G</Code>
          </Type>
        </Location>
        <Location>
          <Row>
            <Position>60</Position>
            <Orientation>
              <Code>F</Code>
            </Orientation>
          </Row>
          <Column>
            <Position>
              <Code>L</Code>
            </Position>
          </Column>
          <Type>
            <Code>G</Code>
          </Type>
        </Location>
        ...
      </Locations>
    </Component>
    ...
    <CabinType>
      <Code>M</Code>
    </CabinType>
  </SeatDisplay>
  <SeatDisplay>
    ...
  </SeatDisplay>
  <SeatDetails>
    <Location>
      <Column>A</Column>
      <Row>
        <Number>60</Number>
        <Characteristics>
          <Characteristic>
            <Code>W</Code>
          </Characteristic>
          <Characteristic>
            <Code>B</Code>
          </Characteristic>
          <Characteristic>
            <Code>LS</Code>
          </Characteristic>
        </Characteristics>
      </Row>
    </Location>
  </SeatDetails>
  <SeatDetails>
    <Location>
      <Column>B</Column>
      <Row>
        <Number>60</Number>
        <Characteristics>
          <Characteristic>
            <Code>9</Code>
          </Characteristic>
          <Characteristic>
            <Code>I</Code>
          </Characteristic>
          <Characteristic>
           <Code>LS</Code>
          </Characteristic>
        </Characteristics>
      </Row>
    </Location>
  </SeatDetails>
  ...
  <Meta Version="1.0.0">
    <Link Href="https://api.lufthansa.com/v1/offers/seatmaps/LH400/FRA/JFK/2019-07-15/F" Rel="self"/>
    <Link Href="https://api-test.lufthansa.com/v1/mds-references/airports/{airportCode}" Rel="related"/>
  </Meta>
</SeatAvailabilityResource>
```
