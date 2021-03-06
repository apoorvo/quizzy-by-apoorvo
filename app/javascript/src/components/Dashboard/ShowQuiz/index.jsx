import { BASE_PUBLIC_URL } from "constants";

import React, { useEffect, useState } from "react";

import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch
} from "react-router";

import publicviewApi from "apis/publicview";
import questionsApi from "apis/questions";

import AddQuestion from "./AddQuestion";
import QuestionsList from "./QuestionsList";

import Button from "../../Common/Button";

const ShowQuiz = ({ quizzes, fetchQuizzes }) => {
  const { id } = useParams();
  const match = useRouteMatch();
  const history = useHistory();

  const currentQuiz = quizzes?.find(elem => elem.id == id);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const result = await questionsApi.list({ quiz_id: id });
      setQuestions(result.data.questions);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [loading]);

  if (loading) {
    return (
      <div className="w-100 h-screen flex justify-center items-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  const handlePublish = async () => {
    await publicviewApi.create({ id: currentQuiz.id });
    fetchQuizzes();
  };

  return (
    <div className="w-100 h-screen p-4 flex flex-col">
      <div className="mt-4 mx-6 flex justify-between">
        <h1 className="text-5xl">{currentQuiz?.name}</h1>
        <Route exact path={match.path}>
          <div className="flex items-end">
            {currentQuiz?.slug ? (
              <Button buttonText="Published" />
            ) : (
              <Button buttonText="Publish" onClick={handlePublish} />
            )}
          </div>
          <div className="flex items-end">
            <Button
              buttonText="Add questions"
              icon="ri-add-box-fill"
              onClick={() => {
                history.push(`${match.url}/new`);
              }}
            />
          </div>
        </Route>
      </div>
      {currentQuiz?.slug && (
        <div className="py-4 px-6">
          <a
            href={`${BASE_PUBLIC_URL}/${currentQuiz.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            Published at:
            <span className="text-blue-500">
              {`${BASE_PUBLIC_URL}/${currentQuiz.slug}`}
            </span>
          </a>
        </div>
      )}

      <Switch>
        <Route exact path={`${match.path}/:questionId/edit`}>
          <AddQuestion prevPath={match.url} setLoading={setLoading} />
        </Route>
        <Route exact path={`${match.path}/new`}>
          <AddQuestion prevPath={match.url} setLoading={setLoading} />
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
