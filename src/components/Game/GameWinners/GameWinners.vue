<template>
    <div id="game-winners" class="d-flex flex-column">
        <div id="game-winners-content" class="visible-scrollbar">
            <div class="d-flex flex-column h-100 container-fluid">
                <div class="d-flex flex-column justify-content-center flex-grow-1">
                    <div class="row mt-2">
                        <div class="col-12 text-center">
                            <GameResult/>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-12 text-center">
                            <GameSummaryButton class="mb-2 mb-md-0 mr-md-2" @show-game-summary-modal="showGameSummaryModal"/>
                            <GameReviewButton @show-game-review-modal="showGameReviewModal"/>
                        </div>
                    </div>
                </div>
                <div class="row flex-grow-1 align-items-center justify-content-center mt-4">
                    <PlayerCard v-for="player in game.won.players" :key="player.name" :player="player" size="lg" class="col-md-3 col-6"/>
                </div>
            </div>
        </div>
        <div>
            <hr class="bg-dark my-2"/>
            <div class="row justify-content-between align-items-center">
                <div class="col-md-8">
                    <button class="btn btn-primary btn-block btn-lg" @click="restartGame">
                        <i class="fa fa-redo mr-2"/>
                        <span v-html="$t('GameWinners.restartGame')"/>
                    </button>
                </div>
                <div class="col-md-4 mt-2 mt-md-0">
                    <router-link class="btn btn-secondary btn-block" to="/">
                        <i class="fa fa-sign-out-alt mr-2"/>
                        <span v-html="$t('GameWinners.quit')"/>
                    </router-link>
                </div>
            </div>
        </div>
        <GameSummaryModal ref="gameSummaryModal"/>
        <GameReviewModal ref="gameReviewModal"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import { stringify } from "qs";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import GameSummaryModal from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryModal";
import GameReviewModal from "@/components/shared/Game/GameReview/GameReviewModal/GameReviewModal";
import GameReviewButton from "@/components/shared/Game/GameReview/GameReviewButton/GameReviewButton";
import GameSummaryButton from "@/components/shared/Game/GameSummary/GameSummaryButton/GameSummaryButton";
import GameResult from "@/components/shared/Game/GameResult/GameResult";

export default {
    name: "GameWinners",
    components: { GameResult, GameSummaryButton, GameReviewButton, GameReviewModal, GameSummaryModal, PlayerCard },
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        confirmRestartGame() {
            return Swal.fire({
                title: this.$t("GameWinners.newGame"),
                text: this.$t("GameWinners.doYouWantToKeepSamePlayers"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("GameWinners.keepSamePlayers"),
                cancelButtonText: this.$t("GameWinners.fromScratch"),
                heightAuto: false,
            });
        },
        async restartGame() {
            const { value } = await this.confirmRestartGame();
            if (value) {
                return this.$router.push(`/game-lobby?${stringify({ players: this.game.players.map(player => ({ name: player.name })) })}`);
            }
            return this.$router.push("/game-lobby");
        },
        showGameSummaryModal() {
            this.$refs.gameSummaryModal.show();
        },
        showGameReviewModal() {
            this.$refs.gameReviewModal.show();
        },
    },
};
</script>

<style scoped>
    #game-winners-content {
        overflow-y: scroll;
        width: 100%;
        flex-grow: 1;
    }
</style>