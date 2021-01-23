<template>
    <div :id="`player-vote-${player._id}`" class="player-vote d-flex flex-column align-items-center p-2">
        <PlayerCard :player="player" :is-nominated="isNominated"/>
        <div class="mb-3 vote-for-text text-center">
            <span class="font-italic" v-html="$t('PlayerVote.voteFor')"/>
        </div>
        <VSelect :options="targetablePlayers" :placeholder="$t('PlayerVote.none')" :filter="filterByPlayerName"
                 label="name" @input="playerVotes">
            <template #selected-option="{ role, name }">
                <RoleImage :role="role.current" class="role-image-option mr-2"/>
                <span class="text-truncate" v-html="name"/>
            </template>
            <template #option="{ role, name }">
                <RoleImage :role="role.current" class="role-image-option mr-2"/>
                <span class="text-truncate" v-html="name"/>
            </template>
            <template #no-options>
                <i class="fa fa-ban mr-2"/>
                <span v-html="$t('VSelect.noOption')"/>
            </template>
        </VSelect>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Player from "@/classes/Player";
import PlayerCard from "../PlayerCard";
import RoleImage from "../Role/RoleImage";
import { getNominatedPlayers } from "@/helpers/functions/Player";
import { fuseSearch } from "@/helpers/functions/VSelect";

export default {
    name: "PlayerVote",
    components: { RoleImage, PlayerCard },
    props: {
        player: {
            type: Player,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        targetablePlayers() {
            return this.game.alivePlayers.filter(({ name }) => name !== this.player.name);
        },
        isNominated() {
            const nominatedPlayers = getNominatedPlayers(this.play.votes, this.game, this.game.firstWaiting.to);
            return nominatedPlayers ? !!nominatedPlayers.find(({ _id }) => _id === this.player._id) : undefined;
        },
    },
    methods: {
        filterByPlayerName(option, search) {
            return fuseSearch(option, search, ["name"]);
        },
        playerVotes(target) {
            target = target ? target._id : null;
            const vote = { from: this.player._id, for: target };
            this.$emit("player-votes", vote);
        },
    },
};
</script>

<style scoped>
    .vote-for-text {
        width: 100%;
        color: #999999;
        padding: 3px 6px;
    }

    .role-image-option {
        width: 22px;
        border: 1px solid grey;
    }
</style>