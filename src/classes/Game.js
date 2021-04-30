import { getProp } from "@/helpers/functions/Class";
import User from "./User";
import Player from "./Player";
import GameHistory from "./GameHistory";
import GameAdditionalCard from "./GameAdditionalCard";
import UserPreferences from "./UserPreferences";
import {
    isForbiddenTieVoteAction, isSkippableAction, isTargetAction, isTimedAction, isVoteAction,
    isPreFirstNightPlay,
} from "@/helpers/functions/Game";

class Game {
    constructor(game = null) {
        this._id = getProp(game, "_id");
        this.gameMaster = getProp(game, "gameMaster", new User(), gameMaster => new User(gameMaster));
        this.players = getProp(game, "players", [], players => players.map(player => new Player(player)));
        this.turn = getProp(game, "turn");
        this.phase = getProp(game, "phase");
        this.tick = getProp(game, "tick");
        this.waiting = getProp(game, "waiting", [], waiting => waiting.map(waitingEntry => waitingEntry));
        this.status = getProp(game, "status");
        this.additionalCards = Game._getGameAdditionalCards(game);
        this.options = Game._getGameOptions(game);
        this.history = getProp(game, "history", [], history => history.map(historyEntry => new GameHistory(historyEntry)));
        this.won = {
            by: getProp(game, "won.by"),
            players: getProp(game, "won.players", [], players => players.map(player => new Player(player))),
        };
        this.review = {
            rating: getProp(game, "review.rating"),
            comment: getProp(game, "review.comment"),
            dysfunctionFound: getProp(game, "review.dysfunctionFound"),
        };
        this.createdAt = getProp(game, "createdAt");
        this.updatedAt = getProp(game, "updatedAt");
    }

    static _getGameAdditionalCards(game) {
        return getProp(game, "additionalCards", [], additionalCards => additionalCards.map(additionalCard => new GameAdditionalCard(additionalCard)));
    }

    static _getRavenGameOptions(game, ravenUserPreferences) {
        const prop = "options.roles.raven";
        return { markPenalty: getProp(game, `${prop}.raven.markPenalty`, ravenUserPreferences.markPenalty) };
    }

    static _getPiedPiperGameOptions(game, piedPiperUserPreferences) {
        const prop = "options.roles.piedPiper";
        return {
            charmedPeopleCountPerNight: getProp(game, `${prop}.charmedPeopleCountPerNight`, piedPiperUserPreferences.charmedPeopleCountPerNight),
            isPowerlessIfInfected: getProp(game, `${prop}.isPowerlessIfInfected`, piedPiperUserPreferences.isPowerlessIfInfected),
        };
    }

    static _getThiefGameOptions(game, thiefUserPreferences) {
        const prop = "options.roles.thief";
        return {
            additionalCardsCount: getProp(game, `${prop}.additionalCardsCount`, thiefUserPreferences.additionalCardsCount),
            mustChooseBetweenWerewolves: getProp(game, `${prop}.mustChooseBetweenWerewolves`, thiefUserPreferences.mustChooseBetweenWerewolves),
        };
    }

    static _getDogWolfGameOptions(game, dogWolfUserPreferences) {
        const prop = "options.roles.dogWolf";
        return { isChosenSideRevealed: getProp(game, `${prop}.dogWolf.isChosenSideRevealed`, dogWolfUserPreferences.isChosenSideRevealed) };
    }

    static _getWildChildGameOptions(game, wildChildUserPreferences) {
        const prop = "options.roles.wildChild";
        return { isTransformationRevealed: getProp(game, `${prop}.isTransformationRevealed`, wildChildUserPreferences.isTransformationRevealed) };
    }

    static _getStutteringJudgeGameOptions(game, stutteringJudgeUserPreferences) {
        const prop = "options.roles.stutteringJudge";
        return { voteRequestsCount: getProp(game, `${prop}.voteRequestsCount`, stutteringJudgeUserPreferences.voteRequestsCount) };
    }

    static _getBearTamerGameOptions(game, bearTamerUserPreferences) {
        const prop = "options.roles.bearTamer";
        return { doesGrowlIfInfected: getProp(game, `${prop}.doesGrowlIfInfected`, bearTamerUserPreferences.doesGrowlIfInfected) };
    }

    static _getFoxGameOptions(game, foxUserPreferences) {
        const prop = "options.roles.fox";
        return { isPowerlessIfMissesWerewolf: getProp(game, `${prop}.isPowerlessIfMissesWerewolf`, foxUserPreferences.isPowerlessIfMissesWerewolf) };
    }

