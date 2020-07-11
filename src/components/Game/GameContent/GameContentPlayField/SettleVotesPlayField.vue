<template>
    <div id="settle-votes-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :game="game" :player="game.sheriffPlayer" size="lg"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    <VRoller :defaultChar="settleVotesTargetText" :text="settleVotesTargetText"/>
                </h3>
            </div>
        </div>
        <PlayerTargets :game="game" :targets="tieBreakerPlayers" :play="play" attribute="chosen-for-vote" class="flex-grow-1" @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import PlayerCard from "../../../shared/Game/PlayerCard";
import Game from "../../../../classes/Game";
import PlayerTargets from "../../../shared/Game/PlayerTargets/PlayerTargets";

export default {
    name: "SettleVotesPlayField",
    components: { PlayerTargets, PlayerCard },
    props: {
        game: {
            type: Game,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        settleVotesTargetText() {
            const playerTargeted = this.play.targets.length ? this.game.players.find(({ _id }) => _id === this.play.targets[0].player) : null;
            const text = `${this.$t("SettleVotesPlayField.chooseToHang")} `;
            return playerTargeted ? text + playerTargeted.name : `${text} ...`;
        },
        tieBreakerPlayers() {
            const gameHistoryEntry = this.game.history.find(gameHistoryEntry => gameHistoryEntry.play.action === "vote");
            return gameHistoryEntry.play.targets.map(({ player }) => player);
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
        },
    },
};
</script>

<style scoped>

</style>