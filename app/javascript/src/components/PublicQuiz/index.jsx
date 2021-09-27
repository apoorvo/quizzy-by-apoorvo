import React, { useEffect, useState } from "react";

import { useHistory, useParams, useRouteMatch } from "react-router";

import publicviewApi from "apis/publicview";
import usersApi from "apis/users";

import SignUp from "./SignUp";

const PublicQuiz = () => {
  const { slug } = useParams();
  const history = useHistory();
  const match = useRouteMatch();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: ""
  });

  const [userSubmitted, setUserSubmitted] = useState(false);

  const [quiz, setQuiz] = useState({});
  const fetchQuiz = async () => {
    try {
      const res = await publicviewApi.show(slug);
      if (res.data.quiz) {
        history.push(`${match.url}/attempt/new`);
        setQuiz(res.data.quiz);
      }
    } catch (err) {
      logger.error(err);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleUserSubmit = async () => {
    try {
      await usersApi.create({ user });
    } catch (err) {
      logger.error(err);
    }
    setUserSubmitted(true);
  };

  if (userSubmitted) {
    return <div>{quiz?.name}</div>;
  } else {
    return (
      <SignUp
        user={user}
        handleChange={handleChange}
        handleUserSubmit={handleUserSubmit}
      />
    );
  }
};

export default PublicQuiz;
