// app/logout.jsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Remove JWT token
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userName");

        // Navigate back to login
        router.replace("/login");
      } catch (error) {
        console.error("Error during logout:", error);
      }
    };

    performLogout();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#1A8EFD" />
    </View>
  );
}
