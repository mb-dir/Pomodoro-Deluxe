import React from "react";
function PomodoroTimer(times) {
  return (
    <div>
      <div>
        <p>Study time:</p>
      </div>

      <div>
        <p>Break time:</p>
      </div>

      <div>
        <p>Sessions to end:</p>
      </div>
      <button>Start</button>
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
