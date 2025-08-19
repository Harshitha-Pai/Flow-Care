// app/_layout.jsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = "light";
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken"); // unified key
      setIsLoggedIn(!!token);
    } catch (err) {
      console.error("Error reading token:", err);
    } finally {
      setLoading(false);
    }
  };
  checkToken();
}, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          // If logged in → show tabs with logout
          <Stack.Screen name="(tabs)" />
        ) : (
          // If not logged in → show login
          <Stack.Screen name="login" />
        )}
        <Stack.Screen name="register" />
        <Stack.Screen name="logout" /> 
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
