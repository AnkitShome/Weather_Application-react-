import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import './index.css';

const apiKey = "033d61e69afa9ebc4881adf27e046b5f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat=";

function WeatherApp() {
   const [city, setCity] = useState("");
   const [weatherData, setWeatherData] = useState(null);
   const [error, setError] = useState(false);
   const [loading, setLoading] = useState(false);


   useEffect(() => {
      if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const { latitude, longitude } = position.coords;
               fetchWeatherByLocation(latitude, longitude);
            },
            (error) => {
               console.error("Error getting geolocation:", error);
            }
         );
      }
   }, []);


   const fetchWeather = async (city) => {
      setLoading(true);
      setError(false);
      try {
         const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
         if (response.status === 404) {
            setError(true);
            setWeatherData(null);
         } else {
            const data = await response.json();
            setWeatherData(data);
            setError(false);
         }
      } catch (error) {
         setError(true);
         console.error("Error fetching weather data:", error);
      } finally {
         setLoading(false);
      }
   };

   const fetchWeatherByLocation = async (lat, lon) => {
      setLoading(true);
      setError(false);
      try {
         const response = await fetch(`${geoApiUrl}${lat}&lon=${lon}&appid=${apiKey}`);
         const data = await response.json();
         setWeatherData(data);
      } catch (error) {
         console.error("Error fetching weather data by location:", error);
         setError(true);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="weather-app">
         <SearchBar city={city} setCity={setCity} fetchWeather={fetchWeather} />
         {loading && <p>Loading...</p>}
         {error && <p className="error">City not found or an error occurred!</p>}
         {weatherData && <WeatherDetails weatherData={weatherData} />}
      </div>
   );
}

export default WeatherApp;
