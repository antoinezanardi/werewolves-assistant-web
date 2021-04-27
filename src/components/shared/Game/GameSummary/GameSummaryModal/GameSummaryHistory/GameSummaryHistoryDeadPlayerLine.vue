<template>
    <tr class="row">
        <td class="d-none d-lg-flex col-lg-1 align-items-center justify-content-center">
            <img width="45" alt="Death Icon" :src="SVGs.dead"/>
        </td>
        <td class="col-6 col-lg-4 d-flex flex-column justify-content-center align-items-center">
            <RoleImage width="30" :role="deadPlayer.role.current"/>
            <div class="text-center" v-html="deadPlayer.name"/>
            <RoleText class="text-center small cursor-text" :role="deadPlayer.role.current"/>
        </td>
        <td class="col-6 col-lg-7 d-flex flex-column align-items-center justify-content-center">
            <img width="30" alt="Death Icon" :src="deathIcon"/>
            <span class="text-center" v-html="deathText"/>
        </td>
        <div v-if="deathConsequences.length" class="w-100 font-italic p-1">
            <hr class="bg-dark my-1"/>
            <div class="font-weight-bold ml-2">
                <i class="fa fa-skull-crossbones text-danger mr-2"/>
                <span v-html="`${$t('GameSummaryHistoryDeadPlayerLine.remarksOnDeath')} :`"/>
            </div>
            <ul class="mb-2">
                <li v-for="deathConsequence of deathConsequences" :key="deathConsequence" v-html="deathConsequence"/>
            </ul>
        </div>
    </tr>
</template>

<script>
import { mapGetters } from "vuex";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";
import dead from "@/assets/svg/attributes/dead.svg";
import eaten from "@/assets/svg/attributes/eaten.svg";
import bigBadWolf from "@/assets/svg/roles/big-bad-wolf.svg";
import vote from "@/assets/svg/actions/vote.svg";
import deathPotion from "@/assets/svg/attributes/drank-death-potion.svg";
import shoot from "@/assets/svg/actions/shoot.svg";
import inLove from "@/assets/svg/attributes/in-love.svg";
import whiteWerewolf from "@/assets/svg/roles/white-werewolf.svg";
import GameHistory from "@/classes/GameHistory";
import Player from "@/classes/Player";
import { insertIf } from "@/helpers/functions/Array";

export default {
    name: "GameSummaryHistoryDeadPlayerLine",
    components: { RoleText, RoleImage },
    props: {
        gameHistoryEntry: {
            type: GameHistory,
            required: true,
        },
        deadPlayer: {
            type: Player,
            required: true,
        },
        firstDeadWerewolfNotBigBadWolfPlayer: {
            type: Player,
            default: undefined,
        },
        isBigBadWolfFirstWerewolfToDie: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            SVGs: { dead },
            murderIcons: {
                "all": {
                    vote,
                    reconsider: vote,
                },
                "werewolves": { eat: eaten },
                "big-bad-wolf": { eat: bigBadWolf },
                "white-werewolf": { eat: whiteWerewolf },
                "witch": { "use-potion": deathPotion },
                "hunter": { shoot },
                "cupid": { charm: inLove },
                "sheriff": { "settle-votes": vote },
            },
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        deathText() {
            const { murdered } = this.deadPlayer;
            return this.$t(`GameSummaryHistoryDeadPlayerLine.murder.${murdered.by}.${murdered.of}`);
        },
        deathIcon() {
            const { murdered } = this.deadPlayer;
            return this.murderIcons[murdered.by] ? this.murderIcons[murdered.by][murdered.of] : undefined;
        },
        deathConsequences() {
            const { wildChildPlayer, bigBadWolfPlayer, options } = this.game;
            const { action, targets } = this.gameHistoryEntry.play;
            const consequencesText = "GameSummaryHistoryDeadPlayerLine.consequences";
            return [
                ...insertIf(action === "vote" && this.deadPlayer.currentRole === "scapegoat" && targets.length > 1,
                    this.$t(`${consequencesText}.scapegoatDiesForTie`)),
                ...insertIf(this.deadPlayer.currentRole === "idiot" && this.deadPlayer.hasAttribute("sheriff"),
                    this.$t(`${consequencesText}.idiotWontDelegate`)),
                ...insertIf(this.deadPlayer.currentRole === "ancient" && !!this.game.getPlayerWithAttributeAndSource("powerless", "ancient"),
                    this.$t(`${consequencesText}.ancientHadHisRevenge`)),
                ...insertIf(this.deadPlayer.hasAttribute("worshiped") && wildChildPlayer.side.current === "werewolves",
                    this.$t(`${consequencesText}.wildChildBecameWerewolf`)),
                ...insertIf(options.roles.bigBadWolf.isPowerlessIfWerewolfDies && bigBadWolfPlayer && !this.isBigBadWolfFirstWerewolfToDie &&
                    this.firstDeadWerewolfNotBigBadWolfPlayer === this.deadPlayer, this.$t(`${consequencesText}.bigBadWolfBecamePowerless`)),
            ];
        },
    },
};
</script>

<style scoped>

</style>