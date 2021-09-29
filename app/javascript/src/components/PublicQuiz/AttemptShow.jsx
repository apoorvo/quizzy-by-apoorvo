import React from "react";

const AttemptShow = ({ questions, answers }) => {
  const QUESTIONS_LIST = questions.map((question, index) => {
    return (
      <QuestionView
        question={question}
        key={question.id}
        index={index}
        answers={answers}
      />
    );
  });

  return <div>{QUESTIONS_LIST}</div>;
};

const QuestionView = ({ question, index, answers }) => {
  return (
    <div className="w-100 flex p-4 space-x-8">
      <div>
        <h1 className="text-2xl">Question {index + 1}</h1>
      </div>
      <div className="space-y-4">
        <h1 className="font-bold text-2xl">{question.name}</h1>
        <div>
          {[...Array(question.options_count).keys()].map(optionNo => {
            return (
              <Option
                key={optionNo}
                optionNo={optionNo + 1}
                question={question}
                answerAttempt={answers?.find(
                  answer => answer.question_id === question.id
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Option = ({ optionNo, question, answerAttempt }) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        value={optionNo}
        name={question.id}
        disabled
        checked={answerAttempt?.selected_answer === optionNo}
      />
      <label>{question[`option${optionNo}`]}</label>
      {optionNo === answerAttempt?.correct_answer && (
        <div className="flex items-center ">
          <i className="ri-checkbox-circle-fill text-xl ml-2 text-green-500 "></i>
          <p className="text-green-500 ">Correct Answer</p>
        </div>
      )}
    </div>
  );
};
export default AttemptShow;
