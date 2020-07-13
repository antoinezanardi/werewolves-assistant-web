<template>
    <div class="player-card d-flex flex-column align-items-center"
         :class="{ 'player-card-selectable': selectable, 'player-card-selected': selected }">
        <PlayerThumbnail :game="game" :player="player" :size="size" :class="{ 'player-card-thumbnail-selected': selected }"
                         @rolePicked="rolePicked" @unsetPlayer="unsetPlayer" @click.native="togglePlayerSelected"/>
        <div class="player-card-name text-center" :class="{ 'player-card-name-lg': size === 'lg' }"
             v-html="player.name" @click="togglePlayerSelected"/>
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
        size: {
            type: String,
            default: "md",
        },
        selectable: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selected: false,
        };
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
        togglePlayerSelected() {
            if (this.selectable) {
                this.selected = !this.selected;
                this.$emit("playerSelected", { player: this.player, selected: this.selected });
            }
        },
        unselectPlayer() {
            if (this.selectable) {
                this.selected = false;
                this.$emit("playerSelected", { player: this.player, selected: false });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .player-card {
        padding: 5px;

        &.player-card-selectable {
            .player-card-name {
                cursor: pointer;
            }
        }

        &.player-card-selected {
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