import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import Question from './question';

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]); // Array to keep track of answers
  const [quizList, setQuizList] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    fetch('/twenty_qs/quiz_list.json')
      .then(response => response.json())
      .then(data => {
        setQuizList(data.quizzes);
      });
  }, []);

  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  const handleDone = () => {
    setDone(true);
  };

  const handleQuizSelect = (quizPath) => {
    fetch(quizPath)
      .then(response => response.json())
      .then(data => {
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(0)); // Initialize answers array
        setSelectedQuiz(quizPath);
      });
  };

  const handleReturnToMenu = () => {
    setSelectedQuiz(null);
    setQuestions([]);
    setScore(0);
    setDone(false);
  };

  return (
    <div className="App">
      {selectedQuiz === null ? (
        <div>
          <h1>Select a Quiz</h1>
          {quizList.map((quiz, index) => (
            <button className='quiz-button' key={index} onClick={() => handleQuizSelect(quiz.path)}>
              {quiz.name}
            </button>
          ))}
        </div>
      ) : done ? (
        <div>
          <h1>כל הכבוד! הצלחת לפתור נכון {score} שאלות</h1>
          <button onClick={handleReturnToMenu}>Return to Main Menu</button>
        </div>
      ) : (
        questions.length > 0 && (
          <Question
            questions={questions} // Pass questions array to Question component
            onScoreUpdate={handleScoreUpdate}
            onDone={handleDone}
            score={score}
            answers={answers}
          />
        )
      )}
    </div>
  );
}


export default App;
