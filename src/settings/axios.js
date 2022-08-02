import axios from "axios";
import { showAlert } from "../actions/alert";
// import jwtDecode from "jwt-decode";
import store from "../store";
const { dispatch } = store;
axios.defaults.headers["content-type"] = "application/json";
// axios.defaults.withCredentials = true;

// axios.defaults.baseURL = "/api/v1/";
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  const token = user.token;
  console.log(token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
} else {
  if (window.location.pathname !== "/login") {
    dispatch(showAlert({ status: "warning", text: "Вы не автаризованы!" }));
    window.location.replace("/login");
  }
}
// console.log(jwtDecode(token));

axios.interceptors.response.use(null, (error) => {
  console.error("axios error================>", error.response.status);
  let errorMessage = "Ошибка при запросе к серверу!";
  if (error.response) {
    if (error.response.status === 403) {
      localStorage.removeItem("user");
      window.location.replace("/login");
    }
    if (error.response.data.message) {
      errorMessage = error.response.data.message;
    }
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
        text: "Нет ответа от сервера",
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
