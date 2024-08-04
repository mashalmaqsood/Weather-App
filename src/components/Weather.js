import { useState } from "react";
import Search from "./Search";
import WeatherDetails from "./WeatherDetails";
import NotFound from "./NotFound";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [city, setCity] = useState("");

  return (
    <>
      <div className="px-2 py-3">
        <Search
          setWeatherData={setWeatherData}
          city={city}
          setCity={setCity}
          setIsLoading={setIsLoading}
          setIsError={setIsError}
        />
      </div>
      {isLoading && !isError && (
        <div className="w-full h-full flex justify-center items-center animate-bounce">
          <svg
            className="animate-spin h-5 w-5 mr-3 border-white border-2"
            viewBox="0 0 24 24"
          ></svg>
          <h1 className="text-white text-2xl font-semibold ">Loading....</h1>
        </div>
      )}
      {isError && <NotFound/>}
      {weatherData && <WeatherDetails weatherData={weatherData} />}
      </>
  );
};

export default Weather;
