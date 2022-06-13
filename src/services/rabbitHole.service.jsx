import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = "http://localhost:8000/api/rabbit_holes/";

class RabbitHoleService {
  getAllRecords = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

  getAllRecordsBySts = (status) => {
    return axios.get(API_URL + `archive/${status}`, { headers: authHeader() });
  };

  getRecord = (id) => {
    return axios.get(API_URL + `projects/${id}/`, { headers: authHeader() });
  };

  addRecord = (data) => {
    return axios.post(API_URL + 'projects/', data, { headers: authHeader() });
  };

  updateRecord = (data) => {
    axios
      .put(API_URL + `/${data.id}/`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  };

  patchCurriculumThemeSts = (id, sts) => {
    let data = {
      'archived': sts
    }
    axios
      .patch(API_URL + `/${id}`, data, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  deleteCurriculumTheme = (id) => {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new RabbitHoleService();