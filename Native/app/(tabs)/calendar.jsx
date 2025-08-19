import dayjs from "dayjs";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Calendar = ({ onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const today = dayjs();

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const daysInMonth = [];
  for (let i = 0; i < startOfMonth.day(); i++) {
    daysInMonth.push(null);
  }
  for (let i = 1; i <= endOfMonth.date(); i++) {
    daysInMonth.push(dayjs(`${currentMonth.format("YYYY-MM")}-${i}`));
  }

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day);
    if (onDateSelect) onDateSelect(day);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        {/* Month Navigation */}
        <View style={styles.navRow}>
          <TouchableOpacity style={styles.navButton} onPress={handlePrevMonth}>
            <Text style={styles.navText}>◀</Text>
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{currentMonth.format("MMMM YYYY")}</Text>
          <TouchableOpacity style={styles.navButton} onPress={handleNextMonth}>
            <Text style={styles.navText}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* Days of Week */}
        <View style={styles.weekRow}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        {/* Dates */}
        <View style={styles.datesGrid}>
          {daysInMonth.map((day, idx) => {
            const isToday = day && day.isSame(today, "day");
            const isSelected = day && selectedDate && day.isSame(selectedDate, "day");

            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.dateCell,
                  isToday && styles.todayCell,
                  isSelected && styles.selectedCell,
                ]}
                onPress={() => day && handleDateSelect(day)}
              >
                <Text
                  style={[
                    styles.dateText,
                    isToday && styles.todayText,
                    isSelected && styles.selectedText,
                  ]}
                >
                  {day ? day.date() : ""}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fef6ff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#fff0f6",
    padding: 16,
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    width: "90%",
    maxWidth: 350,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  navButton: {
    padding: 6,
    backgroundColor: "#ffdeeb",
    borderRadius: 8,
  },
  navText: {
    fontSize: 16,
    color: "#d6336c",
    fontWeight: "bold",
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#a61e4d",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  weekDay: {
    fontWeight: "bold",
    width: 30,
    textAlign: "center",
    color: "#d6336c",
  },
  datesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dateCell: {
    width: "14.28%",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
  dateText: {
    fontSize: 14,
    color: "#5c2d91",
  },
  todayCell: {
    backgroundColor: "#d6336c",
    borderRadius: 20,
  },
  todayText: {
    color: "#fff",
    fontWeight: "bold",
  },
  selectedCell: {
    backgroundColor: "#c77dff", // pastel purple
    borderRadius: 20,
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Calendar;
