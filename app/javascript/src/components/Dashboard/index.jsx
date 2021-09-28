import React, { useContext, useState, useEffect } from "react";

import {
  Link,
  Route,
  Switch,
  useHistory,
  useRouteMatch
} from "react-router-dom";

import authApi from "apis/auth";
import quizzesApi from "apis/quizzes";

import CreateQuiz from "./Form/CreateQuiz";
import EditQuiz from "./Form/EditQuiz";
import QuizList from "./QuizList";
import ShowQuiz from "./ShowQuiz";

import { UserContext } from "../../App";

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
          <Link to={`${match.url}`}>
            <h1>Quizzy</h1>
          </Link>
          <div className="flex justify-end space-x-3 items-baseline">
            <Link to={`${match.url}/reports`}>
              <h1>Reports</h1>
            </Link>
            <h1>{`${user.first_name} ${user.last_name}`}</h1>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        <Switch>
          <Route path={`${match.path}/reports`} exact>
            <div>hello</div>
          </Route>
          <Route path={`${match.path}/:id/edit`} exact>
            <EditQuiz quizzes={quizzes} fetchQuizzes={fetchQuizzes} />
          </Route>
          <Route path={`${match.path}/:id/show`}>
            <ShowQuiz quizzes={quizzes} fetchQuizzes={fetchQuizzes} />
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
