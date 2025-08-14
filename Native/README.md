

# Flow Care — Period Tracker (React Native + Expo)

A lightweight period tracker built with **React Native (Expo)** and **expo-router**.
Track cycles, set your cycle length, mark period start/end, see the current day of your period, and view the next projected start date. Includes a simple in-app calendar.

## ✨ Features

* **Login / Register toggle** screen (client-side placeholder)
* **Set Cycle Length** 
* **Start / End Period** with one tap
* **Next projected period date** based on user’s cycle length
* **Calendar tab** to pick dates

## 🧰 Tech Stack

* React Native (Expo, JavaScript/JSX)
* expo-router (file-based navigation)
* `@react-native-async-storage/async-storage`
* `dayjs` for date math

## 📦 Prerequisites

* Node.js LTS
* Expo CLI:

  ```bash
  npm i -g expo
  ```
* Android Studio / Xcode (if running on device/emulator)

## 🚀 Getting Started
# Clone
git clone https://github.com/your-username/period-tracker.git
cd period-tracker

# Install deps
npm install

# (If missing)
npm install dayjs @react-native-async-storage/async-storage

# Run
npx expo start
# then press: a (Android), i (iOS), or w (Web)


> If `expo` is not recognized, use `npx expo start` (no global install needed).


## 🧭 Navigation (expo-router)

* **`app/_layout.jsx`**: Root `Stack` (includes `login`, `(tabs)`, `+not-found`)
* **`app/(tabs)/_layout.jsx`**: Bottom tabs — e.g., `Home`, `Calendar`
* Home also has a **“Login”** button in the header (optional), and **“Set Cycle Length”** button to open the settings/log screen.


## 🏠 Home Screen (Overview)

Shows:

* **Next Period Date** (computed: `startDate + cycleLength`)
* **Current Period** as **“Day N”** (only if started)
* Buttons: **“Started Today”** and **“Ended Today”**
* Button: **“Set Cycle Length”** → opens cycle length screen (e.g., `/log`)

> Tip: We use `dayjs().diff(startDate, 'day') + 1` to compute **Nth day**.

## 🗓️ Calendar Tab

* Month header with **prev/next** arrows
* Weekday row (Sun–Sat)
* Grid of dates (highlights today)
* `onDateSelect(day)` callback (you can later connect it to store logs/notes)


## 🔧 Common Issues & Fixes

* **`expo: command not found`** → run with `npx expo start` or install globally: `npm i -g expo`
* **Module not found: `dayjs`** → `npm i dayjs`
* **AsyncStorage not found** → `npm i @react-native-async-storage/async-storage`
* **Attempted to navigate before mounting Root Layout**
  Ensure `app/_layout.jsx` renders a `Stack` immediately and you don’t navigate before mount.
* **“Text strings must be rendered within a <Text>”**
  Use `<Text>` for all text (no `<div>`, `<h2>`, etc. — React Native only).
* **Stuck/Freeze on Calendar**
  Avoid circular imports and keep the calendar directly in the tab file (no self-import). Only render one month at a time.

## 🧪 Scripts
npm run start   # npx expo start
npm run android # run on Android
npm run ios     # run on iOS (macOS)
npm run web     # Expo web preview

## 🗺️ Roadmap

* Persist login with backend (Java later)
* Period history & notes
* Fertile window & ovulation prediction
* Notifications (Expo Notifications)
* Theming (dark mode)
* Charts (cycle length trends)


![Home](assets/screens/home.png)
![Calendar](assets/screens/calendar.png)


