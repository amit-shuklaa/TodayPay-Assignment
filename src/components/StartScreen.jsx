import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUseLocalData } from "../api/triviaApi";

const StartScreen = () => {
  const [useLocal, setUseLocal] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [highScore, setHighScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore") || 0;
    setHighScore(Number(savedHighScore));
  }, []);

  const handleToggle = () => {
    setUseLocal((prev) => {
      const newValue = !prev;
      setUseLocalData(newValue);
      return newValue;
    });
  };

  const handleStart = () => {
    navigate("/quiz", { state: { difficulty } });
  };

  const difficulties = ["easy", "medium", "hard"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-2xl text-center transform transition-all duration-300 scale-95 hover:scale-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          🧠 React Quiz Challenge
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Test your knowledge with 10 challenging questions!
        </p>

        <div className="flex items-center justify-center mb-8 bg-yellow-50 rounded-full px-6 py-2 shadow-inner">
          <span className="text-2xl">🏆</span>
          <span className="ml-3 text-xl font-bold text-yellow-700">High Score: {highScore}</span>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Difficulty</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {difficulties.map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-6 py-3 rounded-full font-semibold capitalize transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105
                  ${
                    difficulty === level
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 flex justify-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useLocal}
              onChange={handleToggle}
              className="sr-only peer"
            />
            <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            <span className="ml-3 text-lg font-medium text-gray-700">
              {useLocal ? "Using Local Data" : "Using API"}
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-extrabold py-4 px-12 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default StartScreen;