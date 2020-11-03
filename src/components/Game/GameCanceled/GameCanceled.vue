<template>
    <div id="game-canceled" class="d-flex flex-column">
        <div class="d-flex flex-column justify-content-center flex-grow-1">
            <div class="row">
                <div class="col-12 text-center">
                    <i class="fa fa-ban fa-4x text-danger"/>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 text-center">
                    <h1 v-html="$t('GameCanceled.gameCanceled')"/>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-12 text-center">
                    <GameReviewButton @show-game-review-modal="showGameReviewModal"/>
                </div>
            </div>
        </div>
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6 mt-2 mt-md-0">
                <button class="btn btn-primary btn-block btn-lg" @click="restartGame">
                    <i class="fa fa-redo mr-2"/>
                    <span v-html="$t('GameCanceled.restartGame')"/>
                </button>
            </div>
            <div class="col-md-6 mt-2 mt-md-0">
                <router-link class="btn btn-secondary btn-block" to="/">
                    <i class="fa fa-sign-out-alt mr-2"/>
                    <span v-html="$t('GameCanceled.quit')"/>
                </router-link>
            </div>
        </div>
        <GameReviewModal ref="gameReviewModal"/>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import { stringify } from "qs";
import GameReviewButton from "@/components/shared/Game/GameReview/GameReviewButton/GameReviewButton";
import GameReviewModal from "@/components/shared/Game/GameReview/GameReviewModal/GameReviewModal";

export default {
    name: "GameCanceled",
    components: { GameReviewModal, GameReviewButton },
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        confirmRestartGame() {
            return Swal.fire({
                title: this.$t("GameCanceled.newGame"),
                text: this.$t("GameCanceled.doYouWantToKeepSamePlayers"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("GameCanceled.keepSamePlayers"),
                cancelButtonText: this.$t("GameCanceled.fromScratch"),
            });
        },
        async restartGame() {
            const { value } = await this.confirmRestartGame();
            if (value) {
                return this.$router.push(`/game-lobby?${stringify({ players: this.game.players.map(player => ({ name: player.name })) })}`);
            }
            return this.$router.push("/game-lobby");
        },
        showGameReviewModal() {
            this.$refs.gameReviewModal.show();
        },
    },
};
</script>

<style scoped>

</style>