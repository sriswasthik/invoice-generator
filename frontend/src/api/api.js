import axios from "axios";

const api = axios.create({
  baseURL: "https://github.com/sriswasthik/invoice-generator"
});

export default api;