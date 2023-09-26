import axios from "axios";
export default {
  async login(form) {
    return await axios.post("http://localhost:8000/api/login", form);
  },
  async signUp(form) {
    return await axios.post("http://localhost:8000/api/signup", form);
  },
  async logout() {
    return await axios.post("http://localhost:8000/api/logout");
  },
};
