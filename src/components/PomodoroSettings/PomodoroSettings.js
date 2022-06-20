import React from "react";
function PomodoroSettings(defaultSettings) {
  //Used to controlled component(inputs in form)
  const [ setting, setSetting ] = React.useState({
    //Default depends on default setting from App
    studyTime: defaultSettings.studyTime,
    breakTime: defaultSettings.breakTime,
    numberOfSessions: defaultSettings.numberOfSessions,
  });
  function updateSettings({ target }) {
    setSetting(prevSettings => {
      return { ...prevSettings, [target.name]: [ target.value ] };
    });
  }
  return (
    <form action="">
      <label htmlFor="studyTime">Set new study time</label>
      <input
        value={setting.studyTime}
        min={15}
        max={45}
        step={1}
        type="number"
        name="studyTime"
        id="studyTime"
        onChange={updateSettings}
      />

      <label htmlFor="breakTime">Set new break time</label>
      <input
        value={setting.breakTime}
        min={5}
        max={15}
        step={1}
        type="number"
        name="breakTime"
        id="breakTime"
        onChange={updateSettings}
      />

      <label htmlFor="numberOfSessions">Set new number of sessions</label>
      <input
        value={setting.numberOfSessions}
        min={1}
        max={5}
        step={1}
        type="number"
        name="numberOfSessions"
        id="numberOfSessions"
        onChange={updateSettings}
      />

      <button>Save new settings!</button>
    </form>
  );
}

export default PomodoroSettings;
