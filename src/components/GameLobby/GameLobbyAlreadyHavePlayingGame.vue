<template>
    <div id="game-lobby-already-have-playing-game" class="w-100">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center">
                    <i class="fa fa-gamepad text-primary mr-lg-3 mr-0 d-lg-inline d-block"/>
                    <span v-html="$t('GameLobbyAlreadyHavePlayingGame.youAlreadyHavePlayingGame')"/>
                </h1>
            </div>
        </div>
        <div class="row text-center justify-content-center">
            <div class="col-4 game-metadata">
                <span v-html="$t('GameLobbyAlreadyHavePlayingGame.players', { playersCount: game.players.length })"/>
            </div>
            <div class="col-4 game-metadata">
                <span v-html="gamePhaseText"/>
            </div>
        </div>
        <div class="row justify-content-center mt-4 mb-4">
            <div class="col-md  -8 col-12">
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 col-12">
                <router-link :to="`game/${game._id}`" class="btn btn-primary btn-block text-uppercase btn-lg font-weight-bold">
                    <i class="fa fa-play-circle mr-2"/>
                    <span v-html="$t('GameLobbyAlreadyHavePlayingGame.resumeGame')"/>
                </router-link>
            </div>
            <div class="col-lg-4 col-md-6 col-12 mt-md-0 mt-3">
                <form @submit.prevent="cancelGame">
                    <SubmitButton :loading="loading" classes="btn btn-block btn-lg btn-dark text-uppercase font-weight-bold"
                                  :text="`<i class='fa fa-times-circle mr-2'></i>${$t('GameLobbyAlreadyHavePlayingGame.cancelGame')}`"/>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import Game from "../../classes/Game";
import SubmitButton from "../shared/Forms/SubmitButton";
import Swal from "sweetalert2";

export default {
    name: "GameLobbyAlreadyHavePlayingGame",
    components: { SubmitButton },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        gamePhaseText() {
            if (this.game.phase === "day") {
                return `<i class="fas fa-sun sun-color mr-2"></i>${this.$t("GameLobbyAlreadyHavePlayingGame.day")} ${this.game.turn}`;
            } else {
                return `<i class="fas fa-moon moon-color mr-2"></i>${this.$t("GameLobbyAlreadyHavePlayingGame.night")} ${this.game.turn}`;
            }
        },
    },
    methods: {
        confirmCancelGame() {
            return Swal.fire({
                title: this.$t("GameLobbyAlreadyHavePlayingGame.areYouSureYouWantToCancel"),
                text: this.$t("GameLobbyAlreadyHavePlayingGame.yourProgressWillBeLost"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("GameLobbyAlreadyHavePlayingGame.cancelGame"),
                cancelButtonText: this.$t("GameLobbyAlreadyHavePlayingGame.dontCancel"),
            });
        },
        async cancelGame() {
            try {
                this.loading = true;
                const { value } = await this.confirmCancelGame();
                if (value) {
                    await this.$werewolvesAssistantAPI.patchGame(this.game._id, { status: "canceled" });
                    this.$toasted.success(this.$t("GameLobbyAlreadyHavePlayingGame.gameCanceled"), { icon: "check" });
                    this.$emit("cancelGame");
                }
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .game-metadata {
        font-size: 1.25rem;
    }
</style>