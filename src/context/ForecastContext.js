import React from 'react';
import axios from 'axios';
import { apiKeys } from '../utils/apiKeys';
import { initialForecast } from './initialState';

const ForecastContext = React.createContext();
const ForecastUpdateContext = React.createContext();

export function useForecast() {
  return [
    React.useContext(ForecastContext),
    React.useContext(ForecastUpdateContext),
  ];
}

export function ForecastProvider({ children }) {
  const [forecast, setForecast] = React.useState(initialForecast);

  const updateForecast = React.useCallback((lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&&appid=${apiKeys.openWeather}`
      )
      .then((response) => {
        setForecast(response.data);
      })
      .catch(() => alert('Error fetching forecast'));
  }, []);

  return (
    <ForecastContext.Provider value={forecast}>
      <ForecastUpdateContext.Provider value={updateForecast}>
        {children}
      </ForecastUpdateContext.Provider>
    </ForecastContext.Provider>
  );
}
