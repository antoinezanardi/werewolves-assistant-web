<template>
    <div id="vote-play-field">
        <h5 id="targetable-players-text" class="text-center py-1" v-html="targetablePlayersText"/>
        <hr class="my-2 bg-dark"/>
        <PlayerVotes :play="play" :targetable-players="targetablePlayers" class="h-100" @player-votes="playerVotes"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerVotes from "@/components/shared/Game/PlayerVotes/PlayerVotes";
import { listPlayerNames } from "@/helpers/functions/Player";

export default {
    name: "VotePlayField",
    components: { PlayerVotes },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    data() {
        return { votesChart: undefined };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        targetablePlayers() {
            const { isSecondVoteAfterTie, lastActionTargetedPlayers, alivePlayers } = this.game;
            return isSecondVoteAfterTie ? lastActionTargetedPlayers : alivePlayers;
        },
        targetablePlayersText() {
            const { isSecondVoteAfterTie } = this.game;
            if (isSecondVoteAfterTie) {
                return this.$t("VotePlayField.onlyCanBeHanged", { players: listPlayerNames(this.targetablePlayers) });
            }
            return this.$t("VotePlayField.everybodyCanBeHanged");
        },
    },
    methods: {
        playerVotes(vote) {
            this.$emit("player-votes", vote);
        },
    },
};
</script>

<style scoped>
</style>