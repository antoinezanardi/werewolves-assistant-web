<template>
    <div class="player-vote d-flex flex-column align-items-center p-2">
        <PlayerCard :game="game" :player="player"/>
        <div class="mb-3 vote-for-text text-center">
            <i class="fa fa-chevron-down mr-2"/>
            <span v-html="$t('PlayerVote.voteFor')"/>
        </div>
        <VSelect :options="targetablePlayers" :placeholder="$t('PlayerVote.none')" :filter-by="filterBy" label="name"
                 @input="playerVotes">
            <template #selected-option="player">
                <RoleImage :role="player.role.current" class="role-image-option mr-2"/>
                <span v-html="player.name"/>
            </template>
            <template #option="player">
                <RoleImage :role="player.role.current" class="role-image-option mr-2"/>
                <span class="text-truncate" v-html="player.name"/>
            </template>
            <template #no-options>
                <i class="fa fa-ban mr-2"/>
                <span v-html="$t('VSelect.noOption')"/>
            </template>
        </VSelect>
    </div>
</template>

<script>
import Player from "../../../../classes/Player";
import Game from "../../../../classes/Game";
import PlayerCard from "../PlayerCard";
import RoleImage from "../RoleImage";

export default {
    name: "PlayerVote",
    components: { RoleImage, PlayerCard },
    props: {
        game: {
            type: Game,
            required: true,
        },
        player: {
            type: Player,
            required: true,
        },
    },
    computed: {
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