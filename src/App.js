import "./App.css";
import React from "react";
import PomodoroSettings from "./components/PomodoroSettings/PomodoroSettings";
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";

function App() {
  const [ studyTime, setStudyTime ] = React.useState(0.2);
  const [ breakTime, setBreakTime ] = React.useState(0.1);
  const [ numberOfSessions, setNumberOfSessions ] = React.useState(2);
  const [ isSessionActive, setIsSessionActive ] = React.useState(false);

  function updateStudyTime(newTime) {
    setStudyTime(newTime);
  }
  function updateBreakTime(newTime) {
    setBreakTime(newTime);
  }
  function updateNumberOfSessions(newAmmount) {
    setNumberOfSessions(newAmmount);
  }
  const updateIsSessionActive = React.useCallback(isActive => {
    setIsSessionActive(isActive);
  }, []);

  return (
    <div className="App">
      <div className="sessionSettings">
        <p className="sessionSettings__setting">
          current study time: {studyTime} min
        </p>
        <p className="sessionSettings__setting">
          current break time: {breakTime} min
        </p>
        <p className="sessionSettings__setting">
          number of sessions: {numberOfSessions}(total time of one session=
          {studyTime + breakTime} min)
        </p>
      </div>
      <PomodoroSettings
        studyTime={studyTime}
        breakTime={breakTime}
        numberOfSessions={numberOfSessions}
        updateStudyTime={updateStudyTime}
        updateBreakTime={updateBreakTime}
        updateNumberOfSessions={updateNumberOfSessions}
        isSessionActive={isSessionActive}
      />
      <PomodoroTimer
        studyTimeSettings={studyTime * 60}
        breakTimeSettings={breakTime * 60}
        numberOfSessions={numberOfSessions}
        updateIsSessionActive={updateIsSessionActive}
      />
    </div>
  );
}

export default App;
