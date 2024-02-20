import React,{useState} from "react";
import { useTheme } from "./ThemeContext";

function SubregionFilter({ countries, selectedRegion,onSubregionChange }) {
  const { darkMode } = useTheme();
 
  const [selectedSubregion, setSelectedSubregion] = useState("");

  const subRegions = countries.reduce((acc, curr) => {
    if (selectedRegion && selectedRegion === curr.region) {
      if(!acc.includes(curr.subregion)){
        acc.push(curr.subregion);
      }
    }
    return acc;
  }, []);
  const handleSubregionChange = (e) => {
    const subregion = e.target.value;
    setSelectedSubregion(subregion);
    onSubregionChange(subregion);
  };

  console.log(subRegions);
  return (
    <div
      className={
        darkMode ? "subregion-filter dark-mode" : "subregion-filter"
      }
    >
      <select
        id="filter-subregion"
        className={
          darkMode
            ? "filter-subregion dark-mode"
            : "filter-subregion"
        }
        value={selectedSubregion}
        onChange={handleSubregionChange}
      >
        <option value="" disabled hidden selected>
          Filter by Sub-Region
        </option>
        {subRegions.map((subregion, index) => {
          return (
            <option key={index} value={subregion}>
              {subregion}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SubregionFilter;
