import {
  Text, 
  View,
  StyleSheet,
  // Dimensions,
  // StatusBar,
  // TouchableOpacity,
  // Platform
} from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>Hello World!</Text>
    </View>
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
});