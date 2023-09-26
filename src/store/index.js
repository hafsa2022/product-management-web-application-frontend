import { createStore } from "vuex";

export default createStore({
  state: {
    isLogged: false,
    snackbar: {
      color: "",
      text: "",
      show: false,
    },
    user: null,
  },
  getters: {},
  mutations: {
    SET_SNACKBAR(state, payload) {
      state.snackbar.color = payload.color;
      state.snackbar.text = payload.text;
      state.snackbar.show = payload.show;
    },
    SET_USER_INFO(state, data) {
      localStorage.setItem("user", JSON.stringify(data.data));
      state.user = JSON.parse(localStorage.getItem("user"));
      state.isLogged = true;
    },
  },
  actions: {
    setSnackBar({ commit }, payload) {
      commit("SET_SNACKBAR", payload);
    },
    SetUserInfo({ commit }, payload) {
      commit("SET_USER_INFO", payload);
    },
  },
  modules: {},
});