    static _getThreeBrothersGameOptions(game, threeBrothersUserPreferences) {
        const prop = "options.roles.threeBrothers";
        return { wakingUpInterval: getProp(game, `${prop}.wakingUpInterval`, threeBrothersUserPreferences.wakingUpInterval) };
    }

    static _getTwoSistersGameOptions(game, twoSistersUserPreferences) {
        const prop = "options.roles.twoSisters";
        return { wakingUpInterval: getProp(game, `${prop}.wakingUpInterval`, twoSistersUserPreferences.wakingUpInterval) };
    }

    static _getIdiotGameOptions(game, idiotUserPreferences) {
        const prop = "options.roles.idiot";
        return { doesDieOnAncientDeath: getProp(game, `${prop}.doesDieOnAncientDeath`, idiotUserPreferences.doesDieOnAncientDeath) };
    }

    static _getAncientGameOptions(game, ancientUserPreferences) {
        const prop = "options.roles.ancient";
        return {
            livesCountAgainstWerewolves: getProp(game, `${prop}.livesCountAgainstWerewolves`, ancientUserPreferences.livesCountAgainstWerewolves),
            doesTakeHisRevenge: getProp(game, `${prop}.doesTakeHisRevenge`, ancientUserPreferences.doesTakeHisRevenge),
        };
    }

    static _getGuardGameOptions(game, guardUserPreferences) {
        const prop = "options.roles.guard";
        return { canProtectTwice: getProp(game, `${prop}.canProtectTwice`, guardUserPreferences.canProtectTwice) };
    }

    static _getLittleGirlGameOptions(game, littleGirlUserPreferences) {
        const prop = "options.roles.littleGirl";
        return { isProtectedByGuard: getProp(game, `${prop}.isProtectedByGuard`, littleGirlUserPreferences.isProtectedByGuard) };
    }

    static _getSeerGameOptions(game, seerUserPreferences) {
        const prop = "options.roles.seer";
        return {
            isTalkative: getProp(game, `${prop}.isTalkative`, seerUserPreferences.isTalkative),
            canSeeRoles: getProp(game, `${prop}.canSeeRoles`, seerUserPreferences.canSeeRoles),
        };
    }

    static _getWhiteWerewolfGameOptions(game, whiteWerewolfUserPreferences) {
        const prop = "options.roles.whiteWerewolf";
        return { wakingUpInterval: getProp(game, `${prop}.wakingUpInterval`, whiteWerewolfUserPreferences.wakingUpInterval) };
    }

    static _getBigBadWolfGameOptions(game, bigBadWolfUserPreferences) {
        const prop = "options.roles.bigBadWolf";
        return { isPowerlessIfWerewolfDies: getProp(game, `${prop}.isPowerlessIfWerewolfDies`, bigBadWolfUserPreferences.isPowerlessIfWerewolfDies) };
    }

    static _getSheriffGameOptions(game, sheriffUserPreferences) {
        const prop = "options.roles.sheriff";
        return {
            isEnabled: getProp(game, `${prop}.isEnabled`, sheriffUserPreferences.isEnabled),
            electedAt: {
                turn: getProp(game, `${prop}.electedAt.turn`, sheriffUserPreferences.electedAt.turn),
                phase: getProp(game, `${prop}.electedAt.phase`, sheriffUserPreferences.electedAt.phase),
            },
            hasDoubledVote: getProp(game, `${prop}.hasDoubledVote`, sheriffUserPreferences.hasDoubledVote),
        };
    }

