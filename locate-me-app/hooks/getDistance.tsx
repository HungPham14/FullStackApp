// import the necessary modules
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

// hook declaration
const getDistance = () => {
    // declare state variables
    const [totalDistance, setTotalDistance] = useState<number>(0);
    const [previousLatitude, setPreviousLatitude] = useState<number>(0);
    const [previousLongitude, setPreviousLongitude] = useState<number>(0);
    const [currentLatitude, setCurrentLatitude] = useState<number>(0);
    const [currentLongitude, setCurrentLongitude] = useState<number>(0);
    const haversine = require('haversine');

    // Request foreground permissions when the component mounts
    useEffect(() => {
        const requestPermissions = async () => {
        try {
            await Location.requestForegroundPermissionsAsync();
            if (previousLatitude === 0 || previousLongitude === 0) {
                let {coords} = await Location.getCurrentPositionAsync({});
                // setPreviousLatitude(parseFloat(coords.latitude.toPrecision(7)));
                // setPreviousLongitude(parseFloat(coords.longitude.toPrecision(7)));
                setPreviousLatitude(coords.latitude);
                setPreviousLongitude(coords.longitude);
            }
            setupLocationListener();
        } catch (error) {
            console.error('Error requesting permissions:', error);
        }
        };
        requestPermissions();
    }, []);

    // Set up a location listener to calculate distance
    const setupLocationListener = async () => {
        Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.High, // use high accuracy for the best location data
                distanceInterval: 10, // update every 10 meter
            },
            (location) => {
                    setCurrentLatitude(location.coords.latitude);
                    setCurrentLongitude(location.coords.longitude);
                    // setCurrentLatitude(parseFloat(location.coords.latitude.toPrecision(7)));
                    // setCurrentLongitude(parseFloat(location.coords.longitude.toPrecision(7)));
                    if (currentLatitude !== previousLatitude || currentLongitude !== previousLongitude) {
                        setTotalDistance(totalDistance => totalDistance + haversine(
                            {latitude: previousLatitude, longitude: previousLongitude},
                            {latitude: currentLatitude, longitude: currentLongitude},
                            {unit: 'kilometer'}
                        ));
                        // setTotalDistance(totalDistance => totalDistance + 1);
                        setPreviousLatitude(currentLatitude);
                        setPreviousLongitude(currentLongitude);
                    }
                }
        );
    };

    // return the state variables that will be used by the component
    console.log('Total distance:', totalDistance);
    console.log('Current latitude: ', currentLatitude);
    console.log('Previous latitude: ', previousLatitude);
    console.log('Current longitude: ', currentLongitude);
    console.log('Previous longitude: ', previousLongitude);
    return { totalDistance };
};

// export the getDistance function
export default getDistance;