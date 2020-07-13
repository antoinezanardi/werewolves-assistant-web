import Vue from "vue";
import Vuex from "vuex";
import User from "./modules/User";
import Role from "./modules/Role";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { user: User, role: Role },
});