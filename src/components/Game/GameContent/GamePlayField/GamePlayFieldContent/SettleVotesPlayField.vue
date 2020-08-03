<template>
    <div id="settle-votes-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :game="game" :player="game.sheriffPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :game="game" :play="play" attribute="chosen-for-vote" @playerSelected="playerSelected"/>
        <PlayerTargets :game="game" :targets="tieBreakerPlayers" :play="play" attribute="chosen-for-vote" class="flex-grow-1"
                       @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import PlayerCard from "../../../../shared/Game/PlayerCard";
import Game from "../../../../../classes/Game";
import PlayerTargets from "../../../../shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "../../../../shared/Game/PlayField/PlayFieldActionText";

export default {
    name: "SettleVotesPlayField",
    components: { PlayFieldActionText, PlayerTargets, PlayerCard },
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