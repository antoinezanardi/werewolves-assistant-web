<template>
    <img v-tooltip="tooltip" alt="Attribute" class="player-attribute" :class="{ 'not-active': !isAttributeActive || !player.isAlive }"
         :src="playerAttribute.SVG"/>
</template>

<script>
import { mapGetters } from "vuex";
import { isPlayerAttributeActive } from "@/helpers/functions/Player";
import Player from "@/classes/Player";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";
import seenSVG from "@/assets/svg/actions/look.svg";
import eatenSVG from "@/assets/svg/attributes/eaten.svg";
import drankLifePotionSVG from "@/assets/svg/attributes/drank-life-potion.svg";
import drankDeathPotionSVG from "@/assets/svg/attributes/drank-death-potion.svg";
import protectedSVG from "@/assets/svg/attributes/protected.svg";
import ravenMarkedSVG from "@/assets/svg/attributes/raven-marked.svg";
import inLoveSVG from "@/assets/svg/attributes/in-love.svg";
import worshipedSVG from "@/assets/svg/attributes/worshiped.svg";
import bigBadWolfSVG from "@/assets/svg/roles/big-bad-wolf.svg";
import charmedSVG from "@/assets/svg/attributes/charmed.svg";
import cantVoteSVG from "@/assets/svg/attributes/cant-vote.svg";
import endlessSVG from "@/assets/svg/misc/endless.svg";
import hourglassSVG from "@/assets/svg/misc/hourglass.svg";
import chronometerSVG from "@/assets/svg/misc/chronometer.svg";
import deadSVG from "@/assets/svg/attributes/dead.svg";

export default {
    name: "PlayerAttribute",
    props: {
        player: {
            type: Player,
            required: true,
        },
        attribute: {
            type: Object,
            required: true,
        },
    },
    // eslint-disable-next-line max-lines-per-function
    data() {
        return {
            attributesMetadata: {
                "sheriff": {
                    all: {
                        tooltip: this.$t("PlayerAttribute.attributes.sheriff"),
                        SVG: sheriffSVG,
                    },
                    sheriff: {
                        tooltip: this.$t("PlayerAttribute.attributes.sheriff"),
                        SVG: sheriffSVG,
                    },
                },
                "seen": {
                    seer: {
                        tooltip: this.$t("PlayerAttribute.attributes.seen"),
                        SVG: seenSVG,
                    },
                },
                "eaten": {
                    "werewolves": {
                        tooltip: this.$t("PlayerAttribute.attributes.eatenByWerewolves"),
                        SVG: eatenSVG,
                    },
                    "big-bad-wolf": {
                        tooltip: this.$t("PlayerAttribute.attributes.eatenByBigBadWolf"),
                        SVG: bigBadWolfSVG,
                    },
                },
                "drank-life-potion": {
                    witch: {
                        tooltip: this.$t("PlayerAttribute.attributes.drankLifePotion"),
                        SVG: drankLifePotionSVG,
                    },
                },
                "drank-death-potion": {
                    witch: {
                        tooltip: this.$t("PlayerAttribute.attributes.drankDeathPotion"),
                        SVG: drankDeathPotionSVG,
                    },
                },
                "protected": {
                    guard: {
                        tooltip: this.$t("PlayerAttribute.attributes.protected"),
                        SVG: protectedSVG,
                    },
                },
                "raven-marked": {
                    raven: {
                        tooltip: this.$t("PlayerAttribute.attributes.ravenMarked"),
                        SVG: ravenMarkedSVG,
                    },
                },
                "in-love": {
                    cupid: {
                        tooltip: this.$t("PlayerAttribute.attributes.inLove"),
                        SVG: inLoveSVG,
                    },
                },
                "worshiped": {
                    "wild-child": {
                        tooltip: this.$t("PlayerAttribute.attributes.worshiped"),
                        SVG: worshipedSVG,
                    },
                },
                "charmed": {
                    "pied-piper": {
                        tooltip: this.$t("PlayerAttribute.attributes.charmed"),
                        SVG: charmedSVG,
                    },
                },
                "cant-vote": {
                    scapegoat: {
                        tooltip: this.$t("PlayerAttribute.attributes.cantVoteByScapegoat"),
                        SVG: cantVoteSVG,
                    },
                    all: {
                        tooltip: this.$t("PlayerAttribute.attributes.cantVoteByAll"),
                        SVG: cantVoteSVG,
                    },
                },
            },
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        playerAttribute() {
            const { name, source } = this.attribute;
            if (this.attributesMetadata[name] && this.attributesMetadata[name][source]) {
                return this.attributesMetadata[name][source];
            }
            return {};
        },
        tooltip() {
            return {
                content: `
                            <div class="d-flex align-items-center">
                                <img width="30" alt="Player Attribute" src="${this.playerAttribute.SVG}" class="mr-1"/>
                                <div class="text-center flex-grow-1">${this.playerAttribute.tooltip}</div>
                            </div>
                            <hr class="my-1 bg-dark"/>
                            <div class="d-flex align-items-center">
                                <img width="30" alt="Player Attribute Remaining Phases" src="${this.tooltipDescription.icon}"
                                     class="mr-1"/>
                                <div class="text-center flex-grow-1">${this.tooltipDescription.text}</div>
                            </div>
                        `,
                container: false,
            };
        },
        tooltipDescription() {
            const { remainingPhases, activeAt } = this.attribute;
            if (!this.player.isAlive) {
                return {
                    text: this.$t("PlayerAttribute.attributeInactiveBecauseDead"),
                    icon: deadSVG,
                };
            } else if (!this.isAttributeActive && activeAt) {
                const description = { icon: chronometerSVG };
                if (this.game.turn === activeAt.turn) {
                    description.text = this.$t("PlayerAttribute.attributeWillBeActiveWhenSunRises");
                } else {
                    const remainingTurns = activeAt.turn - this.game.turn;
                    description.text = this.$tc("PlayerAttribute.remainingTurnsToBeActive", remainingTurns, { remainingTurns });
                }
                return description;
            } else if (remainingPhases) {
                return {
                    text: this.$tc("PlayerAttribute.remainingPhases", remainingPhases, { remainingPhases }),
                    icon: hourglassSVG,
                };
            }
            return {
                text: this.$t("PlayerAttribute.endlessAttribute"),
                icon: endlessSVG,
            };
        },
        isAttributeActive() {
            return isPlayerAttributeActive(this.attribute, this.game);
        },
    },
};
</script>

<style lang="scss" scoped>
    .player-attribute {
        width: 23px;
        height: 23px;
        border: 2px solid grey;
        border-radius: 5px;
        margin: 1px;
        cursor: pointer;
        transition: all 0.25s ease;

        &:hover {
            border-color: #D4D4D4;
        }

        &.not-active {
            filter: grayscale(1);
        }
    }

    .gold-color {
        color: #FFC107;
    }
</style>