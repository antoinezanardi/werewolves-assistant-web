<template>
    <div id="game-summary-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="$t('GameSummaryModal.gameSummary')"/>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="text-white">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="modal-body h-100 visible-scrollbar">
                    <ul id="game-summary-modal-tabs" class="nav nav-pills nav-fill">
                        <li id="game-results-tab" class="nav-item" @click="openGameResultsPanel">
                            <a class="nav-link" :class="{ active: panel === 'game-results' }" href="#">
                                <i class="fa fa-trophy text-warning mr-2"/>
                                <span v-html="$t('GameSummaryModal.gameResults')"/>
                            </a>
                        </li>
                        <li id="game-history-tab" class="nav-item" @click="openGameHistoryPanel">
                            <a class="nav-link" :class="{ active: panel === 'game-history' }" href="#">
                                <i class="fa fa-clock mr-2"/>
                                <span v-html="$t('GameSummaryModal.gameHistory')"/>
                            </a>
                        </li>
                    </ul>
                    <div>
                        <hr class="bg-dark my-2"/>
                    </div>
                    <transition mode="out-in" name="translate-down-fade">
                        <GameSummaryResults v-if="panel === 'game-results'" key="game-summary-results"/>
                        <div v-else-if="panel === 'game-history'" id="game-summary-history-container" key="game-summary-history-container">
                            <transition mode="out-in" name="fade">
                                <div v-if="loading.getGameHistory" key="loading-history" class="d-flex align-items-center justify-content-center">
                                    <Loading :text="$t('GameSummaryModal.loadingGameHistory')"/>
                                </div>
                                <GameSummaryHistory v-else-if="gameHistory" key="game-summary-history" class="h-100" :game-history="gameHistory"/>
                            </transition>
                        </div>
                    </transition>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            v-html="$t('GameSummaryModal.close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from "jquery";
import Loading from "@/components/shared/Loading";
import GameHistory from "@/classes/GameHistory";
import GameSummaryResults from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryResults";
import GameSummaryHistory
    from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryHistory/GameSummaryHistory";

export default {
    name: "GameSummaryModal",
    components: {
        GameSummaryHistory,
        GameSummaryResults,
        Loading,
    },
    data() {
        return {
            gameHistory: undefined,
            loading: { getGameHistory: false },
            panel: "game-results",
        };
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        async show() {
            $("#game-summary-modal").modal("show");
            if (!this.gameHistory) {
                await this.getGameHistory();
            }
        },
        async getGameHistory() {
            try {
                this.loading.getGameHistory = true;
                const { data } = await this.$werewolvesAssistantAPI.getGameHistory(this.game._id);
                this.gameHistory = data.map(gameHistoryEntry => new GameHistory(gameHistoryEntry));
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading.getGameHistory = false;
            }
        },
        openGameResultsPanel() {
            this.panel = "game-results";
        },
        openGameHistoryPanel() {
            this.panel = "game-history";
        },
    },
};
</script>

<style lang="scss" scoped>
    #game-summary-modal {
        overflow-y: hidden;

        .modal-body {
            min-height: calc(85vh - 150px);
            max-height: calc(85vh - 150px);
            overflow-y: auto;
            overflow-x: hidden;
        }
    }

    .nav-link {
        transition: all 0.25s linear;
    }

    .additional-card-recipient {
        width: 30px;
        height: auto;
    }

    .additional-card-image {
        width: 100px;
        height: auto;
    }
</style>