import Vue from "vue";
import Game from "@/classes/Game";

const state = {
    game: new Game(),
};

const getters = {
    game(state) {
        return state.game;
    },
};

const mutations = {
    setGame(state, game) {
        state.game = new Game(game);
    },
};

const actions = {
    async getAndSetGame({ commit }, { gameId }) {
        const { data } = await Vue.prototype.$werewolvesAssistantAPI.getGame(gameId);
        commit("setGame", data);
    },

    async setGame({ commit }, game) {
        commit("setGame", game);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};