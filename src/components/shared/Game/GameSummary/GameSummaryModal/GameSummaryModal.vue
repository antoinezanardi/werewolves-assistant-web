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
                        <div v-if="panel === 'game-results'" id="game-summary-results" key="game-summary-results">
                            <h4 class="text-center mt-2">
                                <i class="fa fa-trophy text-warning mr-2"/>
                                <span v-html="$t('GameSummaryModal.gameResults')"/>
                            </h4>
                            <hr class="bg-dark"/>
                            <div class="row">
                                <div class="col-12 text-center">
                                    <GameResult/>
                                </div>
                            </div>
                            <hr class="bg-dark"/>
                            <div class="row justify-content-around">
                                <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center text-center">
                                    <img :src="game.won.by === 'villagers' ? SVGs.trophy : SVGs.dead" class="pb-3 mr-4"
                                         width="75" alt="Result"/>
                                    <div class="flex-grow-1">
                                        <h3 v-html="$t('GameSummaryModal.villagers')"/>
                                        <AliveVillagers/>
                                    </div>
                                </div>
                                <div class="col-12 col-lg-4 d-flex align-items-center justify-content-center text-center">
                                    <img :src="game.won.by === 'werewolves' ? SVGs.trophy : SVGs.dead" class="pb-3 mr-4"
                                         width="75" alt="Result"/>
                                    <div class="flex-grow-1">
                                        <h3 v-html="$t('GameSummaryModal.werewolves')"/>
                                        <AliveWerewolves/>
                                    </div>
                                </div>
                            </div>
                            <div v-if="game.additionalCards.length">
                                <hr class="bg-dark"/>
                                <h4 class="text-center">
                                    <i class="fa fa-chess mr-2 text-info"/>
                                    <span v-html="$t('GameSummaryModal.additionalCards')"/>
                                </h4>
                                <hr class="bg-dark"/>
                                <div v-if="game.thiefAdditionalCards.length">
                                    <h5 class="text-center">
                                        <RoleImage class="additional-card-recipient mr-2" role="thief"/>
                                        <span v-html="$t('GameSummaryModal.thiefAdditionalCards')"/>
                                    </h5>
                                    <hr class="bg-dark"/>
                                    <div class="row justify-content-center">
                                        <div v-for="card of game.thiefAdditionalCards" :key="card._id"
                                             class="col-lg-2 col-6 d-flex flex-column align-items-center text-center">
                                            <RoleImage :role="card.role" class="additional-card-image mt-2"/>
                                            <RoleText prefix="a" :role="card.role"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="panel === 'game-history'" id="game-summary-history-container" key="game-summary-history-container">
                            <transition mode="out-in" name="fade">
                                <div v-if="loading.getGameHistory" key="loading-history" class="d-flex align-items-center justify-content-center">
                                    <Loading :text="$t('GameSummaryModal.loadingGameHistory')"/>
                                </div>
                                <div v-else-if="gameHistory" id="game-summary-history" key="game-summary-history" class="h-100">
                                    <h4 class="text-center mt-2 mb-3">
                                        <i class="fa fa-clock mr-2"/>
                                        <span v-html="$t('GameSummaryModal.gameHistory')"/>
                                    </h4>
                                    <div class="row">
                                        <div class="col-12">
                                            <table class="table table-hover w-100">
                                                <tbody>
                                                    <template v-for="(gameHistoryEntry, index) in gameHistory">
                                                        <GameSummaryHistoryPhaseLine :key="`new-phase-${gameHistoryEntry._id}`"
                                                                                     :game-history="gameHistory"
                                                                                     :index="index"/>
                                                        <GameSummaryHistoryPlayLine :key="`play-${gameHistoryEntry._id}`"
                                                                                    :game-history-entry="gameHistoryEntry"/>
                                                        <GameSummaryHistoryRevealedPlayerLine v-for="revealedPlayer of
                                                                                                  gameHistoryEntry.revealedAlivePlayers"
                                                                                              :key="`revealed-${revealedPlayer._id}`"
                                                                                              :revealed-player="revealedPlayer"/>
                                                        <GameSummaryHistoryDeadPlayerLine v-for="deadPlayer of gameHistoryEntry.deadPlayers"
                                                                                          :key="`death-${deadPlayer._id}`"
                                                                                          :game-history-entry="gameHistoryEntry"
                                                                                          :dead-player="deadPlayer"/>
                                                    </template>
                                                </tbody>
                                            </table>
                                            <h4 class="text-center" v-html="`~  ${$t('GameSummaryModal.endOfGame')} ~`"/>
                                        </div>
                                    </div>
                                </div>
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
import GameSummaryHistoryPlayLine from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryHistoryPlayLine";
import AliveVillagers from "@/components/shared/Game/Sides/AliveVillagers";
import AliveWerewolves from "@/components/shared/Game/Sides/AliveWerewolves";
import trophy from "@/assets/svg/game/trophy.svg";
import dead from "@/assets/svg/attributes/dead.svg";
import GameResult from "@/components/shared/Game/GameResult/GameResult";
import Loading from "@/components/shared/Loading";
import GameSummaryHistoryPhaseLine from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryHistoryPhaseLine";
import GameHistory from "@/classes/GameHistory";
import GameSummaryHistoryDeadPlayerLine
    from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryHistoryDeadPlayerLine";
import GameSummaryHistoryRevealedPlayerLine
    from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryHistoryRevealedPlayerLine";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";

export default {
    name: "GameSummaryModal",
    components: {
        RoleText,
        RoleImage,
        GameSummaryHistoryRevealedPlayerLine,
        GameSummaryHistoryDeadPlayerLine, GameSummaryHistoryPhaseLine,
        Loading, GameResult, AliveWerewolves, AliveVillagers, GameSummaryHistoryPlayLine,
    },
    data() {
        return {
            SVGs: { trophy, dead },
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