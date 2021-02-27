<template>
    <div id="game-content" class="d-flex flex-column">
        <transition mode="out-in" name="fade">
            <GameEventMonitor v-if="events.length" key="game-event-monitor" :events="events" @skip-event="removeEvent"/>
            <GamePlayField v-else key="game-play-field" :play="play" @player-selected="playerSelected" @player-votes="playerVotes"
                           @side-selected="sideSelected" @vile-father-of-wolves-infects="vileFatherOfWolvesInfects" @card-selected="cardSelected"
                           @stuttering-judge-requests-another-vote="stutteringJudgeRequestsAnotherVote"/>
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
                doesJudgeRequestAnotherVote: undefined,
                chosenCard: undefined,
                side: undefined,
            },
            events: [],
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        ...mapGetters("audioManager", { audioManager: "audioManager" }),
    },
    watch: {
        game: {
            handler(newGame) {
                this.resetPlay();
                this.generateLastActionEvents();
                if (newGame.tick === 1) {
                    this.events.push(new GameEvent({ type: "game-starts" }));
                    this.generatePlayerStartsGameRevealedEvents();
                }
                if (newGame.phase === "day") {
                    this.generateGamePhaseEvent();
                    this.generateGameDeathAndRevealEvents();
                } else {
                    this.generateGameDeathAndRevealEvents();
                    this.generateGamePhaseEvent();
                }
                this.generateGameRoleTurnEvents();
            },
            deep: true,
            immediate: true,
        },
    },
    created() {
        const firstEvent = this.events.length ? this.events[0] : undefined;
        if (!firstEvent || firstEvent.type !== "day-rises" && firstEvent.type !== "night-falls") {
            if (this.game.isFirstWaitingPreFirstNightPlay || this.game.phase === "day" && !this.events.find(({ type }) => type === "day-rises") ||
                this.game.phase === "night" && this.events.find(({ type }) => type === "night-falls")) {
                this.audioManager.playDayMusic();
            } else {
                this.audioManager.playNightMusic();
            }
        }
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
                target.hasDrankLifePotion = true;
            } else if (target.attribute === "drank-death-potion") {
                target.hasDrankDeathPotion = true;
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
                if (maxTargetLength && maxTargetLength < targetsWithAttribute.length) {
                    this.play.targets.shift();
                }
            }
        },
        sideSelected(side) {
            this.play.side = side;
        },
        cardSelected(card) {
            this.play.chosenCard = card ? card._id : undefined;
        },
        vileFatherOfWolvesInfects() {
            if (this.play.targets.length) {
                this.play.targets[0].isInfected = true;
            }
        },
        stutteringJudgeRequestsAnotherVote(doesStutteringJudgeRequestAnotherVote) {
            this.play.doesJudgeRequestAnotherVote = doesStutteringJudgeRequestAnotherVote;
        },
        resetPlay() {
            this.play.votes = [];
            this.play.targets = [];
            this.play.side = undefined;
            this.play.chosenCard = undefined;
        },
        generateLastActionEvents() {
            if (this.game.history.length) {
                const lastGameHistoryEntry = this.game.history[0];
                const lastGameHistoryEntrySourceName = lastGameHistoryEntry.play.source.name;
                const { vileFatherOfWolvesPlayer } = this.game;
                if (lastGameHistoryEntry.play.action === "look") {
                    this.events.push(new GameEvent({ type: "seer-looks", targets: lastGameHistoryEntry.play.targets }));
                } else if (lastGameHistoryEntry.play.action === "elect-sheriff" || lastGameHistoryEntry.play.action === "delegate") {
                    this.events.push(new GameEvent({ type: "sheriff-elected", targets: lastGameHistoryEntry.play.targets }));
                } else if (lastGameHistoryEntry.play.action === "charm") {
                    this.events.push(new GameEvent({ type: `${lastGameHistoryEntrySourceName}-charms`, targets: lastGameHistoryEntry.play.targets }));
                } else if (lastGameHistoryEntry.play.action === "mark") {
                    this.events.push(new GameEvent({ type: `raven-marks`, targets: lastGameHistoryEntry.play.targets }));
                } else if (lastGameHistoryEntry.play.action === "eat" && lastGameHistoryEntrySourceName === "werewolves" &&
                    !!vileFatherOfWolvesPlayer && vileFatherOfWolvesPlayer.isAlive) {
                    this.events.push(new GameEvent({ type: `vile-father-of-wolves-infects`, targets: lastGameHistoryEntry.play.targets }));
                } else if (this.game.history.length && lastGameHistoryEntry.wasVotePlayWithoutDeath && !lastGameHistoryEntry.revealedPlayers) {
                    this.events.push(new GameEvent({ type: `no-death-after-votes`, targets: this.game.history[0].play.targets }));
                } else if (lastGameHistoryEntry.play.action === "choose-card") {
                    this.events.push(new GameEvent({ type: `thief-chooses-card`, targets: [{ player: this.game.originalThiefPlayer }] }));
                }
            }
        },
        generateGamePhaseEvent() {
            if (this.game.history.length && this.game.history[0].isPreFirstNightPlay && !this.game.isFirstWaitingPreFirstNightPlay) {
                return this.events.push(new GameEvent({ type: "night-falls" }));
            } else if (this.game.history.length &&
                (this.game.phase !== this.game.history[0].phase || this.game.turn !== this.game.history[0].turn)) {
                const event = this.game.phase === "day" ? new GameEvent({ type: "day-rises" }) : new GameEvent({ type: "night-falls" });
                return this.events.push(event);
            }
        },
        generatePlayerStartsGameRevealedEvents() {
            for (const player of this.game.players) {
                if (player.role.isRevealed) {
                    this.events.push(new GameEvent({ type: "player-starts-game-revealed", targets: [{ player }] }));
                }
            }
        },
        generateGameDeathAndRevealEvents() {
            if (!this.game.history.length) {
                return;
            }
            const { deadPlayers, revealedAlivePlayers, phase: previousPhase, turn: previousTurn } = this.game.history[0];
            if (this.game.phase === "day" && previousPhase === "night" ||
                previousPhase === "night" && this.game.phase === "night" && previousTurn !== this.game.turn) {
                if (!deadPlayers.length) {
                    this.events.push(new GameEvent({ type: "no-death-during-night" }));
                } else {
                    this.events.push(new GameEvent({ type: "deaths-during-night", targets: deadPlayers }));
                }
            }
            for (const deadPlayer of deadPlayers) {
                this.events.push(new GameEvent({ type: "player-dies", targets: [{ player: deadPlayer }] }));
            }
            for (const revealedPlayer of revealedAlivePlayers) {
                this.events.push(new GameEvent({ type: "player-role-revealed", targets: [{ player: revealedPlayer }] }));
            }
        },
        generateGameRoleTurnEvents() {
            this.events.push(new GameEvent({ type: `${this.game.firstWaiting.for}-turn` }));
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