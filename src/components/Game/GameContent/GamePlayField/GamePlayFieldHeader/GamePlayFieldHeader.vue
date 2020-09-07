<template>
    <div id="game-content-header">
        <div class="row align-items-center">
            <div id="game-phase" class="col-lg-2 col-3 font-weight-bold text-center">
                <transition name="translate-down-fade" mode="out-in">
                    <div :key="game.phase" class="fa text-center d-block pt-2" :class="gamePhaseClasses"/>
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
            <div class="col-lg-2 col-3 d-flex flex-column justify-content-center align-items-center">
                <div id="game-waiting-card-container">
                    <VueFlip v-model="gameWaitingCard.flipped" height="50px" width="50px">
                        <template #front>
                            <img id="game-waiting-card-front" :src="gameWaitingCard.thumbnail.front" class="img-fluid"
                                 alt="Game Waiting Card Front"/>
                        </template>
                        <template #back>
                            <img id="game-waiting-card-back" :src="gameWaitingCard.thumbnail.back"
                                 class="img-fluid" alt="Game Waiting Card Back"/>
                        </template>
                    </VueFlip>
                    <WhatToDoButton id="what-to-do-button" @click.native="$emit('startTutorial')"/>
                </div>
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
import { mapGetters } from "vuex";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";
import eatenSVG from "@/assets/svg/attributes/eaten.svg";
import drankDeathPotionSVG from "@/assets/svg/attributes/drank-death-potion.svg";
import lookSVG from "@/assets/svg/actions/look.svg";
import shootSVG from "@/assets/svg/actions/shoot.svg";
import voteSVG from "@/assets/svg/actions/vote.svg";
import settleVotesSVG from "@/assets/svg/actions/settle-votes.svg";
import protectedSVG from "@/assets/svg/attributes/protected.svg";
import ravenMarkedSVG from "@/assets/svg/attributes/raven-marked.svg";
import guardCard from "@/assets/img/roles/guard.png";
import hunterCard from "@/assets/img/roles/hunter.png";
import ravenCard from "@/assets/img/roles/raven.png";
import seerCard from "@/assets/img/roles/seer.png";
import villagerCard from "@/assets/img/roles/villager.png";
import werewolfCard from "@/assets/img/roles/werewolf.png";
import witchCard from "@/assets/img/roles/witch.png";
import sheriffCard from "@/assets/img/attributes/sheriff.png";
import backCard from "@/assets/img/roles/back.png";
import WhatToDoButton from "@/components/shared/Game/WhatToDoButton/WhatToDoButton";

export default {
    name: "GamePlayFieldHeader",
    components: { WhatToDoButton },
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
                    front: backCard,
                    back: backCard,
                },
            },
        };
    },
    computed: {
        ...mapGetters("game", {
            game: "game",
        }),
        gamePhaseClasses() {
            return this.game.phase === "day" ? "fa-sun sun-color" : "fa-moon moon-color";
        },
        gamePhaseText() {
            return this.game.phase === "day" ? this.$t("GamePlayFieldHeader.day") : this.$t("GamePlayFieldHeader.night");
        },
        gamePhaseLabel() {
            return `${this.gamePhaseText} ${this.game.turn}`;
        },
        gameWaitingText() {
            const { firstWaiting } = this.game;
            return this.$t(`GamePlayFieldHeader.waiting.${firstWaiting.for}.${firstWaiting.to}`);
        },
        gameWaitingIcon() {
            const { firstWaiting } = this.game;
            return this.actions[firstWaiting.to].icon;
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
};
</script>

<style lang="scss" scoped>
    @import "../../../../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../../../../assets/scss/variables";

    #game-waiting-label {
        @include font-size(1.5rem);
    }

    #game-phase {
        @include font-size(1.15rem);
    }

    #game-waiting-icon {
        height: 50px;
    }

    #game-waiting-card-container {
        position: relative;
    }

    #what-to-do-button {
        position: absolute;
        top: -15px;
        right: -30%;
    }
</style>