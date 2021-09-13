import React from "react";

import { useHistory } from "react-router";

import authApi from "../../apis/auth";

const Dashboard = () => {
  const history = useHistory();

  const handleLogout = async () => {
    await authApi.logout();
    history.go(0);
  };
  return (
    <div>
      <div>
        <div className="w-100 h-20 p-4 border-b-2 text-xl flex justify-between">
          <h1>Quizzy</h1>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
