// pages/Log.jsx
import { useState, useEffect } from "react";

export default function Log() {
  const [cycleLength, setCycleLength] = useState("");

  useEffect(() => {
    const savedCycle = localStorage.getItem("cycleLength");
    if (savedCycle) {
      setCycleLength(savedCycle);
    }
  }, []);

  const handleSave = () => {
    if (cycleLength > 0) {
      localStorage.setItem("cycleLength", cycleLength);
      alert("Cycle length saved!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Set Your Cycle Length</h2>
      <input
        type="number"
        value={cycleLength}
        onChange={(e) => setCycleLength(e.target.value)}
        placeholder="Enter cycle length (days)"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
