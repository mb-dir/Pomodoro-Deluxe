import "./App.css";
import React from "react";
function App() {
  //Default value - user will be able to change it via special component
  const [ studyTime, setStudyTime ] = React.useState(25);
  const [ breakTime, setBreakTime ] = React.useState(5);
  const [ numberOfSessions, setNumberOfSessions ] = React.useState(2);
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
      </div>
    </div>
  );
}

export default App;
