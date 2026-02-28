Title: Lufthansa Developer Center - Countries

URL Source: https://developer.lufthansa.com/docs/read/api_details/reference_data/Countries

Markdown Content:
Retrieves the complete details of one particular country or list of countries and supports multiple languages whereever its applicable and available.

### Request URIs

#### Code snippet: Call

```
GET /mds-references/countries
GET /mds-references/countries/{countryCode}[?lang={languageCode}]
GET /mds-references/countries[?limit={recordLimit}][&][offset={recordOffset}]
```

| Variable | Description | Format |
| --- | --- | --- |
| _{countryCode}_ | Optionally return only this country. | 2-letter ISO 3166-1 country code, e.g. “DE”. |
| _{languageCode_ _}_ | Optionally return the country name in only this language. If not present, all languages will be in the response. | 2-letter ISO 639-1 language code, e.g. “EN”. |
| _{recordLimit}_ | Optionally sets the number of records returned. Defaults to 20, maximum is 100. | integer, e, g, 44 |
| _{recordOffset}_ | Optionally sets the number of records skipped when sorting response records alphabetically. Defaults to 0. | integer, e.g. 123 |

### Request Examples

#### Code snippet: Call

```
GET /mds-references/countries
GET /mds-references/countries/DE
GET /mds-references/countries/DE?lang=EN
GET /mds-references/countries?limit=44&offset=123
```

### Response Structure Definition

| Key | Description |
| --- | --- |
| CountryResource | Root element of country response. |
| .Countries | Container for country elements. |
| ..Country[] | Array of all available countries or one country matching the request. |
| ...CountryCode | 2-letter ISO 3166-1 country code, e.g. “DE”. |
| ...Names | Container for country full names. |
| ....Name[] | Array: language specific full name of country. |
| @LanguageCode | 2-letter ISO 639-1 language code for the corresponding item. |
| .Meta | Container for meta links. |
| ..Link[] |  |
| @Href | Link to actual a resource. |
| @Rel | Specifying kind of link such as ‘self’ (link that returned this response), ‘alternate’ (link that points to another resource) or ‘related’ (link that points to related resource). |

### Response Example

#### Code snippet: XML

```
<?xml version="1.0" encoding="UTF-8"?>
<CountryResource>
    <Countries>
        <Country>
            <CountryCode>DE</CountryCode>
            <Names>
                <Name LanguageCode="DE">Deutschland</Name>
                <Name LanguageCode="EL">Γερμανία</Name>
                <Name LanguageCode="EN">Germany</Name>
                <Name LanguageCode="ES">Alemania</Name>
                <Name LanguageCode="FI">Germany</Name>
                <Name LanguageCode="FR">Allemagne</Name>
                <Name LanguageCode="HR">Njemačka</Name>
                <Name LanguageCode="HU">Germany</Name>
                <Name LanguageCode="IT">Germania</Name>
                <Name LanguageCode="JA">Germany</Name>
                <Name LanguageCode="KA">Germany</Name>
                <Name LanguageCode="KO">독일</Name>
                <Name LanguageCode="NL">Duitsland</Name>
                <Name LanguageCode="PL">Niemcy</Name>
                <Name LanguageCode="PT">Alemanha</Name>
                <Name LanguageCode="RU">Germany</Name>
                <Name LanguageCode="SL">Germany (sl)</Name>
                <Name LanguageCode="TR">Almanya</Name>
            </Names>
        </Country>
    </Countries>
    <Meta Version="1.0.0">
        <Link Href="https://api.lufthansa.com/v1/mds-references/countries/de" Rel="self"/>
    </Meta>
</CountryResource>
```

