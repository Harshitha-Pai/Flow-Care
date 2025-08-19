// app/(tabs)/_layout.jsx
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';

function AuthHeaderButton({ isLoggedIn, userName, onLogout }) {
  const router = useRouter();

  const handlePress = async () => {
    if (isLoggedIn) {
      await AsyncStorage.multiRemove(["authToken", "userName"]); // remove both
      onLogout(); // update parent state
      router.replace("/login");
    } else {
      router.push("/login");
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginRight: 12 }}>
      {isLoggedIn ? (
        <Text style={{ color: "#D32F2F", fontWeight: "700", fontSize: 14 }}>
          👋 Hi, {userName || "User"} | Logout
        </Text>
      ) : (
        <Text style={{ color: "#e91e63", fontWeight: "600" }}>Login</Text>
      )}
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  const checkLoginStatus = useCallback(async () => {
    const token = await AsyncStorage.getItem("authToken");
    const name = await AsyncStorage.getItem("userName");
    if (token) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName(null);
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let name = "help-circle";
          if (route.name === "index") name = "home";
          if (route.name === "calendar") name = "calendar";
          if (route.name === "log") name = "add-circle";
          if (route.name === "settings") name = "settings";
          return <Ionicons name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#D95D39",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          backgroundColor: "#FFF4E6",
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: true,
          headerRight: () => (
            <AuthHeaderButton
              isLoggedIn={isLoggedIn}
              userName={userName}
              onLogout={handleLogout}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ title: "Calendar", headerShown: true }}
      />
      <Tabs.Screen
        name="log"
        options={{ title: "Log", headerShown: true }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings", headerShown: true }}
      />
    </Tabs>
  );
}
