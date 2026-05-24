import axios from "axios";

// =====================================
// AXIOS INSTANCE
// =====================================

const api = axios.create({

  baseURL:
    import.meta.env.VITE_API_URL ||

    "http://localhost:5000/api"

});

// =====================================
// REQUEST INTERCEPTOR
// =====================================

api.interceptors.request.use(

  (config) => {

    // Get latest token

    const token =
      localStorage.getItem(
        "token"
      );

    // Attach token

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(
      error
    );
  }
);

// =====================================
// RESPONSE INTERCEPTOR
// =====================================

api.interceptors.response.use(

  (response) => response,

  (error) => {

    // Auto logout on invalid token

    if (
      error.response?.status === 401
    ) {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default api;