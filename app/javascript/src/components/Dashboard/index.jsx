import React, { useContext } from "react";

import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import authApi from "apis/auth";

import CreateQuiz from "./Form/CreateQuiz";
import QuizList from "./QuizList";

import { UserContext } from "../../App";

const Dashboard = () => {
  const history = useHistory();
  const match = useRouteMatch();
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
          <Route path={`${match.path}/new`} component={CreateQuiz} />
          <Route path={`${match.path}`} component={QuizList} />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
