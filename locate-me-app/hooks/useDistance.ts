import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

// declare the coordinates type
interface Coordinates {
  latitude: number;
  longitude: number;
};

// define function to calculate distance based on haversine formula between 2 coordinates
const haversine = (coord1: Coordinates, coord2: Coordinates) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // return distance in km
};

// the default hook
const useDistance = (isRunning: boolean, onReset: boolean) => {
  const [totalDistance, setTotalDistance] = useState<number>(0);
  let previousLocation: Coordinates | null = null;

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    const requestPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted' && isRunning) {
        locationSubscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 10 },
          (location) => {
            if (previousLocation) {
              const distance = haversine(previousLocation, location.coords);
              setTotalDistance((prev) => prev + distance);
            }
            previousLocation = location.coords;
          }
        );
      }
    };

    requestPermissions();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (onReset) {
      setTotalDistance(0); // Reset distance
    }
  }, [onReset]);

  return totalDistance;
};

// export the useDistance hook
export default useDistance;