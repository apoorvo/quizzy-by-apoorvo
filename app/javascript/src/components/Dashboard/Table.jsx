import React from "react";

const Table = ({ quizzes }) => {
  return (
    <div>
      {quizzes.map(quiz => {
        return <h1 key={quiz.id}>{quiz.name}</h1>;
      })}
    </div>
  );
};

export default Table;
