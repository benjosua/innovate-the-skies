Title: Lufthansa Developer Center - Airports

URL Source: https://developer.lufthansa.com/docs/read/api_details/reference_data/Airports

Markdown Content:
Retrieves the complete details of one particular airport or list of airports and supports multiple languages whereever its applicable and available.

This resource contains the name, code and GPS location of each airport.

### Request URIs

#### Code snippet: Call

```
GET /mds-references/airports[?LHoperated=1]
GET /mds-references/airports/{airportCode}[?lang={languageCode}]
GET /mds-references/airports[?limit={recordLimit}][&][offset={recordOffset}]
```

| Variable | Description | Format |
| --- | --- | --- |
| _{airportCode}_ | Optionally return only this airport. | 3-letter IATA airport code, e.g. “TXL”. |
| _{languageCode}_ | Optionally return the airport name in only this language. | 2-letter ISO 639-1 language code, e.g. “EN”. |
| _{recordLimit}_ | Optionally sets the number of records returned. Defaults to 20, maximum is 100. | integer, e, g, 44 |
| _{recordOffset}_ | Optionally sets the number of records skipped when sorting response records alphabetically. Defaults to 0. | integer, e.g. 123 |
| LHoperated | Optionally If set to 1, only locations with flights operated by Lufthansa will be returned. | boolean e.g. 0 |
| group | Optionally restrict the results to locations with flights operated by group. | enum: {MilesAndMore,LHOperated,AllAirports} |

### Request Examples

#### Code snippet: Call

```
GET /mds-references/airports
GET /mds-references/airports?LHoperated=1
GET /mds-references/airports/TXL
GET /mds-references/airports/TXL?lang=DE
GET /mds-references/airports?limit=44&offset=123
```

### Response Structure Definition

| Key | Description |
| --- | --- |
| AirportResource | Root element of airport response. |
| .Airports | Container for airport elements. |
| ..Airport[] | Array of all available airports or one airport matching the request. |
| ...AirportCode | 3-letter IATA airport code, e.g. “TXL”. |
| ...Position | Physical location of an airport. This data section is optional and therefore not always present. |
| ....Coordinate | Container for coordinates. |
| .....Latitude | Decimal latitude. Range: -90 (South Pole) to +90 (North Pole), e.g. “51.540”. |
| .....Longitude | Decimal longitude. Range: -180 (West of Prime Meridian) to +180 (East of Prime Meridian). |
| ...CityCode | 3-letter IATA city code, e.g. “BER”. |
| ...CountryCode | 2-letter ISO 3166-1 country code, e.g. “DE”. |
| ...LocationType | “Airport”, “RailwayStation” or "BusStation". |
| ...Names | Container for airport names. |
| ....Name[] | Array: language specific full name of airport. |
| @LanguageCode | 2-letter ISO 639-1 language code for the corresponding item. |
| ...UtcOffset | Hour offset of airport to UTC time zone |
| ...TimeZoneId | Time zone name airport is in |
| .Meta | Container for meta links. |
| ..Link[] | Array: links to resource itself and other related resources. |
| @Href | Link to actual a resource. |
| @Rel | Specifying kind of link such as ‘self’ (link that returned this response), ‘alternate’ (link that points to another resource) or ‘related’ (link that points to related resource). |

### Response Examples

