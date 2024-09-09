import React, { useState, useEffect } from 'react';  
import './questions.css'; // Import the CSS file  
  
function Question({ questions, score, onScoreUpdate, onDone, answers }) {  
  const [showAnswer, setShowAnswer] = useState(false);  
  const [answerBackground, setAnswerBackground] = useState('blue');  
  const [questionNumber, setQuestionNumber] = useState(0); // Start from 0 to match array index
  
  useEffect(() => {
    // Set the initial answer background based on the answers array
    if (answers[questionNumber] === 1) {
      setAnswerBackground('green');
    } else if (answers[questionNumber] === -1) {
      setAnswerBackground('red');
    } else {
      setAnswerBackground('blue');
    }
  }, [questionNumber, answers]);

  const handleReveal = () => {  
    setShowAnswer(true);  
  };  
  
  const handleCheckmark = () => {  
    onScoreUpdate(score + 1);  
    answers[questionNumber] = 1; // Update the answer array
    setAnswerBackground('green');  
  };  
  
  const handleCross = () => {  
    answers[questionNumber] = -1; // Update the answer array
    setAnswerBackground('red');  
  };  

  const handleNextQuestion = () => {
    setShowAnswer(false);
    if (questionNumber + 1 < questions.length) {
      setQuestionNumber(questionNumber + 1);
    } else {
      onDone(); // Call onDone when all questions are done
    }
  };

  const handlePrevQuestion = () => {
    setShowAnswer(false);
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  
  return questions ? (  
    <div className="question-container">  
      <div className="question-number">.. {questionNumber + 1} ..</div> {/* Added question number */}
      <div className="question-text">{questions[questionNumber].question}</div>  
      {!showAnswer && (  
        <div className="reveal-button-container">  
          <button className="reveal-button" onClick={handleReveal}>  
            ?  
          </button>  
        </div>  
      )}  
      {showAnswer && (  
        <div className="answer-container" style={{ backgroundColor: answerBackground }}>  
          <div>{questions[questionNumber].answer}</div>  
          <div className="answer-buttons">  
            <button className="answer-button checkmark" onClick={handleCheckmark}>  
              ✔  
            </button>  
            <button className="answer-button cross" onClick={handleCross}>  
              ✘  
            </button>  
          </div>  
        </div>  
      )}  
      <div className="next-question-button-container">  
        <button className="next-question-button next-prev-question-button" onClick={handleNextQuestion}>  
          &lt;  
        </button>  
        {questionNumber > 0 && (
          <button className="prev-question-button next-prev-question-button" onClick={handlePrevQuestion}>  
            &gt;  
          </button>
        )}
      </div>  
    </div>  
  ) : null;
}

export default Question;  
