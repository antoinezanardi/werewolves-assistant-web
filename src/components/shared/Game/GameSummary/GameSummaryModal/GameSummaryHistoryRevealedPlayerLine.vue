<template>
    <tr class="row">
        <td class="col-1 d-flex flex-column align-items-center justify-content-center">
            <img width="45" alt="Seen Icon" :src="SVGs.seen"/>
        </td>
        <td class="col-4 d-flex flex-column justify-content-center align-items-center">
            <RoleImage width="30" :role="revealedPlayer.role.current"/>
            <div class="text-center" v-html="revealedPlayer.name"/>
            <RoleText class="text-center small cursor-text" :role="revealedPlayer.role.current"/>
        </td>
        <td class="col-7 d-flex justify-content-center align-items-center">
            <span v-html="revealedText"/>
        </td>
    </tr>
</template>

<script>
import { mapGetters } from "vuex";
import RoleText from "@/components/shared/Game/Role/RoleText";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import Player from "@/classes/Player";
import seen from "@/assets/svg/actions/look.svg";

export default {
    name: "GameSummaryHistoryRevealedPlayerLine",
    components: { RoleText, RoleImage },
    props: {
        revealedPlayer: {
            type: Player,
            required: true,
        },
    },
    data() {
        return { SVGs: { seen } };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        revealedText() {
            return this.$t("GameSummaryHistoryRevealedPlayerLine.idiotRoleIsRevealed");
        },
    },
};
</script>

<style scoped>

</style>