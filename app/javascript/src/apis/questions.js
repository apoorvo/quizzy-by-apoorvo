import axios from "axios";

const list = payload => axios.get("/questions", { params: payload });

const create = payload => axios.post("/questions", payload);

const questionsApi = {
  list,
  create
};

export default questionsApi;
