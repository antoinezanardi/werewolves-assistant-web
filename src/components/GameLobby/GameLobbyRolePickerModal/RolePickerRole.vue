<template>
    <div class="role-picker-role">
        <div class="role-image-container" :class="{ selected }">
            <div v-if="game.isRoleInGame(roleName)"
                 v-tooltip="$t('RolePickerRole.totalInGameInThisRole')"
                 class="role-count-in-game badge badge-light">
                <i class="fa fa-chess-pawn mr-2"/>
                <span v-html="roleCountInGame"/>
            </div>
            <RoleImage :role="roleName"/>
        </div>
        <div v-if="roleName === 'back'" class="cursor-pointer">
            <i class="fa fa-random mr-1"/>
            <span class="font-italic" v-html="$t('RolePickerRole.random')"/>
        </div>
        <RoleText v-else :role="roleName"/>
    </div>
</template>

<script>
import RoleText from "@/components/shared/Game/Role/RoleText";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import Game from "@/classes/Game";

export default {
    name: "RolePickerRole",
    components: { RoleImage, RoleText },
    props: {
        game: {
            type: Game,
            required: true,
        },
        roleName: {
            type: String,
            required: true,
        },
        selected: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        roleCountInGame() {
            return this.game.getPlayersWithRole(this.roleName).length;
        },
    },
};
</script>

<style lang="scss" scoped>
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

    &:hover {
        border-color: #CACACA;
    }

    &.selected {
        border-color: #eeeeee;
    }
}
</style>