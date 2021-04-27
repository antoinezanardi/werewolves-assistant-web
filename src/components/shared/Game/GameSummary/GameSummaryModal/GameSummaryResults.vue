<template>
    <div id="game-summary-results">
        <h4 class="text-center mt-2">
            <i class="fa fa-trophy text-warning mr-2"/>
            <span v-html="$t('GameSummaryResults.gameResults')"/>
        </h4>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="col-12 text-center">
                <GameResult/>
            </div>
        </div>
        <hr class="bg-dark"/>
        <div class="row justify-content-around">
            <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center text-center">
                <img :src="game.won.by === 'villagers' ? SVGs.trophy : SVGs.dead" class="pb-3 mr-4"
                     width="75" alt="Result"/>
                <div class="flex-grow-1">
                    <h3 v-html="$t('GameSummaryResults.villagers')"/>
                    <AliveVillagers/>
                </div>
            </div>
            <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center text-center">
                <img :src="game.won.by === 'werewolves' ? SVGs.trophy : SVGs.dead" class="pb-3 mr-4"
                     width="75" alt="Result"/>
                <div class="flex-grow-1">
                    <h3 v-html="$t('GameSummaryResults.werewolves')"/>
                    <AliveWerewolves/>
                </div>
            </div>
        </div>
        <div v-if="game.additionalCards.length">
            <hr class="bg-dark"/>
            <h4 class="text-center">
                <i class="fa fa-chess mr-2 text-info"/>
                <span v-html="$t('GameSummaryResults.additionalCards')"/>
            </h4>
            <hr class="bg-dark"/>
            <div v-if="game.thiefAdditionalCards.length">
                <h5 class="text-center">
                    <RoleImage class="additional-card-recipient mr-2" role="thief"/>
                    <span v-html="$tc('GameSummaryResults.thiefAdditionalCards', game.thiefAdditionalCards.length)"/>
                </h5>
                <hr class="bg-dark"/>
                <div class="row justify-content-center">
                    <div v-for="card of game.thiefAdditionalCards" :key="card._id"
                         class="col-lg-2 col-6 d-flex flex-column align-items-center text-center">
                        <RoleImage :role="card.role" class="additional-card-image mt-2"/>
                        <RoleText prefix="a" :role="card.role"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import GameResult from "@/components/shared/Game/GameResult/GameResult";
import AliveVillagers from "@/components/shared/Game/Sides/AliveVillagers";
import AliveWerewolves from "@/components/shared/Game/Sides/AliveWerewolves";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";
import trophy from "@/assets/svg/game/trophy.svg";
import dead from "@/assets/svg/attributes/dead.svg";

export default {
    name: "GameSummaryResults",
    components: { RoleText, RoleImage, AliveWerewolves, AliveVillagers, GameResult },
    data() {
        return { SVGs: { trophy, dead } };
    },
    computed: { ...mapGetters("game", { game: "game" }) },
};
</script>

<style scoped lang="scss">
    .additional-card-recipient {
        width: 30px;
        height: auto;
    }

    .additional-card-image {
        width: 100px;
        height: auto;
    }
</style>