// Import packages
import React from "react";
import { RadialGradient } from 'react-native-gradients'; // to create radial gradient
import { Link } from 'expo-router'; // import Link component from expo-router
import {
  Text
  , View
  , StyleSheet
  , StatusBar
  , TouchableOpacity
  , Dimensions
} from "react-native";
import MapView from "react-native-maps"; // view map
import { SafeAreaView } from "react-native-safe-area-context"; // safe area view, to avoid status bar

// custom hooks
import useLocation from "../hooks/useLocation"; // custom hook to get user location
import getDistance from "../hooks/getDistance"; // custom hook to get distance

// main root component
export default function Index() {

  // custom hook to get location
  const { latitude, longitude } = useLocation();
  // custom hook to get distance
  const { totalDistance } = getDistance();
  // get window width and height
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  // radial gradient color list for the map
  const colorList = [
    {offset: '10%', color: 'transparent', opacity: '0'},
    {offset: '90%', color: 'black', opacity: '1'},
  ]

  return (
    // parent View component
    <SafeAreaView style={styles.parent_container}>

      {/* level 1 child View component */}
      <View style={{
        backgroundColor: "rgb(0, 0, 0)",
        height: "15%",
        justifyContent: "center", // center content vertically
        alignItems: "center", // center content horizontally
        flexDirection: "row",
        gap: "2.5%",
        paddingVertical: "2.5%",
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
          {/* {new Date().getTime()} */}
          <Text style={styles.bold_title}>00:00</Text> 
          <Text style={styles.base_text}>Time</Text>
        </View>

        {/* level 2 child View component */}
        <View style={{ 
          backgroundColor: "rgb(0, 0, 0)", 
          height: "100%", 
          width: "30%",
          justifyContent: "center", // center content vertically
          alignItems: "center", // center content horizontally
          flexDirection: "column",
         }}>
          {/* <Text style={styles.base_text}>{latitude}</Text> */}
          <Text style={styles.bold_title}>--</Text> 
          <Text style={styles.base_text}>Speed</Text>
         </View>

        {/* level 2 child View component */}
        <View style={{
          backgroundColor: "rgb(0, 0, 0)", 
          height: "100%", 
          width: "30%",
          justifyContent: "center", // center content vertically
          alignItems: "center", // center content horizontally
          flexDirection: "column",
        }}>
          {/* <Text style={styles.base_text}>{longitude}</Text> */}
          <Text style={styles.bold_title}>--</Text> 
          <Text style={styles.base_text}>BPM</Text>
        </View>
      </View>

      {/* level 1 child View component */}
      <View style={{
        backgroundColor: "rgb(0, 0, 0)", // dark background
        height: "85%",
        flexDirection: "column", // column layout
      }}>
        
        {/* level 2 child View component */}
        <MapView
            style={{
              width: "100%",
              height: "100%",
              // opacity: 0.9,
              position: "absolute", // manually position by adjusting top, right, bottom, left
            }}
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
            <RadialGradient x="50%" y="50%" rx="60%" ry="40%" colorList={colorList}/>
        </MapView>

        {/* level 2 child View component */}
        <View style={
          {
            backgroundColor: "rgba(255, 0, 221, 0)",
                height: windowHeight / 5,
                width: "100%",
                justifyContent: "center", // center content vertically
                alignItems: "center", // center content horizontally
                position: "absolute", // manually position by adjusting top, right, bottom, left
                top: 0,
          }
        }>
          {/* <Text style={styles.bold_title}>{parseFloat(totalDistance.toPrecision(4))}</Text> */}
          <Text style={{
              fontWeight: "bold",
              color: "rgb(255, 255, 255)",
              fontSize: 100,
            }}>{parseFloat((totalDistance / 1000).toPrecision(3))}
          </Text>
          <Text style={styles.base_text}>
            Kilometers
          </Text>
        </View>

        {/* level 2 child View component */}
        <View style={{
              backgroundColor: "rgb(0, 255, 234)",
              height: 120,
              width: 120,
              justifyContent: "center", // center content vertically
              alignItems: "center", // center content horizontally
              position: "absolute", // manually position by adjusting top, right, bottom, left
              bottom: "9%",
              left: windowWidth / 2 - 60,
              borderRadius: 60,
            }}>
              <Link href="/test">
                {/* Should be replaced with an icon */}
                <Text style={{
                    fontWeight: "bold",
                    color: "rgb(0, 0, 0)",
                    fontSize: 35,
                    // backgroundColor: "rgb(161, 161, 161)",
                    textAlignVertical: 'center',
                    textAlign: 'center',
                  }}>
                    Stop
                </Text>
              </Link>
          {/* <TouchableOpacity
            // onPress={() => this.props.navigation.navigate('test')}
            >
            <Text style={styles.bold_title}>Start</Text>
          </TouchableOpacity> */}
        </View>

      </View>
    </SafeAreaView>
  );
}

// styles declaration
const styles = StyleSheet.create({
  // parent container style
  parent_container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    backgroundColor: "rgb(0, 0, 0)",
  },

  // text style
  base_text: {
    color: "rgb(255, 255, 255)",
    fontSize: 15,
    // fontWeight: "bold",
  },

  bold_text: {
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
    fontSize: 15,
  },

  bold_title: {
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
    fontSize: 40,
  },
});