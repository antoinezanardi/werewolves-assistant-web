<template>
    <div id="game-play-alerts">
        <div class="d-flex justify-content-center align-items-center flex-wrap">
            <GamePlayAlert v-for="gamePlayAlert of gamePlayAlerts" :key="gamePlayAlert" :type="gamePlayAlert" class="mx-1 mb-1"/>
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
    props: {
        pastEvents: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        // eslint-disable-next-line max-lines-per-function
        gamePlayAlerts() {
            const {
                firstWaiting, idiotPlayer, villagerVillagerPlayer, ancientPlayer, scapegoatPlayer, angelPlayer, guardPlayer, witchPlayer,
                isIdiotProtectedFromVotes, doesAngelWinIfHeDiesNow, vileFatherOfWolvesPlayer, stutteringJudgePlayer, littleGirlPlayer,
                piedPiperPlayer,
            } = this.game;
            const { to: action, for: source } = firstWaiting;
            const { hasStutteringJudgeChosenSign, hasStutteringJudgeRequestedVote } = this.pastEvents;
            const { isProtectedByGuard: isLittleGirlProtectedByGuard } = this.game.options.roles.littleGirl;
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
                ...insertIf(action === "eat" && source !== "white-werewolf" && !!ancientPlayer, "ancient-can-survive-werewolves"),
                ...insertIf(action === "eat" && source !== "white-werewolf" && !!guardPlayer && guardPlayer.isAliveAndPowerful,
                    "guard-can-protect-target"),
                ...insertIf(action === "eat" && source !== "white-werewolf" && !!witchPlayer && witchPlayer.isAliveAndPowerful,
                    "witch-can-protect-target"),
                ...insertIf(action === "eat" && source === "werewolves" && !!vileFatherOfWolvesPlayer && vileFatherOfWolvesPlayer.isAlive,
                    "vile-father-of-wolves-can-infect"),
                ...insertIf(action === "eat" && source === "werewolves" && !!vileFatherOfWolvesPlayer && vileFatherOfWolvesPlayer.isAlive &&
                        !!piedPiperPlayer && piedPiperPlayer.isAliveAndPowerful, "pied-piper-will-loose-powers-if-infected"),
                ...insertIf(action === "vote" && !!stutteringJudgePlayer &&
                    this.game.canStutteringJudgeRequestVote(hasStutteringJudgeChosenSign, hasStutteringJudgeRequestedVote),
                "stuttering-judge-can-request-vote"),
                ...insertIf(action === "protect" && !!guardPlayer && guardPlayer.isAliveAndPowerful && !!littleGirlPlayer &&
                    !isLittleGirlProtectedByGuard, "guard-cant-protect-little-girl"),
            ];
        },
    },
};
</script>

<style scoped>

</style>