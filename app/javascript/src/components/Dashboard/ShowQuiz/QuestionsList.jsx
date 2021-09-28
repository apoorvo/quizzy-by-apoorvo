import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import { useHistory, useParams, useRouteMatch } from "react-router";

import questionsApi from "apis/questions";

const QuestionsList = ({ questions, fetchQuestions }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(
    questions ? questions[0] : {}
  );

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDelete = async () => {
    await questionsApi.destroy({
      questionId: selectedQuestion.id,
      payload: { quiz_id: id }
    });
    setIsOpen(false);
    fetchQuestions();
  };

  if (questions.length === 0) {
    return (
      <div className="w-100 mt-6 h-2 flex flex-col items-center justify-center">
        <h1 className="text-xl">There are no questions in this quiz.</h1>
      </div>
    );
  }

  return (
    <div className="w-100 mt-6 mx-8 flex flex-col space-y-8 justify-center">
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
        style={{
          overlay: {},
          content: {
            width: "25%",
            height: "200px",
            overflow: "scroll",
            margin: "auto",
            borderRadius: "20px"
          }
        }}
      >
        <div className="flex flex-col mt-4 justify-center items-center">
          <h1 className="text-xl flex-grow">
            Are you sure you want to delete {`${selectedQuestion.name}`}?
          </h1>
          <div className="flex space-x-3 absolute bottom-0 mb-2">
            <button
              className="px-6 py-2 border-1"
              onClick={() => setIsOpen(false)}
            >
              No
            </button>
            <button
              className="px-6 py-2 bg-red-500 text-white"
              onClick={() => handleDelete()}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
      {questions.map((question, index) => {
        return (
          <div key={question.id} className="w-2/5 space-y-2 text-lg">
            <div className="flex space-x-10">
              <h1>Question {index + 1}</h1>
              <div className="flex flex-grow justify-between">
                <h1 className="font-bold">{question.name}</h1>
                <div className="flex space-x-8">
                  <button
                    className="bg-blue-300 flex rounded px-2 py-1"
                    onClick={() => {
                      history.push(`${match.url}/${question.id}/edit`);
                    }}
                  >
                    <i className="ri-pencil-line"></i>
                    <h1>Edit</h1>
                  </button>
                  <button
                    className="bg-red-500 flex px-2 rounded py-1 text-white"
                    onClick={() => {
                      setSelectedQuestion(question);
                      setIsOpen(true);
                    }}
                  >
                    <i className="ri-delete-bin-line"></i>
                    <h1>Delete</h1>
                  </button>
                </div>
              </div>
            </div>
            {[...Array(question.options_count).keys()].map(optionNo => {
              return (
                <Option
                  key={optionNo + 1}
                  question={question}
                  optionNo={optionNo + 1}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const Option = ({ optionNo, question }) => {
  return (
    <div className="flex space-x-20">
      <label>Option {optionNo}</label>
      <div className="flex items-center">
        <h1>{question[`option${optionNo}`]}</h1>
        {optionNo === question.answer && (
          <div className="flex items-center ">
            <i className="ri-checkbox-circle-fill text-xl ml-2 text-green-500 "></i>
            <p className="text-green-500 ">Correct Answer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
