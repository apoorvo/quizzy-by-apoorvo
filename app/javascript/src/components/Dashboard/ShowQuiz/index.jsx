import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch
} from "react-router";

import questionsApi from "apis/questions";

import AddQuestion from "./AddQuestion";

import Button from "../../Common/Button";

const ShowQuiz = ({ quizzes }) => {
  const { id } = useParams();
  const match = useRouteMatch();
  const history = useHistory();

  const currentQuiz = quizzes?.find(elem => elem.id == id);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const result = await questionsApi.list({ quiz_id: id });
    setQuestions(result.data.questions);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="w-100 h-screen p-4 flex flex-col">
      <div className="mt-4 mx-6 flex justify-between">
        <h1 className="text-5xl">{currentQuiz?.name}</h1>
        <Route exact path={match.path}>
          <Button
            buttonText="Add questions"
            icon="ri-add-box-fill"
            onClick={() => {
              history.push(`${match.url}/new`);
            }}
          />
        </Route>
      </div>
      <Switch>
        <Route exact path={`${match.path}/new`}>
          <AddQuestion />
        </Route>
        <Route exact path={match.path}>
          <div className="w-100 mt-6 h-2 flex flex-col items-center justify-center">
            <h1 className="text-xl">
              There are {questions.length} questions in this quiz.
            </h1>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default ShowQuiz;
