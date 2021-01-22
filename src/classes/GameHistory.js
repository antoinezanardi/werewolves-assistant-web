import { getProp } from "@/helpers/functions/Class";
import Player from "./Player";

class GameHistory {
    constructor(gameHistory = null) {
        this._id = getProp(gameHistory, "_id");
        this.gameId = getProp(gameHistory, "gameId");
        this.turn = getProp(gameHistory, "turn");
        this.phase = getProp(gameHistory, "phase");
        this.tick = getProp(gameHistory, "tick");
        this.play = {
            source: {
                name: getProp(gameHistory, "play.source.name"),
                players: getProp(gameHistory, "play.source.players", [], players => players.map(player => new Player(player))),
            },
            action: getProp(gameHistory, "play.action"),
            targets: getProp(gameHistory, "play.targets", [], targets => targets.map(target => ({
                player: new Player(target.player),
                potion: {
                    life: getProp(target, "potion.life"),
                    death: getProp(target, "potion.death"),
                },
            }))),
            votes: getProp(gameHistory, "play.votes", [], votes => votes.map(vote => ({
                from: new Player(vote.from),
                for: new Player(vote.for),
            }))),
            side: getProp(gameHistory, "play.side"),
        };
    }
}

export default GameHistory;