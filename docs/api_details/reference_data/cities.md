Title: Lufthansa Developer Center - Cities

URL Source: https://developer.lufthansa.com/docs/read/api_details/reference_data/Cities

Markdown Content:
Retrieves the complete details of one particular city or list of cities and supports multiple languages whereever its applicable and available.

The resource contains city name(s), country code(s) and local airport(s).

### Request URIs

#### Code snippet: Call

```
GET /mds-references/cities
GET /mds-references/cities/{cityCode}[?lang={languageCode}]
GET /mds-references/cities[?limit={recordLimit}][&][offset={recordOffset}]
```

| Variable | Description | Format |
| --- | --- | --- |
| _{cityCode}_ | Optionally return only this city. | 3-letter IATA city code, e.g. “FRA” |
| _{languageCode}_ | Optionally return the city name in only this language. If not present, all languages will be in the response. | 2-letter ISO 639-1 language code, e.g. “EN” |
| _recordLimit_ | Optionally sets the number of records returned. Defaults to 20, maximum is 100. | integer, e.g 44 |
| _recordOffset_ | Optionally sets the number of records skipped when sorting response records alphabetically. Defaults to 0. | integer, e.g 123 |

### Request Examples

#### Code snippet: Call

```
GET /mds-references/cities
GET /mds-references/cities/NYC 
GET /mds-references/cities/NYC?lang=DE
GET /mds-references/cities?limit=44&offset=123
```

### Response Structure Definition

| Key | Description |
| --- | --- |
| CityResource | Root element of city response. |
| .Cities | Container for city elements. |
| ..City[] | Array of all available cities or one city matching the request. |
| ...CityCode | 3-letter IATA city code, e.g. “FRA”. |
| ...CountryCode | 2-letter ISO 3166-1 country code, e.g. “DE”. |
| ...Names | Container for city full names. |
| ....Name[] | Array: language-specific full name of city. |
| ...UtcOffset | UTC Offset value. |
| ...TimeZoneId | Time zone of city. |
| @LanguageCode | 2-letter ISO 639-1 language code for the corresponding item. |
| ...Airports | Container for airport IATA codes. |
| ....AirportCode[] | Array: 3-letter IATA airport codes of airports within the city, e.g. “LCY”, “LHR” and “STN” for city of London. |
| .Meta | Container for meta links. |
| ..Link[] |  |
| @Href | Link to actual a resource. |
| @Rel | Specifying kind of link such as ‘self’ (link that returned this response), ‘alternate’ (link that points to another resource) or ‘related’ (link that points to related resource). |

### Response Examples

#### Code snippet: XML

```
<?xml version="1.0" encoding="UTF-8"?>
<CityResource>
    <Cities>
        <City>
            <CityCode>NYC</CityCode>
            <CountryCode>US</CountryCode>
            <Names>
                <Name LanguageCode="DE">New York</Name>
                <Name LanguageCode="EL">Νέα Υόρκη</Name>
                <Name LanguageCode="EN">New York</Name>
                <Name LanguageCode="ES">Nueva York</Name>
                <Name LanguageCode="FR">New York</Name>
                <Name LanguageCode="IT">New York</Name>
                <Name LanguageCode="JA">ニューヨーク</Name>
                <Name LanguageCode="KO">뉴욕</Name>
                <Name LanguageCode="PL">Nowy Jork</Name>
                <Name LanguageCode="PT">Nova Iorque</Name>
                <Name LanguageCode="RU">Нью-Йорк</Name>
                <Name LanguageCode="TR">New York</Name>
                <Name LanguageCode="ZH">紐約</Name>
            </Names>
            <UtcOffset>-05:00</UtcOffset>
            <TimeZoneId>America/New_York</TimeZoneId>
            <Airports>
                <AirportCode>EWR</AirportCode>
                <AirportCode>FLU</AirportCode>
                <AirportCode>JFK</AirportCode>
                <AirportCode>JRA</AirportCode>
                <AirportCode>JRB</AirportCode>
                <AirportCode>JRE</AirportCode>
                <AirportCode>LGA</AirportCode>
                <AirportCode>NBP</AirportCode>
                <AirportCode>NES</AirportCode>
                <AirportCode>NWS</AirportCode>
                <AirportCode>NYS</AirportCode>
                <AirportCode>SWF</AirportCode>
                <AirportCode>TSS</AirportCode>
                <AirportCode>WTC</AirportCode>
                <AirportCode>XNY</AirportCode>
                <AirportCode>ZME</AirportCode>
                <AirportCode>ZRP</AirportCode>
                <AirportCode>ZYP</AirportCode>
            </Airports>
        </City>
    </Cities>
    <Meta Version="1.0.0">
        <Link Href="https://api.lufthansa.com/v1/mds-references/cities/NYC" Rel="self"/>
        <Link Href="https://api.lufthansa.com/v1/references/countries/US" Rel="related"/>
        <Link Href="https://api.lufthansa.com/v1/references/airports/{airportCode}" Rel="related"/>
        <Link Href="http://travelguide.lufthansa.com/de/de/new-york-city/" Rel="alternate"/>
        <Link Href="http://travelguide.lufthansa.com/de/en/new-york-city/" Rel="alternate"/>
        <Link Href="http://travelguide.lufthansa.com/de/fr/new-york-city/" Rel="alternate"/>
        <Link Href="http://travelguide.lufthansa.com/de/it/new-york-city/" Rel="alternate"/>
    </Meta>
</CityResource>
```

