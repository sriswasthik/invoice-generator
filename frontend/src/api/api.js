// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://invoice-generator-01s4.onrender.com/api"
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://invoice-generator-01s4.onrender.com/api"
});

// attach token automatically
const token = localStorage.getItem("token");

if (token) {
  api.defaults.headers.common["Authorization"] = token;
}

export default api;