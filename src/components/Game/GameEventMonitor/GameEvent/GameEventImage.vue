<template>
    <div id="game-event-image" class="h-100 d-flex justify-content-center align-items-center">
        <VueFlip v-if="event.type === 'game-starts'" id="game-starts-image" transition="0.75s"
                 height="50%" width="100%" v-model="gameStartsEvent.flipped">
            <template v-slot:front>
                <RoleImage class="h-100" :role="gameStartsEvent.thumbnail.front"/>
            </template>
            <template v-slot:back>
                <RoleImage class="h-100" :role="gameStartsEvent.thumbnail.back"/>
            </template>
        </VueFlip>
        <div v-else-if="event.type === 'night-falls' || event.type === 'day-rises'" class="w-100 text-center">
            <transition mode="out-in" name="phase-transition">
                <i v-if="phaseTransition.displayedPhase === 'day'" key="day" class="phase-icon fa fa-sun sun-color"
                   :class="{ 'fa-spin': phaseTransition.transitionEnded }"/>
                <i v-else key="night" class="phase-icon fa fa-moon moon-color"
                   :class="{ 'swing': phaseTransition.transitionEnded }"/>
            </transition>
        </div>
        <div v-else-if="event.type === 'sheriff-elected'" id="role-effect-container" class="h-50">
            <RoleImage class="h-100" :role="event.targets[0].player.role.current"/>
            <img id="effect-image" :src="attributeImageSource" alt="Effect Image"/>
        </div>
    </div>
</template>

<script>
import GameEvent from "@/classes/GameEvent";
import Game from "@/classes/Game";
import RoleImage from "@/components/shared/Game/RoleImage";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";

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
        attributeImageSource() {
            return sheriffSVG;
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
    @import "../../../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../../../assets/scss/variables";

    .phase-icon {
        @include font-size(7rem);
    }

    @keyframes swing {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(-20deg);
        }
        100%{
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

    #role-effect-container {
        position: relative;

        #effect-image {
            position: absolute;
            height: 40%;
            bottom: 5%;
            right: 5%;
        }
    }
</style>