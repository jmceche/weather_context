import React from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const DayModal = ({ feel, humidity, weather, temp, pressure }) => {
  const rows = [
    createData("Sensación Térmica", `${feel.day} °C`),
    createData("Temperatura Mínima", `${temp.min} °C`),
    createData("Temperatura Máxima", `${temp.max} °C`),
    createData("Presión Atmosférica", `${pressure} hPa`),
    createData("Humedad", `${humidity} %`),
  ];

  const classes = useStyles();
  return (
    <Grid container spacing={1} direction='column' justify='center'>
      <Grid item xs={12} align='center'>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`}
          alt='Weather icon'
        />
      </Grid>

      <Grid item xs={12} align='center'>
        <Typography className={classes.separator} align='center' variant='h2'>
          {temp.day} °C
        </Typography>
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
  );
};

export default DayModal;
