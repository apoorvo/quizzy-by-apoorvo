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
import QuestionsList from "./QuestionsList";

import Button from "../../Common/Button";

const ShowQuiz = ({ quizzes }) => {
  const { id } = useParams();
  const match = useRouteMatch();
  const history = useHistory();

  const currentQuiz = quizzes?.find(elem => elem.id == id);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    const result = await questionsApi.list({ quiz_id: id });
    setQuestions(result.data.questions);
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="w-100 h-screen flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

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
        <Route exact path={`${match.path}/:questionId/edit`}>
          <AddQuestion prevPath={match.url} />
        </Route>
        <Route exact path={`${match.path}/new`}>
          <AddQuestion prevPath={match.url} />
        </Route>
        <Route path={match.path}>
          <QuestionsList
            questions={questions}
            fetchQuestions={fetchQuestions}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default ShowQuiz;
