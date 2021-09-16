import React, { useContext, useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { useHistory } from "react-router";

import Table from "./Table";

import authApi from "../../apis/auth";
import quizzesApi from "../../apis/quizzes";
import { UserContext } from "../../App";
import PageLoader from "../Common/PageLoader";

const Dashboard = () => {
  const history = useHistory();
  const user = useContext(UserContext);

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await authApi.logout();
    history.go(0);
  };

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

  useEffect(() => {
    fetchQuizzes();
  }, []);

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

        <div className="w-100 flex flex-row-reverse px-6 my-2">
          <button className="bg-blue-500 py-1 px-2 flex justify-center items-baseline text-white">
            <i className="ri-add-box-fill p-2 text-white"></i>Add new quiz
          </button>
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
    </div>
  );
};

export default Dashboard;
