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
        // request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        // if permission is not granted, set error message and return early
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        
        // get the coordinates of the user's location
        let { coords } = await Location.getCurrentPositionAsync({});
        
        // destructure the coordinates object into latitude and longitude variables, they are two separate numbers
        const {latitude, longitude} = coords;

        // set the longitude and latitude state variables
        setLongitude(longitude);
        setLatitude(latitude);

        // set the start and end coordinates
        const start = {
            latitude: latitude,
            longitude: longitude
        };

        // 29 2A street
        const end = {
            latitude: 10.7206300,
            longitude: 106.6858287
        };
            
        // calculate the distance between the start and end coordinates
        const distance = haversine(start, end, {unit: 'kilometer'});

        // set the distance state variable
        setdistance(distance);
    };

    // call the getDistance function when the component is mounted
    useEffect(() => {
        getDistance();
    }, []);

    // return the state variables that will be used by the component
    return { distance };
};

// export the getDistance function
export default getDistance;