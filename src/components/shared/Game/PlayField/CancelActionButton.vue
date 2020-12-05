<template>
    <transition mode="out-in" name="translate-down-fade">
        <span v-if="!!targetedPlayer || play.side" key="cancel-player-target"
              v-tooltip="cancelTooltipText" class="cancel-action-button badge-pill badge-dark"
              @click="cancelAction">
            <span v-html="$t('CancelActionButton.cancel')"/>
            <i class="fa fa-times-circle ml-2"/>
        </span>
    </transition>
</template>

<script>
import Player from "@/classes/Player";

export default {
    name: "CancelActionButton",
    props: {
        attribute: {
            type: String,
            required: true,
        },
        targetedPlayer: {
            validator: value => value instanceof Player || value === null,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        cancelTooltipText() {
            if (this.targetedPlayer) {
                return this.$t("CancelActionButton.cancelTarget");
            } else if (this.play.side) {
                return this.$t("CancelActionButton.cancelSide");
            }
            return "";
        },
    },
    methods: {
        cancelAction() {
            if (this.targetedPlayer) {
                this.$emit("player-selected", { player: { _id: this.targetedPlayer._id }, selected: false, attribute: this.attribute });
            } else if (this.play.side) {
                this.$emit("side-selected", undefined);
            }
        },
    },
};
</script>

<style scoped>
    .cancel-action-button {
        padding: 5px 10px;
        font-size: 1rem;
        cursor: pointer;
        color: #989898;
    }
</style>