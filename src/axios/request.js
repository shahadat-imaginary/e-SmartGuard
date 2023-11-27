import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const refreshURL = "/auth/api/token/refresh/";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const request = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {


          config.headers["Authorization"] = "Bearer " + token;
          // config.headers['Content-Type'] = 'application/json';

      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response.data && response.data.success) {
        // Handle success if needed
      }

      return response;
    },
    async (error) => {
      if (error.response && error.response.data && error.response.data.error) {
      } else if (error.response && error.response.statusText) {
        if (process.env.NODE_ENV === "development") {
        }
      }
      const originalRequest = error.config;
      if (error.response && error.response.status === 403) {
        const token = JSON.parse(localStorage.getItem("token"));
        const refreshToken = token.refresh;

        return axios
          .post(baseURL + refreshURL, {
            refresh: refreshToken,
          })
          .then((res) => {
            if (res.status === 200) {
              // USER_INFO.access_token = res.data.access;
              // USER_INFO.refresh = null;
              // localStorage.setItem(
              //   "token",
              //   JSON.stringify(USER_INFO)
              // );

              // originalRequest.headers["Authorization"] =
              //   "Bearer " + USER_INFO.access_token;

              return axios(originalRequest);
            }
          })
          .catch((error) => {
            localStorage.removeItem("token");

            window.location.assign("/");
          });
      }
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");

        window.location.assign("/");
      }
      return Promise.reject(error);
    }
  );

  return {
    get: (url, params) => {
      return axiosInstance.get(`${baseURL + url}`, { params: params });
    },
    post: (url, data) => {
      return axiosInstance.post(`${baseURL + url}`, data);
    },

    put: (url, data) => {
      return axiosInstance.put(`${baseURL + url}`, data);
    },

    delete: (url) => {
      return axiosInstance.delete(`${baseURL + url}`);
    },
  };
};

export default request();
