<template>
    <div class="row">
        <div class="col-12 text-center align-items-center">
            <transition name="translate-down-fade" mode="out-in">
                <h3 id="play-field-action-text" :key="actionText" v-html="actionText"/>
            </transition>
            <div id="play-field-action-buttons-container" class="d-flex align-items-center justify-content-center">
                <SelectAllTargetsButton :attribute="attribute" :play="play" class="play-field-action-button mr-2" @player-selected="playerSelected"/>
                <CancelActionButton :attribute="attribute" :play="play" class="play-field-action-button"
                                    @player-selected="playerSelected" @side-selected="sideSelected" @card-selected="cardSelected"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CancelActionButton from "./CancelActionButton";
import SelectAllTargetsButton from "@/components/shared/Game/PlayField/SelectAllTargetsButton";

export default {
    name: "PlayFieldActionText",
    components: { SelectAllTargetsButton, CancelActionButton },
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
            return this.play.targets.length ? this.play.targets.filter(target => target.attribute === this.attribute) : [];
        },
        actionText() {
            const { firstWaiting } = this.game;
            if (firstWaiting.to === "choose-side") {
                return this.chooseSideActionText;
            } else if (firstWaiting.to === "choose-card") {
                return this.chooseCardActionText;
            }
            const baseActionText = this.$tc(`PlayFieldActionText.${firstWaiting.for}.${this.attribute}`, this.game.alivePlayersExpectedToPlay.length);
            if (this.game.isFirstWaitingSkippableAction && !this.targetedPlayersForAttribute.length) {
                return this.$t(`PlayFieldActionText.${firstWaiting.for}.no-${this.attribute}`);
            } else if (this.isOneTargetPlayAndTargetingHimself) {
                return this.$t(`PlayFieldActionText.${firstWaiting.for}.self-targeting-${this.attribute}`);
            } else if (this.targetedPlayersForAttribute && this.targetedPlayersForAttribute.length) {
                return baseActionText + this.getActionTextDependingOnTargets();
            }
            return `${baseActionText}...`;
        },
        card() {
            return this.play.card ? this.game.additionalCards.find(({ _id }) => _id === this.play.card) : null;
        },
        chooseSideActionText() {
            if (!this.play.side) {
                return this.$t("PlayFieldActionText.dog-wolf.wantsToChooseSide");
            }
            return this.$t(`PlayFieldActionText.dog-wolf.${this.play.side}`);
        },
        chooseCardActionText() {
            if (!this.card) {
                const noChosenCardTextKey = this.game.isFirstWaitingSkippableAction ? "no-choose-card" : "choose-card";
                return `${this.$t(`PlayFieldActionText.thief.${noChosenCardTextKey}`)}...`;
            }
            return `${this.$t(`PlayFieldActionText.thief.choose-card`)} ${this.$t(`Role.a.${this.card.role}`)}`;
        },
        isOneTargetPlayAndTargetingHimself() {
            if (this.game.expectedTargetsLength !== 1 || this.targetedPlayersForAttribute.length !== 1) {
                return false;
            }
            const player = this.game.getPlayerWithId(this.targetedPlayersForAttribute[0].player);
            return player && this.isPlayerTargetingHimself(player);
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
                        actionText += ` ${this.$t(`PlayFieldActionText.${firstWaiting.for}.self-targeting-${this.attribute}`)}`;
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
        cardSelected(payload) {
            this.$emit("card-selected", payload);
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

    #play-field-action-buttons-container {
        height: 40px;
    }

    .play-field-action-button {
        padding: 5px 10px;
        font-size: 1rem;
        cursor: pointer;
        color: #989898;
    }
</style>