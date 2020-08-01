<template>
    <div class="modal fade" id="game-summary-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="$t('GameSummaryModal.gameSummary')"/>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="text-white">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 class="text-center mt-2">
                        <i class="fa fa-clock mr-2"/>-
                        <span v-html="$t('GameSummaryModal.gameHistory')"/>
                    </h4>
                    <div id="game-summary-history" class="container-fluid">
                        <GameSummaryHistoryLine v-for="gameHistoryEntry in reversedGameHistory" :key="gameHistoryEntry._id"
                                                :game="game" :game-history-entry="gameHistoryEntry"/>
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

export default {
    name: "GameSummaryModal",
    components: { GameSummaryHistoryLine },
    props: {
        game: {
            type: Game,
            required: true,
        },
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

</style>