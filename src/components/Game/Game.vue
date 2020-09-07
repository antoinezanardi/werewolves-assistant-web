<template>
    <div id="game" class="container-fluid page-with-navbar">
        <transition name="fade" mode="out-in">
            <div v-if="loading.getGame" key="loading" class="h-100 d-flex justify-content-center align-items-center">
                <Loading :text="$t('Game.loadingGame')"/>
            </div>
            <div v-else key="game" class="pt-2 row mx-0 h-100">
                <GameVillagersSide class="col-lg-2 col-md-3 d-none d-md-block h-100"/>
                <transition mode="out-in" name="fade">
                    <GameContent v-if="game.status === 'playing'" key="playing-game"
                                 class="col-lg-8 col-md-6 col-12 h-100 pb-2"/>
                    <GameWinners v-else-if="game.status === 'done'" key="done-game"
                                 class="col-lg-8 col-md-6 col-12 h-100 pb-2"/>
                    <GameCanceled v-else-if="game.status === 'canceled'" key="canceled-game"
                                  class="col-lg-8 col-md-6 col-12 h-100 pb-2"/>
                </transition>
                <GameWerewolvesSide class="col-lg-2 col-md-3 d-none d-md-block h-100"/>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
import Loading from "@/components/shared/Loading";
import GameVillagersSide from "./GameVillagersSide/GameVillagersSide";
import GameWerewolvesSide from "./GameWerewolvesSide/GameWerewolvesSide";
import GameContent from "./GameContent/GameContent";
import GameWinners from "./GameWinners/GameWinners";
import { isAPIError } from "@/helpers/functions/Error";
import GameCanceled from "@/components/Game/GameCanceled/GameCanceled";

export default {
    name: "Game",
    components: { GameCanceled, GameWinners, GameContent, GameWerewolvesSide, GameVillagersSide, Loading },
    data() {
        return {
            loading: {
                getGame: true,
            },
        };
    },
    computed: {
        ...mapGetters("game", {
            game: "game",
        }),
    },
    created() {
        this.getGame();
    },
    methods: {
        ...mapActions("game", {
            getAndSetGame: "getAndSetGame",
        }),
        async getGame() {
            try {
                await this.getAndSetGame({ gameId: this.$route.params.id });
            } catch (e) {
                if (isAPIError(e)) {
                    if (e.response.data.type === "GAME_DOESNT_BELONG_TO_USER") {
                        this.$toasted.error(this.$t("Game.youDontOwnThisGame"), { icon: "lock" });
                    } else if (e.response.data.type === "BAD_REQUEST") {
                        this.$toasted.error(this.$t("Game.cantGetGame"), { icon: "ban" });
                    }
                    await this.$router.push("/");
                } else {
                    this.$error.display(e);
                }
            } finally {
                this.loading.getGame = false;
            }
        },
        confirmLeaveGame() {
            return Swal.fire({
                title: this.$t("Game.areYouSureYouWantToQuit"),
                html: `${this.$t("Game.yourProgressIsSaved")} <i class='fa fa-check-circle text-success ml-1'></i>`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `<i class='fa fa-sign-out-alt mr-2'></i>${this.$t("Game.quit")}`,
                cancelButtonText: this.$t("Game.cancel"),
            });
        },
    },
    async beforeRouteLeave(to, from, next) {
        if (this.game.status === "playing") {
            const { value: confirmLeaveGame } = await this.confirmLeaveGame();
            return confirmLeaveGame ? next() : next(false);
        } else {
            return next();
        }
    },
};
</script>

<style lang="scss" scoped>
    #game {
        padding-left: 0;
        padding-right: 0;
    }
</style>