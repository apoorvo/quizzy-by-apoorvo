import React, { useState } from "react";

import { all, either, equals, isNil } from "ramda";
import { useHistory, useParams } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import Button from "../../Common/Button";
import Toastr from "../../Common/Toastr";

const EditQuiz = ({ quizzes, fetchQuizzes }) => {
  const { id } = useParams();
  const quiz = quizzes.find(elem => elem.id == id);
  const [name, setName] = useState(quiz?.name);

  const history = useHistory();
  const handleSubmit = async () => {
    if (either(isNil, all(equals(" ")))(name)) {
      Toastr.error("Name can not be blank or whitespace.");
    } else {
      try {
        await quizzesApi.update({ id, payload: { quiz: { name } } });
        fetchQuizzes();
        history.push("/dashboard");
      } catch (err) {
        logger.error(err);
      }
    }
  };

  return (
    <div className="w-3/5 py-4 px-8 space-y-10">
      <h1 className="text-5xl">Edit Quiz Name</h1>
      <div className="flex space-x-8">
        <h3>Quiz Name:</h3>
        <div className="flex w-2/5 flex-col">
          <input
            type="text"
            name="name"
            className="border-2 w-100"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <div className="w-2/5 mt-6">
            <Button buttonText="Submit" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuiz;
