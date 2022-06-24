import "./App.css";
import React from "react";

//components import
import PomodoroSettings from "./components/PomodoroSettings/PomodoroSettings";
import PomodoroTimer from "./components/PomodoroTimer/PomodoroTimer";

function App() {
  //Default value - user will be able to change it via special component
  const [ studyTime, setStudyTime ] = React.useState(25);
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
      <div>
        <p>current study time: {studyTime} min</p>
        <p>current break time: {breakTime} min</p>
        <p>
          number of sessions: {numberOfSessions}(total time of one session=
          {studyTime + breakTime} min)
        </p>
        <PomodoroSettings
          studyTime={studyTime}
          breakTime={breakTime}
          numberOfSessions={numberOfSessions}
          updateStudyTime={updateStudyTime}
          updateBreakTime={updateBreakTime}
          updateNumberOfSessions={updateNumberOfSessions}
        />
        <PomodoroTimer
          studyTime={studyTime}
          breakTime={breakTime}
          numberOfSessions={numberOfSessions}
          updateIsSessionActive={updateIsSessionActive}
        />
      </div>
    </div>
  );
}

export default App;
