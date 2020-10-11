import React from "react";
import { Typography } from "@material-ui/core";
import WeatherContext from "../context/weather/weatherContext";
import { useContext } from "react";
import Spinner from "../layout/Spinner";

const Location = () => {
  const weatherContext = useContext(WeatherContext);
  const { currentWeather } = weatherContext;
  if (currentWeather) {
    return (
      <Typography variant='h2' align='center'>
        {`${currentWeather.name}, ${currentWeather.sys.country}`}
      </Typography>
    );
  }
  return <Spinner />;
};

export default Location;
