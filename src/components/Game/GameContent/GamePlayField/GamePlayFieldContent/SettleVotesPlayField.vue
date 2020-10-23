<template>
    <div id="settle-votes-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="game.sheriffPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="chosen-for-vote" @player-selected="playerSelected"/>
        <PlayerTargets :targets="tieBreakerPlayers" :play="play" attribute="chosen-for-vote" class="flex-grow-1"
                       @player-selected="playerSelected"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "../../../../shared/Game/PlayerCard";
import PlayerTargets from "../../../../shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "../../../../shared/Game/PlayField/PlayFieldActionText";

export default {
    name: "SettleVotesPlayField",
    components: { PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        tieBreakerPlayers() {
            const gameHistoryEntry = this.game.history.find(({ play }) => play.action === "vote");
            return gameHistoryEntry.play.targets.map(({ player }) => player);
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
    },
};
</script>

<style scoped>

</style>