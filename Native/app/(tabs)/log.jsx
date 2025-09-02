import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons"; // ✅ for ❌ icon

export default function Log() {
  const [cycleLength, setCycleLength] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [notes, setNotes] = useState("");
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [logs, setLogs] = useState([]);

  // ✅ Load user session
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await AsyncStorage.getItem("userId");
        const storedToken = await AsyncStorage.getItem("authToken");

        if (id && storedToken) {
          setUserId(id);
          setToken(storedToken);
          fetchLogs(id, storedToken);
        } else {
          Alert.alert("Error", "No active session found. Please login again.");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // ✅ Fetch logs from backend
  const fetchLogs = async (id, token) => {
    try {
      const response = await fetch(
        `http://192.168.184.188:8080/api/periods/user?userId=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      } else {
        Alert.alert("Error", "Failed to fetch logs");
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  // ✅ Save log to backend
  const saveLog = async () => {
    if (!startDate || !endDate || !cycleLength) {
      Alert.alert("Missing data", "Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.184.188:8080/api/periods/add?userId=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cycleLength,
            startDate,
            endDate,
            notes,
          }),
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Log saved successfully");
        fetchLogs(userId, token);
        setCycleLength("");
        setStartDate(null);
        setEndDate(null);
        setNotes("");
      } else {
        Alert.alert("Error", "Failed to save log");
      }
    } catch (error) {
      console.error("Error saving log:", error);
    }
  };

  // ✅ Delete log
  const deleteLog = async (logId) => {
    try {
      const response = await fetch(
        `http://192.168.184.188:8080/api/periods/${logId}?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setLogs((prevLogs) => prevLogs.filter((log) => log.id !== logId));
        Alert.alert("Deleted", "Log removed successfully");
      } else {
        Alert.alert("Error", "Failed to delete log");
      }
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Log Period</Text>

      {/* Cycle Length */}
      <Text style={styles.label}>Cycle Length (days)</Text>
      <TextInput
        style={styles.input}
        value={cycleLength}
        onChangeText={setCycleLength}
        keyboardType="numeric"
      />

      {/* Start Date */}
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setStartDatePickerVisibility(true)}
      >
        <Text style={styles.dateText}>
          {startDate ? new Date(startDate).toDateString() : "Select Start Date"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setStartDate(date.toISOString().split("T")[0]);
          setStartDatePickerVisibility(false);
        }}
        onCancel={() => setStartDatePickerVisibility(false)}
      />

      {/* End Date */}
      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setEndDatePickerVisibility(true)}
      >
        <Text style={styles.dateText}>
          {endDate ? new Date(endDate).toDateString() : "Select End Date"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={(date) => {
          setEndDate(date.toISOString().split("T")[0]);
          setEndDatePickerVisibility(false);
        }}
        onCancel={() => setEndDatePickerVisibility(false)}
      />

      {/* Notes */}
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveLog}>
        <Text style={styles.saveButtonText}>Save Log</Text>
      </TouchableOpacity>

      {/* Show Logs */}
      <Text style={styles.heading}>Previous Logs</Text>
      {logs.map((log) => (
        <View key={log.id} style={styles.logCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.logText}>
              Cycle Length: {log.cycleLength} days
            </Text>
            <Text style={styles.logText}>
              Start: {new Date(log.startDate).toDateString()}
            </Text>
            <Text style={styles.logText}>
              End: {new Date(log.endDate).toDateString()}
            </Text>
            <Text style={styles.logText}>Notes: {log.notes || "None"}</Text>
          </View>

          {/*Delete Button */}
          <TouchableOpacity onPress={() => deleteLog(log.id)}>
            <Ionicons name="close-circle" size={28} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#ffe7fdff" },
  heading: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  label: { marginTop: 15, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#000000ff",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#0e0e0eff",
    borderRadius: 8,
    marginTop: 5,
    alignItems: "center",
  },
  dateText: { color: "#555" },
  saveButton: {
    backgroundColor: "#6A5ACD",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
  logCard: {
    flexDirection: "row", // ✅ align text + button
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8d9f7ff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  logText: { fontSize: 14, marginBottom: 3 },
});
