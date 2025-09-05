const Loader = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
    <div className="relative flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-purple-500"></div>
      <img
        src="https://www.svgrepo.com/show/368817/quiz.svg"
        className="rounded-full h-12 w-12"
        alt="Loading"
      />
    </div>
    <p className="mt-4 text-xl font-medium text-gray-600">Loading...</p>
  </div>
);

export default Loader;