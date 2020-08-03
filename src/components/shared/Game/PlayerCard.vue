<template>
    <div class="player-card d-flex flex-column align-items-center"
         :class="{ 'selectable': selectable, 'selected': selected }" ref="playerCard">
        <PlayerThumbnail :game="game" :player="player" :size="size" :class="{ 'player-card-thumbnail-selected': selected }"
                         @rolePicked="rolePicked" @unsetPlayer="unsetPlayer" @click.native="togglePlayerSelected"/>
        <div class="player-card-name text-center" :class="{ 'player-card-name-lg': size === 'lg' }"
             v-html="player.name" @click="togglePlayerSelected"/>
        <div v-if="!game._id" class="player-card-role small text-center text-muted d-flex align-items-center">
            <i v-if="player.role.current" v-tooltip="$t('PlayerCard.unsetRole')" @click="unsetRole"
               class="fa fa-times-circle mr-1 unset-role-button"/>
            <RoleText class="text-truncate" :role="player.role.current"/>
        </div>
    </div>
</template>

<script>
import Player from "../../../classes/Player";
import Game from "../../../classes/Game";
import PlayerThumbnail from "./PlayerThumbnail";
import RoleText from "@/components/shared/Game/Role/RoleText";

export default {
    name: "PlayerCard",
    components: { RoleText, PlayerThumbnail },
    props: {
        game: {
            type: Game,
            required: true,
        },
        player: {
            type: Player,
            required: true,
        },
        size: {
            type: String,
            default: "md",
        },
        selectable: {
            type: Boolean,
            default: false,
        },
        selected: {
            type: Boolean,
            default: false,
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
        togglePlayerSelected() {
            if (this.selectable) {
                this.$emit("playerSelected", { player: this.player, selected: !this.selected });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .player-card {
        padding: 5px;

        &.selectable {
            .player-card-name {
                cursor: pointer;
            }
        }

        &.selected {
            .player-card-name {
                font-weight: 700;
            }
        }
    }

    .player-card-name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.player-card-name-lg {
            font-size: 2rem;
            font-weight: 500;
        }
    }

    .unset-role-button {
        cursor: pointer;
        font-size: 0.75rem;
    }
</style>