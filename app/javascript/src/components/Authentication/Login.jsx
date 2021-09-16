import React, { useState } from "react";

import { useHistory } from "react-router";

import authApi from "apis/auth";

import Button from "../Common/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const history = useHistory();

  const handleSubmit = async () => {
    const params = {
      login: {
        email: email,
        password: pwd
      }
    };
    try {
      const result = await authApi.login(params);
      if (result.data) {
        history.go(0);
      }
    } catch (err) {
      logger.error(err);
    }
  };
  return (
    <div className="w-100 h-screen">
      <div className="w-100 h-20 p-4 border-b-2 text-xl">
        <h1 className="font-bold">Quizzy</h1>
      </div>
      <div className="w-100 space-y-3 pt-4 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold w-1/5">Login</h1>
        <div className="flex justify-between w-1/5">
          <h3>Email:</h3>
          <input
            type="text"
            name="email"
            className="border-2 "
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-between w-1/5">
          <h3>Password:</h3>
          <input
            type="password"
            name="password"
            className="border-2"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
          />
        </div>
        <Button buttonText="Submit" className="w-1/5" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default Login;
