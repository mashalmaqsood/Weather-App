import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faCloudSun,
  faSun,
  faCloudMoon,
  faUpLong,
  faDownLong,
  faWind,
  faTemperatureThreeQuarters,
} from "@fortawesome/free-solid-svg-icons";
import sunrise from "../assets/sunrise.svg";
import sunset from "../assets/sunset.svg";

const WeatherDetails = ({ weatherData }) => {
  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);
  const details = [
    {
      value: `${kelvinToCelsius(weatherData.main.temp_max)}°C`,
      icon: faUpLong,
    },
    {
      value: `${kelvinToCelsius(weatherData.main.temp_min)}°C`,
      icon: faDownLong,
    },
    {
      label: "Feels like: ",
      value: `${kelvinToCelsius(weatherData.main.feels_like)}°C`,
      icon: faTemperatureThreeQuarters,
    },
    {
      label: "Humidity: ",
      value: `${weatherData.main.humidity} %`,
      icon: faDroplet,
    },
    {
      label: "Description: ",
      value: weatherData.weather[0].description,
      icon: faCloudSun,
    },
    {
      label: "Wind speed: ",
      value: `${weatherData.wind.speed} MPH`,
      icon: faWind,
    },
  ];

  return (
    <>
      <div className="bg-custom-gradient">
        <div className="flex flex-col sm:flex-row justify-evenly">
          <div className="text-base mb-2 flex flex-col items-center sm:items-start">
            <img src={sunrise} className="w-40 sm:w-72" />
            <div className="flex items-center mt-2">
              <span className="text-gray-600 font-semibold text-center">
                Sunrise:
              </span>
              <span className="text-white font-bold ml-2">
                {moment.unix(weatherData.sys.sunrise).format("h:mm A")}
                <FontAwesomeIcon icon={faSun} className="text-gray-600 ml-2" />
              </span>
            </div>
          </div>
          <div className="text-base mb-2 flex flex-col items-center sm:items-start">
            <img src={sunset} className="w-40 sm:w-72" />
            <div className="flex items-center mt-2">
              <span className="text-gray-600 font-semibold">Sunset:</span>
              <span className="text-white font-bold ml-2">
                {moment.unix(weatherData.sys.sunset).format("h:mm A")}
                <FontAwesomeIcon
                  icon={faCloudMoon}
                  className="text-gray-600 ml-2"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto p-7">
          <div className="w-full flex flex-col md:flex-row mt-5 bg-custom-gradient shadow-lg rounded-lg p-5 border-4 border-white justify-center">
            <div className="w-full md:w-1/2 text-center flex flex-col items-center justify-center p-5">
              <h1 className="text-3xl font-bold mb-2 text-white ">
                {weatherData.name}
              </h1>
              <img
                className="w-20 h-20"
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
              <h1 className="text-4xl mt-3 text-white font-bold">
                {kelvinToCelsius(weatherData.main.temp)}°C
              </h1>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="flex justify-center">
                <div className="w-full md:w-1/2 flex flex-col justify-center p-5">
                    {details.map((detail, index) => (
                      <div className="mb-2 flex items-center" key={index}>
                        <span className="text-gray-500 font-bold">
                          {detail.label}
                        <span className="text-white font-bold">
                          {detail.value}
                        </span>
                          <FontAwesomeIcon
                            icon={detail.icon}
                            className="text-gray-400 ml-2"
                          />
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherDetails;
