
import WeatherIcon from "./WeatherIcon";

const WeatherDetails = ({ weatherData }) => {
   return (
      <div className="weather-details">
         <h2>{weatherData.name}</h2>
         <p>Temperature: {Math.round(weatherData.main.temp)}℃</p>
         <p>Feels like: {Math.round(weatherData.main.feels_like)}℃</p>
         <p>Humidity: {weatherData.main.humidity}%</p>
         <p>Wind Speed: {weatherData.wind.speed} km/h</p>
         <WeatherIcon weatherCondition={weatherData.weather[0].main} />
      </div>
   );
};

export default WeatherDetails;
