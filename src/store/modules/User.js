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
        setPreferenceAmbientVolume(state, volume) {
            state.preferences.audio.ambient.volume = volume;
        },
        setPreferenceSoundEffectsVolume(state, volume) {
            state.preferences.audio.soundEffects.volume = volume;
        },
        setPreferencesGameOptions(state, gameOptions) {
            state.preferences.game.options = gameOptions;
        },
        setPreferenceGameOptionRepartitionIsHidden(state, isHidden) {
            state.preferences.game.options.repartition.isHidden = isHidden;
        },
        setPreferenceGameOptionAreRolesRevealedOnDeath(state, areRolesRevealedOnDeath) {
            state.preferences.game.options.roles.areRevealedOnDeath = areRolesRevealedOnDeath;
        },
        setPreferenceGameOptionIsSheriffEnabled(state, isSheriffEnabled) {
            state.preferences.game.options.roles.sheriff.isEnabled = isSheriffEnabled;
        },
        setPreferenceGameOptionSheriffElectedAtTurn(state, sheriffElectedAtTurn) {
            state.preferences.game.options.roles.sheriff.electedAt.turn = sheriffElectedAtTurn;
        },
        setPreferenceGameOptionSheriffElectedAtPhase(state, sheriffElectedAtPhase) {
            state.preferences.game.options.roles.sheriff.electedAt.phase = sheriffElectedAtPhase;
        },
        setPreferenceGameOptionIsSheriffVoteDoubled(state, isSheriffVoteDoubled) {
            state.preferences.game.options.roles.sheriff.hasDoubledVote = isSheriffVoteDoubled;
        },
        setPreferenceGameOptionIsBigBadWolfPowerlessIfWerewolfDies(state, isBigBadWolfPowerlessIfWerewolfDies) {
            state.preferences.game.options.roles.bigBadWolf.isPowerlessIfWerewolfDies = isBigBadWolfPowerlessIfWerewolfDies;
        },
        setPreferenceGameOptionWhiteWerewolfWakingUpInterval(state, whiteWerewolfWakingUpInterval) {
            state.preferences.game.options.roles.whiteWerewolf.wakingUpInterval = whiteWerewolfWakingUpInterval;
        },
        setPreferenceGameOptionIsSeerTalkative(state, isSeerTalkative) {
            state.preferences.game.options.roles.seer.isTalkative = isSeerTalkative;
        },
        setPreferenceGameOptionCanSeerSeeRoles(state, canSeerSeeRoles) {
            state.preferences.game.options.roles.seer.canSeeRoles = canSeerSeeRoles;
        },
        setPreferenceGameOptionIsLittleGirlProtectedByGuard(state, isLittleGirlProtectedByGuard) {
            state.preferences.game.options.roles.littleGirl.isProtectedByGuard = isLittleGirlProtectedByGuard;
        },
        setPreferenceGameOptionCanGuardProtectTwice(state, canGuardProtectTwice) {
            state.preferences.game.options.roles.guard.canProtectTwice = canGuardProtectTwice;
        },
        setPreferenceGameOptionAncientLivesCountAgainstWerewolves(state, ancientLivesCountAgainstWerewolves) {
            state.preferences.game.options.roles.ancient.livesCountAgainstWerewolves = ancientLivesCountAgainstWerewolves;
        },
        setPreferenceGameOptionDoesAncientTakeHisRevenge(state, doesAncientTakeHisRevenge) {
            state.preferences.game.options.roles.ancient.doesTakeHisRevenge = doesAncientTakeHisRevenge;
        },
        setPreferenceGameOptionDoesIdiotDieOnAncientDeath(state, doesIdiotDieOnAncientDeath) {
            state.preferences.game.options.roles.idiot.doesDieOnAncientDeath = doesIdiotDieOnAncientDeath;
        },
        setPreferenceGameOptionSistersWakingUpInterval(state, sistersWakingUpInterval) {
            state.preferences.game.options.roles.twoSisters.wakingUpInterval = sistersWakingUpInterval;
        },
        setPreferenceGameOptionBrothersWakingUpInterval(state, brothersWakingUpInterval) {
            state.preferences.game.options.roles.threeBrothers.wakingUpInterval = brothersWakingUpInterval;
        },
        setPreferenceGameOptionIsFoxPowerlessIfMissesWerewolf(state, isFoxPowerlessIfMissesWerewolf) {
            state.preferences.game.options.roles.fox.isPowerlessIfMissesWerewolf = isFoxPowerlessIfMissesWerewolf;
        },
        setPreferenceGameOptionDoesBearTamerGrowlIfInfected(state, doesBearTamerGrowlIfInfected) {
            state.preferences.game.options.roles.bearTamer.doesGrowlIfInfected = doesBearTamerGrowlIfInfected;
        },
        setPreferenceGameOptionIsWildChildTransformationRevealed(state, isWildChildTransformationRevealed) {
            state.preferences.game.options.roles.wildChild.isTransformationRevealed = isWildChildTransformationRevealed;
        },
        setPreferenceGameOptionIsDogWolfChosenSideRevealed(state, isDogWolfChosenSideRevealed) {
            state.preferences.game.options.roles.dogWolf.isChosenSideRevealed = isDogWolfChosenSideRevealed;
        },
        setPreferenceGameOptionStutteringJudgeVoteRequestsCount(state, stutteringJudgeVoteRequestsCount) {
            state.preferences.game.options.roles.stutteringJudge.voteRequestsCount = stutteringJudgeVoteRequestsCount;
        },
        setPreferenceGameOptionThiefAdditionalCardsCount(state, thiefAdditionalCardsCount) {
            state.preferences.game.options.roles.thief.additionalCardsCount = thiefAdditionalCardsCount;
        },
        setPreferenceGameOptionMustThiefChooseBetweenWerewolves(state, mustThiefChooseBetweenWerewolves) {
            state.preferences.game.options.roles.thief.mustChooseBetweenWerewolves = mustThiefChooseBetweenWerewolves;
        },
        setPreferenceGameOptionPiedPiperCharmedPeopleCountPerNight(state, piedPiperCharmedPeopleCountPerNight) {
            state.preferences.game.options.roles.piedPiper.charmedPeopleCountPerNight = piedPiperCharmedPeopleCountPerNight;
        },
        setPreferenceGameOptionIsPiedPiperPowerlessIfInfected(state, isPiedPiperPowerlessIfInfected) {
            state.preferences.game.options.roles.piedPiper.isPowerlessIfInfected = isPiedPiperPowerlessIfInfected;
        },
        setPreferenceGameOptionRavenMarkPenalty(state, markPenalty) {
            state.preferences.game.options.roles.raven.markPenalty = markPenalty;
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
        setPreferenceAmbientVolume({ commit }, volume) {
            commit("setPreferenceAmbientVolume", volume);
            commit("saveUserPreferences");
        },
        setPreferenceSoundEffectsVolume({ commit }, volume) {
            commit("setPreferenceSoundEffectsVolume", volume);
            commit("saveUserPreferences");
        },
        setPreferencesGameOptions({ commit }, gameOptions) {
            commit("setPreferencesGameOptions", gameOptions);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionRepartitionIsHidden({ commit }, isHidden) {
            commit("setPreferenceGameOptionRepartitionIsHidden", isHidden);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionAreRolesRevealedOnDeath({ commit }, areRolesRevealedOnDeath) {
            commit("setPreferenceGameOptionAreRolesRevealedOnDeath", areRolesRevealedOnDeath);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionIsSheriffEnabled({ commit }, isSheriffEnabled) {
            commit("setPreferenceGameOptionIsSheriffEnabled", isSheriffEnabled);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionSheriffElectedAtTurn({ commit }, sheriffElectedAtTurn) {
            commit("setPreferenceGameOptionSheriffElectedAtTurn", sheriffElectedAtTurn);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionSheriffElectedAtPhase({ commit }, sheriffElectedAtPhase) {
            commit("setPreferenceGameOptionSheriffElectedAtPhase", sheriffElectedAtPhase);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionIsSheriffVoteDoubled({ commit }, isSheriffVoteDoubled) {
            commit("setPreferenceGameOptionIsSheriffVoteDoubled", isSheriffVoteDoubled);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionIsBigBadWolfPowerlessIfWerewolfDies({ commit }, isBigBadWolfPowerlessIfWerewolfDies) {
            commit("setPreferenceGameOptionIsBigBadWolfPowerlessIfWerewolfDies", isBigBadWolfPowerlessIfWerewolfDies);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionWhiteWerewolfWakingUpInterval({ commit }, whiteWerewolfWakingUpInterval) {
            commit("setPreferenceGameOptionWhiteWerewolfWakingUpInterval", whiteWerewolfWakingUpInterval);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionIsSeerTalkative({ commit }, isSeerTalkative) {
            commit("setPreferenceGameOptionIsSeerTalkative", isSeerTalkative);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionCanSeerSeeRoles({ commit }, canSeerSeeRoles) {
            commit("setPreferenceGameOptionCanSeerSeeRoles", canSeerSeeRoles);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionIsLittleGirlProtectedByGuard({ commit }, isLittleGirlProtectedByGuard) {
            commit("setPreferenceGameOptionIsLittleGirlProtectedByGuard", isLittleGirlProtectedByGuard);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionCanGuardProtectTwice({ commit }, canGuardProtectTwice) {
            commit("setPreferenceGameOptionCanGuardProtectTwice", canGuardProtectTwice);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionAncientLivesCountAgainstWerewolves({ commit }, ancientLivesCountAgainstWerewolves) {
            commit("setPreferenceGameOptionAncientLivesCountAgainstWerewolves", ancientLivesCountAgainstWerewolves);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionDoesAncientTakeHisRevenge({ commit }, doesAncientTakeHisRevenge) {
            commit("setPreferenceGameOptionDoesAncientTakeHisRevenge", doesAncientTakeHisRevenge);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionDoesIdiotDieOnAncientDeath({ commit }, doesIdiotDieOnAncientDeath) {
            commit("setPreferenceGameOptionDoesIdiotDieOnAncientDeath", doesIdiotDieOnAncientDeath);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionSistersWakingUpInterval({ commit }, sistersWakingUpInterval) {
            commit("setPreferenceGameOptionSistersWakingUpInterval", sistersWakingUpInterval);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionBrothersWakingUpInterval({ commit }, brothersWakingUpInterval) {
            commit("setPreferenceGameOptionBrothersWakingUpInterval", brothersWakingUpInterval);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionIsFoxPowerlessIfMissesWerewolf({ commit }, isFoxPowerlessIfMissesWerewolf) {
            commit("setPreferenceGameOptionIsFoxPowerlessIfMissesWerewolf", isFoxPowerlessIfMissesWerewolf);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionDoesBearTamerGrowlIfInfected({ commit }, doesBearTamerGrowlIfInfected) {
            commit("setPreferenceGameOptionDoesBearTamerGrowlIfInfected", doesBearTamerGrowlIfInfected);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionIsWildChildTransformationRevealed({ commit }, isWildChildTransformationRevealed) {
            commit("setPreferenceGameOptionIsWildChildTransformationRevealed", isWildChildTransformationRevealed);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionIsDogWolfChosenSideRevealed({ commit }, isDogWolfChosenSideRevealed) {
            commit("setPreferenceGameOptionIsDogWolfChosenSideRevealed", isDogWolfChosenSideRevealed);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionStutteringJudgeVoteRequestsCount({ commit }, stutteringJudgeVoteRequestsCount) {
            commit("setPreferenceGameOptionStutteringJudgeVoteRequestsCount", stutteringJudgeVoteRequestsCount);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionThiefAdditionalCardsCount({ commit }, thiefAdditionalCardsCount) {
            commit("setPreferenceGameOptionThiefAdditionalCardsCount", thiefAdditionalCardsCount);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionMustThiefChooseBetweenWerewolves({ commit }, mustThiefChooseBetweenWerewolves) {
            commit("setPreferenceGameOptionMustThiefChooseBetweenWerewolves", mustThiefChooseBetweenWerewolves);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionPiedPiperCharmedPeopleCountPerNight({ commit }, piedPiperCharmedPeopleCountPerNight) {
            commit("setPreferenceGameOptionPiedPiperCharmedPeopleCountPerNight", piedPiperCharmedPeopleCountPerNight);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionIsPiedPiperPowerlessIfInfected({ commit }, isPiedPiperPowerlessIfInfected) {
            commit("setPreferenceGameOptionIsPiedPiperPowerlessIfInfected", isPiedPiperPowerlessIfInfected);
            commit("saveUserPreferences");
        },
        setPreferenceGameOptionRavenMarkPenalty({ commit }, markPenalty) {
            commit("setPreferenceGameOptionRavenMarkPenalty", markPenalty);
            commit("saveUserPreferences");
        },
    },
};