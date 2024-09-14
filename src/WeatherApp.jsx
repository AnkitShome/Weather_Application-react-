import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import LocationButton from "./components/LocationButton";
import './index.css';

const apiKey = "033d61e69afa9ebc4881adf27e046b5f";
const geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const WeatherApp = () => {
   const [city, setCity] = useState("");
   const [weatherData, setWeatherData] = useState(null);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   const fetchWeather = async (city) => {
      setLoading(true);
      setError(null);

      if (!city.trim()) {
         setError("Please enter a city name.");
         setWeatherData(null);
         setLoading(false);
         return;
      }

      try {
         const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
         if (response.status === 404) {
            setError("City not found.");
            setWeatherData(null);
         } else {
            const data = await response.json();
            setWeatherData(data);
            setError(null);
         }
      } catch (error) {
         setError("An error occurred while fetching weather data.");
         setWeatherData(null);
      } finally {
         setLoading(false);
      }
   };

   const fetchWeatherByGeolocation = async (lat, lon) => {
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${geoApiUrl}${lat}&lon=${lon}&appid=${apiKey}`);
         const data = await response.json();
         setWeatherData(data);
         setError(null);
      } catch (error) {
         setError("An error occurred while fetching weather data by geolocation.");
         console.error("Error fetching weather data by geolocation:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="weather-app">
         <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
         <LocationButton fetchWeatherByGeolocation={fetchWeatherByGeolocation} />
         {loading && <p>Loading...</p>}
         {error && <p className="error">{error}</p>}
         {weatherData && <WeatherDetails weatherData={weatherData} />}
      </div>
   );
};

export default WeatherApp;
