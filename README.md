React Quiz App 🧠
This is a dynamic and interactive quiz application built with React. It's designed to be a simple, fun, and educational tool for testing general knowledge. The app fetches questions from an external API, provides a clean user interface, and tracks your score and high scores.

✨ Features
Multiple Difficulties: Choose between easy, medium, and hard questions.

Dynamic Questions: Fetches 10 general knowledge questions from the Open Trivia Database API.

Answer Review: After completing the quiz, you can review all your answers to see what you got right and wrong.

High Score Tracking: The app saves your highest score to local storage so you can try to beat it on your next attempt.

Responsive Design: Built with Tailwind CSS, the UI looks great on both desktop and mobile devices.

Session Management: The app saves your progress to session storage, so you don't lose your place if you accidentally refresh the page.

🛠️ Technologies Used
React: The core library for building the user interface.

React Router: For handling navigation between different screens (Start, Quiz, Results).

Tailwind CSS: A utility-first CSS framework for rapid and responsive styling.

Open Trivia Database API: The source for all general knowledge questions.

🚀 Getting Started
Follow these steps to get the project up and running on your local machine.

Prerequisites
You'll need Node.js and npm (or yarn) installed on your computer.

Bash

# Check if Node.js is installed
node -v

# Check if npm is installed
npm -v
Installation
Clone the repository:

Bash

git clone <repository-url>
Navigate to the project directory:

Bash

cd react-quiz-app
Install the dependencies:

Bash

npm install
# or
yarn
Running the App
Start the development server:

Bash

npm run dev
# or
yarn dev
The app will be available at http://localhost:5173 (or another port if 5173 is in use).

📂 Project Structure
src/: Contains all the source code for the application.

api/: API calls, including the triviaApi.js file for fetching questions.

components/: Reusable React components like QuestionCard, Loader, ErrorDisplay, etc.

pages/: Top-level components representing different app screens (QuizApp.jsx).

App.jsx: The main component that sets up routing.

main.jsx: The entry point for the React application.

🤝 Contributing
Contributions are welcome! If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.
