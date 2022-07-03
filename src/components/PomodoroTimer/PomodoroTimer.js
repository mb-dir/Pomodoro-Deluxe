import React from "react";
import "./PomodoroTimer.css";

//https://github.com/goldfire/howler.js/ - sound lib - when the study session/break is over user will hear the sound effect
import { Howl, Howler } from "howler";
function PomodoroTimer(times) {
  //Handler for starting the session
  function startSession() {
    setIsStudyActive(true);
  }
  //State for study session
  const [ isStudyActive, setIsStudyActive ] = React.useState(false);
  //It starts form 0 cuz the time left to the end of the session is calculated as times.studyTime(props(user settings)) - studyTime
  const [ studyTime, setStudyTime ] = React.useState(0);

  //State for study session
  const [ isBreakActive, setIsBreakActive ] = React.useState(false);
  //It starts form 0 cuz the break time  is calculated as times.breakTime(props(user settings)) - breakTime(the same as for study session)
  const [ breakTime, setBreakTime ] = React.useState(0);

  //Helps to determine how many sessions are left to the end
  const [ sessionNumber, setSessionNumber ] = React.useState(0);

  //For study session
  React.useEffect(
    () => {
      //This will block the possibility to change the setting durning the session is running
      times.updateIsSessionActive(true);
      const studySession = () => {
        setStudyTime(prev => prev + 1);
      };
      //times.studyTime comes form props, and it depends on the settings of user(user sets thw time of study session)
      if (isStudyActive && studyTime !== times.studyTime) {
        setTimeout(studySession, 1000);
      } else if (studyTime === times.studyTime) {
        //Announce the end of once session by the phone ring
        playSound();
        //Reset for study - when the study session os over restore everything to orginal state
        clearTimeout(studySession);
        setStudyTime(0);
        setIsStudyActive(false);
        //Start the break time
        setIsBreakActive(true);
      }
    },
    [ isStudyActive, studyTime, sessionNumber ]
  );

  //For break session
  React.useEffect(
    () => {
      const breakSession = () => {
        setBreakTime(prev => prev + 1);
      };
      if (isBreakActive && breakTime !== times.breakTime) {
        setTimeout(breakSession, 1000);
      } else if (breakTime === times.breakTime) {
        //Announce the end of once break by the phone ring
        playSound();
        //Reset for break - when the brek is over reset everything to orginal state
        clearTimeout(breakSession);
        setBreakTime(0);
        setIsBreakActive(false);
        //cuz math(assume that user sets the number of session to 2, sessionNumber starts form 0, so the first "iteration" sessionNumber is 0, the 2nd is 1, but that means there are 2 sessions, -1 must be included in order not to add an additional session)
        if (times.numberOfSessions - 1 !== sessionNumber) {
          setIsStudyActive(true);
        }
        setSessionNumber(prev => prev + 1);
      }
      if (isBreakActive === false && isStudyActive === false) {
        setSessionNumber(0);
        //When all the sessions are over change the state in App - based on this state the app blocks/allows to change the settings
        times.updateIsSessionActive(false);
      }
    },
    [ isBreakActive, breakTime, sessionNumber ]
  );

  return (
    <div>
      <div className="timeWrapper">
        <div className="timeWrapper__box timeWrapper__box--border">
          <p className="timeWrapper__time">
            Study time: {convertToMin(times.studyTime - studyTime)}
          </p>
        </div>

        <div className="timeWrapper__box">
          <p className="timeWrapper__time">
            Break time: {convertToMin(times.breakTime - breakTime)}
          </p>
        </div>
      </div>

      <div>
        <p className="sessionInfo">
          Sessions to end: {times.numberOfSessions - sessionNumber}
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
//Convert time in seconds to format min:seconds - thanks to this it is more readable
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
    //random phone ring
    src: [ "https://www.soundjay.com/phone/sounds/telephone-ring-03a.mp3" ],
  });

  sound.play();
}

export default PomodoroTimer;
