<template>
    <img v-tooltip="tooltip" alt="Attribute" class="player-attribute" :src="attributes[attribute].SVG"/>
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
                    tooltip: this.$t("PlayerAttribute.attributes.sheriff"),
                    SVG: sheriffSVG,
                },
                "seen": {
                    tooltip: this.$t("PlayerAttribute.attributes.seen"),
                    SVG: seenSVG,
                },
                "eaten": {
                    tooltip: this.$t("PlayerAttribute.attributes.eaten"),
                    SVG: eatenSVG,
                },
                "drank-life-potion": {
                    tooltip: this.$t("PlayerAttribute.attributes.drankLifePotion"),
                    SVG: drankLifePotionSVG,
                },
                "drank-death-potion": {
                    tooltip: this.$t("PlayerAttribute.attributes.drankDeathPotion"),
                    SVG: drankDeathPotionSVG,
                },
                "protected": {
                    tooltip: this.$t("PlayerAttribute.attributes.protected"),
                    SVG: protectedSVG,
                },
                "raven-marked": {
                    tooltip: this.$t("PlayerAttribute.attributes.ravenMarked"),
                    SVG: ravenMarkedSVG,
                },
                "in-love": {
                    tooltip: this.$t("PlayerAttribute.attributes.inLove"),
                    SVG: inLoveSVG,
                },
            },
        };
    },
    computed: {
        tooltip() {
            return {
                content: `<div class="mb-2">
                                ${this.attributes[this.attribute].tooltip}
                          </div>
                          <img width="50" src="${this.attributes[this.attribute].SVG}"/>`,
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