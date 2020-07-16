<template>
    <div id="game-content-header">
        <div class="row align-items-center">
            <div id="game-phase" class="col-lg-2 col-3 font-weight-bold text-center">
                <transition name="translate-down-fade" mode="out-in">
                    <div class="fa text-center d-block pt-2" :key="game.phase" :class="gamePhaseClasses"/>
                </transition>
                <VRoller class="text-center mt-2" :text="gamePhaseLabel" :default-char="gamePhaseLabel"/>
            </div>
            <div class="col-lg-8 col-6">
                <transition name="translate-down-fade" mode="out-in">
                    <h3 id="game-waiting-label" :key="gameWaitingText" class="mb-0 d-flex justify-content-center align-items-center pb-0">
                        <img id="game-waiting-icon" :src="gameWaitingIcon" class="img-fluid mr-2" alt="Game Waiting Icon"/>
                        <span class="text-center" v-html="gameWaitingText"/>
                    </h3>
                </transition>
            </div>
            <div class="col-lg-2 col-3 text-right">
                <VueFlip height="50px" width="50px" v-model="gameWaitingCard.flipped">
                    <template v-slot:front>
                        <img id="game-waiting-card-front" :src="gameWaitingCard.thumbnail.front" class="img-fluid" alt="Game Waiting Card Front"/>
                    </template>
                    <template v-slot:back>
                        <img id="game-waiting-card-back" :src="gameWaitingCard.thumbnail.back" class="img-fluid" alt="Game Waiting Card Back"/>
                    </template>
                </VueFlip>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-8 col-12">
                <hr class="bg-dark"/>
            </div>
        </div>
    </div>
</template>

<script>
import Game from "../../../../classes/Game";
import sheriffSVG from "../../../../assets/svg/attributes/sheriff.svg";
import eatenSVG from "../../../../assets/svg/attributes/eaten.svg";
import drankDeathPotionSVG from "../../../../assets/svg/attributes/drank-death-potion.svg";
import lookSVG from "../../../../assets/svg/actions/look.svg";
import shootSVG from "../../../../assets/svg/actions/shoot.svg";
import voteSVG from "../../../../assets/svg/actions/vote.svg";
import settleVotesSVG from "../../../../assets/svg/actions/settle-votes.svg";
import protectedSVG from "../../../../assets/svg/attributes/protected.svg";
import ravenMarkedSVG from "../../../../assets/svg/attributes/raven-marked.svg";
import guardCard from "../../../../assets/img/roles/guard.png";
import hunterCard from "../../../../assets/img/roles/hunter.png";
import ravenCard from "../../../../assets/img/roles/raven.png";
import seerCard from "../../../../assets/img/roles/seer.png";
import villagerCard from "../../../../assets/img/roles/villager.png";
import werewolfCard from "../../../../assets/img/roles/werewolf.png";
import witchCard from "../../../../assets/img/roles/witch.png";
import sheriffCard from "../../../../assets/img/attributes/sheriff.png";

export default {
    name: "GameContentHeader",
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    // eslint-disable-next-line max-lines-per-function
    data() {
        return {
            actions: {
                "eat": {
                    icon: eatenSVG,
                    card: werewolfCard,
                },
                "use-potion": {
                    icon: drankDeathPotionSVG,
                    card: witchCard,
                },
                "look": {
                    icon: lookSVG,
                    card: seerCard,
                },
                "protect": {
                    icon: protectedSVG,
                    card: guardCard,
                },
                "shoot": {
                    icon: shootSVG,
                    card: hunterCard,
                },
                "mark": {
                    icon: ravenMarkedSVG,
                    card: ravenCard,
                },
                "elect-sheriff": {
                    icon: sheriffSVG,
                    card: villagerCard,
                },
                "vote": {
                    icon: voteSVG,
                    card: villagerCard,
                },
                "delegate": {
                    icon: sheriffSVG,
                    card: sheriffCard,
                },
                "settle-votes": {
                    icon: settleVotesSVG,
                    card: sheriffCard,
                },
            },
            gameWaitingCard: {
                flipped: false,
                thumbnail: {
                    front: undefined,
                    back: undefined,
                },
            },
        };
    },
    computed: {
        gamePhaseClasses() {
            return this.game.phase === "day" ? "fa-sun sun-color" : "fa-moon moon-color";
        },
        gamePhaseText() {
            return this.game.phase === "day" ? this.$t("GameContentHeader.day") : this.$t("GameContentHeader.night");
        },
        gamePhaseLabel() {
            return `${this.gamePhaseText} ${this.game.turn}`;
        },
        gameWaitingText() {
            const { firstWaiting } = this.game;
            return this.$t(`GameContentHeader.waiting.${firstWaiting.for}.${firstWaiting.to}`);
        },
        gameWaitingIcon() {
            const { firstWaiting } = this.game;
            return this.actions[firstWaiting.to].icon;
        },
    },
    methods: {
        changeGameWaitingCard(newWaitingTo) {
            if (!this.gameWaitingCard.flipped) {
                this.gameWaitingCard.thumbnail.back = this.actions[newWaitingTo.to].card;
                this.gameWaitingCard.flipped = true;
            } else {
                this.gameWaitingCard.thumbnail.front = this.actions[newWaitingTo.to].card;
                this.gameWaitingCard.flipped = false;
            }
        },
    },
    watch: {
        "game.firstWaiting": {
            handler(newFirstWaiting) {
                this.changeGameWaitingCard(newFirstWaiting);
            },
            deep: true,
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../../../assets/scss/variables";

    #game-waiting-label {
        @include font-size(1.5rem);
    }

    #game-phase {
        @include font-size(1rem);
    }

    #game-waiting-icon {
        height: 50px;
    }

    .sun-color {
        color: #FFE321
    }

    .moon-color {
        color: #96C8FF;
    }
</style>