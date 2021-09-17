import React, { useContext, useState, useEffect } from "react";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import authApi from "apis/auth";

import quizzesApi from "apis/quizzes";

import CreateQuiz from "./Form/CreateQuiz";
import QuizList from "./QuizList";

import { UserContext } from "../../App";
import EditQuiz from "./Form/EditQuiz";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const match = useRouteMatch();

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await quizzesApi.list();
      setQuizzes(response.data.quizzes);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const user = useContext(UserContext);

  const handleLogout = async () => {
    await authApi.logout();
    history.go(0);
  };

  return (
    <div>
      <div className="w-100 flex flex-col">
        <div className="w-100 h-20 p-4 border-b-2 text-xl flex justify-between">
          <h1>Quizzy</h1>
          <div className="flex justify-end space-x-3 items-baseline">
            <h1>Reports</h1>
            <h1>{`${user.first_name} ${user.last_name}`}</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <Switch>
          <Route path={`${match.path}/:id/edit`} exact>
            <EditQuiz quizzes={quizzes} fetchQuizzes={fetchQuizzes} />
          </Route>
          <Route path={`${match.path}/new`} exact>
            <CreateQuiz fetchQuizzes={fetchQuizzes} />
          </Route>
          <Route
            path={`${match.path}`}
            component={() => (
              <QuizList
                quizzes={quizzes}
                loading={loading}
                fetchQuizzes={fetchQuizzes}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
