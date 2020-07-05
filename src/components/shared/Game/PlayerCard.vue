<template>
    <div class="player-card d-flex flex-column align-items-center">
        <PlayerThumbnail :game="game" :player="player" @rolePicked="rolePicked" @unsetPlayer="unsetPlayer"/>
        <div class="player-card-name text-center" v-html="player.name"/>
        <div v-if="!game._id" class="player-card-role text-center text-muted d-flex align-items-center">
            <i v-if="player.role.current" v-tooltip="$t('PlayerCard.unsetRole')" @click="unsetRole"
               class="fa fa-times-circle mr-1 unset-role-button"/>
            <span v-html="playerRole"/>
        </div>
    </div>
</template>

<script>
import Player from "../../../classes/Player";
import Game from "../../../classes/Game";
import PlayerThumbnail from "./PlayerThumbnail";

export default {
    name: "PlayerCard",
    components: { PlayerThumbnail },
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
        playerRole() {
            return this.player.role.current ? this.$t(`Role.${this.player.role.current}`) : this.$t(`PlayerCard.pickRole`);
        },
    },
    methods: {
        unsetPlayer() {
            this.$emit("unsetPlayer", this.player.name);
        },
        unsetRole() {
            this.$emit("unsetRole", this.player.name);
        },
        rolePicked(payload) {
            this.$emit("rolePicked", payload);
        },
    },
};
</script>

<style lang="scss" scoped>
    .player-card {
        padding: 5px;
    }

    .player-card-name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .unset-role-button {
        cursor: pointer;
        font-size: 0.75rem;
    }
</style>