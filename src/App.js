import React from "react";
import Navbar from "./components/Navbar";
import Location from "./components/Location";
import { Container, Grid } from "@material-ui/core";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
import AlertComp from "./layout/AlertComp";
import Spinner from "./layout/Spinner";

import WeatherState from "./context/weather/WeatherState";
import AlertState from "./context/alert/AlertState";

import "./App.css";

function App() {
  return (
    <AlertState>
      <WeatherState>
        <Navbar />
        <AlertComp />
        <Spinner />

        <Container style={{ marginTop: "2rem" }}>
          <Location />

          <Grid container direction='row' spacing={6}>
            <Grid item md={6}>
              <CurrentWeather />
            </Grid>
            <Grid container item md={6} justify='center' direction='column'>
              <DailyForecast />
            </Grid>
          </Grid>
        </Container>
      </WeatherState>
    </AlertState>
  );
}

export default App;
