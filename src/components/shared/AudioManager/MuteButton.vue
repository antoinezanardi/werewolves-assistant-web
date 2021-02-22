<template>
    <a v-tooltip="muteTooltip" href="#" @click.prevent="toggleMute">
        <i class="fa" :class="muteClasses"/>
    </a>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "MuteButton",
    computed: {
        ...mapGetters("audioManager", { audioManager: "audioManager" }),
        muteClasses() {
            return this.audioManager.isMuted ? "fa-volume-up" : "fa-volume-mute";
        },
        muteTooltip() {
            return this.audioManager.isMuted ? this.$t("MuteButton.unmute") : this.$t("MuteButton.mute");
        },
    },
    methods: {
        toggleMute() {
            this.audioManager.toggleMute();
        },
    },
};
</script>

<style scoped>

</style>