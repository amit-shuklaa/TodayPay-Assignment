import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchQuestionsFromAPI } from "../api/triviaApi";
import Loader from "../components/Loader";
import ErrorDisplay from "../components/ErrorDisplay";
import QuestionCard from "../components/QuestionCard";

const loadStateFromSession = () => {
  try {
    const serializedState = sessionStorage.getItem("quizState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state from session storage", e);
    return undefined;
  }
};

function QuizApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const difficulty = location.state?.difficulty || "easy";
  const savedState = loadStateFromSession();

  const [questions, setQuestions] = useState(savedState?.questions || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(savedState?.currentQuestionIndex || 0);
  const [userAnswers, setUserAnswers] = useState(savedState?.userAnswers || []);
  const [score, setScore] = useState(savedState?.score || 0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(savedState ? false : true);
  const [timer, setTimer] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (!loading && questions.length > 0 && !quizCompleted) {
      const stateToSave = { questions, currentQuestionIndex, userAnswers, score };
      sessionStorage.setItem("quizState", JSON.stringify(stateToSave));
    }
  }, [questions, currentQuestionIndex, userAnswers, score, loading, quizCompleted]);

  useEffect(() => {
    let isSubscribed = true;
    const loadQuestions = async () => {
      if (questions.length === 0) {
        try {
          const formattedQuestions = await fetchQuestionsFromAPI(difficulty);
          if (isSubscribed) setQuestions(formattedQuestions);
        } catch (err) {
          if (isSubscribed) setError(err.message);
        } finally {
          if (isSubscribed) setLoading(false);
        }
      }
    };
    if (loading) loadQuestions();
    return () => { isSubscribed = false; };
  }, [loading, difficulty, questions.length]);

  const handleAnswerSelect = (answer) => setSelectedAnswer(answer);

  const handleNextQuestion = useCallback(() => {
    const isCorrect = selectedAnswer === questions[currentQuestionIndex]?.correct_answer;
    if (isCorrect) setScore((prev) => prev + 1);
    
    setUserAnswers((prev) => [
      ...prev,
      {
        question: questions[currentQuestionIndex].question,
        userAnswer: selectedAnswer || "No Answer",
        correctAnswer: questions[currentQuestionIndex].correct_answer,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimer(30);
    } else {
      setQuizCompleted(true);
    }
  }, [currentQuestionIndex, questions, selectedAnswer]);

  useEffect(() => {
    if (quizCompleted) {
      sessionStorage.removeItem("quizState");
      navigate("/results", {
        state: { score, results: userAnswers, totalQuestions: questions.length },
      });
    }
  }, [quizCompleted, navigate, score, userAnswers, questions.length]);

  useEffect(() => {
    if (loading || quizCompleted) return;
    if (timer === 0) {
      handleNextQuestion();
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, loading, quizCompleted, handleNextQuestion]);

  if (loading) return <Loader />;
  if (error) return <ErrorDisplay message={error} />;
  if (!questions || questions.length === 0) return <ErrorDisplay message="No questions loaded." />;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl md:text-2xl font-bold text-gray-800">
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
          <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span aria-live="assertive">{timer}s left</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8 shadow-inner">
          <div
            className="bg-purple-600 h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div aria-live="polite" aria-atomic="true">
          <QuestionCard
            questionData={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
            selectedAnswer={selectedAnswer}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        </div>
      </div>
    </div>
  );
}

export default QuizApp;