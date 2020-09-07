<template>
    <span class="player-card-thumbnail" :class="{ 'player-card-thumbnail-lg': size === 'lg', 'dead-player-card': player.isAlive === false }">
        <i v-if="!game._id" v-tooltip="$t('PlayerThumbnail.unsetPlayer')" class="fa fa-times-circle unset-player-button"
           @click="unsetPlayer"/>
        <v-popover ref="thumbnailPopover" :disabled="!!game._id" placement="left">
            <VueFlip v-model="flipped" v-tooltip="playerThumbnailTooltip" height="100%" width="100%">
                <template #front>
                    <RoleImage :role="thumbnail.front"/>
                </template>
                <template #back>
                    <RoleImage :role="thumbnail.back"/>
                </template>
            </VueFlip>
            <RolePicker slot="popover" :player="player" @rolePicked="rolePicked"/>
        </v-popover>
    </span>
</template>

<script>
import { mapGetters } from "vuex";
import Player from "../../../classes/Player";
import RolePicker from "./RolePicker";
import RoleImage from "./Role/RoleImage";

export default {
    name: "PlayerThumbnail",
    components: { RoleImage, RolePicker },
    props: {
        player: {
            type: Player,
            required: true,
        },
        size: {
            type: String,
            default: "md",
        },
    },
    data() {
        return {
            flipped: false,
            thumbnail: {
                front: undefined,
                back: undefined,
            },
        };
    },
    computed: {
        ...mapGetters("game", {
            game: "game",
        }),
        playerThumbnailTooltip() {
            return this.game._id || this.player.role.current ? this.$tc(`Role.${this.player.role.current}`, 1) : this.$t("PlayerThumbnail.chooseRole");
        },
    },
    watch: {
        "player.role.current"(newRole, oldRole) {
            if (newRole !== oldRole) {
                this.changeRole(newRole);
            }
        },
    },
    created() {
        if (this.player.role.current) {
            this.thumbnail.front = this.player.role.current;
        }
    },
    methods: {
        changeRole(newRole) {
            if (!this.flipped) {
                this.thumbnail.back = newRole;
                this.flipped = true;
            } else {
                this.thumbnail.front = newRole;
                this.flipped = false;
            }
        },
        showRolePicker() {
            this.$refs.thumbnailPopover.show();
        },
        rolePicked(role) {
            this.$refs.thumbnailPopover.hide();
            this.$emit("rolePicked", { name: this.player.name, role });
        },
        unsetPlayer() {
            this.$emit("unsetPlayer", this.player.name);
        },
    },
};
</script>

<style lang="scss" scoped>
.player-card-thumbnail {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border: 3px solid grey;
    border-radius: 5px;
    position: relative;
    transition: all 0.25s ease;

    &:hover {
        border-color: #D4D4D4;
    }

    &.player-card-thumbnail-lg {
        width: 100px;
        height: 100px;
    }

    &.player-card-thumbnail-selected {
        border-color: white;
        width: 70px;
        height: 70px;
    }

    &.dead-player-card {
        img {
            filter: grayscale(1);
        }
    }

    img {
        filter: grayscale(0);
        transition: all 0.25s linear;
    }
}

.unset-player-button {
    cursor: pointer;
    position: absolute;
    right: -15px;
    top: -15px;
}
</style>