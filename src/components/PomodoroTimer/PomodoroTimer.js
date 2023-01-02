import { useState, useEffect } from "react";
import "./PomodoroTimer.css";
import { convertToMin } from "../helpers/convertToMin";
import playSound from "../helpers/playSound";
const PomodoroTimer = ({
  studyTimeSettings,
  breakTimeSettings,
  numberOfSessions,
  updateIsSessionActive,
}) => {
  const startSession = () => {
    setIsStudyActive(true);
  };
  const [ isStudyActive, setIsStudyActive ] = useState(false);
  const [ studyTime, setStudyTime ] = useState(0);

  const [ isBreakActive, setIsBreakActive ] = useState(false);
  const [ breakTime, setBreakTime ] = useState(0);
  const [ sessionNumber, setSessionNumber ] = useState(0);

  useEffect(
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

  useEffect(
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
};

export default PomodoroTimer;
