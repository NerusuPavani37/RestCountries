import React, { useState, useEffect } from "react";

function Search({darkMode, toggleDarkMode}) {

  const [selectedCountry, setSelectedCountry]=useState("");
  const [countries,setCountries]=useState([]);
  

  useEffect(() =>{
    fetch("https://restcountries.com/v3.1/all")
    .then(res =>{
      return res.json();
    })
    .then(data =>{
      const countryNames=data.map(country => country.name.common)

      const sortedCountryNames=countryNames.sort((a,b) => a.localeCompare(b))
      setCountries(sortedCountryNames);
    })
    .catch(err =>{
      console.error("Error fetching countries:", err);
    });
  },[]);
  
  return (
    <div className={darkMode ? "search dark-mode" : "search"}>
      <div className={darkMode ? "search-container dark-mode" : "search-container"}>
        <ion-icon name="search-outline" className="search-icon"></ion-icon>
        <input
          type="text"
          placeholder="Search for a country..."
          className={darkMode ? "search-input dark-mode" : "search-input"}
        />
      </div>
      <div className={darkMode? "filter filter-dark":"filter"}>
        <select id="filter-select" 
        className={darkMode? "filter-select filter-select-dark":"filter-select"} 
        values={selectedCountry} 
        onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">Filter by Region</option>
          {countries.map((country,index) =>{
            return <option key={index} value={country}>{country}</option>
          })}
        </select>
      </div>
    </div>
  );
}

export default Search;
