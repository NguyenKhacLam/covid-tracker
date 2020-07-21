import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import InforBox from "./components/InforBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="App">
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
        <InforBox title="Coronavirus Cases" total={2000} cases={51} />
        <InforBox title="Recoverd" total={15132} cases={51} />
        <InforBox title="Deaths" total={4512} cases={51} />
      </div>
    </div>
  );
}

export default App;
