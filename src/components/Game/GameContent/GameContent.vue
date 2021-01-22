<template>
    <div id="game-content" class="d-flex flex-column">
        <transition mode="out-in" name="fade">
            <GameEventMonitor v-if="events.length" key="game-event-monitor" :events="events" @skip-event="removeEvent"/>
            <GamePlayField v-else key="game-play-field" :play="play" @player-selected="playerSelected" @player-votes="playerVotes"
                           @side-selected="sideSelected"/>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import GamePlayField from "./GamePlayField/GamePlayField";
import GameEvent from "@/classes/GameEvent";
import GameEventMonitor from "@/components/Game/GameEventMonitor/GameEventMonitor";
import { maxTargetLengthForPlayerAttribute } from "@/helpers/functions/Player";

export default {
    name: "GameContent",
    components: { GameEventMonitor, GamePlayField },
    data() {
        return {
            play: {
                votes: [],
                targets: [],
                side: undefined,
            },
            events: [],
        };
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    watch: {
        game: {
            handler(newGame, oldGame) {
                this.resetPlay();
                this.generateLastGameHistoryEvents();
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
            const maxTargetLength = maxTargetLengthForPlayerAttribute(payload.attribute);
            const targetIdx = this.play.targets.findIndex(({ player }) => player === target.player);
            if (!payload.selected) {
                if (targetIdx !== -1) {
                    this.play.targets.splice(targetIdx, 1);
                }
            } else if (targetIdx !== -1) {
                this.play.targets.splice(targetIdx, 1, target);
            } else {
                this.play.targets.push(target);
                const targetsWithAttribute = this.play.targets.filter(({ attribute }) => attribute === payload.attribute);
                if (maxTargetLength < targetsWithAttribute.length) {
                    this.play.targets.shift();
                }
            }
        },
        sideSelected(side) {
            this.play.side = side;
        },
        resetPlay() {
            this.play.votes = [];
            this.play.targets = [];
            this.play.side = undefined;
        },
        generateLastGameHistoryEvents() {
            if (this.game.history.length) {
                const lastGameHistoryEntry = this.game.history[0];
                const lastGameHistoryEntryName = lastGameHistoryEntry.play.source.name;
                if (lastGameHistoryEntry.play.action === "look") {
                    this.events.push(new GameEvent({ type: "seer-looks", targets: lastGameHistoryEntry.play.targets }));
                } else if (lastGameHistoryEntry.play.action === "elect-sheriff" || lastGameHistoryEntry.play.action === "delegate") {
                    this.events.push(new GameEvent({ type: "sheriff-elected", targets: lastGameHistoryEntry.play.targets }));
                } else if (lastGameHistoryEntry.play.action === "charm") {
                    this.events.push(new GameEvent({ type: `${lastGameHistoryEntryName}-charms`, targets: lastGameHistoryEntry.play.targets }));
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
            if (newGame.phase === "day" && !this.events.find(({ type }) => type === "player-dies")) {
                this.events.push(new GameEvent({ type: "no-death-during-night" }));
            }
        },
        generateGameRoleTurnEvents(newGame, oldGame) {
            if (!oldGame || newGame.firstWaiting.for !== oldGame.firstWaiting.for || newGame.firstWaiting.to !== oldGame.firstWaiting.to) {
                this.events.push(new GameEvent({ type: `${newGame.firstWaiting.for}-turn` }));
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