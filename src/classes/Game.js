import { getProp } from "../helpers/functions/Class";
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
        this.waiting = getProp(game, "waiting", [], waiting => waiting.map(waiting => waiting));
        this.status = getProp(game, "status");
        this.history = getProp(game, "history", [], history => history.map(historyEntry => new GameHistory(historyEntry)));
        this.won = {
            by: getProp(game, "won.by"),
            players: getProp(game, "won.players", [], won => won.players.map(player => new Player(player))),
        };
        this.createdAt = getProp(game, "createdAt");
        this.updatedAt = getProp(game, "updatedAt");
    }

    get werewolfPlayers() {
        return this.players.filter(player => player.role.group === "werewolves");
    }

    get aliveWerewolfPlayers() {
        return this.players.filter(player => player.isAlive && player.role.group === "werewolves");
    }

    get villagerPlayers() {
        return this.players.filter(player => player.role.group === "villagers");
    }

    get aliveVillagerPlayers() {
        return this.players.filter(player => player.isAlive && player.role.group === "villagers");
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
        return !this.players.filter(player => player.role.current === undefined).length;
    }
}

export default Game;