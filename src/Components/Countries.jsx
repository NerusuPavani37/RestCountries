import React, { useState, useEffect } from "react";

function Countries({countries,selectedRegion,darkMode}) {
  const filteredCountries = selectedRegion
  ? countries.filter(country => country.region === selectedRegion)
  : countries;

  return (
    <div>
      {filteredCountries.map((country) => (
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
