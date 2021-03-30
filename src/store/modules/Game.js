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
        setGameOptionIsGameRepartitionHidden(state, isGameRepartitionHidden) {
            state.game.options.repartition.isHidden = isGameRepartitionHidden;
        },
        setGameOptionAreRolesRevealedOnDeath(state, areRolesRevealedOnDeath) {
            state.game.options.roles.areRevealedOnDeath = areRolesRevealedOnDeath;
        },
        setGameOptionIsSheriffEnabled(state, isSheriffEnabled) {
            state.game.options.roles.sheriff.isEnabled = isSheriffEnabled;
        },
        setGameOptionIsSheriffVoteDoubled(state, isSheriffVoteDoubled) {
            state.game.options.roles.sheriff.hasDoubledVote = isSheriffVoteDoubled;
        },
        setGameOptionIsSeerTalkative(state, isSeerTalkative) {
            state.game.options.roles.seer.isTalkative = isSeerTalkative;
        },
        setGameOptionCanSeerSeeRoles(state, canSeerSeeRoles) {
            state.game.options.roles.seer.canSeeRoles = canSeerSeeRoles;
        },
        setGameOptionIsLittleProtectedByGuard(state, isLittleGirlProtectedByGuard) {
            state.game.options.roles.littleGirl.isProtectedByGuard = isLittleGirlProtectedByGuard;
        },
        setGameOptionDoesIdiotDieOnAncientDeath(state, doesIdiotDieOnAncientDeath) {
            state.game.options.roles.idiot.doesDieOnAncientDeath = doesIdiotDieOnAncientDeath;
        },
        setGameOptionSistersWakingUpInterval(state, sistersWakingUpInterval) {
            state.game.options.roles.twoSisters.wakingUpInterval = sistersWakingUpInterval;
        },
        setGameOptionBrothersWakingUpInterval(state, brothersWakingUpInterval) {
            state.game.options.roles.threeBrothers.wakingUpInterval = brothersWakingUpInterval;
        },
        setGameOptionRavenMarkPenalty(state, markPenalty) {
            state.game.options.roles.raven.markPenalty = markPenalty;
        },
        setGameThiefAdditionalCards(state, thiefAdditionalCards) {
            state.game.additionalCards = state.game.additionalCards.filter(({ for: recipient }) => recipient !== "thief");
            state.game.additionalCards.push(...thiefAdditionalCards);
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
        setGameOptionIsGameRepartitionHidden({ commit }, isGameRepartitionHidden) {
            commit("setGameOptionIsGameRepartitionHidden", isGameRepartitionHidden);
        },
        setGameOptionAreRolesRevealedOnDeath({ commit }, areRolesRevealedOnDeath) {
            commit("setGameOptionAreRolesRevealedOnDeath", areRolesRevealedOnDeath);
        },
        setGameOptionIsSheriffEnabled({ commit }, isSheriffEnabled) {
            commit("setGameOptionIsSheriffEnabled", isSheriffEnabled);
        },
        setGameOptionIsSheriffVoteDoubled({ commit }, isSheriffVoteDoubled) {
            commit("setGameOptionIsSheriffVoteDoubled", isSheriffVoteDoubled);
        },
        setGameOptionIsSeerTalkative({ commit }, isSeerTalkative) {
            commit("setGameOptionIsSeerTalkative", isSeerTalkative);
        },
        setGameOptionCanSeerSeeRoles({ commit }, canSeerSeeRoles) {
            commit("setGameOptionCanSeerSeeRoles", canSeerSeeRoles);
        },
        setGameOptionIsLittleProtectedByGuard({ commit }, isLittleGirlProtectedByGuard) {
            commit("setGameOptionIsLittleProtectedByGuard", isLittleGirlProtectedByGuard);
        },
        setGameOptionDoesIdiotDieOnAncientDeath({ commit }, doesIdiotDieOnAncientDeath) {
            commit("setGameOptionDoesIdiotDieOnAncientDeath", doesIdiotDieOnAncientDeath);
        },
        setGameOptionSistersWakingUpInterval({ commit }, sistersWakingUpInterval) {
            commit("setGameOptionSistersWakingUpInterval", sistersWakingUpInterval);
        },
        setGameOptionBrothersWakingUpInterval({ commit }, brothersWakingUpInterval) {
            commit("setGameOptionBrothersWakingUpInterval", brothersWakingUpInterval);
        },
        setGameOptionRavenMarkPenalty({ commit }, markPenalty) {
            commit("setGameOptionRavenMarkPenalty", markPenalty);
        },
        setGameThiefAdditionalCards({ commit }, thiefAdditionalCards) {
            commit("setGameThiefAdditionalCards", thiefAdditionalCards);
        },
    },
};