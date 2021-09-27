import axios from "axios";

const list = payload => axios.get("/questions", { params: payload });

const show = ({ questionId, payload }) =>
  axios.get(`/questions/${questionId}`, { params: payload });

const update = ({ questionId, payload }) =>
  axios.put(`/questions/${questionId}`, payload);

const create = payload => axios.post("/questions", payload);

const destroy = ({ questionId, payload }) =>
  axios.delete(`/questions/${questionId}`, { params: payload });

const questionsApi = {
  list,
  create,
  show,
  update,
  destroy
};

export default questionsApi;
