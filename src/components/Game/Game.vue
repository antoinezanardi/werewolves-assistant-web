<template>
    <div id="game" class="container-fluid page-with-navbar pb-2">
        <transition name="fade" mode="out-in">
            <div v-if="loading.getGame" key="loading" class="h-100 d-flex justify-content-center align-items-center">
                <Loading :text="$t('Game.loadingGame')"/>
            </div>
            <div v-else key="game" class="pt-2 row mr-0 h-100">
                <GameVillagersSide :game="game" class="col-2 h-100"/>
                <transition mode="out-in" name="fade">
                    <GameContent v-if="game.status === 'playing'" key="playing-game" :game="game" class="col-8 h-100"
                                 @updateGame="updateGame"/>
                    <GameWinners v-else-if="game.status === 'done'" key="done-game" :game="game" class="col-8 h-100"/>
                </transition>
                <GameWolvesSide :game="game" class="col-2 h-100"/>
            </div>
        </transition>
    </div>
</template>

<script>
import Game from "../../classes/Game";
import Loading from "../shared/Loading";
import GameVillagersSide from "./GameVillagersSide/GameVillagersSide";
import GameWolvesSide from "./GameWerewolvesSide/GameWerewolvesSide";
import GameContent from "./GameContent/GameContent";
import GameWinners from "./GameWinners/GameWinners";

export default {
    name: "Game",
    components: { GameWinners, GameContent, GameWolvesSide, GameVillagersSide, Loading },
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
    },
};
</script>

<style lang="scss" scoped>
    #game {
        padding-left: 0;
        padding-right: 0;
    }
</style>