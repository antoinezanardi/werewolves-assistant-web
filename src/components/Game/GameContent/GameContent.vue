<template>
    <div id="game-content" class="d-flex flex-column">
        <transition mode="out-in" name="fade">
            <GameEventMonitor v-if="events.length" key="game-event-monitor" :events="events" @skipEvent="removeEvent"/>
            <GamePlayField v-else key="game-play-field" :play="play" @playerSelected="playerSelected" @playerVotes="playerVotes"/>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import GamePlayField from "./GamePlayField/GamePlayField";
import GameEvent from "@/classes/GameEvent";
import GameEventMonitor from "../GameEventMonitor/GameEventMonitor";

export default {
    name: "GameContent",
    components: { GameEventMonitor, GamePlayField },
    data() {
        return {
            play: {
                votes: [],
                targets: [],
            },
            events: [],
        };
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    watch: {
        game: {
            handler(newGame, oldGame) {
                this.resetPlay();
                // this.events.push(new GameEvent({ type: "player-dies", targets: [{ player: this.game.players[1] }] }));
                if (newGame.tick === 1) {
                    this.events.push(new GameEvent({ type: "game-starts" }));
                }
                if (newGame.phase === "day") {
                    this.generateGamePhaseEvent(newGame, oldGame);
                    this.generateGameDeathEvents(newGame, oldGame);
                } else {
                    this.generateGameDeathEvents(newGame, oldGame);
                    this.generateGamePhaseEvent(newGame, oldGame);
                }
                this.generateGameRoleTurnEvents(newGame, oldGame);
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        playerVotes(vote) {
            const idx = this.play.votes.findIndex(({ from }) => from === vote.from);
            if (idx !== -1) {
                return vote.for ? this.play.votes.splice(idx, 1, vote) : this.play.votes.splice(idx, 1);
            } else if (vote.for) {
                return this.play.votes.push(vote);
            }
        },
        playerSelected(payload) {
            const target = { player: payload.player._id, attribute: payload.attribute };
            if (target.attribute === "drank-life-potion") {
                target.potion = { life: true };
            } else if (target.attribute === "drank-death-potion") {
                target.potion = { death: true };
            }
            if (payload.selected) {
                const idx = this.play.targets.findIndex(({ attribute }) => attribute === target.attribute);
                if (idx !== -1) {
                    this.play.targets.splice(idx, 1);
                }
            }
            const idx = this.play.targets.findIndex(({ player, attribute }) => player === target.player && attribute === target.attribute);
            if (idx !== -1) {
                return payload.selected ? this.play.targets.splice(idx, 1, target) : this.play.targets.splice(idx, 1);
            } else if (payload.selected) {
                return this.play.targets.push(target);
            }
        },
        resetPlay() {
            this.play.votes = [];
            this.play.targets = [];
            if (this.game.history.length) {
                const lastGameHistoryEntry = this.game.history[0];
                if (lastGameHistoryEntry.play.action === "look") {
                    this.events.push(new GameEvent({ type: "seer-looks", targets: lastGameHistoryEntry.play.targets }));
                } else if (lastGameHistoryEntry.play.action === "elect-sheriff" || lastGameHistoryEntry.play.action === "delegate") {
                    this.events.push(new GameEvent({ type: "sheriff-elected", targets: lastGameHistoryEntry.play.targets }));
                }
            }
        },
        generateGamePhaseEvent(newGame, oldGame) {
            if (newGame.tick === 2) {
                return this.events.push(new GameEvent({ type: "night-falls" }));
            } else if (newGame && oldGame && newGame.phase !== oldGame.phase) {
                const event = newGame.phase === "day" ? new GameEvent({ type: "day-rises" }) : new GameEvent({ type: "night-falls" });
                return this.events.push(event);
            }
        },
        generateGameDeathEvents(newGame, oldGame) {
            if (!newGame || !oldGame) {
                return;
            }
            for (const newPlayer of newGame.players) {
                const oldPlayer = oldGame.players.find(({ _id }) => _id === newPlayer._id);
                if (!newPlayer.isAlive && oldPlayer.isAlive) {
                    this.events.push(new GameEvent({ type: "player-dies", targets: [{ player: newPlayer }] }));
                }
            }
        },
        generateGameRoleTurnEvents(newGame, oldGame) {
            const roleTurnEvents = {
                seer: "seer-starts",
                werewolves: "werewolves-start",
                witch: "witch-starts",
                guard: "guard-starts",
                raven: "raven-starts",
                hunter: "hunter-starts",
            };
            if ((!oldGame || newGame.firstWaiting.for !== oldGame.firstWaiting.for && newGame.firstWaiting.to !== oldGame.firstWaiting.to) &&
                roleTurnEvents[newGame.firstWaiting.for]) {
                this.events.push(new GameEvent({ type: roleTurnEvents[newGame.firstWaiting.for] }));
            }
        },
        removeEvent(event) {
            const idx = this.events.findIndex(({ _id }) => _id === event._id);
            if (idx !== -1) {
                this.events.splice(idx, 1);
            }
        },
    },
};
</script>

<style scoped>

</style>