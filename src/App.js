import "./App.css";
import React from "react";

//components import
import PomodoroSettings from "./components/PomodoroSettings/PomodoroSettings";
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";

function App() {
  //Default value - user will be able to change it via special component
  const [ studyTime, setStudyTime ] = React.useState(15);
  const [ breakTime, setBreakTime ] = React.useState(5);
  const [ numberOfSessions, setNumberOfSessions ] = React.useState(2);
  //This state is updated by PomodoroTimer(if it is durring the session it is true), and passed ti PomodoroSettings, thanks to which the user will not able to change the setting durning the session
  const [ isSessionActive, setIsSessionActive ] = React.useState(false);

  //Functions for updating state related with setting
  function updateStudyTime(newTime) {
    setStudyTime(newTime);
  }
  function updateBreakTime(newTime) {
    setBreakTime(newTime);
  }
  function updateNumberOfSessions(newAmmount) {
    setNumberOfSessions(newAmmount);
  }
  function updateIsSessionActive(isActive) {
    setIsSessionActive(isActive);
  }

  return (
    <div className="App">
      {/* In this moment I want to focus on bussines logic insted of css */}
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
        //Pass it as a seconds not minutes
        studyTime={studyTime * 60}
        breakTime={breakTime * 60}
        numberOfSessions={numberOfSessions}
        updateIsSessionActive={updateIsSessionActive}
      />
    </div>
  );
}

export default App;
