import React, { useEffect, useState } from "react";

import attemptAnswersApi from "apis/attemptAnswers";
import questionsApi from "apis/questions";

import AttemptForm from "./AttemptForm";
import AttemptShow from "./AttemptShow";

const ShowQuizAttempt = ({
  quiz,
  quizSubmitted,
  setQuizSubmitted,
  user,
  attemptId
}) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async () => {
    try {
      const res = await questionsApi.list({ quiz_id: quiz.id });
      setQuestions(res.data.questions);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnswers = async () => {
    try {
      const {
        data: { attempt_answers }
      } = await attemptAnswersApi.show({
        attemptId: attemptId,
        payload: { quiz_id: quiz.id, user_id: user.id }
      });
      setAnswers(attempt_answers);
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchQuestions();
    if (quizSubmitted) {
      fetchAnswers();
    }
  }, []);

  useEffect(() => {
    if (quizSubmitted) {
      setLoading(true);
      fetchAnswers();
    }
  }, [quizSubmitted]);

  const handleAnswerChange = e => {
    const newAnswers = answers.filter(
      answer => answer.question_id !== e.target.name
    );
    newAnswers.push({
      question_id: e.target.name,
      selected_answer: e.target.value
    });
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!quizSubmitted) {
      try {
        const res = await attemptAnswersApi.create({
          attempt_answers: answers,
          user_id: user.id,
          quiz_id: quiz.id
        });
        setQuizSubmitted(res.data.submitted);
      } catch (err) {
        logger.error(err);
      }
    }
  };

  return (
    <div>
      <div className="p-4">
        <h1 className="text-3xl">{quiz?.name}</h1>
      </div>
      {!loading && (
        <div>
          {questions.length === 0 ? (
            <h1>No questions in this quiz</h1>
          ) : (
            <div>
              {quizSubmitted ? (
                <AttemptShow questions={questions} answers={answers} />
              ) : (
                <AttemptForm
                  questions={questions}
                  handleAnswerChange={handleAnswerChange}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowQuizAttempt;
