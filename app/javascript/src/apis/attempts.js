import axios from "axios";

const list = () => axios.get("/attempts");

const download_start = () => axios.get("/attempts/download");

const download_status = job_id =>
  axios.get(`/attempts/download/status/${job_id}`);

const download_report = job_id => axios.get(`/attempts/download/${job_id}`);

const attemptsApi = {
  list,
  download_start,
  download_status,
  download_report
};

export default attemptsApi;
