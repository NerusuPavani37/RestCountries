import React, { useState, useEffect } from "react";

function Countries({darkMode}) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);

  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca3} className={darkMode ? "country country-dark" : "country"}>
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="country-image"
          />
          <div className="country-details">
            <h2>{country.name.common}</h2>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Countries;
