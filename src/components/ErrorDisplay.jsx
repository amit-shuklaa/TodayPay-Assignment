const ErrorDisplay = ({ message }) => (
  <div className="flex flex-col justify-center items-center h-screen bg-gray-100 p-4">
    <div className="bg-white border-l-4 border-red-500 text-red-800 p-6 rounded-lg shadow-xl max-w-lg w-full text-center" role="alert">
      <div className="flex items-center justify-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <strong className="text-2xl font-bold ml-3">Oops! Something went wrong.</strong>
      </div>
      <span className="block mt-2 text-lg">{message}</span>
    </div>
  </div>
);

export default ErrorDisplay;