import React from 'react';
import axios from 'axios';
import { apiKeys } from '../utils/apiKeys';
import { initialLocation } from './initialState';

const LocationContext = React.createContext();
const LocationUpdateContext = React.createContext();

// Expose costum hook
export function useLocation() {
  return [
    React.useContext(LocationContext),
    React.useContext(LocationUpdateContext),
  ];
}

export function LocationProvider({ children }) {
  const [location, setLocation] = React.useState(initialLocation);

  const updateLocation = (city) => {
    // Get latitude & longitude from city name.
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKeys.google}&language=en`
      )
      .then((response) => {
        const { address_components, geometry } = response.data.results[0];
        if (/^\d+$/.test(address_components[0].long_name)) {
          throw new Error('No digits allowed');
        }
        setLocation({
          city: address_components[0].long_name,
          lat: geometry.location.lat,
          lon: geometry.location.lng,
          set: false,
        });
      })
      .catch(() => {
        alert('Could not find the address, please try different search term');
      });
  };

  // Initial location set up
  if (location.set) {
    //Location using browser geolocation
    window.navigator.geolocation.getCurrentPosition(
      // If the user allowed geolocation
      ({ coords }) => {
        // Get city name from latitude & longitude.
        const { latitude, longitude } = coords;
        axios
          .get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKeys.google}`
          )
          .then((response) => {
            const { address_components, geometry } = response.data.results[0];
            // Fix bug in mobile and Safari, abort the geolocation and set Tel aviv as deault.
            if (/^\d+$/.test(address_components[0].long_name)) {
              setLocation({ ...initialLocation, set: false });
              return;
            }
            setLocation({
              city: address_components[0].long_name,
              lat: geometry.location.lat,
              lon: geometry.location.lng,
              set: false,
            });
          })
          .catch(() => {
            alert(
              'Not all devices support getlocation, please use the search bar'
            );
          });
      }, // If the user declines geolocation or if its unavailable
      () => {
        axios
          .get(`https://ipinfo.io/json?token=${apiKeys.ipInfo}`)
          .then((res) => {
            const [lat, lon] = res.data.loc.split(',');
            setLocation({
              city: res.data.city,
              country: res.data.country,
              lat: parseFloat(lat),
              lon: parseFloat(lon),
            });
          })
          .catch(() => alert('Could not get location, please try again'));
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <LocationContext.Provider value={location}>
      <LocationUpdateContext.Provider value={updateLocation}>
        {children}
      </LocationUpdateContext.Provider>
    </LocationContext.Provider>
  );
}
