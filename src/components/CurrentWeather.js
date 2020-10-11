import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WeatherContext from "../context/weather/weatherContext";

const useStyles = makeStyles((theme) => ({
  separator: {
    padding: "2rem",
  },
  shadow: {
    background: "#dedede",
  },
}));

function createData(name, data) {
  return { name, data };
}

const CurrentWeather = () => {
  const weatherContext = useContext(WeatherContext);
  const classes = useStyles();

  if (weatherContext.currentWeather) {
    const { currentWeather } = weatherContext;

    const { weather, main, dt } = currentWeather;

    const unixToDate = () => {
      const date = new Date(dt * 1000);
      return date.toTimeString().slice(0, 9);
    };

    const rows = [
      createData("Sensación Térmica", `${main.feels_like} °C`),
      createData("Temperatura Mínima", `${main.temp_max} °C`),
      createData("Temperatura Máxima", `${main.temp_min} °C`),
      createData("Presión Atmosférica", `${main.pressure} hPa`),
      createData("Humedad", `${main.humidity} %`),
      createData("Actualizado", `${unixToDate().slice(0, 5)} hs`),
    ];

    return (
      <>
        <Grid container spacing={1} justify='center'>
          <Grid
            container
            item
            direction={"row"}
            justify='center'
            alignItems='center'
          >
            <Grid item>
              <img
                src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
                alt='Weather icon'
              />
            </Grid>
            <Divider orientation='vertical' flexItem />
            <Grid item>
              <Typography className={classes.separator} variant='h2'>
                {main.temp} °C
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            justify='center'
            direction={"column"}
            alignItems='center'
          >
            <Typography variant='h4'>
              {weather[0].description.charAt(0).toUpperCase() +
                weather[0].description.slice(1)}
            </Typography>
          </Grid>
          <TableContainer>
            <Typography
              variant='h3'
              align='center'
              className={classes.separator}
            >
              Detalles
            </Typography>

            <Table>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component='th' scope='row'>
                      {row.name}
                    </TableCell>
                    <TableCell align='right'>{row.data}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </>
    );
  }
  return <></>;
};

export default CurrentWeather;
