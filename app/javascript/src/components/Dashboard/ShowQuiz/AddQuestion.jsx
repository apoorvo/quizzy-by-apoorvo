import { ANSWER_OPTIONS } from "constants";

import React, { useState } from "react";

import { useHistory, useParams } from "react-router";
import Select from "react-select";

import questionsApi from "apis/questions";

import Button from "../../Common/Button";

const AddQuestion = () => {
  const { id } = useParams();
  const history = useHistory();

  const [question, setQuestion] = useState({
    name: "",
    option1: "",
    option2: "",
    quiz_id: id
  });
  const [answerOptions, setAnswerOptions] = useState(
    ANSWER_OPTIONS.slice(0, 2)
  );
  const [extraOptions, setExtraOptions] = useState([]);

  const handleOptionAdd = () => {
    if (extraOptions.length < 2) {
      setExtraOptions(extraOptions => {
        return [...extraOptions, extraOptions.length + 3];
      });
      setQuestion(question => {
        const newOption = Number.isInteger(parseInt(extraOptions.slice(-1)))
          ? parseInt(extraOptions.slice(-1)) + 1
          : 3;
        return {
          ...question,
          [`option${newOption}`]: ""
        };
      });
      setAnswerOptions(ANSWER_OPTIONS.slice(0, extraOptions.length + 3));
    }
  };

  const handleOptionRemove = () => {
    if (extraOptions.length > 0) {
      setExtraOptions(extraOptions => {
        return extraOptions.slice(0, -1);
      });
      setQuestion(question => {
        if (extraOptions.slice(-1) == 4) {
          question[`option${extraOptions[0]}`] =
            question[`option${extraOptions.slice(-1)}`];
        }
        delete question[`option${extraOptions.slice(-1)}`];
        return question;
      });
      setAnswerOptions(
        ANSWER_OPTIONS.slice(0, extraOptions.slice(0, -1).length + 2)
      );
    }
  };

  const handleOptionChange = e => {
    setQuestion(question => {
      return { ...question, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    if (
      question.answer &&
      question.name &&
      question.option1 &&
      question.option2
    ) {
      try {
        await questionsApi.create({ question });
        history.goBack();
      } catch (err) {
        logger.error(err);
      }
    }
  };

  return (
    <div className="mx-6 ">
      <div className="flex">
        <label>Question</label>
        <input
          type="text"
          name="name"
          onChange={e => {
            handleOptionChange(e);
          }}
        />
      </div>
      <div className="flex">
        <label>Option 1</label>
        <input
          type="text"
          name="option1"
          value={question["option1"]}
          onChange={e => {
            handleOptionChange(e);
          }}
        />
      </div>
      <div className="flex">
        <label>Option 2</label>
        <input
          type="text"
          name="option2"
          value={question["option2"]}
          onChange={e => {
            handleOptionChange(e);
          }}
        />
      </div>
      <div className="flex ">
        <div></div>
        <button onClick={handleOptionAdd}>+Add Option</button>
      </div>
      {extraOptions.map(extraOption => (
        <Option
          key={extraOption}
          optionNo={extraOption}
          question={question}
          handleOptionRemove={handleOptionRemove}
          handleOptionChange={handleOptionChange}
        />
      ))}
      <div className="flex w-1/5">
        <label>Answer</label>
        <Select
          options={answerOptions}
          className="flex-grow"
          onChange={selection => {
            setQuestion(question => {
              return {
                ...question,
                answer: selection.value
              };
            });
          }}
        />
      </div>
      <Button buttonText="Add question" onClick={handleSubmit} />
    </div>
  );
};

const Option = ({
  optionNo,
  question,
  handleOptionRemove,
  handleOptionChange
}) => {
  return (
    <div className="flex">
      <label>Option {optionNo}</label>
      <input
        type="text"
        name={`option${optionNo}`}
        value={question[`option${optionNo}`]}
        onChange={e => {
          handleOptionChange(e);
        }}
      />
      <i className="ri-subtract-fill" onClick={handleOptionRemove}></i>
    </div>
  );
};

export default AddQuestion;
