import React, { useState } from "react";
import { Typography, Grid, Paper, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DayModal from "./DayModal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

// Date converter
const unixToDate = (unix) => {
  const options = { weekday: "long", day: "numeric" };
  const date = new Date(unix * 1000);
  const espDate = date.toLocaleDateString("es-ES", options);
  return espDate.charAt(0).toUpperCase() + espDate.slice(1);
};

const DayFcast = ({ temp, weather, time, feel, humidity, pressure }) => {
  // cOnfig del modal de material ui
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [dayId, setDayId] = useState(null);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Paper
        style={{ margin: "0.5rem 0", cursor: "pointer" }}
        onClick={() => {
          setDayId(time);
          handleOpen();
        }}
      >
        <Grid
          container
          item
          direction={"row"}
          alignItems='center'
          justify='center'
          xs={12}
        >
          <Grid item xs={3}>
            <Typography variant='subtitle2' align='center'>
              {unixToDate(time)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <img
              src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt='Weather icon'
            />
          </Grid>
          <Grid item xs={3}>
            <Typography variant='subtitle2' align='center'>
              {weather[0].description.charAt(0).toUpperCase() +
                weather[0].description.slice(1)}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant='h6' align='center'>
              {temp.day} °C
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Modal
        open={open}
        onClose={() => {
          setDayId(null);
          handleClose();
        }}
      >
        <div style={modalStyle} className={classes.paper}>
          <DayModal
            feel={feel}
            humidity={humidity}
            weather={weather}
            temp={temp}
            pressure={pressure}
          />
        </div>
      </Modal>
    </>
  );
};

export default DayFcast;
