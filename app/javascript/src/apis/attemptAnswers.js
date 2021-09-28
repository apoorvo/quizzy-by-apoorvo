import axios from "axios";

const create = payload => axios.post("/attempt_answers", payload);

const show = ({ attemptId, payload }) =>
  axios.get(`/attempt_answers/${attemptId}`, { params: payload });

const attemptAnswersApi = {
  create,
  show
};

export default attemptAnswersApi;
