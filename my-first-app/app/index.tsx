import {
  Text, 
  View,
  StyleSheet,
  // Dimensions,
  // StatusBar,
  TouchableOpacity,
  // Platform
} from "react-native";
import { useState } from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { Accelerometer } from "expo-sensors";

export default function Index() {
  
  // Initialize state with `useState` Hook
  const [count, setCount] = useState(0);

  // Function to increment count
  const onPress = () => setCount(count => count + 1);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
      <View style={styles.countContainer}>
        <Text style={styles.baseText}>Hello Bitches!</Text>
        <Text style={styles.baseText}>Current Count: {count}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.baseText}>Press me</Text>
      </TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },

  baseText: {
    color: "#ffffff",
  },

  countContainer: {
    alignItems: "center",
    padding: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#2D2E33',
    padding: 10,
  },
});