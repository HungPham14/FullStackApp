import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import useTimer from '../hooks/useTimer';
import useDistanceTracking from '../hooks/useDistance';

const RunScreen = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [onReset, setOnReset] = useState<boolean>(false);

  const elapsedTime = useTimer(isRunning, onReset);
  const totalDistance = useDistanceTracking(isRunning, onReset);

  const handleToggleTracking = () => {
    setIsRunning((prev) => !prev);
    setOnReset(false); // Ensure reset is turned off
  };

  const handleResetTracking = () => {
    setIsRunning(false);
    setOnReset(true); // Trigger reset
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
        onPress={handleToggleTracking} // Tap to start/pause
        onLongPress={handleResetTracking} // Long press to reset
        style={{
          backgroundColor: isRunning ? 'red' : 'green',
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18 }}>
          {isRunning ? 'Pause' : 'Start'}
        </Text>
      </Pressable>
      <Text style={{ marginTop: 20, fontSize: 18 }}>Distance: {totalDistance} m</Text>
      {/* <Text style={{ marginTop: 20, fontSize: 18 }}>Distance: {totalDistance.toFixed(3)} km</Text> */}
      <Text style={{ marginTop: 10, fontSize: 18 }}>Time: {elapsedTime} sec</Text>
    </View>
  );
};

export default RunScreen;