<template>
    <div id="game-winners" class="d-flex flex-column">
        <div class="d-flex flex-column justify-content-center flex-grow-1">
            <div class="row">
                <div class="col-12 text-center">
                    <img :src="SVGs.trophy" class="animate__animated animate__tada animate__infinite animate__slower"
                         width="100" alt="Trophy"/>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 text-center">
                    <h2 v-html="winnersText"/>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12 text-center">
                    <GameSummaryButton class="mb-2 mb-md-0 mr-md-2" @show-game-summary-modal="showGameSummaryModal"/>
                    <GameReviewButton @show-game-review-modal="showGameReviewModal"/>
                </div>
            </div>
            <div class="row justify-content-center mt-4">
                <PlayerCard v-for="player in winners" :key="player.name" :player="player" class="col-lg-2 col-3"/>
            </div>
        </div>
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
        <GameSummaryModal ref="gameSummaryModal"/>
        <GameReviewModal ref="gameReviewModal"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import { stringify } from "qs";
import trophy from "@/assets/svg/game/trophy.svg";
import PlayerCard from "../../shared/Game/PlayerCard";
import GameSummaryModal from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryModal";
import GameReviewModal from "@/components/shared/Game/GameReview/GameReviewModal/GameReviewModal";
import GameReviewButton from "@/components/shared/Game/GameReview/GameReviewButton/GameReviewButton";
import GameSummaryButton from "@/components/shared/Game/GameSummary/GameSummaryButton/GameSummaryButton";

export default {
    name: "GameWinners",
    components: { GameSummaryButton, GameReviewButton, GameReviewModal, GameSummaryModal, PlayerCard },
    data() {
        return { SVGs: { trophy } };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        winnersText() {
            const winners = this.game.won.by ? this.game.won.by : "nobody";
            return this.$tc(`GameWinners.wonBy.${winners}`, this.winners.length);
        },
        winners() {
            const winners = {
                werewolves: this.game.werewolfPlayers,
                villagers: this.game.villagerPlayers,
                lovers: this.game.inLovePlayers,
            };
            return winners[this.game.won.by] ? winners[this.game.won.by] : [];
        },
    },
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

</style>