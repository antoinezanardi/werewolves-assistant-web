<template>
    <i v-tooltip="voterTooltip" class="fa fa-user mx-1"/>
</template>

<script>
import { mapGetters } from "vuex";
import Player from "@/classes/Player";

export default {
    name: "PlayerVoter",
    props: {
        player: {
            type: Player,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        voterTooltip() {
            if (this.game.firstWaiting.to === "vote") {
                return this.$t("PlayerVoter.voterWantsThisPlayerToBeHanged", this.player);
            }
            return this.$t("PlayerVoter.voterWantsThisPlayerToBeSheriff", this.player);
        },
    },
};
</script>

<style scoped>

</style>