import Vue from "vue";
import VueLazyLoad from "vue-lazyload";
import error from "@/assets/img/roles/back.png";
import loading from "@/assets/gif/loading.gif";

Vue.use(VueLazyLoad, {
    preLoad: 1,
    error,
    loading,
    attempt: 1,
});