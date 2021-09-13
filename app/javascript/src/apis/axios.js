import axios from "axios";

axios.defaults.baseURL = "/";

export const setAuthHeaders = (setLoading = () => null) => {
  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content")
  };
  // Edit after auth
  const email = localStorage.getItem("authEmail");
  if (email) {
    axios.defaults.headers["X-Auth-Email"] = email;
  }
  setLoading(false);
};
