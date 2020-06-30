<template>
    <div id="game" class="container-fluid page-with-navbar">
        <transition name="fade" mode="out-in">
            <div v-if="loading.getGame" key="loading" class="h-100 d-flex justify-content-center align-items-center">
                <Loading :text="$t('Game.loadingGame')"/>
            </div>
            <div v-else key="game" class="pt-2 row mr-0 h-100">
                <div class="col-2 h-100 overflow-auto">
                    <div class="row">
                        <div class="col-12 text-center">
                            <h3 v-html="$t('Game.villagers')"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <i class="fa fa-skull-crossbones mr-2"/>
                            <span v-html="villagersAliveText"/>
                            <hr class="bg-dark"/>
                        </div>
                    </div>
                    <div class="row">
                        <div v-for="player in game.villagerPlayers" :key="player.name" class="player-strip villager-player-strip">
                            <div class="text-center text-truncate mt-1" v-html="player.name"/>
                            <hr class="bg-dark mt-1 mb-2"/>
                            <div class="d-flex">
                                <div class="d-flex flex-wrap align-items-center flex-grow-1 p-1">
                                    <GamePlayerAttribute v-for="({ attribute, source }) in player.attributes" :key="attribute"
                                                         :attribute="attribute" :source="source"/>
                                </div>
                                <PlayerThumbnail style="min-width: 50px" :game="game" :player="player" class="mr-1"/>
                            </div>
                        </div>
                    </div>
                    <div/>
                </div>
                <div class="col-8">
                    CONTENT
                </div>
                <div class="col-2">
                    WOLVES
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import Game from "../../classes/Game";
import Loading from "../shared/Loading";
import PlayerThumbnail from "../shared/Game/PlayerThumbnail";
import GamePlayerAttribute from "./GamePlayerAttribute";

export default {
    name: "Game",
    components: { GamePlayerAttribute, PlayerThumbnail, Loading },
    data() {
        return {
            game: new Game(),
            loading: {
                getGame: true,
            },
        };
    },
    computed: {
        villagersAliveText() {
            return `${this.game.aliveVillagerPlayers.length} / ${this.game.villagerPlayers.length} ${this.$t("Game.alive")}`;
        },
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
    },
};
</script>

<style lang="scss" scoped>

    #game {
        height: calc(100% - 60px);
        padding-left: 0;
        padding-right: 0;
    }

    .player-strip {
        height: 100px;
        width: 90%;
        margin-top: 5px;
        margin-bottom: 10px;
        border: 1px solid grey;

        &.villager-player-strip {
            border-bottom-right-radius: 5px;
            border-top-right-radius: 5px;
            border-left: unset;
            background-image: linear-gradient(to right, #3c3c3c, #646464);
        }
    }
</style>