<template>
    <transition mode="out-in" name="translate-down-fade">
        <span v-if="targetedPlayersForAttribute.length || play.side || play.card" key="cancel-player-target"
              v-tooltip="cancelTooltipText" class="cancel-action-button badge-pill badge-dark"
              @click="cancelAction">
            <span v-html="$t('CancelActionButton.cancel')"/>
            <i class="fa fa-times-circle ml-2"/>
        </span>
        <span v-else class="text-muted d-flex align-items-center small font-italic font-weight-bold">
            <i class="fa fa-chevron-down animate__animated animate__slow animate__swing animate__infinite mr-2"/>
            <span v-html="noTargetSelectedText"/>
        </span>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "CancelActionButton",
    props: {
        attribute: {
            type: String,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        targetedPlayersForAttribute() {
            return this.play.targets.length ? this.play.targets.filter(target => target.attribute === this.attribute) : [];
        },
        cancelTooltipText() {
            if (this.targetedPlayersForAttribute.length) {
                return this.$t("CancelActionButton.cancelTarget");
            } else if (this.play.side) {
                return this.$t("CancelActionButton.cancelSide");
            }
            return "";
        },
        noTargetSelectedText() {
            if (this.game.isFirstWaitingChooseSideAction) {
                return this.$t("CancelActionButton.pleaseChooseSide");
            } else if (this.game.isFirstWaitingSkippableAction) {
                return this.$t("CancelActionButton.chooseTargetIfNot");
            }
            return this.$t("CancelActionButton.pleaseChooseTarget");
        },
    },
    methods: {
        cancelAction() {
            if (this.targetedPlayersForAttribute.length) {
                for (const targetedPlayer of this.targetedPlayersForAttribute) {
                    this.$emit("player-selected", { player: { _id: targetedPlayer.player }, selected: false, attribute: this.attribute });
                }
            } else if (this.play.side) {
                this.$emit("side-selected", undefined);
            } else if (this.play.card) {
                this.$emit("card-selected", undefined);
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