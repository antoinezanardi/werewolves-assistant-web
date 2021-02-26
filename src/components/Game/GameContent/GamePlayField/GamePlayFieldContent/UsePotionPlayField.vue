<template>
    <div id="look-play-field" class="d-flex flex-column">
        <GamePlayAlerts :past-events="pastEvents"/>
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="game.witchPlayer" size="lg"/>
            </div>
        </div>
        <div class="row justify-content-center mb-2">
            <PlayFieldActionText id="use-life-potion-play-field-action-text" :play="play" attribute="drank-life-potion" class="col-lg-6"
                                 @player-selected="playerSelected"/>
            <PlayFieldActionText id="use-death-potion-play-field-action-text" :play="play" attribute="drank-death-potion" class="col-lg-6"
                                 @player-selected="playerSelected"/>
        </div>
        <div class="h-100 d-flex flex-grow-1 flex-column">
            <div class="row">
                <div class="col-12">
                    <ul id="potion-tabs" class="nav nav-pills nav-fill">
                        <li id="life-potion-tab" class="nav-item" @click="openLifePotionPanel">
                            <a id="use-life-potion-tab" class="nav-link"
                               :class="{ active: panel === 'life-potion', disabled: pastEvents.hasWithUsedLifePotion }" href="#">
                                <img :src="SVGs.lifePotionSVG" width="25" alt="Life Potion" class="mr-2"
                                     :class="{ 'used-potion-svg': pastEvents.hasWithUsedLifePotion }"/>
                                <span v-html="lifePotionPanelTabText"/>
                            </a>
                        </li>
                        <li id="death-potion-tab" class="nav-item" @click="openDeathPotionPanel">
                            <a id="use-death-potion-tab" class="nav-link"
                               :class="{ active: panel === 'death-potion', disabled: pastEvents.hasWithUsedDeathPotion }" href="#">
                                <img :src="SVGs.deathPotionSVG" width="25" alt="Death Potion" class="mr-2"
                                     :class="{ 'used-potion-svg': pastEvents.hasWithUsedDeathPotion }"/>
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
    </div>
</template>

<script>
import { scrollTo } from "vue-scrollto";
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import lifePotionSVG from "@/assets/svg/attributes/drank-life-potion.svg";
import deathPotionSVG from "@/assets/svg/attributes/drank-death-potion.svg";
import PlayerTargets from "@/components/shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";
import GamePlayAlerts from "@/components/shared/Game/GamePlayAlerts/GamePlayAlerts";

export default {
    name: "UsePotionPlayField",
    components: { GamePlayAlerts, PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
        pastEvents: {
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
            const { hasWitchUsedLifePotion } = this.pastEvents;
            return hasWitchUsedLifePotion ? this.$t("UsePotionPlayField.lifePotionUsed") : this.$t("UsePotionPlayField.useLifePotionOn");
        },
        deathPotionPanelTabText() {
            const { hasWithUsedDeathPotion } = this.pastEvents;
            return hasWithUsedDeathPotion ? this.$t("UsePotionPlayField.deathPotionUsed") : this.$t("UsePotionPlayField.useDeathPotionOn");
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
            const { hasWitchUsedLifePotion } = this.pastEvents;
            if (!hasWitchUsedLifePotion) {
                this.panel = "life-potion";
                scrollTo("#life-potion-tab", 500, { container: "#game-content-play-field" });
            }
        },
        openDeathPotionPanel() {
            const { hasWithUsedDeathPotion } = this.pastEvents;
            if (!hasWithUsedDeathPotion) {
                this.panel = "death-potion";
                scrollTo("#death-potion-tab", 500, { container: "#game-content-play-field" });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .used-potion-svg {
        filter: grayscale(1);
    }
</style>