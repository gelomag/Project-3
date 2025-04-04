import { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCounter from './QuestionCounter';
import Score from './Score';
import { scienceQuestions } from './scienceQuestions';
import { shuffleArray } from './shuffleArray';

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return { ...state, running: true };
    case 'STOP':
      return { ...state, running: false };
    case 'TICK':
      return { ...state, timeLeft: state.timeLeft - 1 };
    case 'RESET':
      return { ...state, timeLeft: action.payload };
    case 'TIME_UP':
      return { ...state, timeUp: true };
    default:
      return state;
  }
};

const Science = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentChoices, setCurrentChoices] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [allQuestionsUsed, setAllQuestionsUsed] = useState(false);

  // Timer state managed by useReducer
  const [state, dispatch] = useReducer(timerReducer, { timeLeft: 20, running: false, timeUp: false });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Fetch questions on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchedQuestions = await scienceQuestions();
      if (fetchedQuestions.length > 0) {
        const randomizedQuestions = shuffleArray(fetchedQuestions);
        setQuestions(randomizedQuestions);
        setCurrentQuestion(randomizedQuestions[0].question);
        setCurrentChoices([randomizedQuestions[0].answerA, randomizedQuestions[0].answerB, randomizedQuestions[0].answerC, randomizedQuestions[0].answerD]);
      }
    };

    fetchData();
  }, []);

  // Timer logic and effect
  useEffect(() => {
    if (!state.running) return; // Do nothing if the timer is not running

    if (state.timeLeft === 0 || allQuestionsUsed) {
      dispatch({ type: 'TIME_UP' });
      navigate('/finalScore', { state: { score } });
      return;
    }

    const timerInterval = setInterval(() => {
      dispatch({ type: 'TICK' }); // Decrease the timeLeft by 1 each second
    }, 1000);

    // Cleanup function to clear interval when component unmounts or timer stops
    return () => clearInterval(timerInterval);
  }, [state.timeLeft, state.running, navigate, score, allQuestionsUsed]);

  // Start the timer when component mounts
  useEffect(() => {
    dispatch({ type: 'START' });
  }, []);

  const handleAnswer = (selectedChoice) => {
    const currentQuestionData = questions[questionIndex];
    if (selectedChoice === currentQuestionData.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNext(); // Move to the next question
  };

  const handleNext = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
      const nextQuestion = questions[questionIndex + 1];
      setCurrentQuestion(nextQuestion.question);
      setCurrentChoices([nextQuestion.answerA, nextQuestion.answerB, nextQuestion.answerC, nextQuestion.answerD]);
    } else {
      setAllQuestionsUsed(true); // Set to true when all questions have been used
    }
  };

  // If no question loaded yet, show loading state
  if (!currentQuestion)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#252525] w-[500px] h-[300px] rounded-[30px] p-12 items-center m-4">
          <p className="text-lg font-normal lg:text-xl dark:text-gray-400 text-center">Loading questions...</p>
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[#252525] w-[500px] rounded-[30px] p-10 text-center m-4">
        <Score score={score} />
        <h3 className="text-3xl font-bold dark:text-white">Question {questionIndex + 1} of {questions.length}</h3>
        <QuestionCounter
          currentQuestion={questionIndex + 1}
          totalQuestions={questions.length}
          question={currentQuestion}
          choices={currentChoices}
          onAnswer={handleAnswer}
          allQuestionsUsed={allQuestionsUsed}
        />
        <p className="text-xl text-gray-400">Time left: {formatTime(state.timeLeft)}</p> {/* Display the formatted timer */}
      </div>
    </div>
  );
};

export default Science;
