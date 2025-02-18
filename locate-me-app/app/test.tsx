import { View, Text, StyleSheet } from 'react-native';

// https://www.npmjs.com/package/react-native-countdown-component
export default function countDown() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
  },
  text: {
    color: 'rgb(255,255,255)', 
    fontSize: 150, 
    fontWeight:'bold',
  }
});

