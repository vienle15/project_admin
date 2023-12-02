import axios from "axios";

const axiosIntance = axios.create({
  baseURL: "http://localhost:6543/api/v1",
});

export { axiosIntance };
