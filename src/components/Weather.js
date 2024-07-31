import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import notFound from "../assets/cityNotFound.jpg";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [city, setCity] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeatherData(response.data);
      console.log("response.data", response.data);
      setIsLoading(false);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setWeatherData(null);
      console.log("error", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await fetchData();
    setCity("");
    console.log("handle submit");
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const kelvinToCelcius = (temp) => (temp - 273.15).toFixed(2);

  return (
    <div className="bg-custom-gradient h-screen">
      <form onSubmit={handleSubmit}>
        <div className=" bg-orange-400 p-5">
          <input
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            className="p-2 rounded-md"
          />
          <button className="ml-2" type="submit" onClick={handleSubmit}>
            Search
          </button>
        </div>
      </form>
      {isLoading && !isError && <p>Loading...</p>}
      {isError && <img src={notFound} />}
      {weatherData && (
        <>
          <h1>City name : {weatherData.name}</h1>
          <h1> Temprature: {kelvinToCelcius(weatherData.main.temp)}°C</h1>
          <h1>Feels like : {kelvinToCelcius(weatherData.main.feels_like)}°C</h1>
          <h1>Humidity : {weatherData.main.humidity} %</h1>
          <h1>Description: {weatherData.weather[0].description}</h1>
          <h1>
            sunrise: {moment.unix(weatherData.sys.sunrise).format("h:mm A")}
          </h1>
          <h1>
            sunset: {moment.unix(weatherData.sys.sunset).format("h:mm A")}
          </h1>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </>
      )}
    </div>
  );
};

export default Weather;
