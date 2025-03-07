import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import useDistance from '../hooks/useDistance';

const RunScreen: React.FC = () => {
  const { totalDistance, startTracking, stopTracking } = useDistance();
  const [isTracking, setIsTracking] = useState<boolean>(false);

  // Manual control: Toggle tracking on button press
  const handleToggleTracking = async (): Promise<void> => {
    if (isTracking) {
      stopTracking(); // Stops tracking
      setIsTracking(false);
    } else {
      const hasPermission = await Location.requestForegroundPermissionsAsync();
      if (hasPermission.status === 'granted') {
        startTracking(); // Starts tracking
        setIsTracking(true);
      } else {
        alert('Location permission is required to track distance.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run Tracker</Text>
      <Text style={styles.distance}>
        Total Distance: {totalDistance.toFixed(2)} km
      </Text>

      <TouchableOpacity
        style={[styles.button, isTracking ? styles.stopButton : styles.startButton]}
        onPress={handleToggleTracking}
      >
        <Text style={styles.buttonText}>
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  distance: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: 'green',
  },
  stopButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RunScreen;
