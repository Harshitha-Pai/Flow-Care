// index.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

export default function HomePage() {
  const [cycleLength, setCycleLength] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [today, setToday] = useState(dayjs());
  const [periodDay, setPeriodDay] = useState(null); // null = not started
  const [nextDate, setNextDate] = useState(null);

  useEffect(() => {
    const fetchCycleData = async () => {
      const savedCycle = await AsyncStorage.getItem('cycleLength');
      const savedStart = await AsyncStorage.getItem('startDate');

      if (savedCycle) setCycleLength(parseInt(savedCycle));
      if (savedStart) {
        const start = dayjs(savedStart);
        setStartDate(start);
        setPeriodDay(today.diff(start, 'day') + 1);
        setNextDate(start.add(parseInt(savedCycle), 'day'));
      }
    };

    fetchCycleData();
  }, [today]);

  const handleStartToday = async () => {
    const start = dayjs();
    setStartDate(start);
    setPeriodDay(1);
    await AsyncStorage.setItem('startDate', start.toISOString());
    setNextDate(start.add(cycleLength, 'day'));
  };

  const handleEndToday = async () => {
    setPeriodDay(null);
    const next = today.add(cycleLength, 'day');
    setNextDate(next);
    await AsyncStorage.removeItem('startDate');
  };

  return (
  <ImageBackground
    source={require('../../assets/images/backgroundFlow.jpg')}
    style={styles.background}
  >
    <View style={styles.overlay}>
      <Text style={styles.header}>Your Cycle Overview</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Next Period Date</Text>
        <Text style={styles.value}>
          {nextDate ? nextDate.format('DD MMM YYYY') : '--'}
        </Text>
      </View>

      {periodDay ? (
        <View style={styles.card}>
          <Text style={styles.label}>Current Period</Text>
          <Text style={styles.value}>Day {periodDay}</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.label}>No Active Period</Text>
          <Text style={styles.value}>Press start to begin tracking</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#e57373' }]}
          onPress={handleStartToday}
        >
          <Text style={styles.buttonText}>Started Today</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#64b5f6' }]}
          onPress={handleEndToday}
        >
          <Text style={styles.buttonText}>Ended Today</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ImageBackground>
);
}

const styles = StyleSheet.create({
  container: {
  width: '100%',
  maxWidth: 350, // optional: makes it neater on large screens
  },
  header: {
    fontSize: 25,
    color: '#05284aff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  background: {
  flex: 2,
  resizeMode: 'cover',
  },
  overlay: {
  flex: 1,
  backgroundColor: 'rgba(153, 118, 118, 0.28)',
  padding: 20,
  justifyContent: 'center', // vertical centering
  alignItems: 'center',     // horizontal centering
},
});
