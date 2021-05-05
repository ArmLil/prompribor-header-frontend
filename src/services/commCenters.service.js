import axios from "axios";

const API_URL = "http://localhost:3002/api/v1/";

class CommCentersService {
  getCommCenters() {
    return axios.get(API_URL + "commCenters?controller=include");
  }
}

export default new CommCentersService();
