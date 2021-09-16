import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { useHistory, useRouteMatch } from "react-router-dom";

import quizzesApi from "apis/quizzes";

import Table from "./Table";

import Button from "../Common/Button";
import PageLoader from "../Common/PageLoader";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const match = useRouteMatch();
  const history = useHistory();

  const fetchQuizzes = async () => {
    try {
      const response = await quizzesApi.list();
      setQuizzes(response.data.quizzes);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    history.push({
      pathname: `${match.path}/new`
    });
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);
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
          <Table quizzes={quizzes} />
        )}
      </div>
    </div>
  );
};

export default QuizList;
