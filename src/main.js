import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const options = {
  confirmButtonColor: "#192028",
  cancelButtonColor: "#FFFFFF",
  confirmButtonText: "Okay",
};

Vue.use(VueSweetalert2, options);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
