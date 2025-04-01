import { useState } from 'react';
import * as Location from 'expo-location';

// Interface for coordinates
interface Coordinates {
  latitude: number;
  longitude: number;
}

const useDistance = () => {
  const [totalDistance, setTotalDistance] = useState<number>(0); // Total distance in meter
  const [watchId, setWatchId] = useState<Location.LocationSubscription | null>(null); // Watch subscription ID
  const [previousLocation, setPreviousLocation] = useState<Coordinates | null>(null); // Previous location coordinates

  // Start tracking user location
  const startTracking = async (): Promise<void> => {
    // returns a subscription object (of type Location.LocationSubscription).
    const id = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10, // Update every 10 meter
      },
      (newLocation) => {
        const { latitude, longitude } = newLocation.coords;
        if (previousLocation) {
          const distance = getDistanceFromLatLon(
            previousLocation.latitude,
            previousLocation.longitude,
            latitude,
            longitude
          );
          setTotalDistance((prev) => prev + distance);
        }
        setPreviousLocation({ latitude, longitude });
      }
    );
    setWatchId(id);
  };

  // Stop tracking user location
  const stopTracking = (): void => {
    if (watchId) {
      // Stop watching
      watchId.remove();
      
      // Reset WatchId 
      setWatchId(null);
    }
  };

  /*
  Calculate distance between two coordinates
  -------------------
  Logic: 
    - First, the coordinates { lat, long } received from 'expo-location' module are decimal degrees
    - Convert to Radians = DecimalDegrees * Pi / 180
    - Apply Haversine formula
  */
  const getDistanceFromLatLon = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const toRad = (value: number): number => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1); // Delta in Radians of latitude
    const dLon = toRad(lon2 - lon1); // Delta in Radians of longitude
    // Apply Haversine formula to calculate distance
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
    // return R * c * 1000; // Distance in m
  };

  return { totalDistance, startTracking, stopTracking };
};

export default useDistance;