```
<?xml version="1.0" encoding="UTF-8"?>
<CityResource>
    <Cities>
        <City>
            <CityCode>AAA</CityCode>
            <CountryCode>PF</CountryCode>
            <Names>
                <Name LanguageCode="EN">Anaa</Name>
            </Names>
            <UtcOffset>-10:00</UtcOffset>
            <TimeZoneId>Pacific/Tahiti</TimeZoneId>
            <Airports>
                <AirportCode>AAA</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAB</CityCode>
            <CountryCode>AU</CountryCode>
            <Names>
                <Name LanguageCode="EN">Arrabury</Name>
            </Names>
            <UtcOffset>+10:00</UtcOffset>
            <TimeZoneId>Australia/Brisbane</TimeZoneId>
            <Airports>
                <AirportCode>AAB</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAC</CityCode>
            <CountryCode>EG</CountryCode>
            <Names>
                <Name LanguageCode="EN">El Arish</Name>
            </Names>
            <UtcOffset>+02:00</UtcOffset>
            <TimeZoneId>Africa/Cairo</TimeZoneId>
            <Airports>
                <AirportCode>AAC</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAD</CityCode>
            <CountryCode>SO</CountryCode>
            <Names>
                <Name LanguageCode="EN">Adado</Name>
            </Names>
            <UtcOffset>+03:00</UtcOffset>
            <TimeZoneId>Africa/Mogadishu</TimeZoneId>
            <Airports>
                <AirportCode>AAD</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAE</CityCode>
            <CountryCode>DZ</CountryCode>
            <Names>
                <Name LanguageCode="EN">Annaba</Name>
            </Names>
            <UtcOffset>+01:00</UtcOffset>
            <TimeZoneId>Africa/Algiers</TimeZoneId>
            <Airports>
                <AirportCode>AAE</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAF</CityCode>
            <CountryCode>US</CountryCode>
            <Names>
                <Name LanguageCode="EN">Apalachicola</Name>
            </Names>
            <UtcOffset>-05:00</UtcOffset>
            <TimeZoneId>America/New_York</TimeZoneId>
            <Airports>
                <AirportCode>AAF</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAG</CityCode>
            <CountryCode>BR</CountryCode>
            <Names>
                <Name LanguageCode="EN">Arapoti</Name>
            </Names>
            <UtcOffset>-03:00</UtcOffset>
            <TimeZoneId>America/Araguaina</TimeZoneId>
            <Airports>
                <AirportCode>AAG</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAH</CityCode>
            <CountryCode>DE</CountryCode>
            <Names>
                <Name LanguageCode="EN">Aachen</Name>
            </Names>
            <UtcOffset>+01:00</UtcOffset>
            <TimeZoneId>Europe/Berlin</TimeZoneId>
            <Airports>
                <AirportCode>AAH</AirportCode>
                <AirportCode>AAW</AirportCode>
                <AirportCode>XHJ</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAI</CityCode>
            <CountryCode>BR</CountryCode>
            <Names>
                <Name LanguageCode="EN">Arraias</Name>
            </Names>
            <UtcOffset>-03:00</UtcOffset>
            <TimeZoneId>America/Araguaina</TimeZoneId>
            <Airports>
                <AirportCode>AAI</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAJ</CityCode>
            <CountryCode>SR</CountryCode>
            <Names>
                <Name LanguageCode="EN">Awaradam</Name>
            </Names>
            <UtcOffset>-03:00</UtcOffset>
            <TimeZoneId>America/Paramaribo</TimeZoneId>
            <Airports>
                <AirportCode>AAJ</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAK</CityCode>
            <CountryCode>KI</CountryCode>
            <Names>
                <Name LanguageCode="EN">Aranuka</Name>
            </Names>
            <UtcOffset>+12:00</UtcOffset>
            <TimeZoneId>Pacific/Tarawa</TimeZoneId>
            <Airports>
                <AirportCode>AAK</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAL</CityCode>
            <CountryCode>DK</CountryCode>
            <Names>
                <Name LanguageCode="EN">Aalborg</Name>
            </Names>
            <UtcOffset>+01:00</UtcOffset>
            <TimeZoneId>Europe/Copenhagen</TimeZoneId>
            <Airports>
                <AirportCode>AAL</AirportCode>
                <AirportCode>ZTG</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAM</CityCode>
            <CountryCode>ZA</CountryCode>
            <Names>
                <Name LanguageCode="EN">Mala Mala</Name>
            </Names>
            <UtcOffset>+02:00</UtcOffset>
            <TimeZoneId>Africa/Johannesburg</TimeZoneId>
            <Airports>
                <AirportCode>AAM</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAN</CityCode>
            <CountryCode>AE</CountryCode>
            <Names>
                <Name LanguageCode="EN">Al Ain</Name>
            </Names>
            <UtcOffset>+04:00</UtcOffset>
            <TimeZoneId>Asia/Dubai</TimeZoneId>
            <Airports>
                <AirportCode>AAN</AirportCode>
                <AirportCode>ZVH</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAO</CityCode>
            <CountryCode>VE</CountryCode>
            <Names>
                <Name LanguageCode="EN">Anaco</Name>
            </Names>
            <UtcOffset>-04:00</UtcOffset>
            <TimeZoneId>America/Caracas</TimeZoneId>
            <Airports>
                <AirportCode>AAO</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAP</CityCode>
            <CountryCode>ID</CountryCode>
            <Names>
                <Name LanguageCode="EN">Samarinda</Name>
            </Names>
            <UtcOffset>+08:00</UtcOffset>
            <TimeZoneId>Asia/Makassar</TimeZoneId>
        </City>
        <City>
            <CityCode>AAQ</CityCode>
            <CountryCode>RU</CountryCode>
            <Names>
                <Name LanguageCode="BG">Anapa</Name>
                <Name LanguageCode="CS">Anapa</Name>
                <Name LanguageCode="DE">Anapa</Name>
                <Name LanguageCode="EL">Ανάπα</Name>
                <Name LanguageCode="EN">Anapa</Name>
                <Name LanguageCode="ES">Anapa</Name>
                <Name LanguageCode="FR">Anapa</Name>
                <Name LanguageCode="HU">Anapa</Name>
                <Name LanguageCode="IT">Anapa</Name>
                <Name LanguageCode="RO">Anapa</Name>
                <Name LanguageCode="SV">Anapa</Name>
                <Name LanguageCode="TR">Anapa</Name>
                <Name LanguageCode="UK">Anapa</Name>
            </Names>
            <UtcOffset>+03:00</UtcOffset>
            <TimeZoneId>Europe/Moscow</TimeZoneId>
            <Airports>
                <AirportCode>AAQ</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAR</CityCode>
            <CountryCode>DK</CountryCode>
            <Names>
                <Name LanguageCode="EN">Aarhus</Name>
            </Names>
            <UtcOffset>+01:00</UtcOffset>
            <TimeZoneId>Europe/Copenhagen</TimeZoneId>
            <Airports>
                <AirportCode>AAR</AirportCode>
                <AirportCode>ZBU</AirportCode>
                <AirportCode>ZID</AirportCode>
                <AirportCode>ZJH</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAS</CityCode>
            <CountryCode>ID</CountryCode>
            <Names>
                <Name LanguageCode="EN">Apalapsili</Name>
            </Names>
            <UtcOffset>+09:00</UtcOffset>
            <TimeZoneId>Asia/Jayapura</TimeZoneId>
            <Airports>
                <AirportCode>AAS</AirportCode>
            </Airports>
        </City>
        <City>
            <CityCode>AAT</CityCode>
            <CountryCode>CN</CountryCode>
            <Names>
                <Name LanguageCode="EN">Altay</Name>
            </Names>
            <UtcOffset>+08:00</UtcOffset>
            <TimeZoneId>Asia/Urumqi</TimeZoneId>
            <Airports>
                <AirportCode>AAT</AirportCode>
            </Airports>
        </City>
    </Cities>
    <Meta Version="1.0.0">
        <Link Href="https://api.lufthansa.com/v1/mds-references/cities" Rel="self"/>
        <Link Href="https://api.lufthansa.com/v1/mds-references/cities?offset=20&amp;limit=20" Rel="next"/>
        <Link Href="https://api.lufthansa.com/v1/mds-references/cities?offset=10640&amp;limit=20" Rel="last"/>
        <Link Href="https://api.lufthansa.com/v1/references/airports/{airportCode}" Rel="related"/>
        <Link Href="https://api.lufthansa.com/v1/references/countries/{countryCode}" Rel="related"/>
        <TotalCount>10657</TotalCount>
    </Meta>
</CityResource>
```

