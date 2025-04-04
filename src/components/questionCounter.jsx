import React from 'react';

const QuestionCounter = ({ currentQuestion, totalQuestions, question, choices, onAnswer, allQuestionsUsed }) => {
    // Calculate progress percentage based on current question and total questions
    // If all questions are used, set progress to 100%
    const progressPercentage = allQuestionsUsed ? 100 : ((currentQuestion - 1) * 100) / totalQuestions;

    return (
      <div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-4">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: `${progressPercentage}%` }}
          >
            {Math.round(progressPercentage)}%
          </div>
        </div>
    
        {/* Question and Choices */}
        <div>
          <h1 className="text-xl font-semibold dark:text-gray-100 pb-4">
            {question}
          </h1>
          <div>
            {choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => onAnswer(choice)}
                className="w-full mb-2 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <h4>{String.fromCharCode(65 + index)}. {choice}</h4>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
};

export default QuestionCounter;
