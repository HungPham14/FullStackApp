// Import packages
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, {Marker} from "react-native-maps"; // view map
import Geolocation from "@react-native-community/geolocation"; // get user location
import type { GeolocationOptions } from '@react-native-community/geolocation';
import useLocation from "../hooks/useLocation"; // custom hook to get user location

// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// import { AppleMaps } from "expo-maps"; // this component can't be used in Expo Go.

// main component
export default function Index() {

  // get location from custom hook
  const { latitude, longitude, errorMsg } = useLocation();

  return (
    // render the map
    // <View style={styles.container}>
    //   <MapView
    //     style={styles.map}
    //     showsUserLocation={true}
    //     followsUserLocation={true}
    //     showsScale={true}
    //     userLocationCalloutEnabled={true}
    //   >
    //   </MapView>
    // </View>

    // render the user coordinates text
    <View style={styles.container}>
      <Text style={styles.baseText}>Testing Current User Location</Text>
      <Text style={styles.baseText}>latitude: {latitude}</Text>
      <Text style={styles.baseText}>longitude: {longitude}</Text>
      <TouchableOpacity onPress={() => console.log('lat and long of user is: ',latitude,longitude)}>
        <Text style={styles.baseText}>Press Me</Text>
      </TouchableOpacity>
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

  // map style
  map: {
    width: "100%",
    height: "100%",
  }
});