import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ResultsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, totalQuestions, results } = location.state || {
    score: 0,
    totalQuestions: 0,
    results: [],
  };

  useEffect(() => {
    const savedHighScore = localStorage.getItem("quizHighScore") || 0;
    if (score > savedHighScore) {
      localStorage.setItem("quizHighScore", score.toString());
    }
  }, [score]);

  const handleRestart = () => {
    navigate("/");
  };

  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto text-center animate-fade-in p-6">
      {/* 🎯 Score Summary */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Quiz Complete! 🎉</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          You scored <span className="font-bold text-green-600">{score}</span> out of{" "}
          <span className="font-bold">{totalQuestions}</span>
        </p>
        <div className="relative pt-1">
          <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${percentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
            ></div>
          </div>
          <span className="text-xl font-bold text-blue-700">{percentage}%</span>
        </div>
      </div>

      {/* 📑 Answer Review */}
      <div className="bg-white shadow-2xl rounded-3xl p-8 text-left mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 pb-4">Review Your Answers</h2>
        <ul className="space-y-6 max-h-[500px] overflow-y-auto pr-3 custom-scrollbar">
          {results.map((res, idx) => (
            <li
              key={idx}
              className={`p-6 rounded-xl border-2 transition-all duration-300
                ${res.isCorrect ? "border-green-500 bg-green-50 shadow-md" : "border-red-500 bg-red-50 shadow-md"}`}
            >
              <p className="font-bold text-lg text-gray-800 mb-2" dangerouslySetInnerHTML={{ __html: `Q${idx + 1}: ${res.question}` }} />
              <p className="text-sm md:text-base text-gray-600">
                Your Answer:{" "}
                <span
                  className={`font-semibold ${res.isCorrect ? "text-green-600" : "text-red-600"}`}
                  dangerouslySetInnerHTML={{ __html: res.userAnswer }}
                />
              </p>
              {!res.isCorrect && (
                <p className="text-sm md:text-base text-gray-600 mt-1">
                  Correct Answer:{" "}
                  <span className="font-semibold text-green-600" dangerouslySetInnerHTML={{ __html: res.correctAnswer }} />
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 🔄 Restart Button */}
      <button
        onClick={handleRestart}
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Play Again
      </button>
    </div>
  );
};

export default ResultsScreen;