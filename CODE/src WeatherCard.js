import React from "react";

const WeatherCard = ({ current }) => {
  return (
    <div className="weather-card">
      <h2>
        {current.name}, {current.sys.country}
      </h2>
      <p>Temperature: {current.main.temp} °C</p>
      <p>Humidity: {current.main.humidity} %</p>
      <p>Wind: {current.wind.speed} m/s</p>
      <p>Weather: {current.weather[0].description}</p>
    </div>
  );
};

export default WeatherCard;
