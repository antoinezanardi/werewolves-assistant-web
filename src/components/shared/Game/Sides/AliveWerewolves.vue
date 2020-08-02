<template>
    <div id="alive-werewolves">
        <span v-html="'🐺'" class="mr-2"/>
        <VRoller :text="werewolvesAliveText" :default-char="werewolvesAliveText" class="d-inline-flex"/>
        <hr class="bg-dark"/>
    </div>
</template>

<script>
import Game from "@/classes/Game";

export default {
    name: "AliveWerewolves",
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        werewolvesAliveText() {
            return `${this.game.aliveWerewolfPlayers.length} / ${this.game.werewolfPlayers.length} ${this.$t("GameWerewolvesSide.alive")}`;
        },
    },
};
</script>

<style scoped>

</style>