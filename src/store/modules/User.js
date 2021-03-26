import Vue from "vue";
import JWT from "jsonwebtoken";
import i18n from "@/plugins/vue-i18n";
import router from "@/plugins/router";
import User from "@/classes/User";
import UserPreferences from "@/classes/UserPreferences";

export default {
    namespaced: true,
    state: {
        user: new User(),
        preferences: new UserPreferences(),
    },
    getters: {
        user(state) {
            return state.user;
        },
        userPreferences(state) {
            return state.preferences;
        },
        isLogged(state) {
            return state.user.logged;
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = new User(user);
        },
        setLogged(state, logged) {
            state.user.logged = logged;
        },
        setPreferenceGameRepartitionForbiddenRoles(state, forbiddenRoles) {
            state.preferences.game.repartition.forbiddenRoles = forbiddenRoles;
        },
        setPreferenceGameRepartitionAreRecommendedMinPlayersRespected(state, areRecommendedMinPlayersRespected) {
            state.preferences.game.repartition.areRecommendedMinPlayersRespected = areRecommendedMinPlayersRespected;
        },
        setPreferenceGameRepartitionArePowerfulVillagerRolesPrioritized(state, arePowerfulVillagerRolesPrioritized) {
            state.preferences.game.repartition.arePowerfulVillagerRolesPrioritized = arePowerfulVillagerRolesPrioritized;
        },
        setPreferenceGameRepartitionArePowerfulWerewolfRolesPrioritized(state, arePowerfulWerewolfRolesPrioritized) {
            state.preferences.game.repartition.arePowerfulWerewolfRolesPrioritized = arePowerfulWerewolfRolesPrioritized;
        },
        setPreferenceGameRepartitionIsProTipShown(state, isProTipShown) {
            state.preferences.game.repartition.isProTipShown = isProTipShown;
        },
        setPreferenceAudioIsMuted(state, isMuted) {
            state.preferences.audio.isMuted = isMuted;
        },
        saveUserPreferences(state) {
            state.preferences.save();
        },
    },
    actions: {
        async checkUserAuthentication({ getters }) {
            if (getters.isLogged === false) {
                Vue.prototype.$toasted.error(i18n.t("Error.unauthorized"), { icon: "times" });
                await router.push("/");
            }
            return getters.isLogged;
        },
        async login({ dispatch }, { email, password }) {
            const { data: loginData } = await Vue.prototype.$werewolvesAssistantAPI.login({ email, password });
            await dispatch("checkTokenAndLogin", loginData);
            Vue.prototype.$toasted.success(i18n.t("Login.loggedIn"), { icon: "check" });
        },
        async loginWithFacebook({ dispatch }, accessToken) {
            const { data: loginData } = await Vue.prototype.$werewolvesAssistantAPI.loginWithFacebook({ accessToken });
            await dispatch("checkTokenAndLogin", loginData);
            Vue.prototype.$toasted.success(i18n.t("Login.loggedInWithFacebook"), { icon: "check" });
        },
        async loginWithGoogle({ dispatch }, idToken) {
            const { data: loginData } = await Vue.prototype.$werewolvesAssistantAPI.loginWithGoogle({ idToken });
            await dispatch("checkTokenAndLogin", loginData);
            Vue.prototype.$toasted.success(i18n.t("Login.loggedInWithGoogle"), { icon: "check" });
        },
        async logout({ commit }, { toasted = true }) {
            localStorage.removeItem("token");
            Vue.prototype.$werewolvesAssistantAPI.setToken(null);
            if (toasted) {
                Vue.prototype.$toasted.success(i18n.t("Login.loggedOut"), { icon: "lock" });
            }
            commit("setUser", new User({ logged: false }));
            if (router.currentRoute.name !== "Home") {
                await router.push("/");
            }
        },
        async checkTokenAndLogin({ commit }, data) {
            const token = data && data.token ? data.token : localStorage.getItem("token");
            if (token) {
                const decoded = JWT.decode(token);
                if (decoded) {
                    localStorage.setItem("token", token);
                    Vue.prototype.$werewolvesAssistantAPI.setToken(token);
                    const { data: user } = await Vue.prototype.$werewolvesAssistantAPI.getUser(decoded.userId);
                    return commit("setUser", { ...user, logged: true });
                }
            }
            commit("setLogged", false);
            localStorage.removeItem("token");
        },
        setPreferenceGameRepartitionForbiddenRoles({ commit }, forbiddenRoles) {
            commit("setPreferenceGameRepartitionForbiddenRoles", forbiddenRoles);
            commit("saveUserPreferences");
        },
        setPreferenceGameRepartitionAreRecommendedMinPlayersRespected({ commit }, areRecommendedMinPlayersRespected) {
            commit("setPreferenceGameRepartitionAreRecommendedMinPlayersRespected", areRecommendedMinPlayersRespected);
            commit("saveUserPreferences");
        },
        setPreferenceGameRepartitionArePowerfulVillagerRolesPrioritized({ commit }, arePowerfulVillagerRolesPrioritized) {
            commit("setPreferenceGameRepartitionArePowerfulVillagerRolesPrioritized", arePowerfulVillagerRolesPrioritized);
            commit("saveUserPreferences");
        },
        setPreferenceGameRepartitionArePowerfulWerewolfRolesPrioritized({ commit }, arePowerfulWerewolfRolesPrioritized) {
            commit("setPreferenceGameRepartitionArePowerfulWerewolfRolesPrioritized", arePowerfulWerewolfRolesPrioritized);
            commit("saveUserPreferences");
        },
        setPreferenceGameRepartitionIsProTipShown({ commit }, isProTipShown) {
            commit("setPreferenceGameRepartitionIsProTipShown", isProTipShown);
            commit("saveUserPreferences");
        },
        setPreferenceAudioIsMuted({ commit }, isMuted) {
            commit("setPreferenceAudioIsMuted", isMuted);
            commit("saveUserPreferences");
        },
    },
};