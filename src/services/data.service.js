import axios from "axios";
import { API_URL } from "./api_url";

class DataService {
  getData(url) {
    let _url = API_URL + url;
    return axios.get(_url);
  }
  postData(url, body) {
    let _url = API_URL + url;
    return axios.post(_url, body);
  }
  putData(url, body) {
    let _url = API_URL + url;
    return axios.put(_url, body);
  }
}

export default new DataService();
