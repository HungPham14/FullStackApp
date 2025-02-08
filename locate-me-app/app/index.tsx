// Import packages
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
// import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import MapView, {Marker} from "react-native-maps";
// import { AppleMaps } from "expo-maps"; // this component can't be used in Expo Go.

// Export default function Index
export default function Index() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.baseText}>Latitude: </Text>
      <Text style={styles.baseText}>Longitude: </Text> */}
      {/* <MapView showsUserLocation={true}></MapView> */}
      <MapView
        style={styles.map}
        showsUserLocation={true}
      >
      </MapView>
      {/* <MapView style={styles.map}></MapView> */}
    </View>
    // <AppleMaps.View style={{ flex: 1 }} />
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