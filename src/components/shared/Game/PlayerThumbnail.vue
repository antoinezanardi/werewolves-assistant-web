<template>
    <span class="player-card-thumbnail" :class="{ 'player-card-thumbnail-lg': size === 'lg', 'dead-player-card': player.isAlive === false }">
        <i v-if="!game._id" v-tooltip="$t('PlayerThumbnail.unsetPlayer')" class="fa fa-times-circle unset-player-button"
           @click="unsetPlayer"/>
        <transition name="fade" mode="out-in">
            <img v-if="nominatedImageSource" v-tooltip="nominatedTooltipText"
                 class="nominated-player animate__animated animate__infinite animate__heartBeat animate__slow"
                 :src="nominatedImageSource" alt="Nominated Player"/>
        </transition>
        <VueFlip v-model="flipped" v-tooltip="playerThumbnailTooltip" height="100%" width="100%" @click.native="$emit('player-selected')">
            <template #front>
                <RoleImage :role="thumbnail.front"/>
            </template>
            <template #back>
                <RoleImage :role="thumbnail.back"/>
            </template>
        </VueFlip>
    </span>
</template>

<script>
import { mapGetters } from "vuex";
import Player from "@/classes/Player";
import RoleImage from "./Role/RoleImage";

export default {
    name: "PlayerThumbnail",
    components: { RoleImage },
    props: {
        player: {
            type: Player,
            required: true,
        },
        size: {
            type: String,
            default: "md",
        },
        isNominated: {
            type: Boolean,
            default: false,
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
        ...mapGetters("game", { game: "game" }),
        playerThumbnailTooltip() {
            if (this.game._id || this.player.role.current) {
                return this.$tc(`Role.${this.player.role.current}`, 1);
            }
            return this.$t("PlayerThumbnail.chooseRole");
        },
        nominatedImageSource() {
            const nominatedImageSources = {
                "elect-sheriff": require("@/assets/svg/attributes/sheriff.svg"),
                "vote": require("@/assets/svg/actions/vote.svg"),
            };
            return this.isNominated ? nominatedImageSources[this.game.firstWaiting.to] : undefined;
        },
        nominatedTooltipText() {
            return this.isNominated ? this.$t(`PlayerThumbnail.nominated.${this.game.firstWaiting.to}`) : undefined;
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
        unsetPlayer() {
            this.$emit("unset-player", this.player.name);
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
    border-radius: 8px;
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

.nominated-player {
    cursor: pointer;
    position: absolute;
    right: -15px;
    top: -15px;
    width: 30px;
    height: 30px;
    z-index: 10;
}
</style>