import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const publicAPI = axios.create({
  baseURL: "https://fv9kww-5000.csb.app",
  withCredentials: true,
});

export const authAPI = axios.create({
  baseURL: "https://fv9kww-5000.csb.app",
  withCredentials: true,
});

const refreshToken = async () => {
  try {
    const response = await authAPI.post(
      "/auth/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data.accessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    throw error;
  }
};

authAPI.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) return Promise.reject(error);

    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    if (originalRequest.url.includes("/auth/refresh")) {
      // refresh itself failed → logout user
      // localStorage.removeItem("accessToken");
      return Promise.reject(error);
    }

    // originalRequest._retry = true;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return authAPI(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
