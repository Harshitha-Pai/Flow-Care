// app/login.jsx
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail, userPass }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Success", "Login successful");
        console.log("User Data:", data);
        // router.push('/somewhere'); // optional redirect after login
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={userEmail}
        onChangeText={setUserEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={userPass}
        onChangeText={setUserPass}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.registerText}>Not Registered?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#1A8EFD',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  registerText: { color: '#e91e63', fontSize: 14, marginTop: 10 },
});
