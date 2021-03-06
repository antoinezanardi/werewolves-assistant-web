<template>
    <div id="vote-play-field" class="d-flex flex-column">
        <GamePlayAlerts :past-events="pastEvents"/>
        <div v-if="game.stutteringJudgePlayer && game.stutteringJudgePlayer.isAlive">
            <div class="row align-items-center">
                <div class="col-sm-6 col-12 ">
                    <PlayerCard :player="game.stutteringJudgePlayer"/>
                </div>
                <div class="col-sm-6 col-12 text-center">
                    <div v-html="stutteringJudgeText"/>
                    <toggle-button v-if="canStutteringJudgeRequestVote" class="mt-1" :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60"
                                   @change="stutteringJudgeRequestsAnotherVote"/>
                    <div v-if="canStutteringJudgeRequestVote" class="font-italic small text-muted mt-1"
                         v-html="stutteringJudgeRequestsCountLeftText"/>
                </div>
            </div>
            <hr class="my-2 bg-dark"/>
        </div>
        <h5 id="targetable-players-text" class="text-center py-1" v-html="targetablePlayersText"/>
        <PlayerVotes :play="play" :targetable-players="targetablePlayers" class="flex-grow-1" @player-votes="playerVotes"/>
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
            const { hasStutteringJudgeChosenSign, stutteringJudgeVoteRequestsCount } = this.pastEvents;
            return this.game.canStutteringJudgeRequestVote(hasStutteringJudgeChosenSign, stutteringJudgeVoteRequestsCount);
        },
        stutteringJudgeText() {
            const { hasStutteringJudgeChosenSign, stutteringJudgeVoteRequestsCount } = this.pastEvents;
            if (!hasStutteringJudgeChosenSign) {
                return this.$t("VotePlayField.stutteringJudgeDidntChooseSignYet");
            } else if (!this.game.canStutteringJudgeRequestVote(hasStutteringJudgeChosenSign, stutteringJudgeVoteRequestsCount)) {
                return this.$t("VotePlayField.stutteringJudgeAlreadyRequestedVote");
            }
            return this.$t("VotePlayField.stutteringJudgeHasMadeHisSign");
        },
        stutteringJudgeRequestsCountLeftText() {
            const { stutteringJudgeVoteRequestsCount } = this.pastEvents;
            const stutteringJudgeVoteRequestsCountLeft = this.game.options.roles.stutteringJudge.voteRequestsCount - stutteringJudgeVoteRequestsCount;
            return this.$t("VotePlayField.stutteringJudgeHasRequestsLeft", { stutteringJudgeVoteRequestsCountLeft });
        },
    },
    methods: {
        playerVotes(vote) {
            this.$emit("player-votes", vote);
        },
        stutteringJudgeRequestsAnotherVote({ value }) {
            this.$emit("stuttering-judge-requests-another-vote", value);
        },
    },
};
</script>

<style scoped>
</style>