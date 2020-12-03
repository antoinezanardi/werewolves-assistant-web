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

    get allPlayersHaveRole() {
        return this.players.length && !this.players.filter(player => player.role.current === undefined).length;
    }

    get canStartGame() {
        return this.areThereEnoughPlayers && this.areThereEnoughVillagers &&
            this.areThereEnoughWerewolves && this.allPlayersHaveRole;
    }

    get firstWaiting() {
        return this.waiting[0];
    }

    get isVotePlay() {
        const waiting = this.firstWaiting;
        return waiting.to === "elect-sheriff" || waiting.to === "vote";
    }

    get isForbiddenTieVotePlay() {
        const waiting = this.firstWaiting;
        return waiting.to === "elect-sheriff";
    }

    get isOneTargetPlay() {
        const waiting = this.firstWaiting;
        return waiting.to === "look" || waiting.to === "eat" || waiting.to === "protect" ||
            waiting.to === "shoot" || waiting.to === "settle-votes" || waiting.to === "delegate";
    }

    get isTimedPlay() {
        const waiting = this.firstWaiting;
        return waiting.to === "elect-sheriff" || waiting.to === "vote";
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
        return this.players.find(({ attributes }) => attributes.find(({ attribute }) => attribute === attributeName));
    }

    get sheriffPlayer() {
        return this.getPlayerWithAttribute("sheriff");
    }

    get eatenPlayer() {
        return this.getPlayerWithAttribute("eaten");
    }

    get hasWitchUsedLifePotion() {
        return !!this.history.find(({ play }) => play.action === "use-potion" && !!play.targets.find(({ potion }) => potion.life));
    }

    get hasWitchUsedDeathPotion() {
        return !!this.history.find(({ play }) => play.action === "use-potion" && !!play.targets.find(({ potion }) => potion.death));
    }

    isRoleInGame(roleName) {
        return !!this.players.find(({ role }) => role.current === roleName);
    }
}

export default Game;