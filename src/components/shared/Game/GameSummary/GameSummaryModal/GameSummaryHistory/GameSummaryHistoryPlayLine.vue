<template>
    <tr id="game-summary-history-line" class="row">
        <td class="col-lg-1 d-none d-lg-flex align-items-center justify-content-center">
            <img width="45" alt="Icon" :src="actionImageSource"/>
        </td>
        <td class="col-4 d-flex flex-column align-items-center justify-content-center">
            <div v-if="gameHistoryEntry.play.source.name === 'all'" class="d-flex flex-column align-items-center justify-content-center my-1">
                <RoleImage width="30" :role="gameHistoryEntry.play.source.name"/>
                <RoleText class="text-center small cursor-text" :role="gameHistoryEntry.play.source.name"/>
            </div>
            <div v-for="source of actionSource.players" v-else :key="source._id"
                 class="d-flex flex-column align-items-center justify-content-center my-1">
                <RoleImage width="30" :role="playerSourceRole(gameHistoryEntry, source)"/>
                <div class="text-center" v-html="source.name"/>
                <RoleText class="text-center small cursor-text" :role="playerSourceRole(gameHistoryEntry, source)"/>
            </div>
        </td>
        <td class="col-4 col-lg-3 d-flex flex-column align-items-center justify-content-center">
            <i class="fa fa-2x" :class="actionIconClass"/>
            <div class="text-center" v-html="actionText"/>
        </td>
        <td class="col-4 d-flex flex-column align-items-center justify-content-center">
            <div v-if="gameHistoryEntry.play.side" class="d-flex flex-column align-items-center justify-content-center my-1">
                <RoleImage width="30" :role="gameHistoryEntry.play.side"/>
                <RoleText class="text-center small cursor-text" :role="gameHistoryEntry.play.side"/>
            </div>
            <div v-else-if="gameHistoryEntry.play.card" class="d-flex flex-column align-items-center justify-content-center my-1">
                <RoleImage width="30" :role="gameHistoryEntry.play.card.role"/>
                <RoleText class="text-center small cursor-text" prefix="a" :role="gameHistoryEntry.play.card.role"/>
            </div>
            <div v-for="target of gameHistoryEntry.play.targets" v-else :key="target.player._id"
                 class="d-flex flex-column align-items-center justify-content-center my-1">
                <RoleImage width="30" :role="target.player.role.current"/>
                <div class="text-center" v-html="target.player.name"/>
                <RoleText class="text-center small cursor-text" :role="target.player.role.current"/>
            </div>
        </td>
        <div v-if="actionConsequences.length" class="w-100 font-italic p-1">
            <hr class="bg-dark my-1"/>
            <div class="font-weight-bold ml-2">
                <i class="fa fa-dice text-info mr-2"/>
                <span v-html="`${$t('GameSummaryHistoryPlayLine.remarksOnPlay')} :`"/>
            </div>
            <ul class="mb-2">
                <li v-for="actionConsequence of actionConsequences" :key="actionConsequence" v-html="actionConsequence"/>
            </ul>
        </div>
    </tr>
</template>

<script>
import { mapGetters } from "vuex";
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
import cupidCharmSVG from "@/assets/svg/actions/charm.svg";
import inLoveSVG from "@/assets/svg/attributes/in-love.svg";
import twoSistersSVG from "@/assets/svg/roles/two-sisters.svg";
import threeBrothersPNG from "@/assets/img/roles/three-brothers.png";
import worshipedSVG from "@/assets/svg/attributes/worshiped.svg";
import bigBadWolfSVG from "@/assets/svg/roles/big-bad-wolf.svg";
import piedPiperCharmSVG from "@/assets/svg/attributes/charmed.svg";
import cantVoteSVG from "@/assets/svg/attributes/cant-vote.svg";
import thiefSVG from "@/assets/svg/roles/thief.svg";
import stutteringJudgeSVG from "@/assets/svg/roles/stuttering-judge.svg";
import whiteWerewolfSVG from "@/assets/svg/roles/white-werewolf.svg";
import foxSVG from "@/assets/svg/roles/fox.svg";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";
import { insertIf } from "@/helpers/functions/Array";
import { areAllAdditionalCardsWerewolves } from "@/helpers/functions/Game";

