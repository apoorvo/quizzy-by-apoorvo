import axios from "axios";

const list = () => axios.get("/attempts");

const attemptsApi = {
  list
};

export default attemptsApi;
