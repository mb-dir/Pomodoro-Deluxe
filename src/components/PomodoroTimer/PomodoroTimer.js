import React from "react";
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

  //For study session
  React.useEffect(
    () => {
      const studySession = () => {
        setStudyTime(prev => prev + 1);
      };
      //times.studyTime comes form props, and it depends on the settings of user(user sets thw time of study session)
      if (isStudyActive && studyTime !== times.studyTime) {
        setTimeout(studySession, 1000);
      } else if (studyTime === times.studyTime) {
        //Reset for study - when the study session os over restore everything to orginal state
        clearTimeout(studySession);
        setStudyTime(0);
        setIsStudyActive(false);
        //Start the break time
        setIsBreakActive(true);
      }
    },
    [ isStudyActive, studyTime ]
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
        //Reset for break - when the brek is over reset everything to orginal state
        clearTimeout(breakSession);
        setBreakTime(0);
        setIsBreakActive(false);
      }
    },
    [ isBreakActive, breakTime ]
  );

  return (
    <div>
      <div>
        <p>Study time: {convertToMin(times.studyTime - studyTime)}</p>
      </div>

      <div>
        <p>Break time: {convertToMin(times.breakTime - breakTime)}</p>
      </div>

      <div>
        <p>Sessions to end:</p>
      </div>
      <button onClick={startSession} disabled={isStudyActive}>
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

export default PomodoroTimer;
