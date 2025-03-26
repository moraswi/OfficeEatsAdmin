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
   
          commit("setLogIn", response.data);
          return response;
        } catch (error) {
          console.log("setLogIn", error);
        }
      },
  },

  getters: {
    getUserDetails(state){
        return state.logIn
    }
  },
};

export default authentication;