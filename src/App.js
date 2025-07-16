import { useEffect, useReducer } from "react";
import Header from "./components/header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";

const SECS_PER_QUESTION = 30;
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions?.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      const isCorrect = action.payload === currentQuestion.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect
          ? state.points + currentQuestion.points
          : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.highScore, state.points),
      };
    case "restart": 
      return {
        ...state,
        status: "ready",
        answer: null,
        points: 0,
        index: 0,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining:state.secondsRemaining -1,
        status:state.secondsRemaining === 0 ? "finished"
        : state.status,
      };
   
    default:
      throw new Error("unknown action");
  }
};
const initialState = {
  questions: [],
  // loading , error , ready, active ,finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining:null
};

export default function App() {
  const [{ questions, status, index, answer, points, highScore,secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const totalPoints = questions?.reduce(
    (acc, curr, index) => acc + curr.points,
    0
  );
  console.log(totalPoints);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
              secondsRemaining = {secondsRemaining}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
