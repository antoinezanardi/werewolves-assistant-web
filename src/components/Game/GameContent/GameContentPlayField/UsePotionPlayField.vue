<template>
    <div id="look-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :game="game" :player="game.witchPlayer" size="lg"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    <img :src="SVGs.lifePotionSVG" width="50" alt="Life Potion" class="mr-2">
                    <VRoller :default-char="useLifePotionText" :text="useLifePotionText" class="d-inline-flex"/>
                    <CancelPlayerTarget :play="play" attribute="drank-life-potion" class="ml-2" @playerSelected="playerSelected"/>
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    <img :src="SVGs.deathPotionSVG" width="50" alt="Death Potion" class="mr-2">
                    <VRoller :default-char="useDeathPotionText" :text="useDeathPotionText" class="d-inline-flex"/>
                    <CancelPlayerTarget :play="play" attribute="drank-death-potion" class="ml-2" @playerSelected="playerSelected"/>
                </h3>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12">
                <ul class="nav nav-pills nav-fill">
                    <li class="nav-item" @click="panel = 'life-potion'">
                        <a class="nav-link" :class="{ active: panel === 'life-potion' }" id="use-life-potion-tab" href="#">
                            <img :src="SVGs.lifePotionSVG" width="25" alt="Life Potion" class="mr-2">
                            <span v-html="$t('UsePotionPlayField.useLifePotionOn')"/>
                        </a>
                    </li>
                    <li class="nav-item" @click="panel = 'death-potion'">
                        <a class="nav-link" :class="{ active: panel === 'death-potion' }" id="use-death-potion-tab" href="#">
                            <img :src="SVGs.deathPotionSVG" width="25" alt="Death Potion" class="mr-2">
                            <span v-html="$t('UsePotionPlayField.useDeathPotionOn')"/>
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
    },
    methods: {
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
        },
    },
};
</script>

<style scoped>

</style>