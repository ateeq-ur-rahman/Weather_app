import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'e9a73a72201f24db980516c07925af40'; // Replace with your actual API key

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeatherData();
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="city-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {weatherData && weatherData.cod === 200 ? (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherApp;
