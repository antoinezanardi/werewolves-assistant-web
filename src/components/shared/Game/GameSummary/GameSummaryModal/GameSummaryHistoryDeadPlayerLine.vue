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
import Player from "@/classes/Player";

export default {
    name: "GameSummaryHistoryDeadPlayerLine",
    components: { RoleText, RoleImage },
    props: {
        deadPlayer: {
            type: Player,
            required: true,
        },
    },
    data() {
        return {
            SVGs: { dead },
            murderIcons: {
                "all": { vote },
                "werewolves": { eat: eaten },
                "big-bad-wolf": { eat: bigBadWolf },
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
    },
};
</script>

<style scoped>

</style>