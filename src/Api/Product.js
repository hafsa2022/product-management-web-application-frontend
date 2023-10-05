import axios from "axios";
export default {
  async addProduct(form) {
    console.log("form", form);
    return await axios.post("http://localhost:8000/api/addproduct", form);
  },
  async getProducts() {
    return await axios.get("http://localhost:8000/api/getproducts");
  },
  async getProduct(id) {
    return await axios.get(`http://localhost:8000/api/getproduct/${id}`);
  },
  async editProduct(form) {
    return await axios.post("http://localhost:8000/api/editproduct", form);
  },
  async deleteProduct(id) {
    return await axios.delete(`http://localhost:8000/api/deleteproduct/${id}`);
  },
};
