import React from "react";
import Timer from "./Timer";
import NextButton from "./NextButton";

const Footer = ({ dispatch, answer, index, numQuestions,secondsRemaining }) => {
  return (
    <footer>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        numQuestions={numQuestions}
        index={index}
      />
    </footer>
  );
};

export default Footer;
