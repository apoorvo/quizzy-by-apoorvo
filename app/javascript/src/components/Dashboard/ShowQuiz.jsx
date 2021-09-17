import React from "react";

import { useParams } from "react-router";

import Button from "../Common/Button";

const ShowQuiz = ({ quizzes }) => {
  const { id } = useParams();
  const currentQuiz = quizzes?.find(elem => elem.id == id);

  return (
    <div className="w-100 h-screen p-4 flex flex-col">
      <div className="mt-4 mx-6 flex justify-between">
        <h1 className="text-5xl">{currentQuiz?.name}</h1>
        <Button buttonText="Add questions" icon="ri-add-box-fill" />
      </div>
      <div className="w-100 mt-6 h-2 flex flex-col items-center justify-center">
        <h1 className="text-xl">There are no questions in this quiz.</h1>
      </div>
    </div>
  );
};

export default ShowQuiz;