```
<?xml version="1.0" encoding="UTF-8"?>
<CountryResource>
    <Countries>
        <Country>
            <CountryCode>AC</CountryCode>
            <Names>
                <Name LanguageCode="EN">Ascension</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AD</CountryCode>
            <Names>
                <Name LanguageCode="DE">Andorra</Name>
                <Name LanguageCode="EL">Ανδόρρα</Name>
                <Name LanguageCode="EN">Andorra</Name>
                <Name LanguageCode="ES">Andorra</Name>
                <Name LanguageCode="FI">Andorra</Name>
                <Name LanguageCode="FR">Andorra</Name>
                <Name LanguageCode="HR">Andora</Name>
                <Name LanguageCode="HU">Andorra</Name>
                <Name LanguageCode="IT">Andorra</Name>
                <Name LanguageCode="JA">Andorra</Name>
                <Name LanguageCode="KA">Andorra</Name>
                <Name LanguageCode="KO">안도라</Name>
                <Name LanguageCode="PL">Andorra</Name>
                <Name LanguageCode="PT">Andorra</Name>
                <Name LanguageCode="RU">Andorra</Name>
                <Name LanguageCode="SL">Andorra</Name>
                <Name LanguageCode="TR">Andorra</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AE</CountryCode>
            <Names>
                <Name LanguageCode="DE">Verein. Arab. Emirate</Name>
                <Name LanguageCode="EL">Ηνωμένα Αραβικά Εμιράτα</Name>
                <Name LanguageCode="EN">United Arab Emirates</Name>
                <Name LanguageCode="ES">Emiratos Arabes Unidos</Name>
                <Name LanguageCode="FI">United Arab Emirates</Name>
                <Name LanguageCode="FR">Emirat Arabes Unis</Name>
                <Name LanguageCode="HR">Ujedinjeni Arapski Emirati</Name>
                <Name LanguageCode="HU">United Arab Emirates</Name>
                <Name LanguageCode="IT">Emirati Arabi Uniti</Name>
                <Name LanguageCode="JA">United Arab Emirates</Name>
                <Name LanguageCode="KA">United Arab Emirates</Name>
                <Name LanguageCode="KO">아랍 에미리트 연방</Name>
                <Name LanguageCode="NL">Verenigde Arabische Emiraten</Name>
                <Name LanguageCode="PL">Zjednoczone Emiraty Arabskie</Name>
                <Name LanguageCode="PT">Emirados Árabes Unidos</Name>
                <Name LanguageCode="RU">United Arab Emirates</Name>
                <Name LanguageCode="SL">United Arab Emirates (sl)</Name>
                <Name LanguageCode="TR">Birleşik Arap Emirlikleri</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AF</CountryCode>
            <Names>
                <Name LanguageCode="DE">Afghanistan</Name>
                <Name LanguageCode="EL">Αφγανιστάν</Name>
                <Name LanguageCode="EN">Afghanistan</Name>
                <Name LanguageCode="ES">Afganistán</Name>
                <Name LanguageCode="FI">Afghanistan</Name>
                <Name LanguageCode="FR">Afghanistan</Name>
                <Name LanguageCode="HR">Afganistan</Name>
                <Name LanguageCode="HU">Afghanistan</Name>
                <Name LanguageCode="IT">Afghanistan</Name>
                <Name LanguageCode="JA">Afghanistan</Name>
                <Name LanguageCode="KA">Afghanistan</Name>
                <Name LanguageCode="KO">Afghanistan</Name>
                <Name LanguageCode="PL">Afganistan</Name>
                <Name LanguageCode="PT">Afeganistão</Name>
                <Name LanguageCode="RU">Afghanistan</Name>
                <Name LanguageCode="SL">Afghanistan</Name>
                <Name LanguageCode="TR">Afganistan</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AG</CountryCode>
            <Names>
                <Name LanguageCode="EN">Antigua And Barbuda, Leeward Islands</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AI</CountryCode>
            <Names>
                <Name LanguageCode="EN">Anguilla, Leeward Islands</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AL</CountryCode>
            <Names>
                <Name LanguageCode="DE">Albanien</Name>
                <Name LanguageCode="EL">Αλβανία</Name>
                <Name LanguageCode="EN">Albania</Name>
                <Name LanguageCode="ES">Albania</Name>
                <Name LanguageCode="FI">Albania</Name>
                <Name LanguageCode="FR">Albanie</Name>
                <Name LanguageCode="HR">Albanija</Name>
                <Name LanguageCode="HU">Albania</Name>
                <Name LanguageCode="IT">Albania</Name>
                <Name LanguageCode="JA">Albania</Name>
                <Name LanguageCode="KA">Albania</Name>
                <Name LanguageCode="KO">Albania</Name>
                <Name LanguageCode="NL">Albanië</Name>
                <Name LanguageCode="PL">Albania</Name>
                <Name LanguageCode="PT">Albânia</Name>
                <Name LanguageCode="RU">Albania</Name>
                <Name LanguageCode="SL">Albania (sl)</Name>
                <Name LanguageCode="TR">Arnavutluk</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AM</CountryCode>
            <Names>
                <Name LanguageCode="DE">Armenien</Name>
                <Name LanguageCode="EL">Αρμενία</Name>
                <Name LanguageCode="EN">Armenia</Name>
                <Name LanguageCode="ES">Armenia</Name>
                <Name LanguageCode="FI">Armenia</Name>
                <Name LanguageCode="FR">Arménie</Name>
                <Name LanguageCode="HR">Armenija</Name>
                <Name LanguageCode="HU">Armenia</Name>
                <Name LanguageCode="IT">Armenia</Name>
                <Name LanguageCode="JA">Armenia</Name>
                <Name LanguageCode="KA">Armenia</Name>
                <Name LanguageCode="KO">Armenia (ko)</Name>
                <Name LanguageCode="NL">Armenië</Name>
                <Name LanguageCode="PL">Armenia</Name>
                <Name LanguageCode="PT">Armenia</Name>
                <Name LanguageCode="RU">Armenia</Name>
                <Name LanguageCode="SL">Armenia (sl)</Name>
                <Name LanguageCode="TR">Armenia</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AO</CountryCode>
            <Names>
                <Name LanguageCode="DE">Angola</Name>
                <Name LanguageCode="EL">Ανγκόλα</Name>
                <Name LanguageCode="EN">Angola</Name>
                <Name LanguageCode="ES">Angola</Name>
                <Name LanguageCode="FI">Angola</Name>
                <Name LanguageCode="FR">Angola</Name>
                <Name LanguageCode="HR">Angola</Name>
                <Name LanguageCode="HU">Angola</Name>
                <Name LanguageCode="IT">Angola</Name>
                <Name LanguageCode="JA">Angola</Name>
                <Name LanguageCode="KA">Angola</Name>
                <Name LanguageCode="KO">Angola (ko)</Name>
                <Name LanguageCode="PL">Angola</Name>
                <Name LanguageCode="PT">Angola</Name>
                <Name LanguageCode="RU">Angola</Name>
                <Name LanguageCode="SL">Angola (sl)</Name>
                <Name LanguageCode="TR">Angola</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AQ</CountryCode>
            <Names>
                <Name LanguageCode="DE">Antarctica</Name>
                <Name LanguageCode="EL">Ανταρκτική</Name>
                <Name LanguageCode="EN">Antarctica</Name>
                <Name LanguageCode="ES">Antártida</Name>
                <Name LanguageCode="FI">Antarctica</Name>
                <Name LanguageCode="FR">Antarctica</Name>
                <Name LanguageCode="HR">Antarktika</Name>
                <Name LanguageCode="HU">Antarctica</Name>
                <Name LanguageCode="IT">Antartide</Name>
                <Name LanguageCode="JA">Antarctica</Name>
                <Name LanguageCode="KA">Antarctica</Name>
                <Name LanguageCode="KO">Antarctica (ko)</Name>
                <Name LanguageCode="PL">Antarktyda</Name>
                <Name LanguageCode="PT">Antártica</Name>
                <Name LanguageCode="RU">Antarctica</Name>
                <Name LanguageCode="SL">Antarctica (sl)</Name>
                <Name LanguageCode="TR">Antarktika</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AR</CountryCode>
            <Names>
                <Name LanguageCode="DE">Argentinien</Name>
                <Name LanguageCode="EL">Αργεντινή</Name>
                <Name LanguageCode="EN">Argentina</Name>
                <Name LanguageCode="ES">Argentina</Name>
                <Name LanguageCode="FI">Argentina</Name>
                <Name LanguageCode="FR">Argentine</Name>
                <Name LanguageCode="HR">Argentina</Name>
                <Name LanguageCode="HU">Argentina</Name>
                <Name LanguageCode="IT">Argentina</Name>
                <Name LanguageCode="JA">Argentina</Name>
                <Name LanguageCode="KA">Argentina</Name>
                <Name LanguageCode="KO">아르헨티나</Name>
                <Name LanguageCode="NL">Argentinië</Name>
                <Name LanguageCode="PL">Argentyna</Name>
                <Name LanguageCode="PT">Argentina</Name>
                <Name LanguageCode="RU">Argentina</Name>
                <Name LanguageCode="SL">Argentina (sl)</Name>
                <Name LanguageCode="TR">Arjantin</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AS</CountryCode>
            <Names>
                <Name LanguageCode="DE">Amerikanisch-Samoa</Name>
                <Name LanguageCode="EL">Αμερικανική Σαμόα</Name>
                <Name LanguageCode="EN">American Samoa</Name>
                <Name LanguageCode="ES">Samoa Americana</Name>
                <Name LanguageCode="FI">American Samoa</Name>
                <Name LanguageCode="FR">American Samoa</Name>
                <Name LanguageCode="HR">Američka Samoa</Name>
                <Name LanguageCode="HU">American Samoa</Name>
                <Name LanguageCode="IT">Samoa americane</Name>
                <Name LanguageCode="JA">American Samoa</Name>
                <Name LanguageCode="KA">American Samoa</Name>
                <Name LanguageCode="KO">American Samoa (ko)</Name>
                <Name LanguageCode="NL">Amerikaans-Samoa</Name>
                <Name LanguageCode="PL">Samoa Amerykańskie</Name>
                <Name LanguageCode="PT">Samoa Americana</Name>
                <Name LanguageCode="RU">American Samoa</Name>
                <Name LanguageCode="SL">American Samoa (sl)</Name>
                <Name LanguageCode="TR">Amerikan Samoa</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AT</CountryCode>
            <Names>
                <Name LanguageCode="DE">Österreich</Name>
                <Name LanguageCode="EL">Αυστρία</Name>
                <Name LanguageCode="EN">Austria</Name>
                <Name LanguageCode="ES">Austria</Name>
                <Name LanguageCode="FI">Austria</Name>
                <Name LanguageCode="FR">Autriche</Name>
                <Name LanguageCode="HR">Austrija</Name>
                <Name LanguageCode="HU">Austria</Name>
                <Name LanguageCode="IT">Austria</Name>
                <Name LanguageCode="JA">Austria</Name>
                <Name LanguageCode="KA">Austria</Name>
                <Name LanguageCode="KO">오스트리아</Name>
                <Name LanguageCode="NL">Oostenrijk</Name>
                <Name LanguageCode="PL">Austria</Name>
                <Name LanguageCode="PT">Austria</Name>
                <Name LanguageCode="RU">Austria</Name>
                <Name LanguageCode="SL">Austria (sl)</Name>
                <Name LanguageCode="TR">Avusturya</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AU</CountryCode>
            <Names>
                <Name LanguageCode="DE">Australien</Name>
                <Name LanguageCode="EL">Αυστραλία</Name>
                <Name LanguageCode="EN">Australia</Name>
                <Name LanguageCode="ES">Australia</Name>
                <Name LanguageCode="FI">Australia</Name>
                <Name LanguageCode="FR">Australie</Name>
                <Name LanguageCode="HR">Australija</Name>
                <Name LanguageCode="HU">Australia</Name>
                <Name LanguageCode="IT">Australia</Name>
                <Name LanguageCode="JA">Australia</Name>
                <Name LanguageCode="KA">Australia</Name>
                <Name LanguageCode="KO">오스트레일리아</Name>
                <Name LanguageCode="NL">Australië</Name>
                <Name LanguageCode="PL">Australia</Name>
                <Name LanguageCode="PT">Austrália</Name>
                <Name LanguageCode="RU">Australia</Name>
                <Name LanguageCode="SL">Australia (sl)</Name>
                <Name LanguageCode="TR">Avustralya</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AW</CountryCode>
            <Names>
                <Name LanguageCode="DE">Aruba</Name>
                <Name LanguageCode="EL">Αρούμπα</Name>
                <Name LanguageCode="EN">Aruba</Name>
                <Name LanguageCode="ES">Aruba</Name>
                <Name LanguageCode="FI">Aruba</Name>
                <Name LanguageCode="FR">Aruba</Name>
                <Name LanguageCode="HR">Aruba</Name>
                <Name LanguageCode="HU">Aruba</Name>
                <Name LanguageCode="IT">Aruba</Name>
                <Name LanguageCode="JA">Aruba</Name>
                <Name LanguageCode="KA">Aruba</Name>
                <Name LanguageCode="KO">Aruba (ko)</Name>
                <Name LanguageCode="PL">Aruba</Name>
                <Name LanguageCode="PT">Aruba</Name>
                <Name LanguageCode="RU">Aruba</Name>
                <Name LanguageCode="SL">Aruba (sl)</Name>
                <Name LanguageCode="TR">Aruba</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>AZ</CountryCode>
            <Names>
                <Name LanguageCode="DE">Aserbaidschan</Name>
                <Name LanguageCode="EL">Αζερμπαϊτζάν</Name>
                <Name LanguageCode="EN">Azerbaijan</Name>
                <Name LanguageCode="ES">Azerbaijan</Name>
                <Name LanguageCode="FI">Azerbaijan</Name>
                <Name LanguageCode="FR">Azerbaïdjan</Name>
                <Name LanguageCode="HR">Azerbejdžan</Name>
                <Name LanguageCode="HU">Azerbaijan</Name>
                <Name LanguageCode="IT">Azerbaijan</Name>
                <Name LanguageCode="JA">Azerbaijan</Name>
                <Name LanguageCode="KA">Azerbaijan</Name>
                <Name LanguageCode="KO">아제르바이잔</Name>
                <Name LanguageCode="NL">Azerbeidzjan</Name>
                <Name LanguageCode="PL">Azerbejd¿an</Name>
                <Name LanguageCode="PT">Azerbaijão</Name>
                <Name LanguageCode="RU">Azerbaijan</Name>
                <Name LanguageCode="SL">Azerbaijan (sl)</Name>
                <Name LanguageCode="TR">Azerbaycan</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>BA</CountryCode>
            <Names>
                <Name LanguageCode="EN">Bosnia And Herzegovina</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>BB</CountryCode>
            <Names>
                <Name LanguageCode="DE">Barbados</Name>
                <Name LanguageCode="EL">Μπαρμπέιντος</Name>
                <Name LanguageCode="EN">Barbados</Name>
                <Name LanguageCode="ES">Barbados</Name>
                <Name LanguageCode="FI">Barbados</Name>
                <Name LanguageCode="FR">Barbados</Name>
                <Name LanguageCode="HR">Barbados</Name>
                <Name LanguageCode="HU">Barbados</Name>
                <Name LanguageCode="IT">Barbados</Name>
                <Name LanguageCode="JA">Barbados</Name>
                <Name LanguageCode="KA">Barbados</Name>
                <Name LanguageCode="KO">Barbados (ko)</Name>
                <Name LanguageCode="PL">Barbados</Name>
                <Name LanguageCode="PT">Barbados</Name>
                <Name LanguageCode="RU">Barbados</Name>
                <Name LanguageCode="SL">Barbados (sl)</Name>
                <Name LanguageCode="TR">Barbados</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>BD</CountryCode>
            <Names>
                <Name LanguageCode="DE">Bangladesch</Name>
                <Name LanguageCode="EL">Μπανγκλαντές</Name>
                <Name LanguageCode="EN">Bangladesh</Name>
                <Name LanguageCode="ES">Bangladesh</Name>
                <Name LanguageCode="FI">Bangladesh</Name>
                <Name LanguageCode="FR">Bangladesh</Name>
                <Name LanguageCode="HR">Bangladeš</Name>
                <Name LanguageCode="HU">Bangladesh</Name>
                <Name LanguageCode="IT">Bangladesh</Name>
                <Name LanguageCode="JA">Bangladesh</Name>
                <Name LanguageCode="KA">Bangladesh</Name>
                <Name LanguageCode="KO">Bangladesh (ko)</Name>
                <Name LanguageCode="PL">Bangladesz</Name>
                <Name LanguageCode="PT">Bangladesh</Name>
                <Name LanguageCode="RU">Bangladesh</Name>
                <Name LanguageCode="SL">Bangladesh (sl)</Name>
                <Name LanguageCode="TR">Bangladeş</Name>
            </Names>
        </Country>
        <Country>
            <CountryCode>BE</CountryCode>
            <Names>
                <Name LanguageCode="DE">Belgien</Name>
                <Name LanguageCode="EL">Βέλγιο</Name>
                <Name LanguageCode="EN">Belgium</Name>
                <Name LanguageCode="ES">Bélgica</Name>
                <Name LanguageCode="FI">Belgium</Name>
                <Name LanguageCode="FR">Belgique</Name>
                <Name LanguageCode="HR">Belgija</Name>
                <Name LanguageCode="HU">Belgium</Name>
                <Name LanguageCode="IT">Belgio</Name>
                <Name LanguageCode="JA">Belgium</Name>
                <Name LanguageCode="KA">Belgium</Name>
                <Name LanguageCode="KO">벨기에</Name>
                <Name LanguageCode="NL">België</Name>
                <Name LanguageCode="PL">Belgia</Name>
                <Name LanguageCode="PT">Bélgica</Name>
                <Name LanguageCode="RU">Belgium</Name>
                <Name LanguageCode="SL">Belgium (sl)</Name>
                <Name LanguageCode="TR">Belçika</Name>
            </Names>
        </Country>
    </Countries>
    <Meta Version="1.0.0">
        <Link Href="https://api.lufthansa.com/v1/mds-references/countries" Rel="self"/>
        <Link Href="https://api.lufthansa.com/v1/mds-references/countries?offset=20&amp;limit=20" Rel="next"/>
        <Link Href="https://api.lufthansa.com/v1/mds-references/countries?offset=220&amp;limit=20" Rel="last"/>
        <Link Href="https://api.lufthansa.com/v1/references/countries/{countryCode}" Rel="related"/>
        <TotalCount>240</TotalCount>
    </Meta>
</CountryResource>
```

