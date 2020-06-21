import Vue from "vue";
import JWT from "jsonwebtoken";
import User from "../../classes/User";
import i18n from "../../plugins/vue-i18n";
import router from "../../plugins/router";

const state = {
    user: new User(),
};

const getters = {
    user(state) {
        return state.user;
    },
    isLogged(state) {
        return state.user.logged;
    },
};

const mutations = {
    setUser(state, user) {
        state.user = new User(user);
    },
    setLogged(state, logged) {
        state.user.logged = logged;
    },
};

const actions = {
    async checkUserAuthentication({ getters }) {
        if (getters.isLogged === false) {
            Vue.prototype.$toasted.error(i18n.t("Error.unauthorized"), { icon: "times" });
            await router.push("/");
        }
        return getters.isLogged;
    },
    async login({ commit }, { email, password }) {
        const { loginData } = await Vue.prototype.$werewolvesAssistantAPI.login({ email, password });
        localStorage.setItem("token", loginData.token);
        Vue.prototype.$werewolvesAssistantAPI.setToken(loginData.token);
        const { userData } = await Vue.prototype.$werewolvesAssistantAPI.getUser();
        commit("setUser", new User({ ...userData, logged: true }));
        Vue.prototype.$toasted.success(i18n.t("Login.loggedIn"), { icon: "check" });
    },
    async logout({ commit }, { toasted = true }) {
        localStorage.removeItem("token");
        Vue.prototype.$werewolvesAssistantAPI.setToken(null);
        if (toasted) {
            Vue.prototype.$toasted.success(i18n.t("Login.loggedOut"), { icon: "lock" });
        }
        await router.push("/auth/login");
        commit("setUser", new User({ logged: false }));
    },
    async checkTokenAndLogin({ commit, dispatch }) {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = JWT.decode(token);
            const now = Math.round(new Date().getTime() / 1000);
            if (decoded && decoded.exp && now < decoded.exp) {
                Vue.prototype.$werewolvesAssistantAPI.setToken(token);
                return await dispatch("getUser");
            }
        }
        commit("setLogged", false);
        localStorage.removeItem("token");
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};