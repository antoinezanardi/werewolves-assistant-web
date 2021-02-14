import Vue from "vue";
import Game from "@/classes/Game";
import Player from "@/classes/Player";

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
        setGamePlayers(state, players) {
            state.game.players = players.map(player => new Player(player));
        },
        addGamePlayer(state, player) {
            state.game.players.push(new Player(player));
        },
        setCurrentRoleForPlayerWithName(state, { name, role }) {
            const player = state.game.getPlayerWithName(name);
            if (player) {
                player.role.current = role;
            }
        },
        setCurrentSideForPlayerWithName(state, { name, side }) {
            const player = state.game.getPlayerWithName(name);
            if (player) {
                player.side.current = side;
            }
        },
        unsetPlayerWithName(state, playerName) {
            const idx = state.game.players.findIndex(({ name }) => name === playerName);
            if (idx !== -1) {
                state.game.players.splice(idx, 1);
            }
        },
        unsetRoleForPlayerWithName(state, playerName) {
            const player = state.game.getPlayerWithName(playerName);
            if (player) {
                player.role.current = undefined;
                player.side.current = undefined;
            }
        },
        setGameOptionIsSheriffEnabled(state, isSheriffEnabled) {
            state.game.options.roles.sheriff.isEnabled = isSheriffEnabled;
        },
        setGameOptionIsSheriffVoteDoubled(state, isSheriffVoteDoubled) {
            state.game.options.roles.sheriff.hasDoubledVote = isSheriffVoteDoubled;
        },
        setGameOptionSistersWakingUpInterval(state, sistersWakingUpInterval) {
            state.game.options.roles.twoSisters.wakingUpInterval = sistersWakingUpInterval;
        },
        setGameOptionBrothersWakingUpInterval(state, brothersWakingUpInterval) {
            state.game.options.roles.threeBrothers.wakingUpInterval = brothersWakingUpInterval;
        },
        setGameOptionIsSeerTalkative(state, isSeerTalkative) {
            state.game.options.roles.seer.isTalkative = isSeerTalkative;
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
        setGamePlayers({ commit }, players) {
            commit("setGamePlayers", players);
        },
        addGamePlayer({ commit }, player) {
            commit("addGamePlayer", player);
        },
        setCurrentRoleForPlayerWithName({ commit }, payload) {
            commit("setCurrentRoleForPlayerWithName", payload);
        },
        setCurrentSideForPlayerWithName({ commit }, payload) {
            commit("setCurrentSideForPlayerWithName", payload);
        },
        unsetPlayerWithName({ commit }, name) {
            commit("unsetPlayerWithName", name);
        },
        unsetRoleForPlayerWithName({ commit }, name) {
            commit("unsetRoleForPlayerWithName", name);
        },
        setGameOptionIsSheriffEnabled({ commit }, isSheriffEnabled) {
            commit("setGameOptionIsSheriffEnabled", isSheriffEnabled);
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