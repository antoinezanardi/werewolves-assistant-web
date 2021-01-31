<template>
    <div id="alive-werewolves">
        <span class="mr-2" v-html="'🐺'"/>
        <div class="d-inline-flex" v-html="werewolvesAliveText"/>
        <hr class="bg-dark"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "AliveWerewolves",
    computed: {
        ...mapGetters("game", { game: "game" }),
        werewolvesAliveText() {
            return `${this.game.aliveWerewolfPlayers.length} / ${this.game.werewolfPlayers.length} ${this.$t("GameWerewolvesSide.alive")}`;
        },
    },
};
</script>

<style scoped>

</style>