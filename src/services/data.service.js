import axios from "axios";
import { API_URL } from "./api_url";

class DataService {
  getData(url) {
    let _url = API_URL + url;
    return axios.get(_url);
  }
}

export default new DataService();
