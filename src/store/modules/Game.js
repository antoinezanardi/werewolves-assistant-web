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
        setGameOptionIsSheriffVoteDoubled(state, isSheriffVoteDoubled) {
            state.game.options.isSheriffVoteDoubled = isSheriffVoteDoubled;
        },
        setGameOptionSistersWakingUpInterval(state, sistersWakingUpInterval) {
            state.game.options.sistersWakingUpInterval = sistersWakingUpInterval;
        },
        setGameOptionBrothersWakingUpInterval(state, brothersWakingUpInterval) {
            state.game.options.brothersWakingUpInterval = brothersWakingUpInterval;
        },
        setGameOptionIsSeerTalkative(state, isSeerTalkative) {
            state.game.options.isSeerTalkative = isSeerTalkative;
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
        setGameOptionIsSheriffVoteDoubled({ commit }, isSheriffVoteDoubled) {
            commit("setGameOptionIsSheriffVoteDoubled", isSheriffVoteDoubled);
        },
        setGameOptionSistersWakingUpInterval({ commit }, sistersWakingUpInterval) {
            commit("setGameOptionSistersWakingUpInterval", sistersWakingUpInterval);
        },
        setGameOptionBrothersWakingUpInterval({ commit }, brothersWakingUpInterval) {
            commit("setGameOptionBrothersWakingUpInterval", brothersWakingUpInterval);
        },
        setGameOptionIsSeerTalkative({ commit }, isSeerTalkative) {
            commit("setGameOptionIsSeerTalkative", isSeerTalkative);
        },
    },
};