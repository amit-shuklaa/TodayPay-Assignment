import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizApp from "./pages/QuizApp";
import ResultsScreen from "./components/ResultsScreen";
import StartScreen from "./components/StartScreen";

function App() {
  return (
    <main className="bg-gradient-to-br from-purple-50 to-indigo-100 font-sans min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto rounded-3xl shadow-xl p-8 bg-white/50 backdrop-blur-lg">
        <Router>
          <Routes>
            <Route path="/" element={<StartScreen />} />
            <Route path="/quiz" element={<QuizApp />} />
            <Route path="/results" element={<ResultsScreen />} />
          </Routes>
        </Router>
      </div>
    </main>
  );
}

export default App;