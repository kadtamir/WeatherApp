import rain from '../images/rain.png';
import thunder from '../images/thunder.png';
import snow from '../images/snow.png';
import mist from '../images/mist.png';
import tornado from '../images/tornado.png';
import wind from '../images/wind.png';
import sun from '../images/sun.png';
import dayCloud from '../images/day-cloud.png';
import daySemiCloud from '../images/day-semi-cloud.png';
import moon from '../images/moon.png';
import nightCloud from '../images/night-cloud.png';
import nightSemiCloud from '../images/night-semi-cloud.png';

const useWeatherIcon = (weather, hour) => {
  hour = parseInt(hour);
  const day = hour > 6 && hour < 18 ? true : false;
  switch (weather.main) {
    case 'Clear':
      return day ? sun : moon;
    case 'Snow':
      return snow;
    case 'Mist':
      return mist;
    case 'Smoke':
      return mist;
    case 'Haze':
      return mist;
    case 'Fog':
      return mist;
    case 'Sand':
      return mist;
    case 'Dust':
      return mist;
    case 'Ash':
      return mist;
    case 'Squall':
      return wind;
    case 'Tornado':
      return tornado;
    case 'Clouds':
      if (
        weather.description === 'overcast clouds' ||
        weather.description === 'broken clouds'
      ) {
        return day ? dayCloud : nightCloud;
      } else {
        return day ? daySemiCloud : nightSemiCloud;
      }
    case 'Thunderstorm':
      return thunder;
    case 'Rain':
      return rain;
    case 'Drizzle':
      return rain;
    default:
      return daySemiCloud;
  }
};

export default useWeatherIcon;
