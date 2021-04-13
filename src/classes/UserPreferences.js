import { getProp } from "@/helpers/functions/Class";
import { getDefaultGameOptions } from "@/helpers/functions/Game";

class UserPreferences {
    constructor() {
        const userPreferences = JSON.parse(localStorage.getItem("userPreferences"));
        this.game = {
            repartition: {
                forbiddenRoles: getProp(userPreferences, "game.repartition.forbiddenRoles", []),
                areRecommendedMinPlayersRespected: getProp(userPreferences, "game.repartition.areRecommendedMinPlayersRespected", true),
                arePowerfulVillagerRolesPrioritized: getProp(userPreferences, "game.repartition.arePowerfulVillagerRolesPrioritized", true),
                arePowerfulWerewolfRolesPrioritized: getProp(userPreferences, "game.repartition.arePowerfulWerewolfRolesPrioritized", false),
                isProTipShown: getProp(userPreferences, "game.repartition.isProTipShown", true),
            },
            options: UserPreferences._getGameOptionsPreferences(userPreferences),
        };
        this.audio = {
            isMuted: getProp(userPreferences, "audio.isMuted", false),
            ambient: { volume: getProp(userPreferences, "audio.ambient.volume", 100) },
            soundEffects: { volume: getProp(userPreferences, "audio.soundEffects.volume", 100) },
        };
    }

    static _getRavenOptionsPreferences(game, defaultRavenOptions) {
        const prop = "game.options.roles.raven";
        return { markPenalty: getProp(game, `${prop}.markPenalty`, defaultRavenOptions.markPenalty) };
    }

    static _getPiedPiperOptionsPreferences(game, defaultPiedPiperOptions) {
        const prop = "game.options.roles.piedPiper";
        const { charmedPeopleCountPerNight, isPowerlessIfInfected } = defaultPiedPiperOptions;
        return {
            charmedPeopleCountPerNight: getProp(game, `${prop}.charmedPeopleCountPerNight`, charmedPeopleCountPerNight),
            isPowerlessIfInfected: getProp(game, `${prop}.isPowerlessIfInfected`, isPowerlessIfInfected),
        };
    }

    static _getThiefOptionsPreferences(userPreferences, defaultThiefOptions) {
        const prop = "game.options.roles.thief";
        const { additionalCardsCount, mustChooseBetweenWerewolves } = defaultThiefOptions;
        return {
            additionalCardsCount: getProp(userPreferences, `${prop}.additionalCardsCount`, additionalCardsCount),
            mustChooseBetweenWerewolves: getProp(userPreferences, `${prop}.mustChooseBetweenWerewolves`, mustChooseBetweenWerewolves),
        };
    }

    static _getDogWolfGameOptionsPreferences(userPreferences, defaultDogWolfOptions) {
        const prop = "game.options.roles.dogWolf";
        const { isChosenSideRevealed } = defaultDogWolfOptions;
        return { isChosenSideRevealed: getProp(userPreferences, `${prop}.isChosenSideRevealed`, isChosenSideRevealed) };
    }

    static _getWildChildGameOptionsPreferences(userPreferences, defaultWildChildOptions) {
        const prop = "game.options.roles.wildChild";
        const { isTransformationRevealed } = defaultWildChildOptions;
        return { isTransformationRevealed: getProp(userPreferences, `${prop}.isTransformationRevealed`, isTransformationRevealed) };
    }

    static _getStutteringJudgeGameOptionsPreferences(userPreferences, defaultStutteringJudgeOptions) {
        const prop = "game.options.roles.stutteringJudge";
        return { voteRequestsCount: getProp(userPreferences, `${prop}.voteRequestsCount`, defaultStutteringJudgeOptions.voteRequestsCount) };
    }

    static _getBearTamerGameOptionsPreferences(userPreferences, defaultBearTamerOptions) {
        const prop = "game.options.roles.bearTamer";
        return { doesGrowlIfInfected: getProp(userPreferences, `${prop}.doesGrowlIfInfected`, defaultBearTamerOptions.doesGrowlIfInfected) };
    }

    static _getFoxGameOptionsPreferences(userPreferences, defaultFoxOptions) {
        const prop = "game.options.roles.fox";
        const { isPowerlessIfMissesWerewolf } = defaultFoxOptions;
        return { isPowerlessIfMissesWerewolf: getProp(userPreferences, `${prop}.isPowerlessIfMissesWerewolf`, isPowerlessIfMissesWerewolf) };
    }

    static _getThreeBrothersGameOptionsPreferences(userPreferences, defaultThreeBrothersOptions) {
        const prop = "game.options.roles.threeBrothers";
        return { wakingUpInterval: getProp(userPreferences, `${prop}.wakingUpInterval`, defaultThreeBrothersOptions.wakingUpInterval) };
    }

    static _getTwoSistersGameOptionsPreferences(userPreferences, defaultTwoSistersOptions) {
        const prop = "game.options.roles.twoSisters";
        return { wakingUpInterval: getProp(userPreferences, `${prop}.wakingUpInterval`, defaultTwoSistersOptions.wakingUpInterval) };
    }

    static _getIdiotGameOptionsPreferences(userPreferences, defaultIdiotOptions) {
        const prop = "game.options.roles.idiot";
        return { doesDieOnAncientDeath: getProp(userPreferences, `${prop}.doesDieOnAncientDeath`, defaultIdiotOptions.doesDieOnAncientDeath) };
    }

