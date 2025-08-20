import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Log() {
  const [cycleLength, setCycleLength] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userId, setUserId] = useState(null);

  // 🔹 Load userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        if (id) {
          setUserId(id);
        } else {
          Alert.alert("Error", "User not found. Please login again.");
        }
      } catch (error) {
        console.error("Error loading userId:", error);
      }
    };
    fetchUserId();
  }, []);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setStartDate(date.toISOString().split("T")[0]); // store as YYYY-MM-DD
    hideDatePicker();
  };

  // 🔹 Save period log to backend
  const handleSave = async () => {
    if (!cycleLength || !startDate || !userId) {
      Alert.alert("Error", "Please enter all details.");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.84.188:8080/api/periods/add?userId=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: parseInt(userId, 10),
            cycleLength: parseInt(cycleLength, 10),
            startDate,
          }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Period logged successfully!");
        setCycleLength("");
        setStartDate(null);
      } else {
        Alert.alert("Error", "Failed to save log.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
      console.error(error);
    }
  };

  if (!userId) {
    return <Text style={{ padding: 20 }}>Loading user...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Cycle Length (days)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={cycleLength}
        onChangeText={setCycleLength}
      />

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.dateText}>
          {startDate ? startDate : "Select Date"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#555",
  },
  saveButton: {
    backgroundColor: "#FF69B4",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});



//http://192.168.84.188:8080