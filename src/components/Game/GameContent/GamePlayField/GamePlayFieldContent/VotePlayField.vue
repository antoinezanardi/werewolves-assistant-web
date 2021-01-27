<template>
    <div id="vote-play-field">
        <div class="row">
            <div class="col-12">
                <h3 class="text-center" v-html="targetablePlayersText"/>
            </div>
        </div>
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