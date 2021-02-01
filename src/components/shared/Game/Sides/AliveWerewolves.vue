<template>
    <div id="alive-werewolves">
        <div class="d-flex align-items-center justify-content-center">
            <img :src="SVGs.werewolves" class="mr-2" width="25" alt="Werewolves Side"/>
            <div v-html="werewolvesAliveText"/>
        </div>
        <hr class="bg-dark"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import werewolves from "@/assets/svg/attributes/eaten.svg";

export default {
    name: "AliveWerewolves",
    data() {
        return { SVGs: { werewolves } };
    },
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