import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = (props) => {
  const { city, setCity, setWeatherData, setIsError, setIsLoading } = props;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );
      setWeatherData(response.data);
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
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex gap-2 justify-center">
      <div className="relative w-4/5">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
          className="py-2 pl-10 pr-5 rounded-3xl w-full"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
      </div>
      <button
        className="ml-2 w-[120px] bg-blue-500 rounded-xl text-white hover:bg-blue-600"
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
