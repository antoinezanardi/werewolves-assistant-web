<template>
    <div ref="playerCard" class="player-card d-flex flex-column align-items-center w-100"
         :class="{ 'selectable': selectable, 'selected': selected }">
        <PlayerThumbnail ref="playerThumbnail" :player="player" :size="size"
                         :class="{ 'player-card-thumbnail-selected': selected }" @unsetPlayer="unsetPlayer"
                         @player-selected="togglePlayerSelected"/>
        <div class="player-card-name text-center" :class="{ 'player-card-name-lg': size === 'lg' }"
             @click="togglePlayerSelected" v-html="player.name"/>
        <div v-if="!game._id" class="player-card-role small text-center text-muted d-flex align-items-center">
            <i v-if="player.role.current" v-tooltip="$t('PlayerCard.unsetRole')"
               class="fa fa-times-circle mr-1 unset-role-button" @click="unsetRole"/>
            <RoleText class="text-truncate" :role="player.role.current"
                      @click.native="$emit('choose-role', player)"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Player from "@/classes/Player";
import PlayerThumbnail from "./PlayerThumbnail";
import RoleText from "@/components/shared/Game/Role/RoleText";

export default {
    name: "PlayerCard",
    components: { RoleText, PlayerThumbnail },
    props: {
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
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        unsetPlayer() {
            this.$emit("unsetPlayer", this.player.name);
        },
        unsetRole() {
            this.$emit("unsetRole", this.player.name);
        },
        togglePlayerSelected() {
            if (this.selectable) {
                this.$emit("playerSelected", { player: this.player, selected: !this.selected });
            } else if (!this.game._id) {
                this.$emit("choose-role", this.player);
            }
        },
    },
};
</script>

<style lang="scss">
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