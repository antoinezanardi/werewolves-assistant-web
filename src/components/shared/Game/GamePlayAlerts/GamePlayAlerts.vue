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
        ...mapGetters("game", {
            game: "game",
            gameOptions: "gameOptions",
        }),
        gamePlayAlerts() {
            return [
                ...this.sheriffElectionAlerts,
                ...this.ancientRevengeAlerts,
                ...this.voteAlerts,
                ...this.angelAlerts,
                ...this.eatAlerts,
                ...this.protectAlerts,
            ];
        },
        sheriffElectionAlerts() {
            const { firstWaiting, idiotPlayer, villagerVillagerPlayer } = this.game;
            const { to: action } = firstWaiting;
            const sheriffElectionActions = ["elect-sheriff", "delegate"];
            if (!sheriffElectionActions.includes(action)) {
                return [];
            }
            return [
                ...insertIf(!!idiotPlayer && idiotPlayer.isAliveAndPowerful, "idiot-wont-delegate"),
                ...insertIf(!!villagerVillagerPlayer && villagerVillagerPlayer.isAlive, "villager-villager-can-be-trusted"),
            ];
        },
        ancientRevengeAlerts() {
            const { firstWaiting, ancientPlayer } = this.game;
            const { to: action } = firstWaiting;
            const ancientRevengeActions = ["vote", "settle-votes", "shoot", "use-potion"];
            return ancientRevengeActions.includes(action) && !!ancientPlayer && ancientPlayer.isAlive ? ["ancient-can-make-all-powerless"] : [];
        },
        voteAlerts() {
            const {
                firstWaiting, idiotPlayer, isIdiotProtectedFromVotes, scapegoatPlayer, stutteringJudgePlayer, bearTamerPlayer,
                vileFatherOfWolvesPlayer,
            } = this.game;
            const { doesGrowlIfInfected } = this.gameOptions.roles.bearTamer;
            const { to: action } = firstWaiting;
            const voteActions = ["vote", "settle-votes"];
            if (!voteActions.includes(action)) {
                return [];
            }
            const { hasStutteringJudgeChosenSign, stutteringJudgeVoteRequestsCount } = this.pastEvents;
            const canJudgeRequestVote = this.game.canStutteringJudgeRequestVote(hasStutteringJudgeChosenSign, stutteringJudgeVoteRequestsCount);
            const bearTamerAlertType = vileFatherOfWolvesPlayer && doesGrowlIfInfected ? "bear-tamer-growls-and-infected" : "bear-tamer-growls";
            return [
                ...insertIf(!!idiotPlayer && isIdiotProtectedFromVotes, "idiot-wont-die-from-votes"),
                ...insertIf(!!scapegoatPlayer && scapegoatPlayer.isAliveAndPowerful, "scapegoat-will-die-from-tie"),
                ...insertIf(!!stutteringJudgePlayer && canJudgeRequestVote, "stuttering-judge-can-request-vote"),
                ...insertIf(!!bearTamerPlayer && bearTamerPlayer.isAliveAndPowerful &&
                    bearTamerPlayer.hasActiveAttribute("growls"), bearTamerAlertType),
            ];
        },
        angelAlerts() {
            const { angelPlayer, doesAngelWinIfHeDiesNow } = this.game;
            return !!angelPlayer && angelPlayer.isAliveAndPowerful && doesAngelWinIfHeDiesNow ? ["angel-will-win-if-he-dies"] : [];
        },
        eatAlerts() {
            const { firstWaiting, guardPlayer, ancientPlayer, witchPlayer, vileFatherOfWolvesPlayer, piedPiperPlayer, options } = this.game;
            const { to: action, for: source } = firstWaiting;
            if (action !== "eat") {
                return [];
            }
            return [
                ...insertIf(source !== "white-werewolf" && !!ancientPlayer && ancientPlayer.isAliveAndPowerful, "ancient-can-survive-werewolves"),
                ...insertIf(source !== "white-werewolf" && !!guardPlayer && guardPlayer.isAliveAndPowerful, "guard-can-protect-target"),
                ...insertIf(source !== "white-werewolf" && !!witchPlayer && witchPlayer.isAliveAndPowerful, "witch-can-protect-target"),
                ...insertIf(source === "werewolves" && !!vileFatherOfWolvesPlayer && vileFatherOfWolvesPlayer.isAlive,
                    "vile-father-of-wolves-can-infect"),
                ...insertIf(source === "werewolves" && !!vileFatherOfWolvesPlayer && vileFatherOfWolvesPlayer.isAlive && !!piedPiperPlayer &&
                    piedPiperPlayer.isAliveAndPowerful && options.roles.piedPiper.isPowerlessIfInfected, "pied-piper-will-loose-powers-if-infected"),
            ];
        },
        protectAlerts() {
            const { firstWaiting, guardPlayer, littleGirlPlayer } = this.game;
            const { to: action } = firstWaiting;
            const { isProtectedByGuard: isLittleGirlProtectedByGuard } = this.game.options.roles.littleGirl;
            if (action === "protect" && !!guardPlayer && guardPlayer.isAliveAndPowerful && !!littleGirlPlayer && !isLittleGirlProtectedByGuard) {
                return ["guard-cant-protect-little-girl"];
            }
            return [];
        },
    },
};
</script>

<style scoped>

</style>