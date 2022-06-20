import React from "react";
function PomodoroSettings() {
  return (
    <form action="">
      <label htmlFor="studyTime">Set new study time</label>
      <input
        min={15}
        max={45}
        step={1}
        type="number"
        name="studyTime"
        id="studyTime"
      />

      <label htmlFor="breakTime">Set new break time</label>
      <input
        min={5}
        max={15}
        step={1}
        type="number"
        name="breakTime"
        id="breakTime"
      />

      <label htmlFor="numberOfSessions">Set new number of sessions</label>
      <input
        min={1}
        max={5}
        step={1}
        type="number"
        name="numberOfSessions"
        id="numberOfSessions"
      />

      <button>Save new settings!</button>
    </form>
  );
}

export default PomodoroSettings;
