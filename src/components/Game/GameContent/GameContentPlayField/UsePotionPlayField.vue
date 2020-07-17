<template>
    <div id="look-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :game="game" :player="game.witchPlayer" size="lg"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center use-potion-play-field-action-text">
                    <img :src="SVGs.lifePotionSVG" width="50" alt="Life Potion" class="mr-2">
                    <VRoller :default-char="useLifePotionText" :text="useLifePotionText" class="d-inline-flex"/>
                    <CancelPlayerTarget :play="play" attribute="drank-life-potion" class="ml-2" @playerSelected="playerSelected"/>
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center use-potion-play-field-action-text">
                    <img :src="SVGs.deathPotionSVG" width="50" alt="Death Potion" class="mr-2">
                    <VRoller :default-char="useDeathPotionText" :text="useDeathPotionText" class="d-inline-flex"/>
                    <CancelPlayerTarget :play="play" attribute="drank-death-potion" class="ml-2" @playerSelected="playerSelected"/>
                </h3>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item" @click="openLifePotionPanel">
                        <a class="nav-link" :class="{ active: panel === 'life-potion', disabled: game.hasWitchUsedLifePotion }"
                           id="use-life-potion-tab" href="#">
                            <img :src="SVGs.lifePotionSVG" width="25" alt="Life Potion" class="mr-2"
                                 :class="{ 'used-potion-svg': game.hasWitchUsedLifePotion }">
                            <span v-html="lifePotionPanelTabText"/>
                        </a>
                    </li>
                    <li class="nav-item" @click="openDeathPotionPanel">
                        <a class="nav-link" :class="{ active: panel === 'death-potion', disabled: game.hasWitchUsedDeathPotion }"
                           id="use-death-potion-tab" href="#">
                            <img :src="SVGs.deathPotionSVG" width="25" alt="Death Potion" class="mr-2"
                                 :class="{ 'used-potion-svg': game.hasWitchUsedDeathPotion }">
                            <span v-html="deathPotionPanelTabText"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row flex-grow-1">
            <div class="col-12">
                <transition mode="out-in" name="translate-down-fade">
                    <div v-if="panel === 'life-potion'" key="life-potion-panel" class="h-100" id="use-life-potion-content">
                        <PlayerTargets :game="game" :targets="[game.eatenPlayer]" :play="play" attribute="drank-life-potion"
                                       class="h-100" @playerSelected="playerSelected"/>
                    </div>
                    <div v-else-if="panel === 'death-potion'" key="death-potion-panel" class="h-100" id="use-death-potion-content">
                        <PlayerTargets :game="game" :targets="game.alivePlayers" :play="play" attribute="drank-death-potion"
                                       class="h-100" @playerSelected="playerSelected"/>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import PlayerCard from "../../../shared/Game/PlayerCard";
import Game from "../../../../classes/Game";
import lifePotionSVG from "../../../../assets/svg/attributes/drank-life-potion.svg";
import deathPotionSVG from "../../../../assets/svg/attributes/drank-death-potion.svg";
import PlayerTargets from "../../../shared/Game/PlayerTargets/PlayerTargets";
import CancelPlayerTarget from "../../../shared/Game/CancelPlayerTarget";

export default {
    name: "UsePotionPlayField",
    components: { CancelPlayerTarget, PlayerTargets, PlayerCard },
    props: {
        game: {
            type: Game,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            SVGs: { lifePotionSVG, deathPotionSVG },
            panel: undefined,
        };
    },
    computed: {
        useLifePotionText() {
            const drankLifePotionTarget = this.play.targets.find(target => target.attribute === "drank-life-potion");
            if (drankLifePotionTarget) {
                const playerTargeted = this.game.players.find(({ _id }) => _id === drankLifePotionTarget.player);
                return `${this.$t("UsePotionPlayField.wantsToUseLifePotionOn")} ${playerTargeted.name}`;
            } else {
                return this.$t("UsePotionPlayField.doesntWantToUseLifePotion");
            }
        },
        useDeathPotionText() {
            const drankDeathPotionTarget = this.play.targets.find(target => target.attribute === "drank-death-potion");
            if (drankDeathPotionTarget) {
                const playerTargeted = this.game.players.find(({ _id }) => _id === drankDeathPotionTarget.player);
                return `${this.$t("UsePotionPlayField.wantsToUseDeathPotionOn")} ${playerTargeted.name}`;
            } else {
                return this.$t("UsePotionPlayField.doesntWantToUseDeathPotion");
            }
        },
        lifePotionPanelTabText() {
            return this.game.hasWitchUsedLifePotion ? this.$t("UsePotionPlayField.lifePotionUsed") : this.$t("UsePotionPlayField.useLifePotionOn");
        },
        deathPotionPanelTabText() {
            return this.game.hasWitchUsedDeathPotion ? this.$t("UsePotionPlayField.deathPotionUsed") : this.$t("UsePotionPlayField.useDeathPotionOn");
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
        },
        openLifePotionPanel() {
            if (!this.game.hasWitchUsedLifePotion) {
                this.panel = "life-potion";
            }
        },
        openDeathPotionPanel() {
            if (!this.game.hasWitchUsedDeathPotion) {
                this.panel = "death-potion";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../../../assets/scss/variables";

    .use-potion-play-field-action-text {
        @include responsive-font-size(1rem);
    }

    .used-potion-svg {
        filter: grayscale(1);
    }
</style>