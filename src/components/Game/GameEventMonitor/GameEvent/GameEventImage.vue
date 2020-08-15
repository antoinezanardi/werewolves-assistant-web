<template>
    <div id="game-event-image" class="d-flex flex-grow-1 justify-content-center align-items-center">
        <VueFlip v-if="event.type === 'game-starts'" id="game-starts-image" transition="0.75s"
                 height="30vh" width="30vh" v-model="gameStartsEvent.flipped">
            <template v-slot:front>
                <RoleImage class="h-100 rounded" :role="gameStartsEvent.thumbnail.front"/>
            </template>
            <template v-slot:back>
                <RoleImage class="h-100 rounded" :role="gameStartsEvent.thumbnail.back"/>
            </template>
        </VueFlip>
        <div v-else-if="isPhaseGameEvent" class="w-100 text-center">
            <transition mode="out-in" name="phase-transition">
                <i v-if="phaseTransition.displayedPhase === 'day'" key="day" class="phase-icon fa fa-sun sun-color"
                   :class="{ 'fa-spin': phaseTransition.transitionEnded }"/>
                <i v-else key="night" class="phase-icon fa fa-moon moon-color"
                   :class="{ 'swing': phaseTransition.transitionEnded }"/>
            </transition>
        </div>
        <div v-else-if="isEffectGameEvent" class="d-flex flex-grow-1 justify-content-center align-items-center flex-column">
            <div id="role-effect-container">
                <RoleImage class="animate__animated animate__flipInY animate__fast role-image"
                       :role="event.targets[0].player.role.current"
                       :class="{ 'dead-player': this.event.type === 'player-dies' }"/>
                <img id="effect-image" :src="effectImageSource"
                     class="animate__animated animate__bounceIn animate__delay-1s" alt="Effect Image"/>
            </div>
            <h3 class="text-center mt-2" v-html="event.targets[0].player.name"/>
        </div>
        <div v-else class="d-flex flex-grow-1 justify-content-center align-items-center flex-column">
            <RoleImage class="animate__animated animate__flipInY animate__fast role-image"
                       :role="game.firstWaiting.for"/>
        </div>
    </div>
</template>

<script>
import GameEvent from "@/classes/GameEvent";
import Game from "@/classes/Game";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";
import deadSVG from "@/assets/svg/attributes/dead.svg";
import seenSVG from "@/assets/svg/actions/look.svg";

export default {
    name: "GameEventImage",
    components: { RoleImage },
    props: {
        game: {
            type: Game,
            required: true,
        },
        event: {
            type: GameEvent,
            required: true,
        },
    },
    data() {
        return {
            gameStartsEvent: {
                playerIdx: 0,
                flipped: false,
                thumbnail: {
                    front: undefined,
                    back: undefined,
                },
            },
            phaseTransition: {
                displayedPhase: this.game.phase === "day" ? "night" : "day",
                transitionEnded: false,
            },
        };
    },
    computed: {
        isEffectGameEvent() {
            const effectGameEventTypes = ["sheriff-elected", "player-dies", "seer-looks"];
            return effectGameEventTypes.includes(this.event.type);
        },
        isPhaseGameEvent() {
            return this.event.type === "night-falls" || this.event.type === "day-rises";
        },
        effectImageSource() {
            const effectGameEventTypeImageSource = {
                "sheriff-elected": sheriffSVG,
                "player-dies": deadSVG,
                "seer-looks": seenSVG,
            };
            return effectGameEventTypeImageSource[this.event.type];
        },

    },
    created() {
        if (this.event.type === "game-starts") {
            this.setGameStartsInterval();
        } else if (this.event.type === "night-falls" || this.event.type === "day-rises") {
            this.triggerPhaseTransition();
        }
    },
    methods: {
        setGameStartsInterval() {
            this.gameStartsEvent.thumbnail.back = this.game.players[0].role.current;
            setInterval(() => {
                this.gameStartsEvent.playerIdx = this.gameStartsEvent.playerIdx + 1 === this.game.players.length ? 0 : this.gameStartsEvent.playerIdx + 1;
                const player = this.game.players[this.gameStartsEvent.playerIdx];
                if (!this.gameStartsEvent.flipped) {
                    this.gameStartsEvent.thumbnail.back = player.role.current;
                    this.gameStartsEvent.flipped = true;
                } else {
                    this.gameStartsEvent.thumbnail.front = player.role.current;
                    this.gameStartsEvent.flipped = false;
                }
            }, 1500);
        },
        triggerPhaseTransition() {
            setTimeout(() => {
                this.phaseTransition.displayedPhase = this.phaseTransition.displayedPhase === "night" ? "day" : "night";
            }, 1000);
            setTimeout(() => {
                this.phaseTransition.transitionEnded = true;
            }, 2500);
        },
    },
};
</script>

<style lang="scss" scoped>
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
        height: 20vh;
    }

    #role-effect-container {
        position: relative;

        img.dead-player {
            filter: grayscale(1);
        }

        #effect-image {
            position: absolute;
            height: 40%;
            bottom: 5%;
            right: 5%;
        }
    }
</style>