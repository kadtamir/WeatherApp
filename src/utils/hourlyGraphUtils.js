import moment from 'moment';

const getHours = (forecast) => {
  const hours = [];
  for (let i = 0; i < 25; i += 3) {
    hours.push(forecast[i]);
  }
  return hours;
};

export const getCategories = (forecast) => {
  const hours = getHours(forecast);
  return hours.map((hour) => moment.unix(hour.dt).format('HH:mm'));
};

export const getTemperatures = (forecast) => {
  const hours = getHours(forecast);
  return hours.map((hour) => Math.round(hour.temp));
};
