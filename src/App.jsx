import React, { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Search from './Components/Search'
import Countries from './Components/Countries'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => !prevDarkMode);
  };

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Search darkMode={darkMode}/>
      <Countries darkMode={darkMode}/>
    </div>
  );
}

export default App