export default {
    name: "GameSummaryHistoryPlayLine",
    components: { RoleText, RoleImage },
    props: {
        gameHistoryEntry: {
            type: GameHistory,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", {
            game: "game",
            gameOptions: "gameOptions",
        }),
        // eslint-disable-next-line max-lines-per-function
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
                "cupid": { charm: cupidCharmSVG },
                "lovers": { "meet-each-other": inLoveSVG },
                "two-sisters": { "meet-each-other": twoSistersSVG },
                "three-brothers": { "meet-each-other": threeBrothersPNG },
                "wild-child": { "choose-model": worshipedSVG },
                "big-bad-wolf": { eat: bigBadWolfSVG },
                "pied-piper": { charm: piedPiperCharmSVG },
                "charmed": { "meet-each-other": piedPiperCharmSVG },
                "scapegoat": { "ban-voting": cantVoteSVG },
                "thief": { "choose-card": thiefSVG },
                "stuttering-judge": { "choose-sign": stutteringJudgeSVG },
                "white-werewolf": { eat: whiteWerewolfSVG },
                "fox": { sniff: foxSVG },
            };
            return actionImageSource[play.source.name] ? actionImageSource[play.source.name][play.action] : undefined;
        },
        actionIconClass() {
            const { targets, votes, side, action, source, card } = this.gameHistoryEntry.play;
            if (action === "meet-each-other") {
                return source.name === "lovers" ? "fa-grin-hearts" : "fa-comments";
            } else if (action === "choose-sign") {
                return "fa-hand-spock";
            } else if (targets && targets.length || votes && votes.length || side || card) {
                return "fa-arrow-right";
            }
            return "fa-ban";
        },
        actionText() {
            const { targets, votes, side, card, action, source } = this.gameHistoryEntry.play;
            if (action !== "meet-each-other" && action !== "choose-sign" && (!targets || !targets.length) && (!votes || !votes.length) &&
                !side && !card) {
                return this.$t(`GameSummaryHistoryPlayLine.skipTurn`);
            } else if (action === "use-potion") {
                if (targets.length === 2) {
                    return this.$t(`GameSummaryHistoryPlayLine.actions.witch.use-potion.both`);
                } else if (targets[0].hasDrankLifePotion) {
                    return this.$t(`GameSummaryHistoryPlayLine.actions.witch.use-potion.life`);
                }
                return this.$t(`GameSummaryHistoryPlayLine.actions.witch.use-potion.death`);
            } else if (action === "eat" && source.name === "werewolves" && targets[0].isInfected) {
                return this.$t(`GameSummaryHistoryPlayLine.actions.vile-father-of-wolves.infect`);
            }
            return this.$tc(`GameSummaryHistoryPlayLine.actions.${source.name}.${action}`, source.players.length);
        },
        actionSource() {
            const { action, source, targets } = this.gameHistoryEntry.play;
            if (action === "eat" && source.name === "werewolves" && targets[0].isInfected) {
                return {
                    name: "vile-father-of-wolves",
                    players: [this.game.vileFatherOfWolvesPlayer],
                };
            }
            return source;
        },
        actionConsequences() {
            const { options, thiefAdditionalCards } = this.game;
            const { action, source, targets, votesResult, doesJudgeRequestAnotherVote } = this.gameHistoryEntry.play;
            const { isPowerlessIfMissesWerewolf } = this.gameOptions.roles.fox;
            const consequencesText = "GameSummaryHistoryPlayLine.consequences";
            return [
                ...insertIf(action === "protect" && targets[0].player.currentRole === "little-girl" && !options.roles.littleGirl.isProtectedByGuard,
                    this.$t(`${consequencesText}.littleGirlNotProtected`)),
                ...insertIf(action === "vote" && votesResult === "need-settlement", this.$t(`${consequencesText}.votesNeedSettlement`)),
                ...insertIf(action === "vote" && votesResult === "no-death", this.$t(`${consequencesText}.votesNoDeath`)),
                ...insertIf(action === "vote" && doesJudgeRequestAnotherVote, this.$t(`${consequencesText}.stutteringJudgeRequestedVote`)),
                ...insertIf(action === "eat" && source.name === "werewolves" && targets[0].isInfected &&
                    targets[0].isInfected.role.current === "pied-piper", this.$t(`${consequencesText}.piedPiperIsInfected`)),
                ...insertIf(action === "mark" && targets.length,
                    this.$t(`${consequencesText}.ravenMarked`, { markPenalty: options.roles.raven.markPenalty })),
                ...insertIf(action === "choose-card" && options.roles.thief.mustChooseBetweenWerewolves &&
                    areAllAdditionalCardsWerewolves(thiefAdditionalCards), this.$t(`${consequencesText}.thiefMustChooseCard`)),
                ...insertIf(action === "sniff" && targets.length && targets.some(({ player }) => player.isInWerewolvesSide),
                    this.$t(`${consequencesText}.foxFoundWerewolf`)),
                ...insertIf(action === "sniff" && targets.length && targets.every(({ player }) => player.isInVillagersSide &&
                    isPowerlessIfMissesWerewolf), this.$t(`${consequencesText}.foxDidntFindWerewolfAndBecamePowerless`)),
                ...insertIf(action === "sniff" && targets.length && targets.every(({ player }) => player.isInVillagersSide &&
                    !isPowerlessIfMissesWerewolf), this.$t(`${consequencesText}.foxDidntFindWerewolfAndDidntBecomePowerless`)),
            ];
        },
    },
    methods: {
        playerSourceRole(gameHistoryEntry, player) {
            return gameHistoryEntry.play.action === "choose-card" ? player.originalRole : player.currentRole;
        },
    },
};
</script>

<style scoped>

</style>