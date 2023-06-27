import React, { useEffect, useState } from 'react';

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching weather data based on IP address
    fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=auto:ip`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>Error loading weather data</div>;
  }

  return (
    <div>
      <h2>Current Weather</h2>
      <p>Location: {weatherData.location.name}, {weatherData.location.country}</p>
      <p>Temperature: {weatherData.current.temp_c}°C</p>
      <p>Condition: {weatherData.current.condition.text}</p>
      <img src={weatherData.current.condition.icon} alt="Weather Icon" />
    </div>
  );
}
