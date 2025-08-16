// app/(tabs)/_layout.jsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function LoginHeaderButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push('/login')} // <-- absolute path from app root
      style={{ marginRight: 12, paddingHorizontal: 6, paddingVertical: 4 }}
      accessibilityLabel="Go to login"
    >
      <Text style={{ color: '#e91e63', fontWeight: '600' }}>Login</Text>
    </TouchableOpacity>
  );
}



export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let name = 'help-circle';
          if (route.name === 'index') name = 'home';
          if (route.name === 'calendar') name = 'calendar';
          if (route.name === 'log') name = 'add-circle';
          if (route.name === 'settings') name = 'settings';
          return <Ionicons name={name} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D95D39',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: { height: 60, paddingBottom: 6, backgroundColor: '#FFF4E6' },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => <LoginHeaderButton />, // Login button on Home
        }}
      />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar', headerShown: true }} />
      <Tabs.Screen name="log" options={{ title: 'Log', headerShown: true }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', headerShown: true }} />
    </Tabs>
  );
}
