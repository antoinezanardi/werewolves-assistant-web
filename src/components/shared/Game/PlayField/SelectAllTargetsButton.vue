<template>
    <transition mode="out-in" name="translate-down-fade">
        <span v-if="isDisplayed" key="cancel-player-target"
              v-tooltip="$t('SelectAllTargetsButton.selectAllTargets')" class="cancel-action-button badge-pill badge-dark"
              @click="selectAllTargets">
            <span v-html="$t('SelectAllTargetsButton.selectAll')"/>
            <i class="fa fa-users ml-2"/>
        </span>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "SelectAllTargetsButton",
    props: {
        play: {
            type: Object,
            required: true,
        },
        attribute: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        isDisplayed() {
            return this.game.firstWaiting.for === "scapegoat" && this.play.targets.length < this.game.scapegoatTargets.length;
        },
    },
    methods: {
        selectAllTargets() {
            const { scapegoatTargets } = this.game;
            for (const { _id } of scapegoatTargets) {
                this.$emit("player-selected", { player: { _id }, selected: true, attribute: this.attribute });
            }
        },
    },
};
</script>

<style scoped>

</style>