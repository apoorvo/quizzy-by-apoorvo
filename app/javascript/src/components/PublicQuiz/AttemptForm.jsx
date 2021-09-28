import React from "react";

import Button from "../Common/Button";

const AttemptForm = ({ questions, handleAnswerChange, handleSubmit }) => {
  const QUESTIONS_LIST = questions.map((question, index) => {
    return (
      <QuestionView
        question={question}
        key={question.id}
        index={index}
        handleAnswerChange={handleAnswerChange}
      />
    );
  });

  return (
    <div>
      {QUESTIONS_LIST}
      <Button buttonText="Submit" onClick={handleSubmit} />
    </div>
  );
};

const QuestionView = ({ question, index, handleAnswerChange }) => {
  return (
    <div>
      <div>
        <h1>Question {index + 1}</h1>
      </div>
      <div>
        <h1>{question.name}</h1>
        <div onChange={handleAnswerChange}>
          {[...Array(question.options_count).keys()].map(optionNo => {
            return (
              <Option
                key={optionNo}
                optionNo={optionNo + 1}
                question={question}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Option = ({ optionNo, question }) => {
  return (
    <div>
      <input type="radio" value={optionNo} name={question.id} />
      <label>{question[`option${optionNo}`]}</label>
    </div>
  );
};
export default AttemptForm;
