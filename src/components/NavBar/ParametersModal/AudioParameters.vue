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
        <hr class="bg-dark my-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="ambient-volume" class="option-label"
                       v-html="$t('AudioParameters.ambientVolume.label')"/>
            </div>
            <div class="col-4 text-center">
                <VueSlider id="ambient-volume" v-model="ambientVolume" :disabled="!isAudioEnabled"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="ambientVolumeText"/>
        </div>
        <hr class="bg-dark my-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="sound-effects-volume" class="option-label"
                       v-html="$t('AudioParameters.soundEffectsVolume.label')"/>
            </div>
            <div class="col-4 text-center">
                <VueSlider id="sound-effects-volume" v-model="soundEffectsVolume" :disabled="!isAudioEnabled"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="soundEffectsVolumeText"/>
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
        ambientVolume: {
            get() {
                return Math.round(this.audioManager.ambient.volume * 100);
            },
            set(volume) {
                volume = Math.round(volume);
                this.setAmbientVolume(volume);
            },
        },
        ambientVolumeText() {
            if (!this.ambientVolume || !this.isAudioEnabled) {
                return this.$t("AudioParameters.ambientVolume.description.ambientVolumeIsOff");
            } else if (this.ambientVolume === 100) {
                return this.$t("AudioParameters.ambientVolume.description.ambientVolumeIsFull");
            }
            return this.$t(`AudioParameters.ambientVolume.description.ambientVolumeIsAt`, { volume: this.ambientVolume });
        },
        soundEffectsVolume: {
            get() {
                return Math.round(this.audioManager.soundEffects.volume * 100);
            },
            set(volume) {
                volume = Math.round(volume);
                this.setSoundEffectsVolume(volume);
            },
        },
        soundEffectsVolumeText() {
            if (!this.soundEffectsVolume || !this.isAudioEnabled) {
                return this.$t("AudioParameters.soundEffectsVolume.description.soundEffectsVolumeIsOff");
            } else if (this.soundEffectsVolume === 100) {
                return this.$t("AudioParameters.soundEffectsVolume.description.soundEffectsVolumeIsFull");
            }
            return this.$t(`AudioParameters.soundEffectsVolume.description.soundEffectsVolumeIsAt`, { volume: this.soundEffectsVolume });
        },
    },
    methods: {
        ...mapActions("audioManager", {
            toggleMute: "toggleMute",
            setAmbientVolume: "setAmbientVolume",
            setSoundEffectsVolume: "setSoundEffectsVolume",
        }),
    },
};
</script>

<style lang="scss" scoped>
    .option-label {
        font-size: 1rem;
        margin-bottom: 0;
    }
</style>