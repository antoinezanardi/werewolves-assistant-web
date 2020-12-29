import Vue from "vue";
import Game from "@/classes/Game";

export default {
    namespaced: true,
    state: { game: new Game() },
    getters: {
        game(state) {
            return state.game;
        },
        gameOptions(state) {
            return state.game.options;
        },
    },
    mutations: {
        setGame(state, game) {
            state.game = new Game(game);
        },
        setGameOptionSistersWakingUpInterval(state, sistersWakingUpInterval) {
            state.game.options.sistersWakingUpInterval = sistersWakingUpInterval;
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
        setGameOptionSistersWakingUpInterval({ commit }, sistersWakingUpInterval) {
            commit("setGameOptionSistersWakingUpInterval", sistersWakingUpInterval);
        },
    },
};