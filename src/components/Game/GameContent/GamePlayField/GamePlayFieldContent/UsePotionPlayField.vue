<template>
    <div id="look-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="game.witchPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="drank-life-potion" @player-selected="playerSelected"/>
        <PlayFieldActionText :play="play" attribute="drank-death-potion" class="mt-2" @player-selected="playerSelected"/>
        <div class="row mt-2">
            <div class="col-12">
                <ul id="potion-tabs" class="nav nav-pills nav-fill">
                    <li id="life-potion-tab" class="nav-item" @click="openLifePotionPanel">
                        <a id="use-life-potion-tab" class="nav-link"
                           :class="{ active: panel === 'life-potion', disabled: game.hasWitchUsedLifePotion }" href="#">
                            <img :src="SVGs.lifePotionSVG" width="25" alt="Life Potion" class="mr-2"
                                 :class="{ 'used-potion-svg': game.hasWitchUsedLifePotion }"/>
                            <span v-html="lifePotionPanelTabText"/>
                        </a>
                    </li>
                    <li id="death-potion-tab" class="nav-item" @click="openDeathPotionPanel">
                        <a id="use-death-potion-tab" class="nav-link"
                           :class="{ active: panel === 'death-potion', disabled: game.hasWitchUsedDeathPotion }" href="#">
                            <img :src="SVGs.deathPotionSVG" width="25" alt="Death Potion" class="mr-2"
                                 :class="{ 'used-potion-svg': game.hasWitchUsedDeathPotion }"/>
                            <span v-html="deathPotionPanelTabText"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row flex-grow-1">
            <div class="col-12">
                <transition mode="out-in" name="translate-down-fade">
                    <div v-if="panel === 'life-potion'" id="use-life-potion-content" key="life-potion-panel" class="h-100">
                        <PlayerTargets :targets="game.eatenPlayers" :play="play" attribute="drank-life-potion"
                                       class="h-100" @player-selected="playerSelected"/>
                    </div>
                    <div v-else-if="panel === 'death-potion'" id="use-death-potion-content" key="death-potion-panel"
                         class="h-100">
                        <PlayerTargets :targets="alivePlayersWithoutWerewolvesTarget" :play="play" attribute="drank-death-potion"
                                       class="h-100" @player-selected="playerSelected"/>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import lifePotionSVG from "@/assets/svg/attributes/drank-life-potion.svg";
import deathPotionSVG from "@/assets/svg/attributes/drank-death-potion.svg";
import PlayerTargets from "@/components/shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";

export default {
    name: "UsePotionPlayField",
    components: { PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            SVGs: { lifePotionSVG, deathPotionSVG },
            panel: undefined,
            loadings: { lastProtectEntry: false },
            protectablePlayers: undefined,
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        useDeathPotionText() {
            const drankDeathPotionTarget = this.play.targets.find(target => target.attribute === "drank-death-potion");
            if (drankDeathPotionTarget) {
                const playerTargeted = this.game.players.find(({ _id }) => _id === drankDeathPotionTarget.player);
                return `${this.$t("UsePotionPlayField.wantsToUseDeathPotionOn")} ${playerTargeted.name}`;
            }
            return this.$t("UsePotionPlayField.doesntWantToUseDeathPotion");
        },
        lifePotionPanelTabText() {
            return this.game.hasWitchUsedLifePotion ? this.$t("UsePotionPlayField.lifePotionUsed") : this.$t("UsePotionPlayField.useLifePotionOn");
        },
        deathPotionPanelTabText() {
            return this.game.hasWitchUsedDeathPotion ? this.$t("UsePotionPlayField.deathPotionUsed") : this.$t("UsePotionPlayField.useDeathPotionOn");
        },
        alivePlayersWithoutWerewolvesTarget() {
            return this.game.alivePlayers.filter(player => !player.hasAttribute("eaten"));
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("player-selected", payload);
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
    @import "../../../../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../../../../assets/scss/variables";

    .use-potion-play-field-action-text {
        @include responsive-font-size(1rem);
    }

    .used-potion-svg {
        filter: grayscale(1);
    }

    .nav-link {
        transition: all 0.25s linear;
    }
</style>