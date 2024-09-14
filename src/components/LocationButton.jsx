import React from "react";
import { FaLocationArrow } from "react-icons/fa";

const LocationButton = ({ fetchWeatherByGeolocation }) => {
   const handleLocationClick = () => {
      if ("geolocation" in navigator) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const { latitude, longitude } = position.coords;
               fetchWeatherByGeolocation(latitude, longitude);
            },
            (error) => {
               console.error("Error getting geolocation:", error);
               alert("Unable to retrieve your location.");
            }
         );
      } else {
         alert("Geolocation is not supported by this browser.");
      }
   };

   return (
      <button onClick={handleLocationClick} className="location-button">
         <FaLocationArrow size={24} />
      </button>
   );
};

export default LocationButton;
