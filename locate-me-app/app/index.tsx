// Import packages
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import MapView, {Marker} from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import type { GeolocationOptions } from '@react-native-community/geolocation';
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// import { AppleMaps } from "expo-maps"; // this component can't be used in Expo Go.

// state to hold location
// const [location, setLocation] = useState<string | null>(null);

// log and set location with user location if successful
// const getCurrentLocation = () => {
//   Geolocation.getCurrentPosition(
//     (position) => {
//       console.log(position);
//       // set position type to string and set state
//       setLocation(JSON.stringify(position));
//     },
//     (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error))
//     ,
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   )
// };

// Preview User Location with Geolocation
// export default function Index() {
//   return (
//     <View>
//       <Text>Testing Current User Location</Text>
//       <Text style={styles.baseText}>Position: </Text>{location || 'unknown'}
//       <Button title="Test" onPress={getCurrentLocation} />
//     </View>
//   )
// };

// Preview Map with User Location
export default function Index() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        showsScale={true}
        userLocationCalloutEnabled={true}
      >
      </MapView>
    </View>
  );
}

// styles declaration
const styles = StyleSheet.create({

  // container style
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },

  // text style
  baseText: {
    color: "#ffffff",
  },

  map: {
    width: "100%",
    height: "100%",
  }
});