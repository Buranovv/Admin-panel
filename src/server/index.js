import axios from "axios";

const request = axios.create({
  baseURL: "https://6526abe0917d673fd76cc383.mockapi.io/",
  timeout: 10000,
});

export default request;
