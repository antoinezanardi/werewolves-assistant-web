<template>
    <div id="game-winners" class="d-flex flex-column justify-content-center">
        <div class="row">
            <div class="col-12 text-center">
                <img :src="SVGs.trophy" width="100" alt="Trophy"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 v-html="winnersText"/>
            </div>
        </div>
    </div>
</template>

<script>
import trophy from "../../../assets/svg/game/trophy.svg";
import Game from "../../../classes/Game";

export default {
    name: "GameWinners",
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    data() {
        return {
            SVGs: { trophy },
        };
    },
    computed: {
        winnersText() {
            return this.game.won.by === "werewolves" ? this.$tc("GameWinners.wonByWerewolves") : this.$tc("GameWinners.wonByVillagers");
        },
    },
};
</script>

<style scoped>

</style>