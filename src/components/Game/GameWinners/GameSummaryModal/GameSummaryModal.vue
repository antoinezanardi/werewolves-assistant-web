<template>
    <div class="modal fade" id="game-summary-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="$t('GameSummaryModal.gameSummary')"/>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="text-white">&times;</span>
                    </button>
                </div>
                <div class="modal-body d-flex flex-column h-100">
                    <div id="game-summary-results">
                        <h4 class="text-center mt-2">
                            <i class="fa fa-trophy text-warning mr-2"/>
                            <span v-html="$t('GameSummaryModal.gameResults')"/>
                        </h4>
                        <hr class="bg-dark"/>
                        <div class="row justify-content-around">
                            <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center text-center">
                                <img :src="game.won.by === 'villagers' ? SVGs.trophy : SVGs.dead" class="pb-3 mr-4"
                                     width="75" alt="Result"/>
                                <div class="flex-grow-1">
                                    <h3 v-html="$t('GameSummaryModal.villagers')"/>
                                    <AliveVillagers :game="game"/>
                                </div>
                            </div>
                            <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center text-center">
                                <img :src="game.won.by === 'werewolves' ? SVGs.trophy : SVGs.dead" class="pb-3 mr-4"
                                     width="75" alt="Result"/>
                                <div class="flex-grow-1">
                                    <h3 v-html="$t('GameSummaryModal.werewolves')"/>
                                    <AliveWerewolves :game="game"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr class="bg-dark"/>
                    </div>
                    <div id="game-summary-history" class="h-50">
                        <h4 class="text-center mt-2 mb-3">
                            <i class="fa fa-clock mr-2"/>
                            <span v-html="$t('GameSummaryModal.gameHistory')"/>
                        </h4>
                        <div class="row">
                            <div class="col-12">
                                <table class="table table-hover w-100">
                                    <tbody>
                                    <GameSummaryHistoryLine v-for="gameHistoryEntry in reversedGameHistory" :key="gameHistoryEntry._id"
                                                            :game="game" :game-history-entry="gameHistoryEntry"/>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-html="$t('GameSummaryModal.close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import Game from "@/classes/Game";
import GameSummaryHistoryLine from "@/components/Game/GameWinners/GameSummaryModal/GameSummaryHistoryLine";
import AliveVillagers from "@/components/shared/Game/Sides/AliveVillagers";
import AliveWerewolves from "@/components/shared/Game/Sides/AliveWerewolves";
import trophy from "@/assets/svg/game/trophy.svg";
import dead from "@/assets/svg/attributes/dead.svg";

export default {
    name: "GameSummaryModal",
    components: { AliveWerewolves, AliveVillagers, GameSummaryHistoryLine },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    data() {
        return {
            SVGs: { trophy, dead },
        };
    },
    computed: {
        reversedGameHistory() {
            return [...this.game.history].reverse();
        },
    },
    methods: {
        show() {
            $("#game-summary-modal").modal("show");
        },
    },
};
</script>

<style scoped>
    .modal-body {
        max-height: calc(100vh - 173px);
        overflow-y: auto;
    }
</style>