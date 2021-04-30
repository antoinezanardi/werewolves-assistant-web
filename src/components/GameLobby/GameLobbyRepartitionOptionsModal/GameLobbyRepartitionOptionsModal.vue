<template>
    <div id="game-lobby-repartition-options-modal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fa fa-random mr-2"/>
                        <span v-html="$t('GameLobbyRepartitionOptionsModal.gameRepartitionOptions')"/>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="text-white">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="modal-body h-100 visible-scrollbar">
                    <GameRepartitionOptions @options-updated="optionsUpdated = true"/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-block" data-dismiss="modal"
                            v-html="$t('GameLobbyRepartitionOptionsModal.close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import GameRepartitionOptions
    from "@/components/GameLobby/GameLobbyRepartitionOptionsModal/GameRepartitionOptions/GameRepartitionOptions";

export default {
    name: "GameLobbyRepartitionOptionsModal",
    components: { GameRepartitionOptions },
    data() {
        return { optionsUpdated: false };
    },
    watch: {
        optionsUpdated(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.$toasted.success(this.$t("GameLobbyRepartitionOptionsModal.optionsAreSaved"), { icon: "check", duration: 5000 });
            }
        },
    },
    methods: {
        show() {
            $("#game-lobby-repartition-options-modal").modal("show");
        },
    },
};
</script>

<style lang="scss" scoped>

    #game-lobby-repartition-options-modal {
        overflow-y: hidden;

        .modal-body {
            min-height: calc(85vh - 150px);
            max-height: calc(85vh - 150px);
            overflow-y: auto;
            overflow-x: hidden;
        }
    }

</style>