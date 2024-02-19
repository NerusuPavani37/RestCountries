import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Search from "./Components/Search";
import { ThemeProvider } from "./Components/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <Search />
      </div>
    </ThemeProvider>
  );
}

export default App;
