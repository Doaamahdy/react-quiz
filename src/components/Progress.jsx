import React from "react";

const Progress = ({ index, numQuestions,points,totalPoints,answer }) => {
  const questionsPassed = index + (answer!==null);
    return (
    <header className="progress">
     <progress max={numQuestions} value={questionsPassed}></progress>
      <p>
        Question{" "}
        <strong>
          {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        points{" "}
        <strong>
          {points} / {totalPoints}
        </strong>
      </p>
    </header>
  );
};

export default Progress;