<?xml version="1.0" encoding="UTF-8"?>

<CountryResource>

<Countries>

<Country>

<CountryCode>DE</CountryCode>

<Names>

<Name LanguageCode="DE">Deutschland</Name>

<Name LanguageCode="EL">Γερμανία</Name>

<Name LanguageCode="EN">Germany</Name>

<Name LanguageCode="ES">Alemania</Name>

<Name LanguageCode="FI">Germany</Name>

<Name LanguageCode="FR">Allemagne</Name>

<Name LanguageCode="HR">Njemačka</Name>

<Name LanguageCode="HU">Germany</Name>

<Name LanguageCode="IT">Germania</Name>

<Name LanguageCode="JA">Germany</Name>

<Name LanguageCode="KA">Germany</Name>

<Name LanguageCode="KO">독일</Name>

<Name LanguageCode="NL">Duitsland</Name>

<Name LanguageCode="PL">Niemcy</Name>

<Name LanguageCode="PT">Alemanha</Name>

<Name LanguageCode="RU">Germany</Name>

<Name LanguageCode="SL">Germany (sl)</Name>

<Name LanguageCode="TR">Almanya</Name>

</Names>

</Country>

</Countries>

<Meta Version="1.0.0">

<Link Href="https://api.lufthansa.com/v1/mds-references/countries/de" Rel="self"/>

</Meta>

</CountryResource>

version 88 as of 3 years ago by Anilkumar Puttaraju
