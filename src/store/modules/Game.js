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
        setGameOptionSheriffElectedAtTurn(state, sheriffElectedAtTurn) {
            state.game.options.roles.sheriff.electedAt.turn = sheriffElectedAtTurn;
        },
        setGameOptionSheriffElectedAtPhase(state, sheriffElectedAtPhase) {
            state.game.options.roles.sheriff.electedAt.phase = sheriffElectedAtPhase;
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
        setGameOptionIsLittleGirlProtectedByGuard(state, isLittleGirlProtectedByGuard) {
            state.game.options.roles.littleGirl.isProtectedByGuard = isLittleGirlProtectedByGuard;
        },
        setGameOptionCanGuardProtectTwice(state, canGuardProtectTwice) {
            state.game.options.roles.guard.canProtectTwice = canGuardProtectTwice;
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
        setGameOptionIsFoxPowerlessIfMissesWerewolf(state, isFoxPowerlessIfMissesWerewolf) {
            state.game.options.roles.fox.isPowerlessIfMissesWerewolf = isFoxPowerlessIfMissesWerewolf;
        },
        setGameOptionDoesBearTamerGrowlIfInfected(state, doesBearTamerGrowlIfInfected) {
            state.game.options.roles.bearTamer.doesGrowlIfInfected = doesBearTamerGrowlIfInfected;
        },
        setGameOptionStutteringJudgeVoteRequestsCount(state, stutteringJudgeVoteRequestsCount) {
            state.game.options.roles.stutteringJudge.voteRequestsCount = stutteringJudgeVoteRequestsCount;
        },
        setGameThiefAdditionalCards(state, thiefAdditionalCards) {
            state.game.additionalCards = state.game.additionalCards.filter(({ for: recipient }) => recipient !== "thief");
            state.game.additionalCards.push(...thiefAdditionalCards);
        },
        setGameOptionRavenMarkPenalty(state, markPenalty) {
            state.game.options.roles.raven.markPenalty = markPenalty;
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
        setGameOptionSheriffElectedAtTurn({ commit }, sheriffElectedAtTurn) {
            commit("setGameOptionSheriffElectedAtTurn", sheriffElectedAtTurn);
        },
        setGameOptionSheriffElectedAtPhase({ commit }, sheriffElectedAtPhase) {
            commit("setGameOptionSheriffElectedAtPhase", sheriffElectedAtPhase);
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
        setGameOptionIsLittleGirlProtectedByGuard({ commit }, isLittleGirlProtectedByGuard) {
            commit("setGameOptionIsLittleGirlProtectedByGuard", isLittleGirlProtectedByGuard);
        },
        setGameOptionCanGuardProtectTwice({ commit }, canGuardProtectTwice) {
            commit("setGameOptionCanGuardProtectTwice", canGuardProtectTwice);
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
        setGameOptionIsFoxPowerlessIfMissesWerewolf({ commit }, isFoxPowerlessIfMissesWerewolf) {
            commit("setGameOptionIsFoxPowerlessIfMissesWerewolf", isFoxPowerlessIfMissesWerewolf);
        },
        setGameOptionDoesBearTamerGrowlIfInfected({ commit }, doesBearTamerGrowlIfInfected) {
            commit("setGameOptionDoesBearTamerGrowlIfInfected", doesBearTamerGrowlIfInfected);
        },
        setGameOptionStutteringJudgeVoteRequestsCount({ commit }, stutteringJudgeVoteRequestsCount) {
            commit("setGameOptionStutteringJudgeVoteRequestsCount", stutteringJudgeVoteRequestsCount);
        },
        setGameThiefAdditionalCards({ commit }, thiefAdditionalCards) {
            commit("setGameThiefAdditionalCards", thiefAdditionalCards);
        },
        setGameOptionRavenMarkPenalty({ commit }, markPenalty) {
            commit("setGameOptionRavenMarkPenalty", markPenalty);
        },
    },
};