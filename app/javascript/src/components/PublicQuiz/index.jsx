import React, { useEffect, useState } from "react";

import { useHistory, useParams, useRouteMatch } from "react-router";

import publicviewApi from "apis/publicview";
import usersApi from "apis/users";

import ShowQuizAttempt from "./ShowQuizAttempt";
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
  const [attemptId, setAttemptId] = useState("");
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
      setAttemptId(res.data.attempt_id);
    } catch (err) {
      logger.error(err);
    } finally {
      setUserSubmitted(true);
    }
  };

  return (
    <div className="w-100 flex flex-col space-y-4">
      <div className="w-100 h-20 p-4 border-b-2  flex justify-between">
        <h1 className="text-xl">Quizzy</h1>
      </div>

      <div className="p-4">
        {userSubmitted ? (
          <ShowQuizAttempt
            quiz={quiz}
            quizSubmitted={quizSubmitted}
            user={user}
            attemptId={attemptId}
            setQuizSubmitted={setQuizSubmitted}
          />
        ) : (
          <SignUp
            quizName={quiz?.name}
            user={user}
            handleChange={handleChange}
            handleUserSubmit={handleUserSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default PublicQuiz;
