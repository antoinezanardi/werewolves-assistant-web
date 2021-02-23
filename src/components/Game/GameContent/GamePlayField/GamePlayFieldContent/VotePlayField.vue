<template>
    <div id="vote-play-field">
        <GamePlayAlerts/>
        <div v-if="game.stutteringJudgePlayer && game.stutteringJudgePlayer.isAlive">
            <div class="row align-items-center">
                <div class="col-sm-6 col-12 ">
                    <PlayerCard :player="game.stutteringJudgePlayer"/>
                </div>
                <div class="col-sm-6 col-12 text-center">
                    <div v-html="stutteringJudgeText"/>
                    <toggle-button v-if="canStutteringJudgeRequestVote" class="mt-1" :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60"/>
                </div>
            </div>
            <hr class="my-2 bg-dark"/>
        </div>
        <h5 id="targetable-players-text" class="text-center py-1" v-html="targetablePlayersText"/>
        <PlayerVotes :play="play" :targetable-players="targetablePlayers" class="h-100" @player-votes="playerVotes"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerVotes from "@/components/shared/Game/PlayerVotes/PlayerVotes";
import { listPlayerNames } from "@/helpers/functions/Player";
import GamePlayAlerts from "@/components/shared/Game/GamePlayAlerts/GamePlayAlerts";
import PlayerCard from "@/components/shared/Game/PlayerCard";

export default {
    name: "VotePlayField",
    components: { PlayerCard, GamePlayAlerts, PlayerVotes },
    props: {
        play: {
            type: Object,
            required: true,
        },
        pastEvents: {
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
        canStutteringJudgeRequestVote() {
            const { hasStutteringJudgeChosenSign, hasStutteringJudgeRequestedVote } = this.pastEvents;
            return this.game.canStutteringJudgeRequestVote(hasStutteringJudgeChosenSign, hasStutteringJudgeRequestedVote);
        },
        stutteringJudgeText() {
            const { hasStutteringJudgeChosenSign, hasStutteringJudgeRequestedVote } = this.pastEvents;
            if (!hasStutteringJudgeChosenSign) {
                return this.$t("VotePlayField.stutteringJudgeDidntChooseSignYet");
            } else if (hasStutteringJudgeRequestedVote) {
                return this.$t("VotePlayField.stutteringJudgeAlreadyRequestedVote");
            }
            return this.$t("VotePlayField.stutteringJudgeHasMadeHisSign");
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