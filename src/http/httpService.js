import axios from "axios";
// import store from "@/store";
// const apiKey = "bdK/XxbJ9ZwWMAF4gwKnIA9rpD8XE6Q4LxF2TjjfHuo=";

const httpService = axios.create({
  baseURL: "https://localhost:7067/api/",
  headers: {
    "Content-Type": "application/json",
    // ApiKey: apiKey,
  },
});

httpService.interceptors.request.use(
  (config) => {
    // const token = store.state.authentication.token;
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpService;
