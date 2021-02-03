import React, { useReducer, useEffect, useCallback, useContext } from "react";
import { SEARCH_WEATHER, GET_USER_LOCATION, SET_LOADING } from "../../types";
import WeatherContext from "./weatherContext";
import WeatherReducer from "./weatherReducer";
import AlertContext from "../alert/alertContext";

const WeatherState = (props) => {
  const initialState = {
    loading: false,
    currentWeather: null,
    forecastWeather: null,
    userLocation: {
      lat: null,
      lon: null,
      city: "",
      countryName: "",
      countryCode: "",
    },
  };

  const [state, dispatch] = useReducer(WeatherReducer, initialState);

  const { city, countryCode, lat, lon } = state.userLocation;
  //const { lat, lon } = state.userLocation;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // Fetch Current Weather data from API, then use data to do a 2nd fetch
  const searchWeatherData = useCallback(
    async (cityName = "", country = "", lat = null, lon = null) => {
      //async (lat, lon) => {
      setLoading();
      try {
        let url;
        if (!lat || !lon) {
          url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${country}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric&lang=es`;
        } else {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric&lang=es`;
        }
        const res = await fetch(url);

        if (res.ok) {
          const data = await res.json();

          const res2 = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&&appid=${process.env.REACT_APP_OPENWEATHER_API}&units=metric&lang=es`
          );
          const data2 = await res2.json();
          setLoading(false);
          dispatch({
            type: SEARCH_WEATHER,
            payload: { data, data2 },
          });
        } else {
          setAlert((alert) => res.statusText, "error");
        }
      } catch (error) {
        console.log(error);
        setAlert(error, "error");
      }
    },
    [setAlert]
  );

  // Get location info from user
  useEffect(() => {
    const getUserLocation = async () => {
      // const url = `https://api.ipstack.com/check?access_key=${process.env.REACT_APP_GEOLOCATION_API}`;
      // const res = await fetch(url);
      // const data = await res.json();
      // dispatch({
      //   type: GET_USER_LOCATION,
      //   payload: {
      //     countryName: data.country_name,
      //     countryCode: data.country_code,
      //     city: data.city,
      //     lat: data.latitude,
      //     lon: data.longitude,
      //   },
      // });
      navigator.geolocation.getCurrentPosition((pos) => {
        dispatch({
          type: GET_USER_LOCATION,
          payload: {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          },
        });
      });
    };
    getUserLocation();
  }, []);

  //Search weather from user location
  useEffect(() => {
    // if (city.length > 0) {
    // searchWeatherData(city, countryCode);
    if (lat && lon) {
      searchWeatherData(city, countryCode, lat, lon);
    } else {
    }
  }, [lat, lon, city, countryCode, searchWeatherData]);
  // }, [city, countryCode, searchWeatherData]);

  // set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <WeatherContext.Provider
      value={{
        currentWeather: state.currentWeather,
        forecastWeather: state.forecastWeather,
        userLocation: state.userLocation,
        searchWeatherData,
        setLoading,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherState;
