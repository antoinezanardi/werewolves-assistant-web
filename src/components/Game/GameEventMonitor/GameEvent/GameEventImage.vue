<template>
    <div id="game-event-image" class="d-flex flex-grow-1 justify-content-center align-items-center visible-scrollbar">
        <div v-if="isPhaseGameEvent" class="w-100 text-center">
            <transition mode="out-in" name="phase-transition">
                <i v-if="displayedPhase === 'day'" key="day" class="phase-icon fa fa-sun sun-color"
                   :class="{ 'fa-spin': phaseTransition.ended }"/>
                <i v-else key="night" class="phase-icon fa fa-moon moon-color"
                   :class="{ 'swing': phaseTransition.ended }"/>
            </transition>
        </div>
        <VueFlip v-else v-model="playersEvent.flipped" transition="0.75s" height="30vh" width="30vh">
            <template #front>
                <div class="h-100 w-100">
                    <div class="role-effect-container">
                        <RoleImage class="h-100 rounded role-image" :role="playersEvent.thumbnail.front.role.current"
                                   :class="{ 'dead-player': event.type === 'player-dies' }"/>
                        <img v-if="isEffectGameEvent && gameEventPlayers.length" :src="effectImageSource" class="effect-image"
                             :class="{ 'animate__animated animate__bounceIn animate__delay-1s': gameEventPlayers.length === 1 }" alt="Effect Image"/>
                    </div>
                    <h3 class="text-center mt-2 w-100 text-truncate" v-html="playersEvent.thumbnail.front.name"/>
                </div>
            </template>
            <template #back>
                <div class="h-100 w-100">
                    <div class="role-effect-container">
                        <RoleImage class="h-100 rounded role-image" :role="playersEvent.thumbnail.back.role.current"
                                   :class="{ 'dead-player': event.type === 'player-dies' }"/>
                        <img v-if="isEffectGameEvent && gameEventPlayers.length" :src="effectImageSource" class="effect-image"
                             :class="{ 'animate__animated animate__bounceIn animate__delay-1s': gameEventPlayers.length === 1 }" alt="Effect Image"/>
                    </div>
                    <h3 class="text-center mt-2 w-100 text-truncate" v-html="playersEvent.thumbnail.back.name"/>
                </div>
            </template>
        </VueFlip>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Player from "@/classes/Player";
import GameEvent from "@/classes/GameEvent";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";
import deadSVG from "@/assets/svg/attributes/dead.svg";
import seenSVG from "@/assets/svg/actions/look.svg";
import inLoveSVG from "@/assets/svg/attributes/in-love.svg";
import charmedSVG from "@/assets/svg/attributes/charmed.svg";
import questionMarkSVG from "@/assets/svg/misc/question-mark.svg";
import ravenMarkSVG from "@/assets/svg/attributes/raven-marked.svg";
import eatenSVG from "@/assets/svg/attributes/eaten.svg";
import voteSVG from "@/assets/svg/actions/vote.svg";
import thiefSVG from "@/assets/svg/roles/thief.svg";
import foxSVG from "@/assets/svg/roles/fox.svg";
import villagerSVG from "@/assets/svg/roles/villager.svg";

