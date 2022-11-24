import React from "react";
import "./PomodoroTimer.css";

import { Howl } from "howler";
function PomodoroTimer({
  studyTimeSettings,
  breakTimeSettings,
  numberOfSessions,
  updateIsSessionActive,
}) {
  function startSession() {
    setIsStudyActive(true);
  }
  const [ isStudyActive, setIsStudyActive ] = React.useState(false);
  const [ studyTime, setStudyTime ] = React.useState(0);

  const [ isBreakActive, setIsBreakActive ] = React.useState(false);
  const [ breakTime, setBreakTime ] = React.useState(0);
  const [ sessionNumber, setSessionNumber ] = React.useState(0);

  React.useEffect(
    () => {
      updateIsSessionActive(true);
      const studySession = () => {
        setStudyTime(prev => prev + 1);
      };
      if (isStudyActive && studyTime !== studyTimeSettings) {
        setTimeout(studySession, 1000);
      } else if (studyTime === studyTimeSettings) {
        playSound();
        clearTimeout(studySession);
        setStudyTime(0);
        setIsStudyActive(false);
        setIsBreakActive(true);
      }
    },
    [ isStudyActive, studyTime, studyTimeSettings, updateIsSessionActive ]
  );

  React.useEffect(
    () => {
      const breakSession = () => {
        setBreakTime(prev => prev + 1);
      };
      if (isBreakActive && breakTime !== breakTimeSettings) {
        setTimeout(breakSession, 1000);
      } else if (breakTime === breakTimeSettings) {
        playSound();
        clearTimeout(breakSession);
        setBreakTime(0);
        setIsBreakActive(false);
        if (numberOfSessions - 1 !== sessionNumber) {
          setIsStudyActive(true);
        }
        setSessionNumber(prev => prev + 1);
      }
      if (isBreakActive === false && isStudyActive === false) {
        setSessionNumber(0);
        updateIsSessionActive(false);
      }
    },
    [
      isBreakActive,
      breakTime,
      sessionNumber,
      breakTimeSettings,
      isStudyActive,
      numberOfSessions,
      updateIsSessionActive,
    ]
  );

  return (
    <div>
      <div className="timeWrapper">
        <div
          className={`timeWrapper__box timeWrapper__box--border ${isStudyActive
            ? "timeWrapper__box--active"
            : ""}`}
        >
          <p className="timeWrapper__time">
            Study time: {convertToMin(studyTimeSettings - studyTime)}
          </p>
        </div>

        <div
          className={`timeWrapper__box ${isBreakActive
            ? "timeWrapper__box--active"
            : ""}`}
        >
          <p className="timeWrapper__time">
            Break time: {convertToMin(breakTimeSettings - breakTime)}
          </p>
        </div>
      </div>

      <div>
        <p className="sessionInfo">
          Sessions to end: {numberOfSessions - sessionNumber}
        </p>
      </div>
      <button
        className="startSession"
        onClick={startSession}
        disabled={isStudyActive || isBreakActive}
      >
        Start
      </button>
    </div>
  );
}

//Auxiliary funtions
function convertToMin(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  let timeToReturn = null;
  if (seconds < 10) {
    timeToReturn = `${minutes}:0${seconds}`;
  } else {
    timeToReturn = `${minutes}:${seconds}`;
  }
  return timeToReturn;
}
function playSound() {
  ///https://github.com/goldfire/howler.js/
  const sound = new Howl({
    src: [ "https://www.soundjay.com/phone/sounds/telephone-ring-03a.mp3" ],
  });

  sound.play();
}

export default PomodoroTimer;
