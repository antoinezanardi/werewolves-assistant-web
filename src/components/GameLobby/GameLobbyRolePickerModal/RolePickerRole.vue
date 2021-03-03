<template>
    <div class="role-picker-role">
        <div class="role-image-container" :class="{ selected }">
            <div v-if="role.name && game.isRoleInGame(role.name)"
                 v-tooltip="$t('RolePickerRole.totalInGameInThisRole')"
                 class="role-count-in-game badge badge-light">
                <i class="fa fa-chess-pawn mr-2"/>
                <span v-html="roleCountInGame"/>
            </div>
            <i v-if="!!role.minInGame && !role.minimumReached(game)"
               v-tooltip="$t('RolePickerRole.leftToStartGame', { lack: role.minInGame - roleCountInGame })"
               class="role-minimum-not-reached fa fa-exclamation-circle animate__animated animate__heartBeat animate__infinite"/>
            <RoleImage :role="role.name"/>
        </div>
        <div v-if="!role.name" class="cursor-pointer role-text">
            <i class="fa fa-random mr-1"/>
            <span class="font-italic" v-html="$t('RolePickerRole.random')"/>
        </div>
        <RoleText v-else class="role-text" :role="role.name" prefix="the"/>
    </div>
</template>

<script>
import RoleText from "@/components/shared/Game/Role/RoleText";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import Game from "@/classes/Game";
import Role from "@/classes/Role";

export default {
    name: "RolePickerRole",
    components: { RoleImage, RoleText },
    props: {
        game: {
            type: Game,
            required: true,
        },
        role: {
            type: Role,
            default: () => new Role(),
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        roleCountInGame() {
            return this.game.getPlayersWithRole(this.role.name).length;
        },
    },
};
</script>

<style lang="scss" scoped>

@import "../../../../node_modules/bootstrap/scss/bootstrap-grid";

.role-image-container {
    border: 3px solid grey;
    border-radius: 8px;
    margin: 3px;
    transition: all 0.25s ease;
    cursor: pointer;

    .role-count-in-game {
        position: absolute;
        right: 2px;
        top: 2px;
        opacity: 0.8;
        transition: all 0.25s ease;
        z-index: 1;

        &:hover {
            opacity: 1;
        }
    }

    .role-minimum-not-reached {
        position: absolute;
        left: 2px;
        top: 2px;
        opacity: 0.8;
        z-index: 1;
    }

    &:hover {
        border-color: #CACACA;
    }

    &.selected {
        border-color: #eeeeee;
    }
}

.role-text {
    font-size: 0.7rem;
    @include media-breakpoint-up(md) {
        font-size: 0.85rem;
    }
    @include media-breakpoint-up(lg) {
        font-size: 1rem;
    }
}
</style>