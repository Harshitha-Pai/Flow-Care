import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function Log() {
  const [cycleLength, setCycleLength] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [symptoms, setSymptoms] = useState("");

  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const handleSave = async () => {
    if (!startDate || !endDate || !cycleLength) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.84.188:8080/api/periods/log?userId=USER_ID",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            startDate: startDate.toISOString().split("T")[0],
            endDate: endDate.toISOString().split("T")[0],
            cycleLength: parseInt(cycleLength),
            symptoms,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Success",
          `Cycle logged successfully! Next period starts on: ${data.nextPeriodStart}`
        );
      } else {
        Alert.alert("Error", data.message || "Failed to save");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log Your Cycle & Symptoms</Text>

      <Text style={styles.label}>Start Date:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setStartPickerVisible(true)}
      >
        <Text>{startDate ? startDate.toDateString() : "Select start date"}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>End Date:</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setEndPickerVisible(true)}
      >
        <Text>{endDate ? endDate.toDateString() : "Select end date"}</Text>
      </TouchableOpacity>

      {/* Start Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="date"
        date={startDate || new Date()}
        onConfirm={(date) => {
          setStartDate(date);
          setStartPickerVisible(false);
        }}
        onCancel={() => setStartPickerVisible(false)}
        headerTextIOS="Pick Start Date"
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
        pickerContainerStyleIOS={styles.pickerContainer}
      />

      {/* End Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="date"
        date={endDate || new Date()}
        onConfirm={(date) => {
          setEndDate(date);
          setEndPickerVisible(false);
        }}
        onCancel={() => setEndPickerVisible(false)}
        headerTextIOS="Pick End Date"
        confirmTextIOS="Confirm"
        cancelTextIOS="Cancel"
        pickerContainerStyleIOS={styles.pickerContainer}
      />

      <Text style={styles.label}>Cycle Length (days):</Text>
      <TextInput
        placeholder="28"
        value={cycleLength}
        onChangeText={setCycleLength}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Symptoms / Notes:</Text>
      <TextInput
        placeholder="Write your symptoms..."
        value={symptoms}
        onChangeText={setSymptoms}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFD6E8",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6a1b9a",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#4a148c",
    fontWeight: "600",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff0f7",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#ce93d8",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerContainer: {
    backgroundColor: "#f8d5f7",
    borderRadius: 15,
  },
});
