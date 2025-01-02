import apiService from "@/http/apiService";

const authentication = {
  namespaced: true,

  state: {
    logIn: {},
  },

  mutations: {

    // setLogIn
    setLogIn(state, data){
        state.logIn = data;
    },

    // resetState
    resetState(state) {
        state.logIn = {};
    },
  },

  actions: {
    // logInReq
    async logInReq({ commit }, data) {
        try {
          const response = await apiService.logIn(data);
      
          commit("setLogin", response.data);
          return response;
        } catch (error) {
          console.log("setLogin", error);
        }
      },
  },

  getters: {
    getUserDetails(state){
        return state.login
    }
  },
};

export default authentication;