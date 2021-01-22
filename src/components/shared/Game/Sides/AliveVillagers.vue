<template>
    <div id="alive-villagers">
        <span class="mr-2" v-html="'🧑🏻‍🌾'"/>
        <div class="d-inline-flex" v-html="villagersAliveText"/>
        <hr class="bg-dark"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "AliveVillagers",
    computed: {
        ...mapGetters("game", { game: "game" }),
        villagersAliveText() {
            return `${this.game.aliveVillagerPlayers.length} / ${this.game.villagerPlayers.length} ${this.$t("GameVillagersSide.alive")}`;
        },
    },
};
</script>

<style scoped>

</style>