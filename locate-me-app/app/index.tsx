// Import packages
import React from "react";
// import { useEffect, useState, useCallback } from "react"; // react hooks
import {
  Text
  , View
  , StyleSheet
  // , TouchableOpacity
  // , Alert
  // , Modal
  // , BlurView
} from "react-native";
import MapView from "react-native-maps"; // view map
import {Marker} from "react-native-maps"; // add marker to map

import ReAnimatedView from "react-native-reanimated"; // animate view
import { useAnimatedStyle } from "react-native-reanimated"; // animate map
// import Geolocation from "@react-native-community/geolocation"; // get user location
// import type { GeolocationOptions } from '@react-native-community/geolocation';

// custom hooks
import useLocation from "../hooks/useLocation"; // custom hook to get user location

// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
// import { AppleMaps } from "expo-maps"; // this component can't be used in Expo Go.

// main component
export default function Index() {

  // custom hook to get location
  const { latitude, longitude, errorMsg } = useLocation();

  // custom hook to animate view
  const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: 1, // set opacity to 0.6 (60%) to make the map a bit transparent
        transform: [{ scale: 1 }]
      };
    });
  
  return (
    // create black background
    <View style={{
      backgroundColor: "rgb(0, 0, 0)", // dark background
      flexDirection: "column", // column layout
      justifyContent: "center", // center content vertically
    }}>
      <ReAnimatedView.View style={animatedStyle}>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsScale={true}
          userLocationCalloutEnabled={true}
          // initial region
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            // latitudeDelta: 0.0922,
            latitudeDelta: 0.0092,
            // longitudeDelta: 0.0421,
            longitudeDelta: 0.0042,
          }}
        >
          <View style={styles.container_top}>
            <Text style={styles.boldTitle}>Distance</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.boldText}>Testing Current User Location</Text>
            <Text style={styles.baseText}>latitude: {latitude}</Text>
            <Text style={styles.baseText}>longitude: {longitude}</Text>
          </View>
        </MapView>
      </ReAnimatedView.View>
    </View>
    

    // <View style={styles.container}>
    //   <TouchableOpacity onPress={() => console.log('lat and long of user is: ',latitude,longitude)}>
    //     <Text style={styles.baseText}>Press Me</Text>
    //   </TouchableOpacity>
    // </View>
  );
}

// styles declaration
const styles = StyleSheet.create({

  // container style
  container: {
    flex: 1,
    position: "absolute",
    width: "70%",
    height: "10%",
    top: 500, 
    left: 10, 
    // right: 0, 
    // bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(29, 29, 29)",
  },

  container_top: {
    flex: 1,
    position: "absolute",
    // width: "70%",
    // height: "10%",
    width: "auto",
    height: "auto",
    top: 200, 
    left: 120, 
    // right: 0, 
    // bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(29, 29, 29, 0)",
  },

  // text style
  baseText: {
    color: "rgb(255, 255, 255)",
    // fontSize: 15,
    // fontWeight: "bold",
  },

  boldText: {
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
    fontSize: 15,
  },

  boldTitle: {
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
    fontSize: 35,
  },

  // map style
  map: {
    // flex: 1,
    // position: "absolute",
    width: "100%",
    height: "100%",
    // backgroundColor: "rgb(0, 0, 0)",
  },
});