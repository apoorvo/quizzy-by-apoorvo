import React from "react";

const SignUp = ({ user, handleChange, handleUserSubmit }) => {
  return (
    <div className="flex flex-col">
      <input
        type="text"
        value={user.first_name}
        className="border-2"
        onChange={e => {
          handleChange(e);
        }}
        name="first_name"
      />
      <input
        type="text"
        className="border-2"
        value={user.last_name}
        onChange={e => {
          handleChange(e);
        }}
        name="last_name"
      />
      <input
        type="text"
        className="border-2"
        value={user.email}
        onChange={e => {
          handleChange(e);
        }}
        name="email"
      />
      <button onClick={handleUserSubmit}>Submit</button>
    </div>
  );
};

export default SignUp;
