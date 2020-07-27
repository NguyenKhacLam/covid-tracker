import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { sortData, prettyPrintStat } from "./utlis";
import InforBox from "./components/InforBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfor] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.479,
  });
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);

          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfor(data);
      });
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfor(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              className="app__select"
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InforBox
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
            active={casesType === "cases"}
            onClick={(e) => {
              setCasesType("cases");
            }}
          />
          <InforBox
            title="Recoverd"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.recovered}
            active={casesType === "recovered"}
            onClick={(e) => {
              setCasesType("recovered");
            }}
          />
          <InforBox
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.deaths}
            active={casesType === "deaths"}
            onClick={(e) => {
              setCasesType("deaths");
            }}
          />
        </div>

        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
