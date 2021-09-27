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

  const [quizSubmitted, setQuizSubmitted] = useState(false);

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
      const res = await usersApi.create({ user, quiz_id: quiz?.id });
      setUser(res.data.user);
      setQuizSubmitted(res.data.submitted);
    } catch (err) {
      logger.error(err);
    } finally {
      setUserSubmitted(true);
    }
  };

  if (userSubmitted && !quizSubmitted) {
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
