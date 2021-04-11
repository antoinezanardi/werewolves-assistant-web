<template>
    <div id="audio-parameters">
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-audio-enabled" class="option-label"
                       v-html="$t('AudioParameters.isAudioEnabled.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-audio-enabled" v-model="isAudioEnabled" :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60"
                               :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="isAudioEnabledText"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "AudioParameters",
    computed: {
        ...mapGetters("audioManager", { audioManager: "audioManager" }),
        isAudioEnabled: {
            get() {
                return !this.audioManager.isMuted;
            },
            set() {
                this.toggleMute();
            },
        },
        isAudioEnabledText() {
            const description = !this.audioManager.isMuted ? "audioIsEnabled" : "audioIsNotEnabled";
            return this.$t(`AudioParameters.isAudioEnabled.description.${description}`);
        },
    },
    methods: { ...mapActions("audioManager", { toggleMute: "toggleMute" }) },
};
</script>

<style lang="scss" scoped>
    .option-label {
        font-size: 1rem;
        margin-bottom: 0;
    }
</style>