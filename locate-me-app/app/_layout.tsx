import { Stack } from "expo-router";
import Index from ".";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name="index" options={{}} />
  </Stack>;
}
