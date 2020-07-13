<template>
    <div id="game-content-header">
        <div class="row align-items-center">
            <div id="game-phase" class="col-2 font-weight-bold">
                <div class="fa mr-2 text-center d-block" :class="gamePhaseClasses"/>
                <VRoller class="text-center mt-2" :text="gamePhaseLabel" :defaultChar="gamePhaseLabel"/>
            </div>
            <div class="col-8">
                <h1 class="mb-0 d-flex justify-content-center align-items-center pb-0">
                    <img id="game-waiting-icon" :src="gameWaitingIcon" class="img-fluid mr-3" alt="Game Waiting Icon"/>
                    <span class="text-center" v-html="gameWaitingText"/>
                </h1>
            </div>
            <div class="col-2 text-right">
                <img id="game-waiting-card" :src="gameWaitingCard" class="img-fluid" alt="Game Waiting Card"/>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-8">
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
        gameWaitingCard() {
            const { firstWaiting } = this.game;
            return this.actions[firstWaiting.to].card;
        },
    },
};
</script>

<style scoped>
    #game-content-header {
        height: 75px;
    }

    #game-phase {
        font-size: 1.5rem;
    }

    #game-waiting-icon {
        height: 50px;
    }

    #game-waiting-card {
        height: 50px;
    }

    .sun-color {
        color: #FFE321
    }

    .moon-color {
        color: #96C8FF;
    }
</style>