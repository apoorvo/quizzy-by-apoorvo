import React from "react";

import Button from "../Common/Button";

const SignUp = ({ user, handleChange, handleUserSubmit, quizName }) => {
  return (
    <>
      <div className="py-4">
        <h1 className="text-2xl">Welcome to {quizName}</h1>
      </div>

      <div className="flex w-2/6 flex-col">
        <div className="w-100 flex space-x-10">
          <label className="w-1/5">First Name</label>
          <input
            type="text"
            value={user.first_name}
            className="border-2 flex-grow"
            onChange={e => {
              handleChange(e);
            }}
            name="first_name"
          />
        </div>

        <div className="w-100 flex space-x-10">
          <label className="w-1/5">Last Name</label>
          <input
            type="text"
            value={user.last_name}
            className="border-2 flex-grow"
            onChange={e => {
              handleChange(e);
            }}
            name="last_name"
          />
        </div>

        <div className="w-100 flex space-x-10">
          <label className="w-1/5">Email </label>
          <input
            type="text"
            value={user.email}
            className="border-2 flex-grow"
            onChange={e => {
              handleChange(e);
            }}
            name="email"
          />
        </div>
        <div className="w-2/5 self-center">
          <Button buttonText="Submit" onClick={handleUserSubmit} />
        </div>
      </div>
    </>
  );
};

export default SignUp;
