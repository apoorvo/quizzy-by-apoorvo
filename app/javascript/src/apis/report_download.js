import axios from "axios";

const create = (payload = {}) => axios.post("/downloads", payload);

const show = job_id => axios.get(`/downloads/${job_id}`);

const reportDownloadApi = {
  create,
  show
};

export default reportDownloadApi;
