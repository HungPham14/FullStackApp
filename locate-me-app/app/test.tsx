import { SafeAreaView } from "react-native-safe-area-context"; // safe area view, to avoid status bar
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';

// https://www.npmjs.com/package/react-native-countdown-component
const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(time => time + 1);
      }, 1000)};
      // }, 5000)};
    return () => clearInterval(timer);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  console.log('Time:', time);
  return (
    <SafeAreaView style={styles.parent_container}>
      <View style={styles.container}>
        <Text style={styles.time}>{formatTime(time)}</Text>
        {/* <Text style={styles.time}>{time}</Text> */}
        <Button onPress={startStop} title={isRunning ? "Stop" : "Start"} />
        <Button onPress={reset} title="Reset" />
      </View>
    </SafeAreaView>
  );
};


export default Stopwatch;



const styles = StyleSheet.create({
  parent_container: {
    flex: 1,
    marginTop:StatusBar.currentHeight,
    backgroundColor: "rgb(0, 0, 0)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
  },
  text: {
    color: 'rgb(255,255,255)', 
    fontSize: 70, 
    fontWeight:'bold',
  },
  time: {
    color: 'rgb(255,255,255)',
    fontSize: 48,
    marginBottom: 20,
  },
});

