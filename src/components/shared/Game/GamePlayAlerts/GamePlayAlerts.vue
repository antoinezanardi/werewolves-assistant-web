<template>
    <div id="game-play-alerts">
        <div class="d-flex justify-content-center align-items-center flex-wrap">
            <GamePlayAlert v-for="gamePlayAlert of gamePlayAlerts" :key="gamePlayAlert" :type="gamePlayAlert" class="mx-1 mb-2"/>
        </div>
        <hr v-if="gamePlayAlerts.length" class="bg-dark mt-1 mb-2"/>
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
            const {
                firstWaiting, idiotPlayer, villagerVillagerPlayer, ancientPlayer, scapegoatPlayer, angelPlayer, guardPlayer, witchPlayer,
                isIdiotProtectedFromVotes, doesAngelWinIfHeDiesNow, vileFatherOfWolvesPlayer,
            } = this.game;
            const { to: action, for: source } = firstWaiting;
            const ancientRevengeActions = ["vote", "settle-votes", "shoot", "use-potion"];
            const voteActions = ["vote", "settle-votes"];
            const sheriffElectionActions = ["elect-sheriff", "delegate"];
            return [
                ...insertIf(sheriffElectionActions.includes(action) && !!idiotPlayer && idiotPlayer.isAliveAndPowerful, "idiot-wont-delegate"),
                ...insertIf(sheriffElectionActions.includes(action) && !!villagerVillagerPlayer && villagerVillagerPlayer.isAlive,
                    "villager-villager-can-be-trusted"),
                ...insertIf(ancientRevengeActions.includes(action) && !!ancientPlayer && ancientPlayer.isAlive, "ancient-can-make-all-powerless"),
                ...insertIf(voteActions.includes(action) && !!idiotPlayer && isIdiotProtectedFromVotes, "idiot-wont-die-from-votes"),
                ...insertIf(voteActions.includes(action) && !!scapegoatPlayer && scapegoatPlayer.isAliveAndPowerful, "scapegoat-will-die-from-tie"),
                ...insertIf(!!angelPlayer && angelPlayer.isAliveAndPowerful && doesAngelWinIfHeDiesNow, "angel-will-win-if-he-dies"),
                ...insertIf(action === "eat" && !!ancientPlayer, "ancient-can-survive-werewolves"),
                ...insertIf(action === "eat" && !!guardPlayer && guardPlayer.isAliveAndPowerful, "guard-can-protect-target"),
                ...insertIf(action === "eat" && !!witchPlayer && witchPlayer.isAliveAndPowerful, "witch-can-protect-target"),
                ...insertIf(action === "eat" && source === "werewolves" && !!vileFatherOfWolvesPlayer && vileFatherOfWolvesPlayer.isAlive,
                    "vile-father-of-wolves-can-infect"),
            ];
        },
    },
};
</script>

<style scoped>

</style>