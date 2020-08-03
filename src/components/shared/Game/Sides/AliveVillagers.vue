<template>
    <div id="alive-villagers">
        <span v-html="'🧑🏻‍🌾'" class="mr-2"/>
        <VRoller :text="villagersAliveText" :default-char="villagersAliveText" class="d-inline-flex"/>
        <hr class="bg-dark"/>
    </div>
</template>

<script>
import Game from "@/classes/Game";

export default {
    name: "AliveVillagers",
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        villagersAliveText() {
            return `${this.game.aliveVillagerPlayers.length} / ${this.game.villagerPlayers.length} ${this.$t("GameVillagersSide.alive")}`;
        },
    },
};
</script>

<style scoped>

</style>