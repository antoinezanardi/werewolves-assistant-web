<template>
    <div id="game" class="container-fluid page-with-navbar pb-2">
        <transition name="fade" mode="out-in">
            <div v-if="loading.getGame" key="loading" class="h-100 d-flex justify-content-center align-items-center">
                <Loading :text="$t('Game.loadingGame')"/>
            </div>
            <div v-else key="game" class="pt-2 row mr-0 h-100">
                <GameVillagersSide :game="game" class="col-md-2 d-none d-md-block h-100"/>
                <transition mode="out-in" name="fade">
                    <GameContent v-if="game.status === 'playing'" key="playing-game" :game="game" class="col-12 col-md-8 h-100"
                                 @updateGame="updateGame"/>
                    <GameWinners v-else-if="game.status === 'done'" key="done-game" :game="game" class="col-12 col-md-8 h-100"/>
                </transition>
                <GameWerewolvesSide :game="game" class="col-md-2 d-none d-md-block h-100"/>
            </div>
        </transition>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import Game from "@/classes/Game";
import Loading from "@/components/shared/Loading";
import GameVillagersSide from "./GameVillagersSide/GameVillagersSide";
import GameWerewolvesSide from "./GameWerewolvesSide/GameWerewolvesSide";
import GameContent from "./GameContent/GameContent";
import GameWinners from "./GameWinners/GameWinners";

export default {
    name: "Game",
    components: { GameWinners, GameContent, GameWerewolvesSide, GameVillagersSide, Loading },
    data() {
        return {
            game: new Game(),
            loading: {
                getGame: true,
            },
        };
    },
    created() {
        this.getGame();
    },
    methods: {
        async getGame() {
            try {
                const { data } = await this.$werewolvesAssistantAPI.getGame(this.$route.params.id);
                this.game = new Game(data);
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading.getGame = false;
            }
        },
        updateGame(game) {
            this.game = new Game(game);
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