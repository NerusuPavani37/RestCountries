import React, { useState, useEffect } from "react";
import Countries from "./Countries"
import { useTheme } from "./ThemeContext";
import SubregionFilter from "./SubregionFilter";


function Search() {
  const {darkMode} =useTheme();

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [regions, setRegions] = useState([]);

  const [inputValue, setInputValue]=useState("");
  const [countries,setCountries]=useState([]);

  const [filteredCountries, setFilteredCountries] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState("");
  const handleSorting = (e) => {
    const option = e.target.value;
    setSelectedOptions(option);
    const sortedCountries = [...countries];
  
    if (option === 'population_asc') {
      sortedCountries.sort((a, b) => a.population - b.population);
    } else if (option === 'population_desc') {
      sortedCountries.sort((a, b) => b.population - a.population);
    } else if (option === 'area_asc') {
      sortedCountries.sort((a, b) => a.area - b.area);
    } else if (option === 'area_desc') {
      sortedCountries.sort((a, b) => b.area - a.area);
    }
    setCountries(sortedCountries);
  };
  

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      
        const regionNames = data.reduce((acc, curr) => {
          const region = curr.region;
          if (!acc.includes(region)) {
            acc.push(region);
          }
          return acc;
        }, []);
  
        const sortedRegionNames = regionNames.sort((a, b) =>
          a.localeCompare(b)
        );
        setRegions(sortedRegionNames);

      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
      });
  }, []);


  const handleInputChange=(e) =>{
    const inputValue=e.target.value.toLowerCase();
    setInputValue(inputValue);
    const filtered=countries.filter((country) => 
    country.name.common.toLowerCase().includes(inputValue)
    );
    setFilteredCountries(filtered);
  }

  const handleKeyPress=(e)=>{
    const inputValue=e.target.value.toLowerCase();
    if(e.key === 'Enter'){
      const exactMatch = countries.filter((country) =>
       country.name.common.toLowerCase()=== inputValue
      );
      setFilteredCountries(exactMatch);
    }
  }

  const handleSubregionChange = (subregion) => {
    setSelectedSubregion(subregion);
  };

  return (
    <div>
    <div className={darkMode ? "search dark-mode" : "search"}>
      <div
        className={darkMode ? "search-container dark-mode" : "search-container"}
      >
        <ion-icon name="search-outline" className="search-icon"></ion-icon>
        <input
          type="text"
          placeholder="Search for a country..."
          className={darkMode ? "search-input dark-mode" : "search-input"}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </div>
     
      </div>
      <div className={darkMode ? "filter filter-dark" : "filter"}>
        <select
          id="filter-select"
          className={
            darkMode ? "filter-select filter-select-dark" : "filter-select"
          }
          values={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="" disabled hidden selected>Filter by Region</option>
          {regions.map((country, index) => {
            return (
              <option key={index} value={country}>
                {country}
              </option>
            );
          })}
        </select>
      </div>  
      <div className={darkMode ? "sort dark-mode" : "sort"}>
      <select
        id="sortDropdown"
        className={darkMode ? "sort-container dark-mode" : "sort-container"}
        value={selectedOptions}
        onChange={handleSorting}
      >
        <option value="" disabled hidden selected>
          Sort
        </option>

        <option value="population_asc">Population Low to High</option>
        <option value="population_desc">Population High to Low</option>
        <option value="area_asc">Area Low to High</option>
        <option value="area_desc">Area High to Low</option>
      </select>
    </div>
      <SubregionFilter countries={countries} 
      selectedRegion={selectedRegion} 
      onSubregionChange={handleSubregionChange}
      />
      <Countries countries={inputValue ? filteredCountries : countries} 
      selectedRegion={selectedRegion} 
      selectedSubregion={selectedSubregion}
      />
    </div>
  );
}

export default Search;
