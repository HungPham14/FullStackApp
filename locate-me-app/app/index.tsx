// Import packages
import React from "react";
import { Link } from 'expo-router'; // import Link component from expo-router
// import { useEffect, useState, useCallback } from "react"; // react hooks
import {
  Text
  , View
  , StyleSheet
  , StatusBar
  // , TouchableOpacity
  // , Alert
  // , Modal
} from "react-native";
import MapView from "react-native-maps"; // view map
// import Geolocation from "@react-native-community/geolocation"; // get user location
// import type { GeolocationOptions } from '@react-native-community/geolocation';
import { SafeAreaView } from "react-native-safe-area-context"; // safe area view, to avoid status bar

// custom hooks
import useLocation from "../hooks/useLocation"; // custom hook to get user location

// main root component
export default function Index() {

  // custom hook to get location
  const { latitude, longitude, errorMsg } = useLocation();

  return (
    // parent View component
    <SafeAreaView style={styles.parent_container}>

      {/* level 1 child View component */}
      <View style={{
        backgroundColor: "rgb(255, 0, 0)",
        height: "10%",
        justifyContent: "center", // center content vertically
        alignItems: "center", // center content horizontally
        flexDirection: "row",
      }}>
        
        {/* level 2 child View component */}
        <View style={{
          backgroundColor: "rgb(0,0,0)", 
          height: "100%", 
          width: "30%",
          justifyContent: "center", // center content vertically
          alignItems: "center", // center content horizontally
          flexDirection: "column",
        }}>
          <Text style={styles.boldTitle}>00:05</Text>
          <Text style={styles.baseText}>Time</Text>
        </View>

        {/* level 2 child View component */}
        <View style={{ 
          backgroundColor: "rgb(0, 109, 156)", 
          height: "100%", 
          width: "30%",
          justifyContent: "center", // center content vertically
          alignItems: "center", // center content horizontally
          flexDirection: "column",
         }}>
          <Text style={styles.boldTitle}>00:05</Text>
          <Text style={styles.baseText}>Time</Text>
         </View>

        {/* level 2 child View component */}
        <View style={{
          backgroundColor: "rgb(157, 0, 147)", 
          height: "100%", 
          width: "30%",
          justifyContent: "center", // center content vertically
          alignItems: "center", // center content horizontally
          flexDirection: "column",
        }}>
          <Text style={styles.boldTitle}>00:05</Text>
          <Text style={styles.baseText}>Time</Text>
        </View>
      </View>

      {/* level 1 child View component */}
      <View style={
        {
          backgroundColor: "rgb(92, 92, 92)",
          height: "20%",
          justifyContent: "center", // center content vertically
          alignItems: "center", // center content horizontally
        }
      }>
        <Text style={styles.boldTitle}>5,03</Text>
        <Text style={styles.baseText}>Kilometers</Text>
      </View>

      
      {/* level 1 child View component */}
      <View style={{
        backgroundColor: "rgb(0, 0, 0)", // dark background
        height: "60%",
        flexDirection: "row", // column layout
        justifyContent: "center", // center content vertically
        alignItems: "center", // center content horizontally
      }}>

        <MapView
            style={styles.map}
            showsUserLocation={true}
            followsUserLocation={true}
            userLocationCalloutEnabled={true}
            // initial region
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0092,
              longitudeDelta: 0.0042,
            }}
          >
        </MapView>
      </View>

      {/* level 1 child View component */}
      <View style={{
        backgroundColor: "rgb(255, 0, 0)",
        height: "10%",
        justifyContent: "center", // center content vertically
        alignItems: "center", // center content horizontally
      }}>
        <Text style={styles.boldTitle}>Menu Bar</Text>
        <Link href="/test">View testing page</Link>
      </View>
    </SafeAreaView>
    


    

    // <View style={styles.container}>
    //   <TouchableOpacity onPress={() => console.log('lat and long of user is: ',latitude,longitude)}>
    //     <Text style={styles.baseText}>Press Me</Text>
    //   </TouchableOpacity>
    // </View>
  );
}

// styles declaration
const styles = StyleSheet.create({
  // parent container style
  parent_container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    backgroundColor: "rgb(64, 0, 255)",
  },
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
    opacity: 1,
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
    backgroundColor: "rgb(29, 29, 29)",
    opacity: 1,
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
    opacity: 0.8,
  },
});