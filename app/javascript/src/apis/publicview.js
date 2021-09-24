import axios from "axios";

const create = payload => axios.post("/publicview", payload);

const show = slug => axios.get(`/publicview/${slug}`);

const publicviewApi = {
  create,
  show
};

export default publicviewApi;
