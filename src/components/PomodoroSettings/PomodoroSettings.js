import "./PomodoroSettings.css";
import { useState } from "react";
const PomodoroSettings = ({
  studyTime,
  breakTime,
  numberOfSessions,
  updateStudyTime,
  updateBreakTime,
  updateNumberOfSessions,
  isSessionActive,
}) => {
  const [ setting, setSetting ] = useState({
    studyTime,
    breakTime,
    numberOfSessions,
  });
  function updateSettings({ target }) {
    setSetting(prevSettings => {
      return { ...prevSettings, [target.name]: [ target.value ] };
    });
  }

  function saveSettings(e) {
    e.preventDefault();

    const { studyTime, breakTime, numberOfSessions } = setting;
    updateStudyTime(+studyTime);
    updateBreakTime(+breakTime);
    updateNumberOfSessions(+numberOfSessions);
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

      <button className="settings__btn" disabled={isSessionActive}>
        Save new settings!
      </button>
    </form>
  );
};

export default PomodoroSettings;
