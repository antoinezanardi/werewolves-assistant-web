import Vue from "vue";
import Role from "@/classes/Role";

export default {
    namespaced: true,
    state: { roles: undefined },
    getters: {
        roles(state) {
            return state.roles;
        },
    },
    mutations: {
        setRoles(state, roles) {
            state.roles = roles.map(role => new Role(role));
        },
    },
    actions: {
        async getAndSetRoles({ commit }) {
            const { data } = await Vue.prototype.$werewolvesAssistantAPI.getRoles();
            commit("setRoles", data);
        },
    },
};