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
    <div className="w-2/5">
      {QUESTIONS_LIST}
      <div className="w-1/5 ml-10">
        <Button buttonText="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

const QuestionView = ({ question, index, handleAnswerChange }) => {
  return (
    <div className="w-100 flex p-4 space-x-8">
      <div>
        <h1 className="text-2xl">Question {index + 1}</h1>
      </div>
      <div className="space-y-4">
        <h1 className="font-bold text-2xl">{question.name}</h1>
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
    <div className="flex items-center">
      <input type="radio" value={optionNo} name={question.id} />
      <label>{question[`option${optionNo}`]}</label>
    </div>
  );
};
export default AttemptForm;
