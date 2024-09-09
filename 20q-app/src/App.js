import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import Question from './question';

function App() {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answers, setAnswers] = useState([]); // Array to keep track of answers

  useEffect(() => {
    fetch('/twenty_qs/questions.json')
      .then(response => response.json())
      .then(data => {
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(0)); // Initialize answers array
      });
  }, []);


  const handleScoreUpdate = (newScore) => {
    setScore(newScore);
  };

  const handleDone = () => {
    setDone(true);
  };

  return (
    <div className="App">
      {done ? (
        <div>
          <h1>Your Score: {score}</h1>
        </div> ) : (
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
