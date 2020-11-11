import Vue from "vue";
import VueGtag from "vue-gtag";
import Config from "../../../config";

if (Config.googleAnalytics.enabled) {
    Vue.use(VueGtag, { config: { id: Config.googleAnalytics.id } });
}