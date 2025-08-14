// app/(tabs)/_layout.jsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

function LoginHeaderButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push('/login')}
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
        // show icon in tab bar (common)
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
      {/* Home tab: show header and add headerRight */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          headerRight: () => <LoginHeaderButton />, // <-- login button on Home only
        }}
      />

      {/* Other tabs (no header button) */}
      <Tabs.Screen name="calendar" options={{ title: 'Calendar', headerShown: true }} />
      <Tabs.Screen name="log" options={{ title: 'Log', headerShown: true }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', headerShown: true }} />
    </Tabs>
  );
}
