import { useReducer, useState, useEffect } from "react";
const initialQuestions = [
  {
    id: 1,
    q: "Sum of 7 and 8?",
    a: 15,
    b: 17,
    c: 20,
    d: 40,
    correct: "a",
    slectedAnswer: "",
  },
  {
    id: 2,
    q: "Multification of 7 and 8?",
    a: 20,
    b: 17,
    c: 56,
    d: 40,
    correct: "c",
    slectedAnswer: "",
  },
];
const reducer = (state, action) => {
  switch (action.type) {
    case "ANSWERED":
      return state.map((question) => {
        if (question.id === action.payLoad.id) {
          return { ...question, slectedAnswer: action.payLoad.slectedAnswer };
        } else {
          return question;
        }
      });
    default:
      return state;
  }
};

const App = () => {
  const [questions, dispatch] = useReducer(reducer, initialQuestions);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const handleAnswer = (id, slectedAnswer) => {
    dispatch({
      type: "ANSWERED",
      payLoad: { id: id, slectedAnswer: slectedAnswer },
    });
  };

  let score = 0;
  // calculate answer
  questions.forEach((element) => {
    if (element.correct === element.slectedAnswer) {
      score = score + 5;
    }
  });

  return (
    <>
      <div className="container text-gray-500 flex flex-col justify-center items-center h-screen">
        {score}
        {questions && (
          <Quiz
            question={questions[currentQIndex]}
            handleAnswer={handleAnswer}
          />
        )}

        <div className="grid grid-cols-2 gap-5 my-3">
          <div
            className="bg-red-400 p-2 text-white cursor-pointer"
            onClick={() => setCurrentQIndex((prev) => prev - 1)}
          >
            Prev
          </div>
          <div
            className="bg-red-400 p-2 text-white cursor-pointer"
            onClick={() => setCurrentQIndex((prev) => prev + 1)}
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

const Quiz = ({ question, handleAnswer }) => {
  const { id, q, a, b, c, d, slectedAnswer } = question || {};
  return (
    <div className="quiz-body w-1/2 bg-gray-300 p-1 rounded-md">
      <h2 className="title bg-red-400 text-white font-bold py-2 px-4 my-2 rounded-md">
        {q}
      </h2>
      <div className="answer-body grid grid-cols-2 gap-4">
        <div
          className={`${
            slectedAnswer === "a" ? "bg-amber-700" : "bg-amber-500"
          }  px-4 py-2 rounded text-white cursor-pointer`}
          onClick={() => handleAnswer(id, "a")}
        >
          {a}
        </div>
        <div
          className={`${
            slectedAnswer === "b" ? "bg-amber-700" : "bg-amber-500"
          }  px-4 py-2 rounded text-white cursor-pointer`}
          onClick={() => handleAnswer(id, "b")}
        >
          {b}
        </div>
        <div
          className={`${
            slectedAnswer === "c" ? "bg-amber-700" : "bg-amber-500"
          }  px-4 py-2 rounded text-white cursor-pointer`}
          onClick={() => handleAnswer(id, "c")}
        >
          {c}
        </div>
        <div
          className={`${
            slectedAnswer === "d" ? "bg-amber-700" : "bg-amber-500"
          }  px-4 py-2 rounded text-white cursor-pointer`}
          onClick={() => handleAnswer(id, "d")}
        >
          {d}
        </div>
      </div>
    </div>
  );
};
