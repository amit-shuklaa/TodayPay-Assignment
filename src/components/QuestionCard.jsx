const QuestionCard = ({ questionData, onAnswerSelect, onNext, selectedAnswer, isLastQuestion }) => {
  const { question, options } = questionData;

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-3xl mx-auto animate-fade-in border-4 border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: question }} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerSelect(option)}
            className={`w-full p-5 rounded-xl border-2 text-left transition-all duration-300 font-medium text-lg
              ${selectedAnswer === option
                ? 'bg-blue-600 border-blue-700 text-white shadow-lg transform scale-105'
                : 'bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-blue-300'
              }`}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        ))}
      </div>
      <div className="mt-10 text-right">
        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-transform duration-200 hover:scale-105"
        >
          {isLastQuestion ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;