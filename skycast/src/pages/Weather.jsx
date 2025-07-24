import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Weather() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get('city');

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_KEY = "d160e2908c7d4290a75180856252107";

  useEffect(() => {
    if (city) {
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [city]);

  const temperatureF = useMemo(() => {
    if (data) {
      return (data.current.temp_c * 9 / 5 + 32).toFixed(2);
    }
    return null;
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Weather data not found.</p>;

  return (
    <div className="weather-container">
      <h2>Weather in {data.location.name}</h2>
      <div className="card">
        <p> Temperature: {data.current.temp_c}°C / {temperatureF}°F</p>
        <p> Humidity: {data.current.humidity}%</p>
        <p> Wind Speed: {data.current.wind_kph} km/h</p>
        <p> Condition: {data.current.condition.text}</p>
      </div>
    </div>
  );
}

export default Weather;
