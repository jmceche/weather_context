import React, { Fragment, useContext } from "react";
import DayFCast from "./DayFcast";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import WeatherContext from "../context/weather/weatherContext";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "auto",
  },

  separation: {
    padding: "2rem",
  },
  margin: {
    margin: "2rem",
  },
}));

const DailyForecast = () => {
  const weatherContext = useContext(WeatherContext);
  const { forecastWeather } = weatherContext;
  const classes = useStyles();

  return (
    <Fragment>
      {forecastWeather && (
        <>
          <Typography
            variant='h4'
            align='center'
            className={classes.separation}
          >
            Próximos días
          </Typography>
          <Grid
            item
            container
            direction={"column"}
            justify='center'
            spacing={1}
          >
            {forecastWeather.daily.map((day) => (
              <DayFCast
                key={day.dt}
                time={day.dt}
                temp={day.temp}
                feel={day.feels_like}
                humidity={day.humidity}
                weather={day.weather}
                pressure={day.pressure}
              />
            ))}
          </Grid>
        </>
      )}
    </Fragment>
  );
};

export default DailyForecast;
