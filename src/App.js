import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./components/SearchEngine";
import Forecast from "./components/Forecast";
import "./styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false,
  });
  const [forecast, setForecast] = useState([]);

  // Determine the background class based on weather conditions
  const getBackgroundClass = () => {
    if (!weather.data.condition) return "App"; // Default

    const description = weather.data.condition.description.toLowerCase();

    if (description.includes("clear")) return "clear-weather";
    if (description.includes("cloud")) return "cloudy-weather";
    if (description.includes("rain")) return "rainy-weather";
    if (description.includes("snow")) return "snowy-weather";
    
    return "App"; // Default
  };

  // Search function to fetch weather data based on user query
  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true });
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const currentUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}`;
      const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}&units=metric`;

      try {
        const [currentRes, forecastRes] = await Promise.all([
          axios.get(currentUrl),
          axios.get(forecastUrl),
        ]);

        setWeather({ data: currentRes.data, loading: false, error: false });
        setForecast(forecastRes.data.daily);
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        setForecast([]);
        console.log("error", error);
      }
    }
  };

  // Fetch default data for Mumbai on mount
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "b03a640e5ef6980o4da35b006t5f2942";
      const currentUrl = `https://api.shecodes.io/weather/v1/current?query=Mumbai&key=${apiKey}`;
      const forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=Mumbai&key=${apiKey}&units=metric`;

      try {
        const [currentRes, forecastRes] = await Promise.all([
          axios.get(currentUrl),
          axios.get(forecastUrl),
        ]);

        setWeather({ data: currentRes.data, loading: false, error: false });
        setForecast(forecastRes.data.daily);
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        setForecast([]);
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`App ${getBackgroundClass()}`}>
      {/* Pass search, query, and setQuery to SearchEngine */}
      <SearchEngine query={query} setQuery={setQuery} search={search} />
      
      {weather.loading && <h4>Searching..</h4>}
      {weather.error && <span className="error-message">Sorry, city not found. Please try again.</span>}
      
      {weather.data && weather.data.condition && (
        <Forecast weather={weather} forecast={forecast} />
      )}
    </div>
  );
}

export default App;
