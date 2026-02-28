Title: Lufthansa Developer Center - BestPrice Best Fares

URL Source: https://developer.lufthansa.com/docs/read/api_partner/offers/Best_Fares_New

Markdown Content:
The BestPrice Best Fares resource to retrieve the best fare per day or per month for the requested journey (one way and two way).

Fares can be shown across multiple days or multiple months and allow you to identify the month or day with the best fare. Specify the origin, destination, trip duration (optional) and whether the best fares should be returned per day or per month. Per day best fares are returned from travel-date till the end of the current month. Per month fares are returned for up to 11 months from current date. Fares are returned for one adult only.

If no cabin class is specified, fares for economy class will be returned

Please be aware, that the currency of the offer is determined by your origin airport/city and the respective country e.g.: Origin HND - Tokyo - will result in a YEN based response offer.

### Request URI

#### Code snippet: URL

`/v1/offers/faresbestprice/bestfares?origin={origin}&destination={destination}&travel-date={outboundDate}[&trip-duration={tripDuration}]&range={range}[&cabin-class={cabinClassCode}][&country={countryCode}][&trackingid={trackingid}]`

| Variable | Description | Format |
| --- | --- | --- |
| _{origin}_ | The departure airport. | 3-letter IATA code, e.g. “FRA”. |
| _{destination}_ | The arrival airport. | 3-letter IATA code, e.g. "JFK". |
| _{travel-date}_ | Outbound travel date | yyyy-MM-dd. e.g. '2016-10-27' |
| _{trip-duration}_ | Optional - Trip Duration in days. Do not pass trip duration for one way. | number of days e.g. '7' |
| _{range}_ | define output range (by day or by month) | 'byday' or 'bymonth' |
| _{cabin-class}_ | Cabin Class | Cabin class: 'Economy', 'Premium_economy', 'Business', 'First' |
| _{country}_ | Country Code | 2 letter country code e.g. "DE" |

### Request Examples

#### Best Fare Search

```
/v1/offers/faresbestprice/bestfares?travel-date=2016-12-29&origin=FRA&cabin-class=Economy&trip-duration=5&country=DE&destination=JNB&range=byday

/v1/offers/faresbestprice/bestfares?origin=FRA&cabin-class=Business&trip-duration=5&country=DE&destination=JNB&range=bymonth
```

### Response Structure Definition

