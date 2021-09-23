import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

import publicviewApi from "apis/publicview";

const PublicQuiz = () => {
  const { slug } = useParams();

  const [quiz, setQuiz] = useState({});

  const fetchQuiz = async () => {
    const res = await publicviewApi.show(slug);
    setQuiz(res.data.quiz);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);
  return <div>{quiz?.name}</div>;
};

export default PublicQuiz;
