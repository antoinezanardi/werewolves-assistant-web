<template>
    <div id="game-sides-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="$t('GameSidesModal.gameSides')"/>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="text-white">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="modal-body h-100 visible-scrollbar">
                    <ul id="game-sides-modal-tabs" class="nav nav-pills nav-fill">
                        <li id="game-results-tab" class="nav-item" @click="openGameVillagersSidesPanel">
                            <a class="nav-link" :class="{ active: panel === 'game-villagers-side' }" href="#">
                                <img :src="SVGs.villagers" width="20" alt="Villagers Side" class="mr-2"/>
                                <span v-html="$t('GameSidesModal.villagersSide')"/>
                            </a>
                        </li>
                        <li id="game-history-tab" class="nav-item" @click="openGameWerewolvesSidesPanel">
                            <a class="nav-link" :class="{ active: panel === 'game-werewolves-side' }" href="#">
                                <img :src="SVGs.werewolves" width="20" alt="Werewolves Side" class="mr-2"/>
                                <span v-html="$t('GameSidesModal.werewolvesSide')"/>
                            </a>
                        </li>
                    </ul>
                    <div>
                        <hr class="bg-dark my-2"/>
                    </div>
                    <div class="row justify-content-between">
                        <transition mode="out-in" name="fade">
                            <GameVillagersSide v-if="panel === 'game-villagers-side'" key="game-villagers-side" class="col-12"/>
                            <GameWerewolvesSide v-else-if="panel === 'game-werewolves-side'" key="game-werewolves-side" class="col-12"/>
                        </transition>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-html="$t('GameSidesModal.close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import GameWerewolvesSide from "@/components/shared/Game/Sides/GameWerewolvesSide/GameWerewolvesSide";
import GameVillagersSide from "@/components/shared/Game/Sides/GameVillagersSide/GameVillagersSide";
import villagers from "@/assets/svg/roles/villager.svg";
import werewolves from "@/assets/svg/attributes/eaten.svg";

export default {
    name: "GameSidesModal",
    components: { GameVillagersSide, GameWerewolvesSide },
    data() {
        return {
            panel: "game-villagers-side",
            SVGs: { werewolves, villagers },
        };
    },
    methods: {
        show() {
            $("#game-sides-modal").modal("show");
        },
        openGameVillagersSidesPanel() {
            this.panel = "game-villagers-side";
        },
        openGameWerewolvesSidesPanel() {
            this.panel = "game-werewolves-side";
        },
    },
};
</script>

<style lang="scss" scoped>
    #game-sides-modal {
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
</style>