```
<?xml version="1.0" encoding="UTF-8"?>
<AirportResource>
    <Airports>
        <Airport>
            <AirportCode>TXL</AirportCode>
            <Position>
                <Coordinate>
                    <Latitude>52.5597</Latitude>
                    <Longitude>13.2878</Longitude>
                </Coordinate>
            </Position>
            <CityCode>BER</CityCode>
            <CountryCode>DE</CountryCode>
            <LocationType>Airport</LocationType>
            <Names>
                <Name LanguageCode="EN">Berlin</Name>
            </Names>
            <UtcOffset>+01:00</UtcOffset>
            <TimeZoneId>Europe/Berlin</TimeZoneId>
        </Airport>
    </Airports>
    <Meta Version="1.0.0">
        <Link Href="https://api.lufthansa.com/v1/mds-references/airports/TXL" Rel="self"/>
        <Link Href="https://api.lufthansa.com/v1/references/cities/BER" Rel="related"/>
        <Link Href="https://api.lufthansa.com/v1/references/countries/DE" Rel="related"/>
        <Link Href="http://travelguide.lufthansa.com/de/de/berlin/TXL" Rel="alternate"/>
        <Link Href="http://travelguide.lufthansa.com/de/en/berlin/TXL" Rel="alternate"/>
        <Link Href="http://travelguide.lufthansa.com/de/cn/berlin/TXL" Rel="alternate"/>
        <Link Href="http://travelguide.lufthansa.com/de/es/berlin/TXL" Rel="alternate"/>
        <Link Href="http://travelguide.lufthansa.com/de/fr/berlin/TXL" Rel="alternate"/>
        <Link Href="http://travelguide.lufthansa.com/de/it/berlino/TXL" Rel="alternate"/>
        <Link Href="http://travelguide.lufthansa.com/de/pt/berlim/TXL" Rel="alternate"/>
    </Meta>
</AirportResource>
```
&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;AirportResource&gt; &lt;Airports&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAA&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;-17.3525&lt;/Latitude&gt; &lt;Longitude&gt;-145.51&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAA&lt;/CityCode&gt; &lt;CountryCode&gt;PF&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="DE"&gt;Anaa&lt;/Name&gt; &lt;Name LanguageCode="EL"&gt;Αναά&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Anaa&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Anaa&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Anaa&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Anaa&lt;/Name&gt; &lt;Name LanguageCode="TR"&gt;Anaa&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;-10:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Pacific/Tahiti&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAB&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;-26.6911&lt;/Latitude&gt; &lt;Longitude&gt;141.0472&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAB&lt;/CityCode&gt; &lt;CountryCode&gt;AU&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="DE"&gt;Arrabury&lt;/Name&gt; &lt;Name LanguageCode="EL"&gt;Αραμπέρι&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Arrabury&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Arrabury&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Arrabury&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Arrabury&lt;/Name&gt; &lt;Name LanguageCode="TR"&gt;Arrabury&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+10:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Australia/Brisbane&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAC&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;31.0733&lt;/Latitude&gt; &lt;Longitude&gt;33.8358&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAC&lt;/CityCode&gt; &lt;CountryCode&gt;EG&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="EN"&gt;El Arish International&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+02:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Africa/Cairo&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAD&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;6.0961&lt;/Latitude&gt; &lt;Longitude&gt;46.6375&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAD&lt;/CityCode&gt; &lt;CountryCode&gt;SO&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="EN"&gt;Adado&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+03:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Africa/Mogadishu&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAE&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;36.8222&lt;/Latitude&gt; &lt;Longitude&gt;7.8092&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAE&lt;/CityCode&gt; &lt;CountryCode&gt;DZ&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="EN"&gt;Annaba Rabah Bitat&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+01:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Africa/Algiers&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAF&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;29.7333&lt;/Latitude&gt; &lt;Longitude&gt;-85.0333&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAF&lt;/CityCode&gt; &lt;CountryCode&gt;US&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="EN"&gt;Apalachicola Regional&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;-05:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;America/New_York&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAG&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;-24.1036&lt;/Latitude&gt; &lt;Longitude&gt;-49.79&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAG&lt;/CityCode&gt; &lt;CountryCode&gt;BR&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="EN"&gt;Arapoti Avelino Vieira&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;-03:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;America/Araguaina&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAH&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;50.8231&lt;/Latitude&gt; &lt;Longitude&gt;6.1864&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAH&lt;/CityCode&gt; &lt;CountryCode&gt;DE&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="EN"&gt;Aachen Merzbrueck&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+01:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Europe/Berlin&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAI&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;-12.9167&lt;/Latitude&gt; &lt;Longitude&gt;-46.9333&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAI&lt;/CityCode&gt; &lt;CountryCode&gt;BR&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="DE"&gt;Arraias&lt;/Name&gt; &lt;Name LanguageCode="EL"&gt;Αράϊας&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Arraias&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Arraias&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Arraias&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Arraias&lt;/Name&gt; &lt;Name LanguageCode="TR"&gt;Arraias&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;-03:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;America/Araguaina&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAJ&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;3.9&lt;/Latitude&gt; &lt;Longitude&gt;-55.3667&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAJ&lt;/CityCode&gt; &lt;CountryCode&gt;SR&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="EN"&gt;Awaradam Cajana&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;-03:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;America/Paramaribo&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAK&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;0.1853&lt;/Latitude&gt; &lt;Longitude&gt;173.6369&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAK&lt;/CityCode&gt; &lt;CountryCode&gt;KI&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="DE"&gt;Aranuka&lt;/Name&gt; &lt;Name LanguageCode="EL"&gt;Αρανούκα&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Aranuka&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Aranuka&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Aranuka&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Aranuka&lt;/Name&gt; &lt;Name LanguageCode="TR"&gt;Aranuka&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+12:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Pacific/Tarawa&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAL&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;57.0928&lt;/Latitude&gt; &lt;Longitude&gt;9.8492&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAL&lt;/CityCode&gt; &lt;CountryCode&gt;DK&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="BG"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="CS"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="DE"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="HU"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="JA"&gt;オールボア&lt;/Name&gt; &lt;Name LanguageCode="KA"&gt;奧爾堡&lt;/Name&gt; &lt;Name LanguageCode="KR"&gt;올보르그&lt;/Name&gt; &lt;Name LanguageCode="PL"&gt;Aalbork&lt;/Name&gt; &lt;Name LanguageCode="PT"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="RO"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="RU"&gt;Ольборг&lt;/Name&gt; &lt;Name LanguageCode="SV"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="UK"&gt;Aalborg&lt;/Name&gt; &lt;Name LanguageCode="ZH"&gt;奥尔堡&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+01:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Europe/Copenhagen&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAM&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;-24.8181&lt;/Latitude&gt; &lt;Longitude&gt;31.5447&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAM&lt;/CityCode&gt; &lt;CountryCode&gt;ZA&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="DE"&gt;Mala Mala&lt;/Name&gt; &lt;Name LanguageCode="EL"&gt;Μάλα Μάλα&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Mala Mala&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Mala Mala&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Mala Mala&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Mala Mala&lt;/Name&gt; &lt;Name LanguageCode="TR"&gt;Mala Mala&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+02:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Africa/Johannesburg&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAN&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;24.2617&lt;/Latitude&gt; &lt;Longitude&gt;55.6092&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAN&lt;/CityCode&gt; &lt;CountryCode&gt;AE&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="EN"&gt;Al Ain International&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+04:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Asia/Dubai&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAO&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;9.4167&lt;/Latitude&gt; &lt;Longitude&gt;-64.4667&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAO&lt;/CityCode&gt; &lt;CountryCode&gt;VE&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="DE"&gt;Anaco&lt;/Name&gt; &lt;Name LanguageCode="EL"&gt;Ανάκο&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Anaco&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Anaco&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Anaco&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Anaco&lt;/Name&gt; &lt;Name LanguageCode="TR"&gt;Anaco&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;-04:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;America/Caracas&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAP&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;-0.3731&lt;/Latitude&gt; &lt;Longitude&gt;117.2508&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;SRI&lt;/CityCode&gt; &lt;CountryCode&gt;ID&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="EN"&gt;Samarinda Ap Tumenggung&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+08:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Asia/Makassar&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAQ&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;45.0022&lt;/Latitude&gt; &lt;Longitude&gt;37.3472&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAQ&lt;/CityCode&gt; &lt;CountryCode&gt;RU&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="BG"&gt;Anapa&lt;/Name&gt; &lt;Name LanguageCode="CS"&gt;Anapa&lt;/Name&gt; &lt;Name LanguageCode="DE"&gt;Anapa&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Anapa&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Anapa&lt;/Name&gt; &lt;Name LanguageCode="HU"&gt;Anapa&lt;/Name&gt; &lt;Name LanguageCode="RO"&gt;Anapa&lt;/Name&gt; &lt;Name LanguageCode="SV"&gt;Anapa&lt;/Name&gt; &lt;Name LanguageCode="UK"&gt;Anapa&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+03:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Europe/Moscow&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAR&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;56.3039&lt;/Latitude&gt; &lt;Longitude&gt;10.6194&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAR&lt;/CityCode&gt; &lt;CountryCode&gt;DK&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="BG"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="CS"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="DE"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="HU"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="JA"&gt;オールフス&lt;/Name&gt; &lt;Name LanguageCode="KA"&gt;奧胡斯&lt;/Name&gt; &lt;Name LanguageCode="KR"&gt;오르후스&lt;/Name&gt; &lt;Name LanguageCode="PL"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="PT"&gt;Arhus&lt;/Name&gt; &lt;Name LanguageCode="RO"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="RU"&gt;Орхус&lt;/Name&gt; &lt;Name LanguageCode="SV"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="UK"&gt;Aarhus&lt;/Name&gt; &lt;Name LanguageCode="ZH"&gt;奥胡斯&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+01:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Europe/Copenhagen&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAS&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;-3.9167&lt;/Latitude&gt; &lt;Longitude&gt;139.25&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAS&lt;/CityCode&gt; &lt;CountryCode&gt;ID&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="DE"&gt;Apalapsili&lt;/Name&gt; &lt;Name LanguageCode="EL"&gt;Απαλαψίλι&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Apalapsili&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Apalapsili&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Apalapsili&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Apalapsili&lt;/Name&gt; &lt;Name LanguageCode="TR"&gt;Apalapsili&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+09:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Asia/Jayapura&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;Airport&gt; &lt;AirportCode&gt;AAT&lt;/AirportCode&gt; &lt;Position&gt; &lt;Coordinate&gt; &lt;Latitude&gt;47.7506&lt;/Latitude&gt; &lt;Longitude&gt;88.0858&lt;/Longitude&gt; &lt;/Coordinate&gt; &lt;/Position&gt; &lt;CityCode&gt;AAT&lt;/CityCode&gt; &lt;CountryCode&gt;CN&lt;/CountryCode&gt; &lt;LocationType&gt;Airport&lt;/LocationType&gt; &lt;Names&gt; &lt;Name LanguageCode="DE"&gt;Altay&lt;/Name&gt; &lt;Name LanguageCode="EL"&gt;Αλτάϊ&lt;/Name&gt; &lt;Name LanguageCode="EN"&gt;Altay&lt;/Name&gt; &lt;Name LanguageCode="ES"&gt;Altay&lt;/Name&gt; &lt;Name LanguageCode="FR"&gt;Altay&lt;/Name&gt; &lt;Name LanguageCode="IT"&gt;Altay&lt;/Name&gt; &lt;Name LanguageCode="TR"&gt;Altay&lt;/Name&gt; &lt;/Names&gt; &lt;UtcOffset&gt;+08:00&lt;/UtcOffset&gt; &lt;TimeZoneId&gt;Asia/Urumqi&lt;/TimeZoneId&gt; &lt;/Airport&gt; &lt;/Airports&gt; &lt;Meta Version="1.0.0"&gt; &lt;Link Href="https://api.lufthansa.com/v1/mds-references/airports" Rel="self"/&gt; &lt;Link Href="https://api.lufthansa.com/v1/mds-references/airports?offset=20&amp;amp;limit=20" Rel="next"/&gt; &lt;Link Href="https://api.lufthansa.com/v1/mds-references/airports?offset=11620&amp;amp;limit=20" Rel="last"/&gt; &lt;Link Href="https://api.lufthansa.com/v1/references/cities/{cityCode}" Rel="related"/&gt; &lt;Link Href="https://api.lufthansa.com/v1/references/countries/{countryCode}" Rel="related"/&gt; &lt;TotalCount&gt;11640&lt;/TotalCount&gt; &lt;/Meta&gt;&lt;/AirportResource&gt;

