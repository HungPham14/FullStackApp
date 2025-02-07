import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TimeApp() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds < 59) {
        setSeconds(prev => prev + 1);
      } else {
        setSeconds(0);
        if (minutes < 59) {
          setMinutes(prev => prev + 1);
        } else {
          setMinutes(0);
          if (hours < 23) {
            setHours(prev => prev + 1);
          } else {
            setHours(0);
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeDisplay}>
        Time: {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2,
'0')}:{seconds.toString().padStart(2, '0')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  timeDisplay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

// export default TimeApp;