    static _getRolesGameOptions(game, userPreferences) {
        const prop = "options.roles";
        return {
            areRevealedOnDeath: getProp(game, `${prop}.areRevealedOnDeath`, userPreferences.areRevealedOnDeath),
            sheriff: this._getSheriffGameOptions(game, userPreferences.sheriff),
            bigBadWolf: this._getBigBadWolfGameOptions(game, userPreferences.bigBadWolf),
            whiteWerewolf: this._getWhiteWerewolfGameOptions(game, userPreferences.whiteWerewolf),
            seer: this._getSeerGameOptions(game, userPreferences.seer),
            littleGirl: this._getLittleGirlGameOptions(game, userPreferences.littleGirl),
            guard: this._getGuardGameOptions(game, userPreferences.guard),
            ancient: this._getAncientGameOptions(game, userPreferences.ancient),
            idiot: this._getIdiotGameOptions(game, userPreferences.idiot),
            twoSisters: this._getTwoSistersGameOptions(game, userPreferences.twoSisters),
            threeBrothers: this._getThreeBrothersGameOptions(game, userPreferences.threeBrothers),
            fox: this._getFoxGameOptions(game, userPreferences.fox),
            bearTamer: this._getBearTamerGameOptions(game, userPreferences.bearTamer),
            stutteringJudge: this._getStutteringJudgeGameOptions(game, userPreferences.stutteringJudge),
            wildChild: this._getWildChildGameOptions(game, userPreferences.wildChild),
            dogWolf: this._getDogWolfGameOptions(game, userPreferences.dogWolf),
            thief: this._getThiefGameOptions(game, userPreferences.thief),
            piedPiper: this._getPiedPiperGameOptions(game, userPreferences.piedPiper),
            raven: this._getRavenGameOptions(game, userPreferences.raven),
        };
    }

    static _getGameOptions(game) {
        const userPreferences = new UserPreferences();
        return {
            repartition: { isHidden: getProp(game, "options.repartition.isHidden", userPreferences.game.options.repartition.isHidden) },
            roles: this._getRolesGameOptions(game, userPreferences.game.options.roles),
        };
    }

    get isCreated() {
        return !!this._id;
    }

    get alivePlayers() {
        return this.players.filter(player => player.isAlive);
    }

    get deadPlayers() {
        return this.players.filter(player => !player.isAlive);
    }

    get canVotePlayers() {
        return this.players.filter(player => player.isAlive && !player.hasActiveAttribute("cant-vote", this));
    }

    get werewolfPlayers() {
        return this.players.filter(player => player.side.current === "werewolves");
    }

    get aliveWerewolfPlayers() {
        return this.players.filter(player => player.isAlive && player.side.current === "werewolves");
    }

    get villagerPlayers() {
        return this.players.filter(player => player.side.current === "villagers");
    }

    get aliveVillagerPlayers() {
        return this.players.filter(player => player.isAlive && player.side.current === "villagers");
    }

    get isMaxPlayerReached() {
        return this.players.length === 40;
    }

    get areThereEnoughPlayers() {
        return this.players.length >= 4;
    }

    get areThereEnoughVillagers() {
        return !!this.villagerPlayers.length;
    }

    get areThereEnoughWerewolves() {
        return !!this.werewolfPlayers.length;
    }

    get areThereEnoughSisters() {
        return this.sisterPlayers.length === 2;
    }

    get areThereEnoughBrothers() {
        return this.brotherPlayers.length === 3;
    }

    get areThereEnoughThiefAdditionalCards() {
        return this.thiefAdditionalCards.length === this.options.roles.thief.additionalCardsCount;
    }

    get allPlayersHaveRole() {
        return this.players.length && !this.players.filter(player => player.role.current === undefined).length;
    }

    allPlayerRoleMinimumIsReached(roles) {
        return this.players.length && this.players.every(({ role: playerRole }) => {
            const role = roles.find(({ name }) => name === playerRole.current);
            return !role.minInGame || role.minimumReached(this);
        });
    }

    canStartGame(roles) {
        return this.areThereEnoughPlayers && this.areThereEnoughVillagers && this.areThereEnoughWerewolves && this.allPlayersHaveRole &&
            this.areGameRolesOptionsValid && this.allPlayerRoleMinimumIsReached(roles);
    }

    get canUpdateOptions() {
        return !this.isCreated;
    }

    get firstWaiting() {
        return this.waiting.length ? this.waiting[0] : undefined;
    }

    get isFirstWaitingVoteAction() {
        return this.firstWaiting && isVoteAction(this.firstWaiting.to);
    }

    get isFirstWaitingForbiddenTieVoteAction() {
        return this.firstWaiting && isForbiddenTieVoteAction(this.firstWaiting.to);
    }

    get isFirstWaitingTargetAction() {
        return this.firstWaiting && isTargetAction(this.firstWaiting.to);
    }

