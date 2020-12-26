<template>
    <tr id="game-summary-history-line" class="row">
        <td class="col-2 d-flex flex-column justify-content-center align-items-center">
            <i class="fa" :class="phaseClasses"/>
            <div class="text-center" v-html="phaseText"/>
        </td>
        <td class="col-md-1 d-none d-md-flex align-items-center justify-content-center">
            <img width="45" alt="Icon" :src="actionImageSource"/>
        </td>
        <td class="col-3 d-flex flex-column align-items-center justify-content-center">
            <RoleImage width="30" :role="gameHistoryEntry.play.source"/>
            <RoleText class="text-center" :role="gameHistoryEntry.play.source" prefix="the"/>
        </td>
        <td class="col-4 col-md-3 d-flex flex-column align-items-center justify-content-center">
            <i class="fa fa-2x" :class="actionIconClass"/>
            <div class="text-center" v-html="actionText"/>
        </td>
        <td class="col-3 d-flex flex-column align-items-center justify-content-center">
            <div v-if="gameHistoryEntry.play.side" class="d-flex flex-column align-items-center justify-content-center my-1">
                <RoleImage width="30" :role="gameHistoryEntry.play.side"/>
                <RoleText class="text-center small" :role="gameHistoryEntry.play.side"/>
            </div>
            <div v-for="target of gameHistoryEntry.play.targets" v-else :key="target.player._id"
                 class="d-flex flex-column align-items-center justify-content-center my-1">
                <RoleImage width="30" :role="target.player.role.current"/>
                <div class="text-truncate" v-html="target.player.name"/>
                <RoleText class="text-center small" :role="target.player.role.current"/>
            </div>
        </td>
    </tr>
</template>

<script>
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
import chooseSideSVG from "@/assets/svg/actions/choose-side.svg";
import charmSVG from "@/assets/svg/actions/charm.svg";
import inLoveSVG from "@/assets/svg/attributes/in-love.svg";
import twoSistersSVG from "@/assets/svg/roles/two-sisters.svg";
import threeBrothersPNG from "@/assets/img/roles/three-brothers.png";
import worshipedSVG from "@/assets/svg/attributes/worshiped.svg";
import bigBadWolfSVG from "@/assets/svg/roles/big-bad-wolf.svg";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";

export default {
    name: "GameSummaryHistoryLine",
    components: { RoleText, RoleImage },
    props: {
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
            }
            return `${this.$t("GameSummaryHistoryLine.night")} ${turn}`;
        },
        actionImageSource() {
            const { play } = this.gameHistoryEntry;
            const actionImageSource = {
                "werewolves": { eat: eatenSVG },
                "witch": { "use-potion": deathPotionSVG },
                "seer": { look: seenSVG },
                "guard": { protect: protectedSVG },
                "hunter": { shoot: shootSVG },
                "raven": { mark: ravenMarkedSVG },
                "all": {
                    "vote": voteSVG,
                    "elect-sheriff": sheriffSVG,
                },
                "sheriff": {
                    "settle-votes": settleVotesSVG,
                    "delegate": sheriffSVG,
                },
                "dog-wolf": { "choose-side": chooseSideSVG },
                "cupid": { charm: charmSVG },
                "lovers": { "meet-each-other": inLoveSVG },
                "two-sisters": { "meet-each-other": twoSistersSVG },
                "three-brothers": { "meet-each-other": threeBrothersPNG },
                "wild-child": { "choose-model": worshipedSVG },
                "big-bad-wolf": { eat: bigBadWolfSVG },
            };
            return actionImageSource[play.source] ? actionImageSource[play.source][play.action] : undefined;
        },
        actionIconClass() {
            const { targets, votes, side, action, source } = this.gameHistoryEntry.play;
            if (action === "meet-each-other") {
                return source === "lovers" ? "fa-grin-hearts" : "fa-comments";
            } else if (targets && targets.length || votes && votes.length || side) {
                return "fa-arrow-right";
            }
            return "fa-ban";
        },
        actionText() {
            const { targets, votes, side, action, source } = this.gameHistoryEntry.play;
            if (action !== "meet-each-other" && (!targets || !targets.length) && (!votes || !votes.length) && !side) {
                return this.$t(`GameSummaryHistoryLine.skipTurn`);
            } else if (this.gameHistoryEntry.play.action === "use-potion") {
                if (targets.length === 2) {
                    return this.$t(`GameSummaryHistoryLine.actions.witch.use-potion.both`);
                } else if (targets[0].potion.life) {
                    return this.$t(`GameSummaryHistoryLine.actions.witch.use-potion.life`);
                }
                return this.$t(`GameSummaryHistoryLine.actions.witch.use-potion.death`);
            }
            return this.$t(`GameSummaryHistoryLine.actions.${source}.${action}`);
        },
    },
};
</script>

<style scoped>

</style>