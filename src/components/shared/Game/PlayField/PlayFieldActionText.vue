<template>
    <div class="row">
        <div class="col-12 text-center align-items-center">
            <transition name="translate-down-fade" mode="out-in">
                <h3 id="play-field-action-text" :key="actionText" v-html="actionText"/>
            </transition>
            <div id="cancel-player-target-container" class="d-flex align-items-center justify-content-center">
                <CancelPlayerTarget :attribute="attribute" :targeted-player="targetedPlayer"
                                    @playerSelected="playerSelected"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CancelPlayerTarget from "./CancelPlayerTarget";

export default {
    name: "PlayFieldActionText",
    components: { CancelPlayerTarget },
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
        ...mapGetters("game", {
            game: "game",
        }),
        // eslint-disable-next-line max-lines-per-function
        attributeTexts() {
            return {
                "seen": {
                    notTargeted: `${this.$t("PlayFieldActionText.wantsToLook")} ...`,
                    targeted: this.$t("PlayFieldActionText.wantsToLook"),
                },
                "eaten": {
                    notTargeted: `${this.$tc("PlayFieldActionText.wantToEat", this.game.aliveWerewolfPlayers.length)} ...`,
                    targeted: this.$tc("PlayFieldActionText.wantToEat", this.game.aliveWerewolfPlayers.length),
                },
                "drank-life-potion": {
                    notTargeted: this.$t("PlayFieldActionText.doesntWantToUseLifePotion"),
                    targeted: this.$t("PlayFieldActionText.wantsToUseLifePotionOn"),
                    selfTargeted: this.$t("PlayFieldActionText.wantsToUseLifePotionOnHerself"),
                },
                "drank-death-potion": {
                    notTargeted: this.$t("PlayFieldActionText.doesntWantToUseDeathPotion"),
                    targeted: this.$t("PlayFieldActionText.wantsToUseDeathPotionOn"),
                    selfTargeted: this.$t("PlayFieldActionText.wantsToUseDeathPotionOnHerself"),
                },
                "protected": {
                    notTargeted: `${this.$t("PlayFieldActionText.wantsToProtect")} ...`,
                    targeted: this.$t("PlayFieldActionText.wantsToProtect"),
                    selfTargeted: this.$t("PlayFieldActionText.wantsToProtectHimself"),
                },
                "raven-marked": {
                    notTargeted: this.$t("PlayFieldActionText.doesntWantToRavenMark"),
                    targeted: this.$t("PlayFieldActionText.wantsToRavenMark"),
                    selfTargeted: this.$t("PlayFieldActionText.wantsToRavenMarkHimself"),
                },
                "chosen-for-vote": {
                    notTargeted: `${this.$t("PlayFieldActionText.choosesToHang")} ...`,
                    targeted: this.$t("PlayFieldActionText.choosesToHang"),
                    selfTargeted: this.$t("PlayFieldActionText.choosesToHangHimself"),
                },
                "delegate": {
                    notTargeted: `${this.$t("PlayFieldActionText.wantsToDelegateTo")} ...`,
                    targeted: this.$t("PlayFieldActionText.wantsToDelegateTo"),
                },
                "shoot": {
                    notTargeted: `${this.$t("PlayFieldActionText.wantsToShoot")} ...`,
                    targeted: this.$t("PlayFieldActionText.wantsToShoot"),
                },
            };
        },
        isPlayerTargetingHimself() {
            return this.targetedPlayer &&
                (this.attribute === "drank-life-potion" || this.attribute === "drank-death-potion") && this.targetedPlayer.role.current === "witch" ||
                this.attribute === "protected" && this.targetedPlayer.role.current === "guard" ||
                this.attribute === "raven-marked" && this.targetedPlayer.role.current === "raven"||
                this.attribute === "chosen-for-vote" && this.targetedPlayer.hasAttribute("sheriff");
        },
        targetedPlayer() {
            if (this.play.targets.length) {
                const target = this.play.targets.find(target => target.attribute === this.attribute);
                return target ? this.game.players.find(player => player._id === target.player) : null;
            } else {
                return null;
            }
        },
        actionText() {
            if (this.targetedPlayer) {
                if (this.isPlayerTargetingHimself) {
                    return this.$t(this.attributeTexts[this.attribute].selfTargeted);
                } else {
                    return `${this.attributeTexts[this.attribute].targeted} ${this.targetedPlayer.name}`;
                }
            } else {
                return this.attributeTexts[this.attribute].notTargeted;
            }
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
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