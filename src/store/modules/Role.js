import Vue from "vue";
import Role from "@/classes/Role";

const state = {
    roles: undefined,
};

const getters = {
    roles(state) {
        return state.roles;
    },
};

const mutations = {
    setRoles(state, roles) {
        state.roles = roles.map(role => new Role(role));
    },
};

const actions = {
    async getAndSetRoles({ commit }) {
        const { data } = await Vue.prototype.$werewolvesAssistantAPI.getRoles();
        commit("setRoles", data);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};