<?xml version="1.0" encoding="UTF-8"?>

<CityResource>

<Cities>

<City>

<CityCode>NYC</CityCode>

<CountryCode>US</CountryCode>

<Names>

<Name LanguageCode="DE">New York</Name>

<Name LanguageCode="EL">Νέα Υόρκη</Name>

<Name LanguageCode="EN">New York</Name>

<Name LanguageCode="ES">Nueva York</Name>

<Name LanguageCode="FR">New York</Name>

<Name LanguageCode="IT">New York</Name>

<Name LanguageCode="JA">ニューヨーク</Name>

<Name LanguageCode="KO">뉴욕</Name>

<Name LanguageCode="PL">Nowy Jork</Name>

<Name LanguageCode="PT">Nova Iorque</Name>

<Name LanguageCode="RU">Нью-Йорк</Name>

<Name LanguageCode="TR">New York</Name>

<Name LanguageCode="ZH">紐約</Name>

</Names>

<UtcOffset>-05:00</UtcOffset>

<TimeZoneId>America/New_York</TimeZoneId>

<Airports>

<AirportCode>EWR</AirportCode>

<AirportCode>FLU</AirportCode>

<AirportCode>JFK</AirportCode>

<AirportCode>JRA</AirportCode>

<AirportCode>JRB</AirportCode>