    get expectedTargetsLength() {
        const { to, for: source } = this.firstWaiting;
        const oneTargetActions = ["look", "eat", "protect", "shoot", "settle-votes", "delegate", "choose-model", "use-potion", "sniff"];
        const twoTargetsActions = ["charm"];
        const noLimitActions = ["ban-voting"];
        if (source === "pied-piper") {
            const { charmedPeopleCountPerNight } = this.options.roles.piedPiper;
            return this.piedPiperTargets.length < charmedPeopleCountPerNight ? this.piedPiperTargets.length : charmedPeopleCountPerNight;
        } else if (oneTargetActions.includes(to)) {
            return 1;
        } else if (twoTargetsActions.includes(to)) {
            return 2;
        } else if (noLimitActions.includes(to)) {
            return this.alivePlayers.length;
        }
        return 0;
    }

    get isFirstWaitingTimedAction() {
        return this.firstWaiting && isTimedAction(this.firstWaiting.to);
    }

    get maxTimeToPlay() {
        const { to } = this.firstWaiting;
        if (to === "elect-sheriff" || to === "vote") {
            return 5 * 60 * 1000;
        } else if (to === "meet-each-other") {
            return 20 * 1000;
        }
        return 0;
    }

    get isFirstWaitingChooseSideAction() {
        return this.firstWaiting && this.firstWaiting.to === "choose-side";
    }

    get isFirstWaitingChooseCardAction() {
        return this.firstWaiting && this.firstWaiting.to === "choose-card";
    }

    get isFirstWaitingSkippableAction() {
        return this.firstWaiting && isSkippableAction(this.firstWaiting.to, this.firstWaiting.for, this);
    }

    get isFirstWaitingPreFirstNightPlay() {
        return this.firstWaiting && isPreFirstNightPlay(this.firstWaiting.to, this.turn, this.phase);
    }

    get doesSourceGoToBed() {
        return !this.isFirstWaitingPreFirstNightPlay && this.phase === "night";
    }

    getPlayersWithRole(role) {
        return this.players.filter(player => player.currentRole === role);
    }

    getPlayerWithRole(role) {
        return this.players.find(player => player.currentRole === role);
    }

    getPlayerWithOriginalRole(role) {
        return this.players.find(player => player.originalRole === role);
    }

    get seerPlayer() {
        return this.getPlayerWithRole("seer");
    }

    get witchPlayer() {
        return this.getPlayerWithRole("witch");
    }

    get guardPlayer() {
        return this.getPlayerWithRole("guard");
    }

    get littleGirlPlayer() {
        return this.getPlayerWithRole("little-girl");
    }

    get ravenPlayer() {
        return this.getPlayerWithRole("raven");
    }

    get hunterPlayer() {
        return this.getPlayerWithRole("hunter");
    }

    getPlayerWithAttribute(attributeName) {
        return this.players.find(player => player.hasAttribute(attributeName));
    }

    getPlayerWithAttributeAndSource(attributeName, sourceName) {
        return this.players.find(player => player.hasAttributeAndSource(attributeName, sourceName));
    }

    getPlayersWithAttribute(attributeName) {
        return this.players.filter(player => player.hasAttribute(attributeName));
    }

    get sheriffPlayer() {
        return this.getPlayerWithAttribute("sheriff");
    }

    get eatenPlayers() {
        return this.getPlayersWithAttribute("eaten");
    }

    get dogWolfPlayer() {
        return this.getPlayerWithRole("dog-wolf");
    }

    get cupidPlayer() {
        return this.getPlayerWithRole("cupid");
    }

    get wildChildPlayer() {
        return this.getPlayerWithRole("wild-child");
    }

    get bigBadWolfPlayer() {
        return this.getPlayerWithRole("big-bad-wolf");
    }

    get sisterPlayers() {
        return this.getPlayersWithRole("two-sisters");
    }

    get brotherPlayers() {
        return this.getPlayersWithRole("three-brothers");
    }

    get vileFatherOfWolvesPlayer() {
        return this.getPlayerWithRole("vile-father-of-wolves");
    }

    get scapegoatPlayer() {
        return this.getPlayerWithRole("scapegoat");
    }

    get angelPlayer() {
        return this.getPlayerWithRole("angel");
    }

    get doesAngelWinIfHeDiesNow() {
        const { angelPlayer, firstWaiting, turn, isFirstWaitingPreFirstNightPlay } = this;
        return !!angelPlayer && (firstWaiting.to === "eat" && firstWaiting.for !== "white-werewolf" && angelPlayer.isAliveAndPowerful && turn === 1 ||
            (firstWaiting.to === "vote" || firstWaiting.to === "settle-votes") && isFirstWaitingPreFirstNightPlay);
    }

    get inLovePlayers() {
        return this.getPlayersWithAttribute("in-love");
    }

