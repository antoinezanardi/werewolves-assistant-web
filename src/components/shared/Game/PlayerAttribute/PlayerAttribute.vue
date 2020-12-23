<template>
    <img v-tooltip="tooltip" alt="Attribute" class="player-attribute" :src="playerAttribute.SVG"/>
</template>

<script>
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

export default {
    name: "PlayerAttribute",
    props: {
        attribute: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
    },
    // eslint-disable-next-line max-lines-per-function
    data() {
        return {
            attributes: {
                "sheriff": {
                    all: {
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
            },
        };
    },
    computed: {
        playerAttribute() {
            if (this.attributes[this.attribute] && this.attributes[this.attribute][this.source]) {
                return this.attributes[this.attribute][this.source];
            }
            return {};
        },
        tooltip() {
            return {
                content: `<div class="mb-2">
                                ${this.playerAttribute.tooltip}
                          </div>
                          <img width="50" alt="Player Attribute" src="${this.playerAttribute.SVG}"/>`,
            };
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
    }

    .gold-color {
        color: #FFC107;
    }
</style>