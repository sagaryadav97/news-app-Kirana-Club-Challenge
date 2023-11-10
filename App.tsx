import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./src/Screens/HomeScreen"
import SplashScreen from "./src/Screens/SplashScreen"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            options={{ headerShown: false }}
            name="SplashScreen"
            component={SplashScreen}
          />
          <Stack.Screen
            options={{
              gestureEnabled: false,
              title: "My News",
              headerLeft: () => <></>,
            }}
            name="HomeScreen"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
