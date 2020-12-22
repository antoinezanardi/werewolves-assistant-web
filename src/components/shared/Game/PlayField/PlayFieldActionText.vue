<template>
    <div class="row">
        <div class="col-12 text-center align-items-center">
            <transition name="translate-down-fade" mode="out-in">
                <h3 id="play-field-action-text" :key="actionText" v-html="actionText"/>
            </transition>
            <div id="cancel-player-target-container" class="d-flex align-items-center justify-content-center">
                <CancelActionButton :attribute="attribute" :targeted-player="null" :play="play"
                                    @player-selected="playerSelected" @side-selected="sideSelected"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CancelActionButton from "./CancelActionButton";

export default {
    name: "PlayFieldActionText",
    components: { CancelActionButton },
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
        targetedPlayersForAttribute() {
            return this.play.targets.length ? this.play.targets.filter(target => target.attribute === this.attribute) : null;
        },
        actionText() {
            const { firstWaiting } = this.game;
            let actionText = this.$t(`PlayFieldActionText.${firstWaiting.for}.${this.attribute}`);
            if (this.game.isSkippablePlay && !this.play.targets.length) {
                return this.$t(`PlayFieldActionText.${firstWaiting.for}.noTarget`);
            } else if (firstWaiting.to === "choose-side") {
                if (!this.play.side) {
                    return this.$t("PlayFieldActionText.dog-wolf.wantsToChooseSide");
                }
                return this.$t(`PlayFieldActionText.dog-wolf.${this.play.side}`);
            } else if (this.targetedPlayersForAttribute && this.targetedPlayersForAttribute.length) {
                actionText += this.getActionTextDependingOnTargets();
            } else {
                actionText += "...";
            }
            return actionText;
        },
    },
    methods: {
        isPlayerTargetingHimself(player) {
            const role = player.role.current;
            return (this.attribute === "drank-life-potion" || this.attribute === "drank-death-potion") && role === "witch" ||
                this.attribute === "protected" && role === "guard" || this.attribute === "raven-marked" && role === "raven" ||
                this.attribute === "in-love" && role === "cupid" || this.attribute === "chosen-for-vote" && player.hasAttribute("sheriff");
        },
        getActionTextDependingOnTargets() {
            let actionText = "";
            const { firstWaiting } = this.game;
            for (let i = 0; i < this.targetedPlayersForAttribute.length; i++) {
                const player = this.game.getPlayerWithId(this.targetedPlayersForAttribute[i].player);
                if (player) {
                    if (this.isPlayerTargetingHimself(player)) {
                        actionText += ` ${this.$t(`PlayFieldActionText.${firstWaiting.for}.selfTargeting`)}`;
                    } else {
                        actionText += ` ${player.name}`;
                    }
                    if (i + 2 < this.targetedPlayersForAttribute.length) {
                        actionText += ",";
                    } else if (i + 2 === this.targetedPlayersForAttribute.length) {
                        actionText += ` ${this.$t("PlayFieldActionText.and")}`;
                    }
                }
            }
            return actionText;
        },
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
        sideSelected(payload) {
            this.$emit("side-selected", payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../../../assets/scss/variables";

    #play-field-action-text {
        @include font-size(1.5rem);
    }

    #cancel-player-target-container {
        height: 40px;
    }
</style>