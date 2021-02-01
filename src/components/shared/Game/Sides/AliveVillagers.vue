<template>
    <div id="alive-villagers">
        <div class="d-flex align-items-center justify-content-center">
            <img :src="SVGs.villager" class="mr-2" width="25" alt="Villager Side"/>
            <div v-html="villagersAliveText"/>
        </div>
        <hr class="bg-dark"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import villager from "@/assets/svg/roles/villager.svg";

export default {
    name: "AliveVillagers",
    data() {
        return { SVGs: { villager } };
    },
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