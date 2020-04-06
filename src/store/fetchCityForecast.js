import axios from 'axios';
import { createCity, addCityForecast } from './reducers/forecast';

const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'c526fda2a7190b4e95be928a550f3215';

export const fetchCityForecast = (city, dispatch) => {
  dispatch(createCity(city));

  axios
    .get(WEATHER_URL, {
      params: {
        appid: API_KEY,
        q: city,
      },
    })
    .then(({ data: { cod, list } }) => {
      if (cod !== '200') {
        return;
      }
      const forecast = list
        .filter(({ dt_txt }) => dt_txt.includes('09:00:00'))
        .reduce((result, { weather, dt_txt }) => {
          const [date] = dt_txt.split(' ');
          result[date] = weather[0].main;
          return result;
        }, {});
      dispatch(addCityForecast(city, forecast));
    })
    .catch((error) => {
      console.log(error);
    });
};
