import axios from "axios";

const list = payload => axios.get("/questions", { params: payload });

const show = questionId => axios.get(`/questions/${questionId}`);

const update = ({ questionId, payload }) =>
  axios.put(`/questions/${questionId}`, payload);

const create = payload => axios.post("/questions", payload);

const destroy = questionId => axios.delete(`/questions/${questionId}`);

const questionsApi = {
  list,
  create,
  show,
  update,
  destroy
};

export default questionsApi;
