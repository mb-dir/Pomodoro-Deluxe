import "./PomodoroSettings.css";
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

  function saveSettings(e) {
    e.preventDefault();

    const { studyTime, breakTime, numberOfSessions } = setting;
    //+ before each value cuz when it comes from inputs it is string so we need to change it to number
    defaultSettings.updateStudyTime(+studyTime);
    defaultSettings.updateBreakTime(+breakTime);
    defaultSettings.updateNumberOfSessions(+numberOfSessions);
  }
  return (
    <form className="settings" onSubmit={saveSettings} action="">
      <div className="settings__inputWrapper">
        <label className="settings__label" htmlFor="studyTime">
          Set new study time
        </label>
        <input
          className="settings__input"
          value={setting.studyTime}
          min={15}
          max={45}
          step={1}
          type="number"
          name="studyTime"
          id="studyTime"
          onChange={updateSettings}
        />
      </div>

      <div className="settings__inputWrapper">
        <label className="settings__label" htmlFor="breakTime">
          Set new break time
        </label>
        <input
          className="settings__input"
          value={setting.breakTime}
          min={5}
          max={15}
          step={1}
          type="number"
          name="breakTime"
          id="breakTime"
          onChange={updateSettings}
        />
      </div>

      <div className="settings__inputWrapper">
        <label className="settings__label" htmlFor="numberOfSessions">
          Set new number of sessions
        </label>
        <input
          className="settings__input"
          value={setting.numberOfSessions}
          min={1}
          max={5}
          step={1}
          type="number"
          name="numberOfSessions"
          id="numberOfSessions"
          onChange={updateSettings}
        />
      </div>

      <button
        className="settings__btn"
        disabled={defaultSettings.isSessionActive}
      >
        Save new settings!
      </button>
    </form>
  );
}

export default PomodoroSettings;
