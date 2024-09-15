
import { WiCloud, WiDaySunny, WiRain, WiSnow, WiFog, WiThunderstorm } from "react-icons/wi";

const WeatherIcon = ({ weatherCondition }) => {
   let IconComponent;

   switch (weatherCondition) {
      case "Clouds":
         IconComponent = WiCloud;
         break;
      case "Clear":
         IconComponent = WiDaySunny;
         break;
      case "Rain":
         IconComponent = WiRain;
         break;
      case "Snow":
         IconComponent = WiSnow;
         break;
      case "Mist":
      case "Fog":
         IconComponent = WiFog;
         break;
      case "Thunderstorm":
         IconComponent = WiThunderstorm;
         break;
      default:
         IconComponent = WiDaySunny; // Default to sunny
   }

   return <IconComponent className="weather-icon" size={64} />;
};

export default WeatherIcon;
