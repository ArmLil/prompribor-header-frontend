import axios from "axios";
import { showAlert } from "../actions/alert";
// import jwtDecode from "jwt-decode";
import store from "../store";
const { dispatch } = store;
axios.defaults.headers["content-type"] = "application/json";
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "/api/v1/";

// request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const token = user.token;
      config.headers.common["Authorization"] = `Bearer ${token}`;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/"
      ) {
        dispatch(showAlert({ status: "warning", text: "Вы не автаризованы!" }));
        window.location.replace("/login");
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(null, (error) => {
  if (error.response.status === 422) return Promise.reject(error);
  let errorMessage = "Ошибка при запросе к серверу!";
  if (error.response && error.response.data.message) {
    errorMessage = error.response.data.message;
    dispatch(
      showAlert({
        status: "error",
        text: `Ошибка ${error.response.status}: ${errorMessage}`,
      })
    );
  } else if (error.request) {
    dispatch(
      showAlert({
        status: "error",
        text: `${error}`,
      })
    );
  } else {
    dispatch("showAlert", {
      status: "error",
      text: "Неизвестная ошибка",
    });
  }

  console.error("Axios error", { error });
  return Promise.reject(error);
});
