<template>
    <a v-tooltip="muteTooltip" href="#" @click.prevent="toggleMute">
        <i class="fa" :class="muteClasses"/>
    </a>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "MuteButton",
    computed: {
        ...mapGetters("audioManager", { audioManager: "audioManager" }),
        muteClasses() {
            return this.audioManager.isMuted ? "fa-volume-mute" : "fa-volume-up";
        },
        muteTooltip() {
            return this.audioManager.isMuted ? this.$t("MuteButton.unmute") : this.$t("MuteButton.mute");
        },
    },
    methods: { ...mapActions("audioManager", { toggleMute: "toggleMute" }) },
};
</script>

<style scoped>

</style>