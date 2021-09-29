import { ANSWER_OPTIONS } from "constants";

import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";
import Select from "react-select";

import questionsApi from "apis/questions";

import Button from "../../Common/Button";

const AddQuestion = ({ prevPath, setLoading }) => {
  const { id, questionId } = useParams();
  const history = useHistory();

  const fetchQuestion = async () => {
    if (questionId) {
      const result = await questionsApi.show({
        questionId,
        payload: { quiz_id: id }
      });
      if (result.data.question) {
        setQuestionVal(result.data.question);
      }
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const [questionVal, setQuestionVal] = useState({
    name: "",
    option1: "",
    option2: "",
    quiz_id: id,
    options_count: 2,
    answer: 1
  });

  const [answerOptions, setAnswerOptions] = useState(
    ANSWER_OPTIONS.slice(0, questionVal.options_count)
  );

  const addOption = () => {
    if (questionVal.options_count < 4) {
      const newOptionsCount = questionVal.options_count + 1;
      setAnswerOptions(ANSWER_OPTIONS.slice(0, newOptionsCount));
      setQuestionVal({
        ...questionVal,
        options_count: newOptionsCount,
        [`option${newOptionsCount}`]: ""
      });
    }
  };

  const removeOption = optionNo => {
    if (questionVal.options_count > 2) {
      const newOptionsCount = questionVal.options_count - 1;
      setAnswerOptions(ANSWER_OPTIONS.slice(0, newOptionsCount));
      setQuestionVal(questionVal => {
        if (questionVal.options_count === 4 && optionNo === 3) {
          questionVal.option3 = questionVal.option4;
        }
        if (questionVal.answer === questionVal.options_count) {
          questionVal.answer -= 1;
        }
        delete questionVal[`option${questionVal.options_count}`];
        questionVal.options_count = newOptionsCount;

        return questionVal;
      });
    }
  };

  const handleOptionChange = e => {
    setQuestionVal(question => {
      return { ...question, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    if (
      questionVal.answer &&
      questionVal.name &&
      questionVal.option1 &&
      questionVal.option2 &&
      questionVal.options_count
    ) {
      if (questionId) {
        try {
          await questionsApi.update({
            questionId,
            payload: {
              quiz_id: id,
              question: questionVal
            }
          });
        } catch (err) {
          logger.error(err);
        }
      } else {
        try {
          await questionsApi.create({ question: questionVal, quiz_id: id });
        } catch (err) {
          logger.error(err);
        }
      }
      setLoading(true);
      history.push(prevPath);
    }
  };
  return (
    <div className="mx-10 mt-8 space-y-4  w-4/12">
      <div className="flex space-x-8 justify-between">
        <label>Question</label>
        <input
          className="p-2 border-2 flex-grow"
          type="text"
          name="name"
          value={questionVal.name}
          onChange={e => {
            handleOptionChange(e);
          }}
        />
      </div>
      {answerOptions.map(answerOption => {
        return (
          <Option
            key={answerOption.value}
            optionNo={answerOption.value}
            removeOption={removeOption}
            question={questionVal}
            handleOptionChange={handleOptionChange}
          />
        );
      })}
      <div className="flex justify-between space-x-8">
        <div></div>
        <button
          onClick={addOption}
          className="text-blue-800 underline font-bold"
        >
          +Add Option
        </button>
      </div>
      <div className="flex justify-between space-x-8">
        <label>Answer</label>
        <Select
          options={answerOptions}
          value={answerOptions?.find(
            answer => answer.value === questionVal.answer
          )}
          className="flex-grow"
          onChange={selection => {
            setQuestionVal(questionVal => {
              return {
                ...questionVal,
                answer: selection.value
              };
            });
          }}
        />
      </div>
      <div className="w-2/5">
        <Button
          buttonText={questionId ? "Edit question" : "Add question"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

const Option = ({ optionNo, question, removeOption, handleOptionChange }) => {
  return (
    <div className="flex space-x-8 justify-between">
      <label>Option {optionNo}</label>
      <input
        className="p-2 border-2 flex-grow"
        type="text"
        name={`option${optionNo}`}
        value={question[`option${optionNo}`]}
        onChange={e => {
          handleOptionChange(e);
        }}
      />
      {optionNo > 2 && (
        <i
          className="ri-subtract-fill text-xl bg-red-800 m-2 px-2 text-white "
          onClick={() => {
            removeOption(optionNo);
          }}
        ></i>
      )}
    </div>
  );
};

export default AddQuestion;