    get charmedPlayers() {
        return this.getPlayersWithAttribute("charmed");
    }

    get idiotPlayer() {
        return this.getPlayerWithRole("idiot");
    }

    get isIdiotProtectedFromVotes() {
        const { idiotPlayer } = this;
        return !!idiotPlayer && idiotPlayer.isAliveAndPowerful && !idiotPlayer.isRoleRevealed;
    }

    get ancientPlayer() {
        return this.getPlayerWithRole("ancient");
    }

    get thiefPlayer() {
        return this.getPlayerWithRole("thief");
    }

    get originalThiefPlayer() {
        return this.getPlayerWithOriginalRole("thief");
    }

    get villagerVillagerPlayer() {
        return this.getPlayerWithRole("villager-villager");
    }

    get stutteringJudgePlayer() {
        return this.getPlayerWithRole("stuttering-judge");
    }

    get piedPiperPlayer() {
        return this.getPlayerWithRole("pied-piper");
    }

    get piedPiperTargets() {
        return this.alivePlayers.filter(player => player.role.current !== "pied-piper" && !player.hasAttribute("charmed"));
    }

    get foxPlayer() {
        return this.getPlayerWithRole("fox");
    }

    get bearTamerPlayer() {
        return this.getPlayerWithRole("bear-tamer");
    }

    get rustySwordKnightPlayer() {
        return this.getPlayerWithRole("rusty-sword-knight");
    }

    canStutteringJudgeRequestVote(hasChosenSign, voteRequestsCount) {
        return !!this.stutteringJudgePlayer && this.stutteringJudgePlayer.isAliveAndPowerful && hasChosenSign &&
            voteRequestsCount < this.options.roles.stutteringJudge.voteRequestsCount;
    }

    isRoleInGame(roleName) {
        return !!this.players.find(({ role }) => role.current === roleName);
    }

    getPlayerWithId(playerId) {
        return this.players.find(({ _id }) => _id.toString() === playerId);
    }

    getPlayerWithName(playerName) {
        return this.players.find(({ name }) => name === playerName);
    }

    get playersExpectedToPlay() {
        if (!this.firstWaiting) {
            return [];
        }
        const { for: source } = this.firstWaiting;
        const waitingForGroups = {
            all: this.players,
            sheriff: this.getPlayersWithAttribute("sheriff"),
            lovers: this.getPlayersWithAttribute("in-love"),
            charmed: this.getPlayersWithAttribute("charmed"),
            villagers: this.villagerPlayers,
            werewolves: this.werewolfPlayers,
        };
        return waitingForGroups[source] ? waitingForGroups[source] : this.getPlayersWithRole(source);
    }

    get alivePlayersExpectedToPlay() {
        return this.playersExpectedToPlay.filter(({ isAlive }) => isAlive);
    }

    get scapegoatTargets() {
        return this.alivePlayers.filter(player => !player.hasAttribute("cant-vote"));
    }

    get lastHistoryEntry() {
        return this.history.length ? this.history[0] : undefined;
    }

    get lastActionTargets() {
        return !this.lastHistoryEntry ? [] : this.history[0].play.targets;
    }

    get lastActionTargetedPlayers() {
        return this.lastActionTargets.map(({ player }) => player);
    }

    get isSecondVoteAfterTie() {
        if (!this.history.length) {
            return false;
        }
        const { play } = this.history[0];
        return play.source.name === "all" && play.action === "vote" && play.votesResult === "need-settlement" &&
            this.firstWaiting.for === "all" && this.firstWaiting.to === "vote";
    }

    get didAncientTakeHisRevenge() {
        return !!this.getPlayerWithAttribute("powerless");
    }

    get thiefAdditionalCards() {
        return this.additionalCards.filter(({ for: recipient }) => recipient === "thief");
    }

    get areGameRolesOptionsValid() {
        return !this.getPlayerWithRole("thief") || this.areThereEnoughThiefAdditionalCards;
    }

    get areGameOptionsValid() {
        return this.areGameRolesOptionsValid;
    }

    get hasRoleDependingOnPlayerPosition() {
        return !!this.getPlayerWithRole("rusty-sword-knight") || !!this.getPlayerWithRole("bear-tamer") || !!this.getPlayerWithRole("fox");
    }

    get isPlaying() {
        return this.status === "playing";
    }

    get isDone() {
        return this.status === "done";
    }

    get isCanceled() {
        return this.status === "canceled";
    }
}

export default Game;