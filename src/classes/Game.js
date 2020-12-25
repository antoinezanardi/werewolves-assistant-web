import { getProp } from "@/helpers/functions/Class";
import User from "./User";
import Player from "./Player";
import GameHistory from "./GameHistory";

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
        this.options = {
            sistersWakingUpInterval: getProp(game, "options.sistersWakingUpInterval"),
            brothersWakingUpInterval: getProp(game, "options.brothersWakingUpInterval"),
            isSheriffVoteDoubled: getProp(game, "options.isSheriffVoteDoubled"),
            isSeerTalkative: getProp(game, "options.isSeerTalkative"),
        };
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

    get alivePlayers() {
        return this.players.filter(player => player.isAlive);
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
        return this.players.length === 20;
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
        return this.areThereEnoughPlayers && this.areThereEnoughVillagers &&
            this.areThereEnoughWerewolves && this.allPlayersHaveRole &&
            this.allPlayerRoleMinimumIsReached(roles);
    }

    get firstWaiting() {
        return this.waiting[0];
    }

    get isVotePlay() {
        const { to } = this.firstWaiting;
        const voteActions = ["elect-sheriff", "vote"];
        return voteActions.includes(to);
    }

    get isForbiddenTieVotePlay() {
        const { to } = this.firstWaiting;
        const forbiddenTieVoteActions = ["elect-sheriff"];
        return forbiddenTieVoteActions.includes(to);
    }

    get isTargetPlay() {
        const { to } = this.firstWaiting;
        const targetActions = ["look", "eat", "protect", "shoot", "settle-votes", "delegate", "charm", "choose-model"];
        return targetActions.includes(to);
    }

    get expectedTargetsLength() {
        const { to } = this.firstWaiting;
        const oneTargetActions = ["look", "eat", "protect", "shoot", "settle-votes", "delegate", "choose-model", "use-potion"];
        const twoTargetsActions = ["charm"];
        if (oneTargetActions.includes(to)) {
            return 1;
        } else if (twoTargetsActions.includes(to)) {
            return 2;
        }
        return 0;
    }

    get isTimedPlay() {
        const { to } = this.firstWaiting;
        const timedActions = ["elect-sheriff", "vote", "meet-each-other"];
        return timedActions.includes(to);
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

    get isChooseSidePlay() {
        const { to } = this.firstWaiting;
        return to === "choose-side";
    }

    get isSkippablePlay() {
        const { to } = this.firstWaiting;
        const skippableActions = ["use-potion", "mark", "meet-each-other"];
        return skippableActions.includes(to);
    }

    getPlayersWithRole(role) {
        return this.players.filter(player => player.currentRole === role);
    }

    getPlayerWithRole(role) {
        return this.players.find(player => player.currentRole === role);
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

    get eatenPlayer() {
        return this.getPlayerWithAttribute("eaten");
    }

    get eatenPlayers() {
        return this.getPlayersWithAttribute("eaten");
    }

    get hasWitchUsedLifePotion() {
        return !!this.history.find(({ play }) => play.action === "use-potion" && !!play.targets.find(({ potion }) => potion.life));
    }

    get hasWitchUsedDeathPotion() {
        return !!this.history.find(({ play }) => play.action === "use-potion" && !!play.targets.find(({ potion }) => potion.death));
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

    get inLovePlayers() {
        return this.getPlayersWithAttribute("in-love");
    }

    isRoleInGame(roleName) {
        return !!this.players.find(({ role }) => role.current === roleName);
    }

    getPlayerWithId(playerId) {
        return this.players.find(({ _id }) => _id.toString() === playerId);
    }

    get alivePlayersExpectedToPlay() {
        const { for: source } = this.firstWaiting;
        const waitingForGroups = {
            all: this.alivePlayers,
            sheriff: this.getPlayersWithAttribute("sheriff").filter(({ isAlive }) => isAlive),
            lovers: this.getPlayersWithAttribute("lovers").filter(({ isAlive }) => isAlive),
            villagers: this.aliveVillagerPlayers,
            werewolves: this.aliveWerewolfPlayers,
        };
        return waitingForGroups[source] ? waitingForGroups[source] : this.getPlayersWithRole(source);
    }
}

export default Game;