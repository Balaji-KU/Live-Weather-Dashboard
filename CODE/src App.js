import React, { useState } from "react";
import WeatherCard from "./WeatherCard";
import ForecastChart from "./ForecastChart";
import "./styles.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const resp = await fetch(`/api/weather?q=${city}`);
      const json = await resp.json();
      if (json.error) {
        setError(json.error);
        setData(null);
      } else {
        setData(json);
        setError(null);
      }
    } catch (e) {
      setError("Error fetching data");
      setData(null);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeather();
    }
  };

  return (
    <div className="App">
      <h1>Live Weather Dashboard</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {data && (
        <>
          <WeatherCard current={data.current} />
          <ForecastChart forecast={data.forecast} />
        </>
      )}
    </div>
  );
}

export default App;
