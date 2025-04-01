// Import packages
import React, { useState } from 'react';
import { RadialGradient } from 'react-native-gradients'; // to create radial gradient
import { Link } from 'expo-router'; // import Link component from expo-router
import {
    Text
    , View
    , StyleSheet
    , StatusBar
    , Pressable
    , Dimensions
} from "react-native";
import MapView from "react-native-maps"; // view map
import { SafeAreaView } from "react-native-safe-area-context"; // safe area view, to avoid status bar

// custom hooks
import useLocation from "../hooks/useLocation"; // custom hook to get user location
import useTimer from '../hooks/useTimer';
import useDistance from '../hooks/useDistance';

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

// main root component
export default function runScreen() {

    // custom hook to get location
    const { latitude, longitude } = useLocation();

    // get window width and height
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    // radial gradient color list for the map
    const colorList = [
        { offset: '10%', color: 'transparent', opacity: '0' },
        { offset: '90%', color: 'black', opacity: '1' },
    ];

    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [onReset, setOnReset] = useState<boolean>(false);

    const elapsedTime = useTimer(isRunning, onReset);
    const totalDistance = useDistance(isRunning, onReset);

    const handleToggleTracking = () => {
        setIsRunning((prev) => !prev);
        setOnReset(false); // Ensure reset is turned off
    };

    const handleResetTracking = () => {
        setIsRunning(false);
        setOnReset(true); // Trigger reset
    };

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
                    {/* <Text style={styles.base_text}>{latitude}</Text> */}
                    <Text style={styles.bold_title}>{formatTime(elapsedTime)}</Text>
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
                    <RadialGradient x="50%" y="50%" rx="55%" ry="30%" colorList={colorList} />
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
                    }}>{totalDistance.toFixed(3)}
                    </Text>
                    <Text style={styles.base_text}>
                        Kilometers
                    </Text>
                </View>

                {/* level 2 child View component */}
                <Pressable
                    onPress={handleToggleTracking} // Tap to start/pause
                    onLongPress={handleResetTracking} // Long press to reset
                    style={{
                        backgroundColor: isRunning ? "rgb(255, 0, 0)" : "rgb(0, 255, 234)",
                        height: 120,
                        width: 120,
                        justifyContent: "center", // center content vertically
                        alignItems: "center", // center content horizontally
                        position: "absolute", // manually position by adjusting top, right, bottom, left
                        bottom: "9%",
                        left: windowWidth / 2 - 60,
                        borderRadius: 60,
                    }}
                >
                    <Text style={{ color: 'black', fontSize: 30, fontWeight: "bold" }}>
                        {isRunning ? 'Pause' : 'Start'}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

// styles declaration
const styles = StyleSheet.create({
    // parent container style
    parent_container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
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