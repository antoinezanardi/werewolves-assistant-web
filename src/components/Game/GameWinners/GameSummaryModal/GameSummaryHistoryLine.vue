<template>
    <tr id="game-summary-history-line" class="row">
        <td class="col-2 d-flex flex-column justify-content-center align-items-center">
            <i class="fa" :class="phaseClasses"/>
            <div class="text-center" v-html="phaseText"/>
        </td>
        <td class="col-1 d-flex align-items-center justify-content-center">
            <img width="45" alt="Icon" :src="actionImageSource"/>
        </td>
        <td class="col-3 d-flex flex-column align-items-center justify-content-center">
            <RoleImage width="30" :role="gameHistoryEntry.play.source"/>
            <RoleText class="text-center" :role="gameHistoryEntry.play.source"/>
        </td>
        <td class="col-3 d-flex flex-column align-items-center justify-content-center">
            <i class="fa fa-arrow-right fa-2x text-dark"/>
            <div class="text-center" v-html="$t(`GameSummaryHistoryLine.actions.${gameHistoryEntry.play.action}`)"/>
        </td>
        <td class="col-3 d-flex align-items-center justify-content-center">
            <div v-for="target of gameHistoryEntry.play.targets" :key="target.player._id"
                 class="d-flex flex-column align-items-center justify-content-center mx-1">
                <RoleImage width="30" :role="target.player.role.current"/>
                <div class="text-truncate" v-html="target.player.name"/>
                <RoleText class="text-center small" :role="target.player.role.current"/>
            </div>
        </td>
    </tr>
</template>

<script>
import Game from "@/classes/Game";
import GameHistory from "@/classes/GameHistory";
import eatenSVG from "@/assets/svg/attributes/eaten.svg";
import deathPotionSVG from "@/assets/svg/attributes/drank-death-potion.svg";
import seenSVG from "@/assets/svg/actions/look.svg";
import protectedSVG from "@/assets/svg/attributes/protected.svg";
import shootSVG from "@/assets/svg/actions/shoot.svg";
import ravenMarkedSVG from "@/assets/svg/attributes/raven-marked.svg";
import voteSVG from "@/assets/svg/actions/vote.svg";
import settleVotesSVG from "@/assets/svg/actions/settle-votes.svg";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";

export default {
    name: "GameSummaryHistoryLine",
    components: { RoleText, RoleImage },
    props: {
        game: {
            type: Game,
            required: true,
        },
        gameHistoryEntry: {
            type: GameHistory,
            required: true,
        },
    },
    computed: {
        phaseClasses() {
            return this.gameHistoryEntry.phase === "day" ? "fa-sun sun-color" : "fa-moon moon-color";
        },
        phaseText() {
            const { phase, turn } = this.gameHistoryEntry;
            if (phase === "day") {
                return `${this.$t("GameSummaryHistoryLine.day")} ${turn}`;
            } else {
                return `${this.$t("GameSummaryHistoryLine.night")} ${turn}`;
            }
        },
        actionImageSource() {
            const actionImageSource = {
                "eat": eatenSVG,
                "use-potion": deathPotionSVG,
                "look": seenSVG,
                "protect": protectedSVG,
                "shoot": shootSVG,
                "mark": ravenMarkedSVG,
                "vote": voteSVG,
                "settle-votes": settleVotesSVG,
                "delegate": sheriffSVG,
                "elect-sheriff": sheriffSVG,
            };
            return actionImageSource[this.gameHistoryEntry.play.action];
        },
    },
};
</script>

<style scoped>

</style>