import React from "react";
function PomodoroTimer(times) {
  const [ startSession, setStartSession ] = React.useState(false);
  //After clicking the btn block the possibility to click it again until the current session ends
  function handleStartSession() {
    setStartSession(prev => !prev);
  }

  //Convert to seconds
  const [ studyTimeLeft, setStudyTimeLeft ] = React.useState(
    times.studyTime * 60
  );
  React.useEffect(
    () => {
      if (startSession) {
        setTimeout(() => {
          setStudyTimeLeft(prev => prev - 1);
        }, 1000);
      }
    },
    [ startSession, studyTimeLeft ]
  );
  return (
    <div>
      <div>
        <p>Study time: {studyTimeLeft}</p>
      </div>

      <div>
        <p>Break time</p>
      </div>

      <div>
        <p>Sessions to end: </p>
      </div>
      <button onClick={handleStartSession} disabled={startSession}>
        Start
      </button>
    </div>
  );
}

export default PomodoroTimer;
