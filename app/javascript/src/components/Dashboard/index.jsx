import React, { useContext } from "react";

import { useHistory } from "react-router";

import authApi from "../../apis/auth";
import { UserContext } from "../../App";

const Dashboard = () => {
  const history = useHistory();
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

        <div className="w-100 flex flex-row-reverse">
          <button className="bg-blue-500 p-2 flex mr-2 justify-center items-baseline text-white">
            <i className="ri-add-box-fill p-2 text-white"></i>Add new quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
