import Vue from "vue";
import Game from "@/classes/Game";

export default {
    namespaced: true,
    state: {
        game: new Game(),
    },
    getters: {
        game(state) {
            return state.game;
        },
    },
    mutations: {
        setGame(state, game) {
            state.game = new Game(game);
        },
    },
    actions: {
        async getAndSetGame({ commit }, { gameId }) {
            const { data } = await Vue.prototype.$werewolvesAssistantAPI.getGame(gameId);
            commit("setGame", data);
        },

        setGame({ commit }, game) {
            commit("setGame", game);
        },
    },
};