    static _getAncientOptionsPreferences(userPreferences, defaultAncientOptions) {
        const prop = "game.options.roles.ancient";
        const { livesCountAgainstWerewolves, doesTakeHisRevenge } = defaultAncientOptions;
        return {
            livesCountAgainstWerewolves: getProp(userPreferences, `${prop}.livesCountAgainstWerewolves`, livesCountAgainstWerewolves),
            doesTakeHisRevenge: getProp(userPreferences, `${prop}.doesTakeHisRevenge`, doesTakeHisRevenge),
        };
    }

    static _getGuardGameOptionsPreferences(userPreferences, defaultGuardOptions) {
        const prop = "game.options.roles.guard";
        return { canProtectTwice: getProp(userPreferences, `${prop}.canProtectTwice`, defaultGuardOptions.canProtectTwice) };
    }

    static _getLittleGirlGameOptionsPreferences(userPreferences, defaultLittleGirlOptions) {
        const prop = "game.options.roles.littleGirl";
        return { isProtectedByGuard: getProp(userPreferences, `${prop}.isProtectedByGuard`, defaultLittleGirlOptions.isProtectedByGuard) };
    }

    static _getSeerGameOptionsPreferences(userPreferences, defaultSeerOptions) {
        const prop = "game.options.roles.seer";
        return {
            isTalkative: getProp(userPreferences, `${prop}.isTalkative`, defaultSeerOptions.isTalkative),
            canSeeRoles: getProp(userPreferences, `${prop}.canSeeRoles`, defaultSeerOptions.canSeeRoles),
        };
    }

    static _getWhiteWerewolfGameOptionsPreferences(userPreferences, defaultWhiteWerewolfOptions) {
        const prop = "game.options.roles.whiteWerewolf";
        return { wakingUpInterval: getProp(userPreferences, `${prop}.wakingUpInterval`, defaultWhiteWerewolfOptions.wakingUpInterval) };
    }

    static _getBigBadWolfGameOptionsPreferences(userPreferences, defaultBigBadWolfOptions) {
        const prop = "game.options.roles.bigBadWolf";
        const { isPowerlessIfWerewolfDies } = defaultBigBadWolfOptions;
        return { isPowerlessIfWerewolfDies: getProp(userPreferences, `${prop}.isPowerlessIfWerewolfDies`, isPowerlessIfWerewolfDies) };
    }

    static _getSheriffGameOptionsPreferences(userPreferences, defaultSheriffOptions) {
        const prop = "game.options.roles.sheriff";
        return {
            isEnabled: getProp(userPreferences, `${prop}.isEnabled`, defaultSheriffOptions.isEnabled),
            electedAt: {
                turn: getProp(userPreferences, `${prop}.electedAt.turn`, defaultSheriffOptions.electedAt.turn),
                phase: getProp(userPreferences, `${prop}.electedAt.phase`, defaultSheriffOptions.electedAt.phase),
            },
            hasDoubledVote: getProp(userPreferences, `${prop}.hasDoubledVote`, defaultSheriffOptions.hasDoubledVote),
        };
    }

    static _getRolesGameOptionsPreferences(userPreferences, defaultGameOptions) {
        const prop = "game.options.roles";
        const { roles } = defaultGameOptions;
        return {
            areRevealedOnDeath: getProp(userPreferences, `${prop}.areRevealedOnDeath`, roles.areRevealedOnDeath),
            sheriff: this._getSheriffGameOptionsPreferences(userPreferences, roles.sheriff),
            bigBadWolf: this._getBigBadWolfGameOptionsPreferences(userPreferences, roles.bigBadWolf),
            whiteWerewolf: this._getWhiteWerewolfGameOptionsPreferences(userPreferences, roles.whiteWerewolf),
            seer: this._getSeerGameOptionsPreferences(userPreferences, roles.seer),
            littleGirl: this._getLittleGirlGameOptionsPreferences(userPreferences, roles.littleGirl),
            guard: this._getGuardGameOptionsPreferences(userPreferences, roles.guard),
            ancient: this._getAncientOptionsPreferences(userPreferences, roles.ancient),
            idiot: this._getIdiotGameOptionsPreferences(userPreferences, roles.idiot),
            twoSisters: this._getTwoSistersGameOptionsPreferences(userPreferences, roles.twoSisters),
            threeBrothers: this._getThreeBrothersGameOptionsPreferences(userPreferences, roles.threeBrothers),
            fox: this._getFoxGameOptionsPreferences(userPreferences, roles.fox),
            bearTamer: this._getBearTamerGameOptionsPreferences(userPreferences, roles.bearTamer),
            stutteringJudge: this._getStutteringJudgeGameOptionsPreferences(userPreferences, roles.stutteringJudge),
            wildChild: this._getWildChildGameOptionsPreferences(userPreferences, roles.wildChild),
            dogWolf: this._getDogWolfGameOptionsPreferences(userPreferences, roles.dogWolf),
            thief: this._getThiefOptionsPreferences(userPreferences, roles.thief),
            piedPiper: this._getPiedPiperOptionsPreferences(userPreferences, roles.piedPiper),
            raven: this._getRavenOptionsPreferences(userPreferences, roles.raven),
        };
    }

    static _getGameOptionsPreferences(userPreferences) {
        const defaultGameOptions = getDefaultGameOptions();
        return {
            repartition: { isHidden: getProp(userPreferences, "game.options.repartition.isHidden", defaultGameOptions.repartition.isHidden) },
            roles: this._getRolesGameOptionsPreferences(userPreferences, defaultGameOptions),
        };
    }

    save() {
        localStorage.setItem("userPreferences", JSON.stringify(this));
    }
}

export default UserPreferences;