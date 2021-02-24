<template>
    <div id="game-content-header">
        <div class="row align-items-center">
            <div id="game-phase" class="col-lg-2 col-3 font-weight-bold text-center">
                <transition name="translate-down-fade" mode="out-in">
                    <div :key="game.phase" class="fa text-center d-block pt-2" :class="gamePhaseClasses"/>
                </transition>
                <div class="text-center mt-2" v-html="gamePhaseLabel"/>
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
                    <RoleImage :role="gameWaitingRole"/>
                    <WhatToDoButton id="what-to-do-button" @click.native="$emit('start-tutorial')"/>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-10 col-12">
                <hr class="bg-dark mt-2 mb-0"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import WhatToDoButton from "@/components/shared/Game/WhatToDoButton/WhatToDoButton";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";
import eatenSVG from "@/assets/svg/attributes/eaten.svg";
import drankDeathPotionSVG from "@/assets/svg/attributes/drank-death-potion.svg";
import lookSVG from "@/assets/svg/actions/look.svg";
import shootSVG from "@/assets/svg/actions/shoot.svg";
import voteSVG from "@/assets/svg/actions/vote.svg";
import settleVotesSVG from "@/assets/svg/actions/settle-votes.svg";
import protectedSVG from "@/assets/svg/attributes/protected.svg";
import ravenMarkedSVG from "@/assets/svg/attributes/raven-marked.svg";
import chooseSideSVG from "@/assets/svg/actions/choose-side.svg";
import charmSVG from "@/assets/svg/actions/charm.svg";
import inLoveSVG from "@/assets/svg/attributes/in-love.svg";
import twoSistersSVG from "@/assets/svg/roles/two-sisters.svg";
import threeBrothersPNG from "@/assets/img/roles/three-brothers.png";
import worshipedSVG from "@/assets/svg/attributes/worshiped.svg";
import bigBadWolfSVG from "@/assets/svg/roles/big-bad-wolf.svg";
import charmedSVG from "@/assets/svg/attributes/charmed.svg";
import cantVoteSVG from "@/assets/svg/attributes/cant-vote.svg";
import thiefSVG from "@/assets/svg/roles/thief.svg";
import stutteringJudgeSVG from "@/assets/svg/roles/stuttering-judge.svg";

export default {
    name: "GamePlayFieldHeader",
    components: { RoleImage, WhatToDoButton },
    // eslint-disable-next-line max-lines-per-function
    data() {
        return {
            actions: {
                "seer": {
                    look: {
                        icon: lookSVG,
                        role: "seer",
                    },
                },
                "werewolves": {
                    eat: {
                        icon: eatenSVG,
                        role: "werewolf",
                    },
                },
                "witch": {
                    "use-potion": {
                        icon: drankDeathPotionSVG,
                        role: "witch",
                    },
                },
                "guard": {
                    protect: {
                        icon: protectedSVG,
                        role: "guard",
                    },
                },
                "hunter": {
                    shoot: {
                        icon: shootSVG,
                        role: "hunter",
                    },
                },
                "raven": {
                    mark: {
                        icon: ravenMarkedSVG,
                        role: "raven",
                    },
                },
                "all": {
                    "vote": {
                        icon: voteSVG,
                        role: "villager",
                    },
                    "elect-sheriff": {
                        icon: sheriffSVG,
                        role: "villager",
                    },
                },
                "sheriff": {
                    "delegate": {
                        icon: sheriffSVG,
                        role: "sheriff",
                    },
                    "settle-votes": {
                        icon: settleVotesSVG,
                        role: "sheriff",
                    },
                },
                "dog-wolf": {
                    "choose-side": {
                        icon: chooseSideSVG,
                        role: "dog-wolf",
                    },
                },
                "cupid": {
                    charm: {
                        icon: charmSVG,
                        role: "cupid",
                    },
                },
                "lovers": {
                    "meet-each-other": {
                        icon: inLoveSVG,
                        role: "cupid",
                    },
                },
                "two-sisters": {
                    "meet-each-other": {
                        icon: twoSistersSVG,
                        role: "two-sisters",
                    },
                },
                "three-brothers": {
                    "meet-each-other": {
                        icon: threeBrothersPNG,
                        role: "three-brothers",
                    },
                },
                "wild-child": {
                    "choose-model": {
                        icon: worshipedSVG,
                        role: "wild-child",
                    },
                },
                "big-bad-wolf": {
                    eat: {
                        icon: bigBadWolfSVG,
                        role: "big-bad-wolf",
                    },
                },
                "pied-piper": {
                    charm: {
                        icon: charmedSVG,
                        role: "pied-piper",
                    },
                },
                "charmed": {
                    "meet-each-other": {
                        icon: charmedSVG,
                        role: "pied-piper",
                    },
                },
                "scapegoat": {
                    "ban-voting": {
                        icon: cantVoteSVG,
                        role: "scapegoat",
                    },
                },
                "thief": {
                    "choose-card": {
                        icon: thiefSVG,
                        role: "thief",
                    },
                },
                "stuttering-judge": {
                    "choose-sign": {
                        icon: stutteringJudgeSVG,
                        role: "stuttering-judge",
                    },
                },
            },
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
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
            if (this.actions[firstWaiting.for] && this.actions[firstWaiting.for][firstWaiting.to]) {
                return this.actions[firstWaiting.for][firstWaiting.to].icon;
            }
            return null;
        },
        gameWaitingRole() {
            const { firstWaiting } = this.game;
            if (this.actions[firstWaiting.for] && this.actions[firstWaiting.for][firstWaiting.to]) {
                return this.actions[firstWaiting.for][firstWaiting.to].role;
            }
            return null;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../../../../node_modules/bootstrap/scss/bootstrap-grid";
    @import "../../../../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../../../../assets/scss/variables";

    #game-waiting-label {
        font-size: 1rem;
        @include media-breakpoint-up(md) {
            font-size: 1.5rem;
        }
    }

    #game-phase {
        @include font-size(1.15rem);
    }

    #game-waiting-icon {
        height: 50px;
    }

    #game-waiting-card-container {
        position: relative;
        height: 50px;
        width: 50px;
    }

    #what-to-do-button {
        position: absolute;
        top: -15px;
        right: -30%;
    }
</style>