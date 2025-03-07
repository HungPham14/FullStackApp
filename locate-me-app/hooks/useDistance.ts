import { useState } from 'react';
import * as Location from 'expo-location';

// Interface for coordinates
interface Coordinates {
  latitude: number;
  longitude: number;
}

const useDistance = () => {
  const [totalDistance, setTotalDistance] = useState<number>(0); // Total distance in km
  const [watchId, setWatchId] = useState<Location.LocationSubscription | null>(null); // Watch subscription ID
  const [previousLocation, setPreviousLocation] = useState<Coordinates | null>(null); // Previous location coordinates

  // Start tracking user location
  const startTracking = async (): Promise<void> => {
    const id = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // Update every second
        distanceInterval: 5, // Update every 5 meters
      },
      (newLocation) => {
        const { latitude, longitude } = newLocation.coords;
        if (previousLocation) {
          const distance = getDistanceFromLatLonInKm(
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
      watchId.remove();
      setWatchId(null);
    }
  };

  // Calculate distance between two coordinates
  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const toRad = (value: number): number => (value * Math.PI) / 180;
    const R = 6371; // Radius of Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return { totalDistance, startTracking, stopTracking };
};

export default useDistance;
