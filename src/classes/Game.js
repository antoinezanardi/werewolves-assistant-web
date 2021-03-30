import { getProp } from "@/helpers/functions/Class";
import User from "./User";
import Player from "./Player";
import GameHistory from "./GameHistory";
import {
    isForbiddenTieVoteAction, isSkippableAction, isTargetAction, isTimedAction, isVoteAction,
    isPreFirstNightPlay,
} from "@/helpers/functions/Game";
import GameAdditionalCard from "@/classes/GameAdditionalCard";

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

    static _getGameOptions(game) {
        return {
            repartition: { isHidden: getProp(game, "options.repartition.isHidden", false) },
            roles: {
                areRevealedOnDeath: getProp(game, "options.roles.areRevealedOnDeath", true),
                sheriff: {
                    isEnabled: getProp(game, "options.roles.sheriff.isEnabled", true),
                    hasDoubledVote: getProp(game, "options.roles.sheriff.hasDoubledVote", true),
                },
                seer: {
                    isTalkative: getProp(game, "options.roles.seer.isTalkative", true),
                    canSeeRoles: getProp(game, "options.roles.seer.canSeeRoles", true),
                },
                littleGirl: { isProtectedByGuard: getProp(game, "options.roles.littleGirl.isProtectedByGuard", false) },
                idiot: { doesDieOnAncientDeath: getProp(game, "options.roles.idiot.doesDieOnAncientDeath", true) },
                twoSisters: { wakingUpInterval: getProp(game, "options.roles.twoSisters.wakingUpInterval", 2) },
                threeBrothers: { wakingUpInterval: getProp(game, "options.roles.threeBrothers.wakingUpInterval", 2) },
                raven: { markPenalty: getProp(game, "options.roles.raven.markPenalty", 2) },
            },
        };
    }

    get isCreated() {
        return !!this._id;
    }

    get alivePlayers() {
        return this.players.filter(player => player.isAlive);
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
        return this.thiefAdditionalCards.length === 2;
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
        return this.waiting[0];
    }

    get isFirstWaitingVoteAction() {
        const { to } = this.firstWaiting;
        return isVoteAction(to);
    }

    get isFirstWaitingForbiddenTieVoteAction() {
        const { to } = this.firstWaiting;
        return isForbiddenTieVoteAction(to);
    }

    get isFirstWaitingTargetAction() {
        const { to } = this.firstWaiting;
        return isTargetAction(to);
    }

    get expectedTargetsLength() {
        const { to } = this.firstWaiting;
        const oneTargetActions = ["look", "eat", "protect", "shoot", "settle-votes", "delegate", "choose-model", "use-potion"];
        const twoTargetsActions = ["charm"];
        const noLimitActions = ["ban-voting"];
        if (oneTargetActions.includes(to) || to === "charm" && this.piedPiperTargets.length === 1) {
            return 1;
        } else if (twoTargetsActions.includes(to)) {
            return 2;
        } else if (noLimitActions.includes(to)) {
            return this.alivePlayers.length;
        }
        return 0;
    }

    get isFirstWaitingTimedAction() {
        const { to } = this.firstWaiting;
        return isTimedAction(to);
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
        const { to } = this.firstWaiting;
        return to === "choose-side";
    }

    get isFirstWaitingChooseCardAction() {
        const { to } = this.firstWaiting;
        return to === "choose-card";
    }

    get isFirstWaitingSkippableAction() {
        const { to: action, for: source } = this.firstWaiting;
        return isSkippableAction(action, source, this);
    }

    get isFirstWaitingPreFirstNightPlay() {
        return isPreFirstNightPlay(this.firstWaiting.to, this.turn, this.phase);
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

    canStutteringJudgeRequestVote(hasChosenSign, hasRequestedVote) {
        return !!this.stutteringJudgePlayer && this.stutteringJudgePlayer.isAliveAndPowerful && hasChosenSign && !hasRequestedVote;
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

    get lastActionTargets() {
        if (!this.history.length) {
            return [];
        }
        return this.history[0].play.targets;
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
}

export default Game;