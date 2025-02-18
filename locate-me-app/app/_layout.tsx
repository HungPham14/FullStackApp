import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: 'rgb(0, 0, 0)',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
        headerShown: false,
      }}>
      {/* <Stack.Screen name="index" />
      <Stack.Screen name="test" /> */}
    </Stack>
  );
}