export default {
    name: "GameEventImage",
    components: { RoleImage },
    props: {
        event: {
            type: GameEvent,
            required: true,
        },
    },
    data() {
        return {
            playersEvent: {
                playerIdx: 0,
                flipped: false,
                thumbnail: {
                    front: new Player(),
                    back: new Player(),
                },
            },
            phaseTransition: {
                started: false,
                ended: false,
            },
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        isEffectGameEvent() {
            return !!this.effectImageSource;
        },
        isPhaseGameEvent() {
            return this.event.type === "night-falls" || this.event.type === "day-rises";
        },
        effectImageSource() {
            const effectGameEventTypeImageSource = {
                "sheriff-elected": sheriffSVG,
                "player-dies": deadSVG,
                "seer-looks": seenSVG,
                "cupid-charms": inLoveSVG,
                "pied-piper-charms": charmedSVG,
                "deaths-during-night": questionMarkSVG,
                "raven-marks": ravenMarkSVG,
                "vile-father-of-wolves-infects": eatenSVG,
                "player-role-revealed": seenSVG,
                "player-starts-game-revealed": seenSVG,
                "no-death-after-votes": voteSVG,
                "thief-chooses-card": thiefSVG,
                "fox-sniffs": foxSVG,
                "dog-wolf-chooses-side": this.event.side === "werewolves" ? eatenSVG : villagerSVG,
                "wild-child-joins-werewolves": eatenSVG,
            };
            return effectGameEventTypeImageSource[this.event.type];
        },
        displayedPhase() {
            if (this.game.phase === "night") {
                return this.phaseTransition.started ? "night" : "day";
            }
            return this.phaseTransition.started ? "day" : "night";
        },
        gameEventPlayers() {
            if (this.isPhaseGameEvent) {
                return [];
            }
            const { firstWaiting, alivePlayersExpectedToPlay, playersExpectedToPlay } = this.game;
            const deadPlayerActions = ["delegate", "shoot", "ban-voting"];
            const allPlayersEvents = ["game-starts", "deaths-during-night", "game-ends"];
            if (this.event.type === "no-death-during-night") {
                return this.game.alivePlayers;
            } else if (allPlayersEvents.includes(this.event.type)) {
                return this.game.players;
            } else if (this.isEffectGameEvent || this.event.type === "bear-growls" || this.event.type === "bear-stays-calm") {
                return this.event.targets.map(({ player }) => player);
            }
            return deadPlayerActions.includes(firstWaiting.to) ? playersExpectedToPlay : alivePlayersExpectedToPlay;
        },
    },
    created() {
        if (this.isPhaseGameEvent) {
            this.triggerPhaseTransition();
        } else {
            this.setPlayersExpectedToPlayFlip();
        }
    },
    methods: {
        setPlayersExpectedToPlayFlip() {
            this.playersEvent.thumbnail.front = this.gameEventPlayers.length ? this.gameEventPlayers[0] : new Player();
            if (this.gameEventPlayers.length > 1) {
                setInterval(() => {
                    if (this.playersEvent.playerIdx + 1 === this.gameEventPlayers.length) {
                        this.playersEvent.playerIdx = 0;
                    } else {
                        this.playersEvent.playerIdx += 1;
                    }
                    const player = this.gameEventPlayers[this.playersEvent.playerIdx];
                    if (!this.playersEvent.flipped) {
                        this.playersEvent.thumbnail.back = player;
                        this.playersEvent.flipped = true;
                    } else {
                        this.playersEvent.thumbnail.front = player;
                        this.playersEvent.flipped = false;
                    }
                }, 1000);
            }
        },
        triggerPhaseTransition() {
            setTimeout(() => {
                this.phaseTransition.started = true;
            }, 1000);
            setTimeout(() => {
                this.phaseTransition.ended = true;
            }, 2500);
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../../../node_modules/bootstrap/scss/bootstrap-grid";

    .phase-icon {
        font-size: 7rem;
    }

    @keyframes swing {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(-20deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    .swing {
        animation: swing ease-in-out 3s infinite;
    }

    .phase-transition-enter-active, .phase-transition-leave-active {
        transition: all 0.75s ease;
    }

    .phase-transition-enter, .phase-transition-leave-to {
        opacity: 0;
        transform: translateY(35px);
    }

    .role-image {
        border: 5px solid #303030;
        border-radius: 5px;
        height: 30vh;
        width: 30vh;
    }

    .role-effect-container {
        position: relative;

        img.dead-player {
            filter: grayscale(1);
        }

        .effect-image {
            position: absolute;
            height: 40%;
            bottom: 5%;
            right: 5%;
        }
    }
</style>