<?xml version="1.0" encoding="UTF-8"?>

<AirportResource>

<Airports>

<Airport>

<AirportCode>TXL</AirportCode>

<Position>

<Coordinate>

<Latitude>52.5597</Latitude>

<Longitude>13.2878</Longitude>

</Coordinate>

</Position>

<CityCode>BER</CityCode>

<CountryCode>DE</CountryCode>

<LocationType>Airport</LocationType>

<Names>

<Name LanguageCode="EN">Berlin</Name>

</Names>

<UtcOffset>+01:00</UtcOffset>

<TimeZoneId>Europe/Berlin</TimeZoneId>

</Airport>

</Airports>

<Meta Version="1.0.0">

<Link Href="https://api.lufthansa.com/v1/mds-references/airports/TXL" Rel="self"/>

<Link Href="https://api.lufthansa.com/v1/references/cities/BER" Rel="related"/>

<Link Href="https://api.lufthansa.com/v1/references/countries/DE" Rel="related"/>

<Link Href="http://travelguide.lufthansa.com/de/de/berlin/TXL" Rel="alternate"/>

<Link Href="http://travelguide.lufthansa.com/de/en/berlin/TXL" Rel="alternate"/>

<Link Href="http://travelguide.lufthansa.com/de/cn/berlin/TXL" Rel="alternate"/>

<Link Href="http://travelguide.lufthansa.com/de/es/berlin/TXL" Rel="alternate"/>

<Link Href="http://travelguide.lufthansa.com/de/fr/berlin/TXL" Rel="alternate"/>

<Link Href="http://travelguide.lufthansa.com/de/it/berlino/TXL" Rel="alternate"/>

<Link Href="http://travelguide.lufthansa.com/de/pt/berlim/TXL" Rel="alternate"/>

</Meta>

</AirportResource>

version 53 as of 4 years ago by Marcus Wagner
