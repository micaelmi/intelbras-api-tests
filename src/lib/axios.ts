import axios from "axios";

const username = "admin";
const password = "admin123";

const api = axios.create({
  baseURL: "http://192.168.1.144/",
  auth: {
    username: username,
    password: password,
  },
});

export default api;
