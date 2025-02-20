// import the necessary modules
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

// hook declaration
const useLocation = () => {
    // declare state variables
    const [errorMsg, setErrorMsg] = useState('');
    const [latitude, setLatitude] = useState(0); 
    const [longitude, setLongitude] = useState(0);

    const getUserLocation = async () => {
        // request permission to access location
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        // if permission is not granted, set error message and return early
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        
        // get the coordinates of the user's location
        let { coords } = await Location.getCurrentPositionAsync({});
        
        // if coordinates is available, set the longitude and latitude
        if (coords) {
            // destructure the coordinates object into latitude and longitude variables, they are two separate numbers
            const {latitude, longitude} = coords;

            // log the coordinates to the console
            // console.log('lat and long of user is: ',latitude,longitude);


            // set the longitude and latitude state variables
            setLongitude(longitude);
            setLatitude(latitude);
            
            // reverse geocode the location
            let response = await Location.reverseGeocodeAsync({
                latitude: latitude,
                longitude: longitude
            });
            
            // log the detail location to the console
            // console.log('User location: ', response);
        }
    };

    // call the getUserLocation function when the component is mounted
    useEffect(() => {
        getUserLocation();
    }, []);

    // return the state variables that will be used by the component
    return { latitude, longitude, errorMsg };
};

// export the useLocation function
export default useLocation;