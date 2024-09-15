
const SearchBar = ({ city, setCity, fetchWeather }) => {
   return (
      <div className="search-bar">
         <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
               if (e.key === "Enter") fetchWeather(city);
            }}
         />
         <button onClick={() => fetchWeather(city)}>Search</button>
      </div>
   );
};

export default SearchBar;
