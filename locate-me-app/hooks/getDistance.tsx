// import the necessary modules
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

// hook declaration
const getDistance = () => {
    // declare state variables
    const [errorMsg, setErrorMsg] = useState('');
    const [latitude, setLatitude] = useState(0); 
    const [longitude, setLongitude] = useState(0);
    const [distance, setdistance] = useState(0);
    const haversine = require('haversine');

    const getDistance = async () => {
        // request permission to access location while app is in foreground
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        // if permission is not granted, set error message and return early
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        
        // get the coordinates of the user's location
        let { coords } = await Location.getCurrentPositionAsync({});

        // set the longitude and latitude state variables
        setLongitude(coords.longitude);
        setLatitude(coords.latitude);

        // calculate the distance between the start and end coordinates
        // const distance = haversine(start, end, {unit: 'kilometer'});

        // call the watch_location function when the component is mounted
        const watch_location = async () => {
            // let location: Location.LocationSubscription
            let location = await Location.watchPositionAsync({
                // properties of the location object
                
                // Enable high accuracy for the best location data.
                accuracy: Location.Accuracy.High, // Accurate to within ten meters
                // accuracy: Location.Accuracy.Balanced, // Accurate to within a hundred meters
                // accuracy: Location.Accuracy.Low, // Accurate to within a kilometer

                // Receive updates only when the location has changed by at least this distance in meters.
                distanceInterval: 0.5,
                
                // Receive updates only when the location has changed by at least this time in milliseconds (1000 ms = 1 second).
                timeInterval: 1000,

                // Specifies whether to ask the user to turn on improved accuracy location mode which uses Wi-Fi, cell networks and GPS sensor.
                mayShowUserSettingsDialog: false,
            }
            // (parameter) location_update: Location.LocationObject
            , (location_update) => {
                // log the location update to the console
                console.log(location_update)

                // calculate the distance between the start and end coordinates
                const addDistance = haversine(
                    {latitude: latitude, longitude: longitude}, 
                    {latitude: location_update.coords.latitude, longitude: location_update.coords.longitude}, 
                    {unit: 'kilometer'}
                );
                // set the distance state variable
                setdistance(distance => distance + addDistance);
            });
        };
        
    };

    // call the getDistance function when the component is mounted
    useEffect(() => {
        getDistance();
    }, []);

    // return the state variables that will be used by the component
    return { distance , errorMsg };
};

// export the getDistance function
export default getDistance;