[Click here for further information on the response structure.](https://developer.lufthansa.com/docs/api_partner/offers/Fare_Response)

### Response Example

#### Code snippet: XML

```
<?xml version="1.0" encoding="UTF-8"?>
<BestFaresResponse>
  <AirShoppingRS>
    <Document>
      <MessageVersion>1.0.1-db</MessageVersion>
      <CreateTime>2016-12-22T09:59:37.349-00:00</CreateTime>
    </Document>
    <AirShoppingProcessing>
      <Status>Complete</Status>
    </AirShoppingProcessing>
    <ShoppingResponseIDs>
      <ResponseID>7551e53e-8d4c-465d-b881-7a7b915dd580</ResponseID>
    </ShoppingResponseIDs>
    <OffersGroup>
      <AirlineOffers>
        <TotalOfferQuantity>3</TotalOfferQuantity>
        <AirlineOfferSnapshot DateTime="2016-12-22T09:59:37.000-00:00"/>
        <Owner>LH</Owner>
        <AirlineOffer>
          <OfferID Owner="LH">66dda727-cc12-48e5-aa9a-0341d8c6d595</OfferID>
          <TotalPrice>
            <DetailCurrencyPrice>
              <Total Code="EUR">1428.45</Total>
              <Taxes>
                <Total Code="EUR">0</Total>
              </Taxes>
            </DetailCurrencyPrice>
          </TotalPrice>
          <PricedOffer>
            <OfferPrice OfferItemID="ebe706e4-96d7-4cee-95ff-afb0a2c3d07a">
              <RequestedDate>
                <PriceDetail>
                  <TotalAmount>
                    <SimpleCurrencyPrice Code="EUR">1428.45</SimpleCurrencyPrice>
                  </TotalAmount>
                  <BaseAmount Code="EUR">1428.45</BaseAmount>
                  <Taxes>
                    <Total Code="EUR">0</Total>
                  </Taxes>
                </PriceDetail>
                <Associations>
                  <AssociatedTraveler>
                    <TravelerReferences>c9381c31-26c7-409a-8134-249e1b4aa61b_ADT</TravelerReferences>
                  </AssociatedTraveler>
                </Associations>
              </RequestedDate>
              <FareDetail>
                <FareComponent>
                  <AirlineID>LH</AirlineID>
                  <DepartureCode>FRA</DepartureCode>
                  <DepartureDate>2016-12-27</DepartureDate>
                  <ArrivalCode>JNB</ArrivalCode>
                  <FareBasis>
                    <FareBasisCode>
                      <Code xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
                    </FareBasisCode>
                  </FareBasis>
                </FareComponent>
              </FareDetail>
              <FareDetail>
                <FareComponent>
                  <AirlineID>LH</AirlineID>
                  <DepartureCode>JNB</DepartureCode>
                  <DepartureDate>2017-01-01</DepartureDate>
                  <ArrivalCode>FRA</ArrivalCode>
                  <FareBasis>
                    <FareBasisCode>
                      <Code xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
                    </FareBasisCode>
                  </FareBasis>
                </FareComponent>
              </FareDetail>
            </OfferPrice>
            <Associations>
              <ApplicableFlight>
                <FlightSegmentReference ref="22713623-e942-491c-bb35-002915df374a_SEGLX1077">
                  <ClassOfService>
                    <Code>M</Code>
                    <MarketingName>economy</MarketingName>
                  </ClassOfService>
                </FlightSegmentReference>
                <FlightSegmentReference ref="631dee35-ddec-401e-85c8-d64c7fa050cc_SEGLX288">
                  <ClassOfService>
                    <Code>M</Code>
                    <MarketingName>economy</MarketingName>
                  </ClassOfService>
                </FlightSegmentReference>
                <FlightSegmentReference ref="07cba019-44ea-4d56-97ed-9975480ec545_SEGLH573">
                  <ClassOfService>
                    <Code>M</Code>
                    <MarketingName>economy</MarketingName>
                  </ClassOfService>
                </FlightSegmentReference>
              </ApplicableFlight>
            </Associations>
          </PricedOffer>
        </AirlineOffer>
        <AirlineOffer>
          <OfferID Owner="LH">8eef22ff-d5e7-4f17-b5ae-a87407fbd4a5</OfferID>
          <TotalPrice>
            <DetailCurrencyPrice>
              <Total Code="EUR">1535.45</Total>
              <Taxes>
                <Total Code="EUR">0</Total>
              </Taxes>
            </DetailCurrencyPrice>
          </TotalPrice>
          <PricedOffer>
            <OfferPrice OfferItemID="b5e51932-78e0-410c-8d61-745769b5143c">
              <RequestedDate>
                <PriceDetail>
                  <TotalAmount>
                    <SimpleCurrencyPrice Code="EUR">1535.45</SimpleCurrencyPrice>
                  </TotalAmount>
                  <BaseAmount Code="EUR">1535.45</BaseAmount>
                  <Taxes>
                    <Total Code="EUR">0</Total>
                  </Taxes>
                </PriceDetail>
                <Associations>
                  <AssociatedTraveler>
                    <TravelerReferences>c9381c31-26c7-409a-8134-249e1b4aa61b_ADT</TravelerReferences>
                  </AssociatedTraveler>
                </Associations>
              </RequestedDate>
              <FareDetail>
                <FareComponent>
                  <AirlineID>LH</AirlineID>
                  <DepartureCode>FRA</DepartureCode>
                  <DepartureDate>2016-12-26</DepartureDate>
                  <ArrivalCode>JNB</ArrivalCode>
                  <FareBasis>
                    <FareBasisCode>
                      <Code xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
                    </FareBasisCode>
                  </FareBasis>
                </FareComponent>
              </FareDetail>
              <FareDetail>
                <FareComponent>
                  <AirlineID>LH</AirlineID>
                  <DepartureCode>JNB</DepartureCode>
                  <DepartureDate>2016-12-31</DepartureDate>
                  <ArrivalCode>FRA</ArrivalCode>
                  <FareBasis>
                    <FareBasisCode>
                      <Code xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
                    </FareBasisCode>
                  </FareBasis>
                </FareComponent>
              </FareDetail>
            </OfferPrice>
            <Associations>
              <ApplicableFlight>
                <FlightSegmentReference ref="6768da41-3567-4b88-b01c-ca583b1d5961_SEGLH572">
                  <ClassOfService>
                    <Code>M</Code>
                    <MarketingName>economy</MarketingName>
                  </ClassOfService>
                </FlightSegmentReference>
                <FlightSegmentReference ref="c89ea109-2546-4670-9be1-2418d679000e_SEGLX289">
                  <ClassOfService>
                    <Code>M</Code>
                    <MarketingName>economy</MarketingName>
                  </ClassOfService>
                </FlightSegmentReference>
                <FlightSegmentReference ref="2704c279-5c42-4cb1-84ea-eabf2019628d_SEGLX1072">
                  <ClassOfService>
                    <Code>M</Code>
                    <MarketingName>economy</MarketingName>
                  </ClassOfService>
                </FlightSegmentReference>
              </ApplicableFlight>
            </Associations>
          </PricedOffer>
        </AirlineOffer>
        <AirlineOffer>
          <OfferID Owner="LH">53b2426e-0630-4095-ba00-f5b222432eea</OfferID>
            <TotalPrice>
              <DetailCurrencyPrice>
                <Total Code="EUR">1578.31</Total>
                <Taxes>
                  <Total Code="EUR">0</Total>
                </Taxes>
              </DetailCurrencyPrice>
            </TotalPrice>
            <PricedOffer>
              <OfferPrice OfferItemID="ddf14157-cccd-4cf6-859b-e2ee2b0caffb">
                <RequestedDate>
                  <PriceDetail>
                    <TotalAmount>
                      <SimpleCurrencyPrice Code="EUR">1578.31</SimpleCurrencyPrice>
                    </TotalAmount>
                    <BaseAmount Code="EUR">1578.31</BaseAmount>
                    <Taxes>
                      <Total Code="EUR">0</Total>
                    </Taxes>
                  </PriceDetail>
                  <Associations>
                    <AssociatedTraveler>
                      <TravelerReferences>c9381c31-26c7-409a-8134-249e1b4aa61b_ADT</TravelerReferences>
                    </AssociatedTraveler>
                  </Associations>
                </RequestedDate>
                <FareDetail>
                  <FareComponent>
                    <AirlineID>LH</AirlineID>
                    <DepartureCode>FRA</DepartureCode>
                    <DepartureDate>2016-12-28</DepartureDate>
                    <ArrivalCode>JNB</ArrivalCode>
                    <FareBasis>
                      <FareBasisCode>
                        <Code xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
                      </FareBasisCode>
                    </FareBasis>
                  </FareComponent>
                </FareDetail>
                <FareDetail>
                  <FareComponent>
                    <AirlineID>LH</AirlineID>
                    <DepartureCode>JNB</DepartureCode>
                    <DepartureDate>2017-01-02</DepartureDate>
                    <ArrivalCode>FRA</ArrivalCode>
                    <FareBasis>
                      <FareBasisCode>
                        <Code xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
                      </FareBasisCode>
                    </FareBasis>
                  </FareComponent>
                </FareDetail>
              </OfferPrice>
              <Associations>
                <ApplicableFlight>
                  <FlightSegmentReference ref="cd7dde86-f999-4e99-88f9-5b00b04e69c3_SEGLX1077">
                    <ClassOfService>
                      <Code>M</Code>
                      <MarketingName>economy</MarketingName>
                    </ClassOfService>
                  </FlightSegmentReference>
                  <FlightSegmentReference ref="7c86e2a1-16ee-47bb-9ee2-bcf92194682d_SEGLX288">
                    <ClassOfService>
                      <Code>M</Code>
                      <MarketingName>economy</MarketingName>
                    </ClassOfService>
                  </FlightSegmentReference>
                  <FlightSegmentReference ref="215e3a2e-8400-4caa-bab9-245f668beb3e_SEGLX289">
                    <ClassOfService>
                      <Code>M</Code>
                      <MarketingName>economy</MarketingName>
                    </ClassOfService>
                  </FlightSegmentReference>
                  <FlightSegmentReference ref="5fc4f5ff-c7ba-43d0-8ff8-114f12e86e42_SEGLX3600">
                    <ClassOfService>
                      <Code>M</Code>
                      <MarketingName>economy</MarketingName>
                    </ClassOfService>
                  </FlightSegmentReference>
                </ApplicableFlight>
              </Associations>
            </PricedOffer>
          </AirlineOffer>
      </AirlineOffers>
    </OffersGroup>
    <DataLists>
      <AnonymousTravelerList>
        <AnonymousTraveler ObjectKey="c9381c31-26c7-409a-8134-249e1b4aa61b_ADT">
          <PTC Quantity="1">ADT</PTC>
        </AnonymousTraveler>
      </AnonymousTravelerList>
      <FlightSegmentList>
        <FlightSegment SegmentKey="22713623-e942-491c-bb35-002915df374a_SEGLX1077">
          <Departure>
            <AirportCode>FRA</AirportCode>
            <Date>2016-12-27</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>ZRH</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LX</AirlineID>
            <FlightNumber>1077</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
        <FlightSegment SegmentKey="631dee35-ddec-401e-85c8-d64c7fa050cc_SEGLX288">
          <Departure>
            <AirportCode>ZRH</AirportCode>
            <Date>2016-12-27</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>JNB</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LX</AirlineID>
            <FlightNumber>288</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
        <FlightSegment SegmentKey="07cba019-44ea-4d56-97ed-9975480ec545_SEGLH573">
          <Departure>
            <AirportCode>JNB</AirportCode>
            <Date>2017-01-01</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>FRA</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LH</AirlineID>
            <FlightNumber>573</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
        <FlightSegment SegmentKey="6768da41-3567-4b88-b01c-ca583b1d5961_SEGLH572">
          <Departure>
            <AirportCode>FRA</AirportCode>
            <Date>2016-12-26</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>JNB</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LH</AirlineID>
            <FlightNumber>572</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
        <FlightSegment SegmentKey="c89ea109-2546-4670-9be1-2418d679000e_SEGLX289">
          <Departure>
            <AirportCode>JNB</AirportCode>
            <Date>2016-12-31</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>ZRH</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LX</AirlineID>
            <FlightNumber>289</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
        <FlightSegment SegmentKey="2704c279-5c42-4cb1-84ea-eabf2019628d_SEGLX1072">
          <Departure>
            <AirportCode>ZRH</AirportCode>
            <Date>2017-01-01</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>FRA</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LX</AirlineID>
            <FlightNumber>1072</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
        <FlightSegment SegmentKey="cd7dde86-f999-4e99-88f9-5b00b04e69c3_SEGLX1077">
          <Departure>
            <AirportCode>FRA</AirportCode>
            <Date>2016-12-28</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>ZRH</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LX</AirlineID>
            <FlightNumber>1077</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
        <FlightSegment SegmentKey="7c86e2a1-16ee-47bb-9ee2-bcf92194682d_SEGLX288">
          <Departure>
            <AirportCode>ZRH</AirportCode>
            <Date>2016-12-28</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>JNB</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LX</AirlineID>
            <FlightNumber>288</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
        <FlightSegment SegmentKey="215e3a2e-8400-4caa-bab9-245f668beb3e_SEGLX289">
          <Departure>
            <AirportCode>JNB</AirportCode>
            <Date>2017-01-02</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>ZRH</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LX</AirlineID>
            <FlightNumber>289</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
        <FlightSegment SegmentKey="5fc4f5ff-c7ba-43d0-8ff8-114f12e86e42_SEGLX3600">
          <Departure>
            <AirportCode>ZRH</AirportCode>
            <Date>2017-01-03</Date>
            <Time>00:00</Time>
          </Departure>
          <Arrival>
            <AirportCode>FRA</AirportCode>
          </Arrival>
          <MarketingCarrier>
            <AirlineID>LX</AirlineID>
            <FlightNumber>3600</FlightNumber>
          </MarketingCarrier>
        </FlightSegment>
      </FlightSegmentList>
    </DataLists>
  </AirShoppingRS>
  <Meta Version="1.0.0">
    <Link Href="https://api-test.lufthansa.com/v1/offers/faresbestprice/bestfares?travel-date=2016-12-29&origin=FRA&cabin-class=Economy&trip-duration=5&country=DE&destination=JNB&range=bymonth" Rel="self"/>
  </Meta>
</BestFaresResponse>
```

version 22 as of 4 years ago by Anilkumar Puttaraju
