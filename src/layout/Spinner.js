import React, { useContext } from "react";
import spinner from "./spinner_transparent.gif";
import { Grid } from "@material-ui/core";
import WeatherContext from "../context/weather/weatherContext";

const Spinner = () => {
  const weatherContext = useContext(WeatherContext);
  return weatherContext.loading ? (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='center'
      style={{ height: "100vh" }}
    >
      <Grid item>
        <img src={spinner} alt='loading...' />
      </Grid>
    </Grid>
  ) : null;
};

export default Spinner;
