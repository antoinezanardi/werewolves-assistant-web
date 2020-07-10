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
                    <VRoller :defaultChar="useLifePotionText" :text="useLifePotionText" class="d-inline"/>
                </h3>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    <img :src="SVGs.deathPotionSVG" width="50" alt="Death Potion" class="mr-2">
                    <VRoller :defaultChar="useDeathPotionText" :text="useDeathPotionText" class="d-inline"/>
                </h3>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12">
                <ul class="nav nav-pills nav-fill" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" id="use-life-potion-tab" data-toggle="pill" href="#use-life-potion-content" role="tab">
                            <img :src="SVGs.lifePotionSVG" width="25" alt="Life Potion" class="mr-2">
                            <span v-html="$t('UsePotionPlayField.useLifePotionOn')"/>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="use-death-potion-tab" data-toggle="pill" href="#use-death-potion-content" role="tab">
                            <img :src="SVGs.deathPotionSVG" width="25" alt="Death Potion" class="mr-2">
                            <span v-html="$t('UsePotionPlayField.useDeathPotionOn')"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="row flex-grow-1">
            <div class="col-12">
                <div class="tab-content h-100">
                    <div class="tab-pane fade show h-100" id="use-life-potion-content" role="tabpanel">
                        <PlayerTargets :game="game" :targets="[game.eatenPlayer]" class="h-100" @playerSelected="playerSelected"/>
                    </div>
                    <div class="tab-pane fade show h-100" id="use-death-potion-content" role="tabpanel">
                        <PlayerTargets :game="game" :targets="game.alivePlayers" class="h-100" @playerSelected="playerSelected"/>
                    </div>
                </div>
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

export default {
    name: "UsePotionPlayField",
    components: { PlayerTargets, PlayerCard },
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
        };
    },
    computed: {
        useLifePotionText() {
            return this.$t("UsePotionPlayField.doesntWantToUseLifePotion");
        },
        useDeathPotionText() {
            return this.$t("UsePotionPlayField.doesntWantToUseDeathPotion");
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