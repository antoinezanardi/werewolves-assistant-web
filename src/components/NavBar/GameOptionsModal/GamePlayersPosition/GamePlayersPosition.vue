<template>
    <div id="game-players-position">
        <div v-if="game.players.length < 4" class="mt-4">
            <h3 class="text-muted text-center font-italic">
                <i class="fa fa-user-plus mr-2"/>
                <span v-html="$t('GamePlayersPosition.addAtLeastFourPlayersToPlaceThem')"/>
            </h3>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-12 text-center">
                    <button class="btn btn-outline-primary" @click="startTutorial">
                        <i class="fa fa-question-circle mr-2"/>
                        <span v-html="$t('GamePlayersPosition.howToPlacePlayers')"/>
                    </button>
                </div>
            </div>
            <hr class="bg-dark my-2"/>
            <div class="row justify-content-center align-items-center">
                <div id="left-neighbors-flow" class="d-flex flex-column align-items-center col-lg-2 col-3 text-center text-muted">
                    <i class="fa fa-arrow-up fa-2x"/>
                    <span v-html="$t('GamePlayersPosition.leftNeighbors')"/>
                </div>
                <Draggable id="player-positions-list" v-model="players" v-bind="dragOptions" class="col-lg-8 col-6 p-2"
                           @start="isDragging = true" @end="isDragging = false">
                    <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
                        <div v-for="player in players" :key="player.name" class="d-flex align-items-center player-handle">
                            <RoleImage :role="player.role.current" class="player-role-image mr-2"/>
                            <span class="text-truncate flex-grow-1" v-html="player.name"/>
                            <i class="fa fa-bars mr-2"/>
                        </div>
                    </transition-group>
                </Draggable>
                <div id="right-neighbors-flow" class="d-flex flex-column align-items-center col-lg-2 col-3 text-center text-muted">
                    <i class="fa fa-arrow-down fa-2x"/>
                    <span v-html="$t('GamePlayersPosition.rightNeighbors')"/>
                </div>
            </div>
            <hr class="bg-dark my-1"/>
            <div id="players-horizontal-list-position" class="d-flex align-items-center visible-scrollbar">
                <div v-for="player in players" :key="player.name" class="d-flex align-items-center">
                    <div class="d-flex flex-column align-items-center text-center players-horizontal-list-item">
                        <RoleImage :role="player.role.current" class="players-horizontal-list-item-role-image"/>
                        <span class="text-truncate w-100" v-html="player.name"/>
                    </div>
                    <div class="d-flex flex-column justify-content-center text-center align-items-center players-horizontal-list-item mx-2">
                        <i class="fa fa-arrow-right fa-2x"/>
                        <span v-html="$t('GamePlayersPosition.hasOnHisRight')"/>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="d-flex flex-column align-items-center text-center players-horizontal-list-item">
                        <RoleImage :role="players[0].role.current" class="players-horizontal-list-item-role-image"/>
                        <span class="text-truncate w-100" v-html="players[0].name"/>
                    </div>
                </div>
            </div>
        </div>
        <GamePlayerPositionTutorial ref="gamePlayerPositionTutorial"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import GamePlayerPositionTutorial
    from "@/components/NavBar/GameOptionsModal/GamePlayersPosition/GamePlayersPositionTutorial";

export default {
    name: "GamePlayersPosition",
    components: { GamePlayerPositionTutorial, RoleImage, Draggable: draggable },
    data() {
        return { isDragging: false };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        players: {
            get() {
                return this.game.players;
            },
            async set(value) {
                await this.setGamePlayers(value);
            },
        },
        dragOptions() {
            return { animation: 200 };
        },
    },
    methods: {
        ...mapActions("game", { setGamePlayers: "setGamePlayers" }),
        startTutorial() {
            this.$refs.gamePlayerPositionTutorial.startTour();
        },
    },
};
</script>

<style lang="scss" scoped>

    .player-handle {
        background-color: #3c3c3c;
        margin-bottom: 5px;
        padding: 3px;
        cursor: move;

        .player-role-image {
            width: 20px;
            height: 20px;
        }
    }

    .flip-list-move {
        transition: transform 0.5s;
    }

    #players-horizontal-list-position {
        overflow-x: auto;
        padding-top: 5px;
        padding-bottom: 5px;

        .players-horizontal-list-item {
            width: 100px;

            .players-horizontal-list-item-role-image {
                height: 50px;
                width: 50px;
            }
        }
    }
</style>