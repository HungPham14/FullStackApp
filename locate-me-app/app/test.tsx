import { Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"; // safe area view, to avoid status bar

// https://www.npmjs.com/package/react-native-countdown-component
export default function countDown() {
  return (
    <SafeAreaView style={styles.parent_container}>
      <Text style={styles.text}>Stopped</Text>
    </SafeAreaView>
  );
}

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
  }
});

