<template>
    <div id="players-help-for-roles-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="$t('PlayerHelpForRolesModal.playersDontKnowTheirRole')"/>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="text-white">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="modal-body text-center">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center font-italic">
                            <i class="fa fa-question fa-2x text-warning mr-3"/>
                            <span v-html="$t('PlayerHelpForRolesModal.teachPlayerHowToUseRole')"/>
                        </div>
                    </div>
                    <hr class="bg-dark my-1"/>
                    <div class="row">
                        <div class="col-12 text-center mt-2">
                            <QRCodeVue :size="200" :value="rolesURL" background="#000000" foreground="#FFFFFF"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 small font-italic text-muted">
                            <i class="fa fa-lightbulb mr-2"/>
                            <span v-html="$t('PlayerHelpForRolesModal.increaseLuminosity')"/>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div id="or-text" class="col-12 text-uppercase font-weight-bold" v-html="$t('PlayerHelpForRolesModal.or')"/>
                    </div>
                    <div class="row">
                        <div class="col-12 d-flex align-items-center font-italic justify-content-center">
                            <span v-html="$t('PlayerHelpForRolesModal.sendLinkToPlayers')"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="input-group">
                                <input type="text" class="form-control" readonly :value="rolesURL"/>
                                <div class="input-group-append">
                                    <button v-clipboard:copy="rolesURL" v-clipboard:success="onCopySuccess" v-clipboard:error="onCopyError"
                                            class="btn btn-outline-primary" type="button">
                                        <i class="fa fa-clipboard mr-2"/>
                                        <span v-html="$t('PlayerHelpForRolesModal.copy')"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-html="$t('PlayerHelpForRolesModal.close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import Config from "../../../../config";

export default {
    name: "PlayerHelpForRolesModal",
    computed: {
        rolesURL() {
            return `${Config.app.baseURL}about?scroll-to=roles-section`;
        },
    },
    methods: {
        show() {
            $("#players-help-for-roles-modal").modal("show");
        },
        onCopySuccess() {
            this.$toasted.success(this.$t("PlayerHelpForRolesModal.linkWasCopied"), { icon: "copy" });
        },
        onCopyError() {
            this.$toasted.success(this.$t("PlayerHelpForRolesModal.linkCantBeCopied"), { icon: "times" });
        },
    },
};
</script>

<style lang="scss">
    #or-text {
        text-align: center;
        font-size: 2rem;
    }

    .modal-backdrop.show {
        opacity: 1;
    }
</style>