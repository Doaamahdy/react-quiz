import React from "react";

const FinishScreen = ({ points, totalPoints, highScore,dispatch }) => {
  const percentage = (points / totalPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🏆";
  if (percentage >= 75 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 75) emoji = "🎉";
  if (percentage < 50) emoji = "🤦‍♀️";

  return (
    <>
      <div className="result">
        <p>

          You scored <strong>{points}</strong> out of {totalPoints} (
          {Math.round(percentage)}% {emoji})
        </p>
      </div>
      <p className="highscore">
        (High Score : {highScore} points)
      </p>
      <button className="btn btn-ui"onClick={()=> dispatch({type:"restart"})}
      >Restart Quiz</button>
    </>
  );
};

export default FinishScreen;
