import { getProp } from "../helpers/functions/Class";
import User from "./User";
import Player from "./Player";
import GameHistory from "./GameHistory";

class Game {
    constructor(game = null) {
        this._id = getProp(game, "_id");
        this.gameMaster = getProp(game, "gameMaster", new User(), game => new User(game.gameMaster));
        this.players = getProp(game, "players", [], game => game.players.map(player => new Player(player)));
        this.turn = getProp(game, "turn");
        this.phase = getProp(game, "phase");
        this.tick = getProp(game, "tick");
        this.waiting = getProp(game, "waiting", [], game => game.waiting.map(waiting => waiting));
        this.status = getProp(game, "status");
        this.history = getProp(game, "history", [], game => game.history.map(historyEntry => new GameHistory(historyEntry)));
        this.won = {
            by: getProp(game, "won.by"),
            players: getProp(game, "won.players", [], game => game.won.players.map(player => new Player(player))),
        };
        this.createdAt = getProp(game, "createdAt");
        this.updatedAt = getProp(game, "updatedAt");
    }
}

export default Game;