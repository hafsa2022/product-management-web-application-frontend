import User from "../Api/User";
import { createStore } from "vuex";
import Product from "@/Api/Product";

export default createStore({
  state: {
    loadingLogOut: false,
    token: null,
    snackbar: {
      color: "",
      text: "",
      show: false,
    },
    user: null,
    displayingDialog: false,
    products: [],
    product: {},
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    getLoadingLogOut(state) {
      return state.loadingLogOut;
    },
    getAllProducts(state) {
      return state.products;
    },
  },
  mutations: {
    SET_SNACKBAR(state, payload) {
      state.snackbar.color = payload.color;
      state.snackbar.text = payload.text;
      state.snackbar.show = payload.show;
    },
    LOGIN(state, data) {
      let token = data.data.original.token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.data.original.user));
      state.token = token;
      state.user = data.data.original.user;
    },
    SET_TOKEN(state, value) {
      state.token = value;
    },
    SET_USER(state, value) {
      state.user = value;
    },
    SET_LOGOUT(state, value) {
      state.loadingLogOut = value;
    },
    SET_DISPLAYING_DIALOG(state, value) {
      state.displayingDialog = value;
    },
    GET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_UPDATED_PRODUCT(state, value) {
      state.product = value;
    },
  },
  actions: {
    setSnackBar({ commit }, payload) {
      commit("SET_SNACKBAR", payload);
    },
    logIn({ commit }, payload) {
      commit("LOGIN", payload);
    },
    updateToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    setLogOut({ commit }) {
      commit("SET_LOGOUT", true);
      User.logOut();
      localStorage.removeItem("token");
      commit("SET_LOGOUT", false);
      commit("SET_TOKEN", null);
      commit("SET_USER", null);
    },
    setDisplayingDialog({ commit }, payload) {
      commit("SET_DISPLAYING_DIALOG", payload);
    },
    async getProducts({ commit }) {
      Product.getProducts().then((response) => {
        console.log("response.data", response.data);
        commit("GET_PRODUCTS", response.data);
      });
    },
    setUpdatedProduct({ commit }, payload) {
      commit("SET_UPDATED_PRODUCT", payload);
    },
  },
  modules: {},
});