<AirportCode>JRE</AirportCode>

<AirportCode>LGA</AirportCode>

<AirportCode>NBP</AirportCode>

<AirportCode>NES</AirportCode>

<AirportCode>NWS</AirportCode>

<AirportCode>NYS</AirportCode>

<AirportCode>SWF</AirportCode>

<AirportCode>TSS</AirportCode>

<AirportCode>WTC</AirportCode>

<AirportCode>XNY</AirportCode>

<AirportCode>ZME</AirportCode>

<AirportCode>ZRP</AirportCode>

<AirportCode>ZYP</AirportCode>

</Airports>

</City>

</Cities>

<Meta Version="1.0.0">

<Link Href="https://api.lufthansa.com/v1/mds-references/cities/NYC" Rel="self"/>

<Link Href="https://api.lufthansa.com/v1/references/countries/US" Rel="related"/>

<Link Href="https://api.lufthansa.com/v1/references/airports/{airportCode}" Rel="related"/>

<Link Href="http://travelguide.lufthansa.com/de/de/new-york-city/" Rel="alternate"/>

<Link Href="http://travelguide.lufthansa.com/de/en/new-york-city/" Rel="alternate"/>

<Link Href="http://travelguide.lufthansa.com/de/fr/new-york-city/" Rel="alternate"/>

<Link Href="http://travelguide.lufthansa.com/de/it/new-york-city/" Rel="alternate"/>

</Meta>

</CityResource>

version 58 as of 7 years ago by Unknown
