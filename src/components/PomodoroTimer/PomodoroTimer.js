import React from "react";
function PomodoroTimer(times) {
  const [ startStudySession, setStartStudySession ] = React.useState(false);
  const [ studyTime, setStudyTime ] = React.useState(0);
  //After clicking the btn block the possibility to click it again until the current session ends
  function handleStartSession() {
    setStartStudySession(true);
  }
  React.useEffect(
    () => {
      const studySession = () => {
        setStudyTime(prev => prev + 1);
      };
      if (startStudySession && studyTime !== times.studyTime * 60) {
        setTimeout(studySession, 1000);
      } else {
        //When the time is over clear the timeout, and reset the states
        clearTimeout(studySession);
        setStudyTime(0);
        setStartStudySession(false);
      }
    },
    [ startStudySession, studyTime ]
  );
  return (
    <div>
      <div>
        <p>Study time: {convertToMin(times.studyTime * 60 - studyTime)}</p>
      </div>

      <div>
        <p>Break time</p>
      </div>

      <div>
        <p>Sessions to end: </p>
      </div>
      <button onClick={handleStartSession} disabled={startStudySession}>
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
