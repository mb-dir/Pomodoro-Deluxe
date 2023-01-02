import "./App.css";
import { useState, useCallback } from "react";
import PomodoroSettings from "./components/PomodoroSettings/PomodoroSettings";
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";

function App() {
  const [ studyTime, setStudyTime ] = useState(15);
  const [ breakTime, setBreakTime ] = useState(5);
  const [ numberOfSessions, setNumberOfSessions ] = useState(2);
  const [ isSessionActive, setIsSessionActive ] = useState(false);

  const updateStudyTime = newTime => {
    setStudyTime(newTime);
  };
  const updateBreakTime = newTime => {
    setBreakTime(newTime);
  };
  const updateNumberOfSessions = newAmmount => {
    setNumberOfSessions(newAmmount);
  };
  const updateIsSessionActive = useCallback(isActive => {
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
