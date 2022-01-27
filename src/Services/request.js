import axios from "axios";

const request = ({ method, url, params, data }) => {
  const variables = {
    url,
    data,
    params,
    method,
    headers: {},
  };

  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    variables.headers.token = token;
  }
  return axios(variables);
};

export default request;
