import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { useHistory, useRouteMatch } from "react-router-dom";

import Button from "../Common/Button";
import PageLoader from "../Common/PageLoader";
import QuizTable from "./QuizTable";

const QuizList = ({ quizzes, loading, fetchQuizzes }) => {
  const match = useRouteMatch();
  const history = useHistory();

  const handleAdd = () => {
    history.push({
      pathname: `${match.path}/new`
    });
  };

  return (
    <div>
      <div className="w-100 flex flex-row-reverse px-6 my-2">
        <Button
          icon="ri-add-box-fill"
          buttonText="Add new quiz"
          onClick={handleAdd}
        />
      </div>

      <div className="w-100 m-auto text-center">
        {loading && <PageLoader />}
        {either(isNil, isEmpty)(quizzes) ? (
          <h1 className="text-xl leading-5 text-center">
            You have not created any quiz.
          </h1>
        ) : (
          <QuizTable quizzes={quizzes} fetchQuizzes={fetchQuizzes} />
        )}
      </div>
    </div>
  );
};

export default QuizList;
