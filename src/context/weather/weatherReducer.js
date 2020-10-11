import { SEARCH_WEATHER, GET_USER_LOCATION, SET_LOADING } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_WEATHER:
      return {
        ...state,
        currentWeather: action.payload.data,
        forecastWeather: action.payload.data2,
        loading: false,
      };
    case GET_USER_LOCATION:
      return {
        ...state,
        userLocation: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
