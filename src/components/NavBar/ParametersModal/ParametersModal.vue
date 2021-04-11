<template>
    <div id="parameters-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="$t('ParametersModal.parameters')"/>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="text-white">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="modal-body h-100 visible-scrollbar">
                    <ul id="parameters-modal-tabs" class="nav nav-pills nav-fill">
                        <li id="audio-parameters-tab" class="nav-item" @click="openAudioParametersTab">
                            <a class="nav-link" :class="{ active: panel === 'audio' }" href="#">
                                <i class="fa fa-music mr-2"/>
                                <span v-html="$t('ParametersModal.audio')"/>
                            </a>
                        </li>
                    </ul>
                    <div>
                        <hr class="bg-dark my-2"/>
                    </div>
                    <transition mode="out-in" name="translate-down-fade">
                        <AudioParameters v-if="panel === 'audio'"/>
                    </transition>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" v-html="$t('ParametersModal.close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import AudioParameters from "@/components/NavBar/ParametersModal/AudioParameters";

export default {
    name: "ParametersModal",
    components: { AudioParameters },
    data() {
        return { panel: "audio" };
    },
    methods: {
        show() {
            $("#parameters-modal").modal("show");
        },
        openAudioParametersTab() {
            this.panel = "audio";
        },
    },
};
</script>

<style lang="scss" scoped>
    #parameters-modal {
        overflow-y: hidden;

        .modal-body {
            min-height: calc(85vh - 150px);
            max-height: calc(85vh - 150px);
            overflow-y: auto;
            overflow-x: hidden;
        }
    }
</style>