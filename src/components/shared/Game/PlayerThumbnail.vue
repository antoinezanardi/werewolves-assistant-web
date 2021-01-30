<template>
    <span class="player-card-thumbnail" :class="playerThumbnailClasses">
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
                <transition name="fade" mode="out-in">
                    <img v-if="player.isRoleRevealed && player.isAlive" class="player-thumbnail-icon" :src="SVGs.roleRevealed" alt="Role revealed"/>
                    <img v-else-if="player.isAlive === false" class="player-thumbnail-icon" :src="SVGs.dead" alt="Role revealed"/>
                </transition>
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
import roleRevealed from "@/assets/svg/actions/look.svg";
import dead from "@/assets/svg/attributes/dead.svg";

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
            SVGs: {
                roleRevealed,
                dead,
            },
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        playerThumbnailClasses() {
            return {
                "player-card-thumbnail-lg": this.size === "lg",
                "dead-player-card": this.player.isAlive === false,
                "revealed-player-card": this.player.isAlive && this.player.isRoleRevealed,
            };
        },
        playerThumbnailTooltip() {
            if (this.game._id || this.player.role.current) {
                let content = `<div>${this.$tc(`Role.${this.player.role.current}`, 1)}</div>`;
                if (this.player.isAlive === false) {
                    content += `<hr class="bg-dark my-1"/><div>${this.$t("PlayerThumbnail.thisPlayerIsDead")}</div>`;
                } else if (this.player.isRoleRevealed) {
                    content += `<hr class="bg-dark my-1"/><div>${this.$t("PlayerThumbnail.thisPlayerRoleIsRevealed")}</div>`;
                }
                return { content };
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

    &:hover {
        border-color: #D4D4D4;
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

.player-thumbnail-icon {
    width: 25px;
    bottom: 0;
    right: 0;
    position: absolute;
}
</style>