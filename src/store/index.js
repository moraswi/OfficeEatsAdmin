import Vue from 'vue'
import Vuex from 'vuex'
import cashier from "./modules/cashier/cashier.js";
import admin from "./modules/admin/admin.js";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cashier,
    admin,
  },

  plugins: [createPersistedState()],

})
