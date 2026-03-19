import axios from "axios";

const api = axios.create({
  baseURL: "https://invoice-generator-01s4.onrender.com/api"
});

export default api;