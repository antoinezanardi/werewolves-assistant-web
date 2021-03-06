import Player from "./Player";
import { getProp } from "@/helpers/functions/Class";
import { isPreFirstNightPlay } from "@/helpers/functions/Game";

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
                isInfected: getProp(target, "isInfected"),
                hasDrankLifePotion: getProp(target, "hasDrankLifePotion"),
                hasDrankDeathPotion: getProp(target, "hasDrankDeathPotion"),
            }))),
            votes: getProp(gameHistory, "play.votes", [], votes => votes.map(vote => ({
                from: new Player(vote.from),
                for: new Player(vote.for),
            }))),
            votesResult: getProp(gameHistory, "play.votesResult"),
            doesJudgeRequestAnotherVote: getProp(gameHistory, "play.doesJudgeRequestAnotherVote"),
            card: getProp(gameHistory, "play.card"),
            side: getProp(gameHistory, "play.side"),
        };
        this.deadPlayers = getProp(gameHistory, "deadPlayers", [], players => players.map(player => new Player(player)));
        this.revealedPlayers = getProp(gameHistory, "revealedPlayers", [], players => players.map(player => new Player(player)));
    }

    get didVileFatherOfWolvesInfectTarget() {
        const { play } = this;
        return play.source.name === "werewolves" && play.action === "eat" && !!play.targets.find(({ isInfected }) => isInfected);
    }

    get didWitchUsedLifePotion() {
        const { play } = this;
        return play.source.name === "witch" && play.action === "use-potion" && !!play.targets.find(({ hasDrankLifePotion }) => hasDrankLifePotion);
    }

    get didWitchUsedDeathPotion() {
        const { play } = this;
        return play.source.name === "witch" && play.action === "use-potion" && !!play.targets.find(({ hasDrankDeathPotion }) => hasDrankDeathPotion);
    }

    get wasVotePlayWithoutDeath() {
        const { play } = this;
        return play.source.name === "all" && play.action === "vote" && play.votesResult === "no-death";
    }

    get hasStutteringJudgeRequestedVote() {
        const { play } = this;
        return play.source.name === "all" && play.action === "vote" && play.doesJudgeRequestAnotherVote;
    }

    get revealedAlivePlayers() {
        return this.revealedPlayers.filter(({ _id }) => !this.deadPlayers.find(deadPlayer => deadPlayer._id === _id));
    }

    get isPreFirstNightPlay() {
        return isPreFirstNightPlay(this.play.action, this.turn, this.phase);
    }
}

export default GameHistory;