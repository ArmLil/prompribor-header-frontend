import axios from "axios";

const API_URL = "http://localhost:3002/api/v1/";

class DataService {
  getData(url) {
    let _url = API_URL + url;
    return axios.get(_url);
  }
}

export default new DataService();
