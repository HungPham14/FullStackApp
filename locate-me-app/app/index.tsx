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
        opacity: 0.6, // set opacity to 0.6 (60%) to make the map a bit transparent
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
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title="User Location"
            description="This is the user's location"
          />
        </MapView>
      </ReAnimatedView.View>
    </View>
    

    // render the user coordinates text
    // <View style={styles.container}>
    //   <Text style={styles.baseText}>Testing Current User Location</Text>
    //   <Text style={styles.baseText}>latitude: {latitude}</Text>
    //   <Text style={styles.baseText}>longitude: {longitude}</Text>
    //   <TouchableOpacity onPress={() => console.log('lat and long of user is: ',latitude,longitude)}>
    //     <Text style={styles.baseText}>Press Me</Text>
    //   </TouchableOpacity>
    // </View>
  );
}

// styles declaration
const styles = StyleSheet.create({

  // container style
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "rgba(0, 0, 0, 0.13)",
  // },

  // text style
  baseText: {
    color: "rgb(255, 255, 255)",
    // fontSize: 10,
    // fontWeight: "bold",
  },

  // map style
  map: {
    // flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "rgb(0, 0, 0)",
  },
});