import Vue from "vue";
import VueGtag from "vue-gtag";
import Config from "../../../config";

if (Config.google.analytics.enabled) {
    Vue.use(VueGtag, { config: { id: Config.google.analytics.id } });
}