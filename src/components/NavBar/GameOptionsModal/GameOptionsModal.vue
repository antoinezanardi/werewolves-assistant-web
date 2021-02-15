<template>
    <div id="game-options-modal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fa fa-dice mr-2"/>
                        <span v-html="$t('GameOptionsModal.gameOptions')"/>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="text-white">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="modal-body h-100 visible-scrollbar">
                    <ul id="game-summary-modal-tabs" class="nav nav-pills nav-fill">
                        <li id="game-results-tab" class="nav-item" @click="openGameRolesOptions">
                            <a class="nav-link" :class="{ active: panel === 'game-roles-options' }" href="#">
                                <i class="fa fa-chess mr-2"/>
                                <span v-html="$t('GameOptionsModal.gameRolesOptions')"/>
                            </a>
                        </li>
                        <li id="game-history-tab" class="nav-item" @click="openGameRepartitionOptions">
                            <a class="nav-link" :class="{ active: panel === 'game-repartition-options' }" href="#">
                                <i class="fa fa-random mr-2"/>
                                <span v-html="$t('GameOptionsModal.gameRepartitionOptions')"/>
                            </a>
                        </li>
                    </ul>
                    <div>
                        <hr class="bg-dark my-2"/>
                    </div>
                    <transition mode="out-in" name="translate-down-fade">
                        <GameRolesOptions v-if="panel === 'game-roles-options'" key="game-roles-options" @options-updated="optionsUpdated = true"/>
                        <GameRepartitionOptions v-else-if="panel === 'game-repartition-options'" key="game-repartition-options"
                                                @options-updated="optionsUpdated = true"/>
                    </transition>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-block" data-dismiss="modal" v-html="$t('GameOptionsModal.close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import GameRolesOptions from "@/components/NavBar/GameOptionsModal/GameRolesOptions";
import GameRepartitionOptions from "@/components/NavBar/GameOptionsModal/GameRepartitionOptions/GameRepartitionOptions";

export default {
    name: "GameOptionsModal",
    components: { GameRepartitionOptions, GameRolesOptions },
    data() {
        return {
            optionsUpdated: false,
            panel: "game-roles-options",
        };
    },
    watch: {
        optionsUpdated(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.$toasted.success(this.$t("GameOptionsModal.optionsAreSaved"), { icon: "check", duration: 5000 });
            }
        },
    },
    methods: {
        show() {
            $("#game-options-modal").modal("show");
        },
        openGameRolesOptions() {
            this.panel = "game-roles-options";
        },
        openGameRepartitionOptions() {
            this.panel = "game-repartition-options";
        },
    },
};
</script>

<style lang="scss" scoped>

    #game-options-modal {
        overflow-y: hidden;

        .modal-body {
            min-height: calc(85vh - 150px);
            max-height: calc(85vh - 150px);
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
</style>