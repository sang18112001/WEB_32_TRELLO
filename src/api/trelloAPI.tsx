import axios from "axios";

const API_URL = "https://fir-tutorial-32b97-default-rtdb.asia-southeast1.firebasedatabase.app"
const trelloAPI = {
  getIssues: async () => {
    const response = await axios.get(`${API_URL}/trello.json`);
    return response.data;
  },
  updateIssues: async (newIssue: any) => {
    const response = await axios.patch(`${API_URL}/trello.json`, newIssue);
    return response.data;
  }
};

export default trelloAPI;
