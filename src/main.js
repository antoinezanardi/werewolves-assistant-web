import Vue from "vue";
import store from "./store";
import App from "./App.vue";
import { Router, i18n } from "./plugins";
import "./assets/scss/styles.scss";

Vue.config.productionTip = false;

new Vue({
    Router,
    store,
    i18n,
    render(h) {
        return h(App);
    },
}).$mount("#app");