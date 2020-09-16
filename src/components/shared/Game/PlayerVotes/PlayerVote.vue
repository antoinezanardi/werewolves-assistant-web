<template>
    <div class="player-vote d-flex flex-column align-items-center p-2">
        <PlayerCard :player="player"/>
        <div class="mb-3 vote-for-text text-center">
            <span class="font-italic" v-html="$t('PlayerVote.voteFor')"/>
        </div>
        <VSelect :options="targetablePlayers" :placeholder="$t('PlayerVote.none')" :filter-by="filterBy"
                 label="name" @input="playerVotes">
            <template #selected-option="{ role, name }">
                <RoleImage :role="role.current" class="role-image-option mr-2"/>
                <span v-html="name"/>
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

export default {
    name: "PlayerVote",
    components: { RoleImage, PlayerCard },
    props: {
        player: {
            type: Player,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        targetablePlayers() {
            return this.game.alivePlayers.filter(({ name }) => name !== this.player.name);
        },
    },
    methods: {
        filterBy(option, label, search) {
            return option.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
        },
        playerVotes(target) {
            target = target ? target._id : null;
            const vote = { from: this.player._id, for: target };
            this.$emit("playerVotes", vote);
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