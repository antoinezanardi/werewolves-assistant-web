<template>
    <div id="game-play-alerts">
        <div class="d-flex justify-content-center align-items-center">
            <GamePlayAlert v-for="(gamePlayAlert, index) of gamePlayAlerts" :key="gamePlayAlert" :type="gamePlayAlert" :class="{ 'ml-2': index }"/>
        </div>
        <hr v-if="gamePlayAlerts.length" class="bg-dark my-2"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import GamePlayAlert from "@/components/shared/Game/GamePlayAlerts/GamePlayAlert";
import { insertIf } from "@/helpers/functions/Array";

export default {
    name: "GamePlayAlerts",
    components: { GamePlayAlert },
    computed: {
        ...mapGetters("game", { game: "game" }),
        gamePlayAlerts() {
            const { firstWaiting, idiotPlayer } = this.game;
            const { to: action } = firstWaiting;
            return [
                ...insertIf((action === "elect-sheriff" || action === "delegate") && idiotPlayer && idiotPlayer.isAlive &&
                    !idiotPlayer.hasAttribute("powerless"), "idiot-wont-delegate"),
                ...insertIf((action === "elect-sheriff" || action === "delegate") && idiotPlayer && idiotPlayer.isAlive,
                    "villager-villager-can-be-trusted"),
            ];
        },
    },
};
</script>

<style scoped>

</style>