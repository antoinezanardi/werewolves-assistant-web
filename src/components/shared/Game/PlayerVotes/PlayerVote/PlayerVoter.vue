<template>
    <i v-tooltip="voterTooltip" class="fa mx-1" :class="voterClasses"/>
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
            let content;
            if (this.game.firstWaiting.to === "vote") {
                content = this.$t("PlayerVoter.voterWantsThisPlayerToBeHanged", this.player);
                if (this.hasVoterDoubleVote) {
                    content += `<hr class="bg-dark my-1"/><span class="font-italic">${this.$t("PlayerVoter.voteIsDoubled")}</span>`;
                }
            } else {
                content = this.$t("PlayerVoter.voterWantsThisPlayerToBeSheriff", this.player);
            }
            return { content };
        },
        voterClasses() {
            return this.player.hasActiveAttribute("sheriff", this.game) ? "fa-user text-warning" : "fa-user";
        },
        hasVoterDoubleVote() {
            return this.player.hasActiveAttribute("sheriff", this.game) && this.game.options.roles.sheriff.hasDoubledVote;
        },
    },
};
</script>

<style scoped>

</style>