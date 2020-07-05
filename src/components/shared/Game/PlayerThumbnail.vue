<template>
    <div class="player-card-thumbnail">
        <i v-if="!game._id" v-tooltip="$t('PlayerThumbnail.unsetPlayer')" @click="unsetPlayer"
           class="fa fa-times-circle unset-player-button"/>
        <VueFlip v-tooltip="game._id && $t(`Role.${player.role.current}`)" height="100%" width="100%" v-model="flipped">
            <template v-slot:front>
                <v-popover :disabled="!!game._id" ref="frontPopover" :show="!game._id" placement="left">
                    <RoleImage :role="thumbnail.front"/>
                    <RolePicker :player="player" :game="game" slot="popover" @rolePicked="rolePicked"/>
                </v-popover>
            </template>
            <template v-slot:back>
                <v-popover :disabled="!!game._id" ref="backPopover" placement="left">
                    <RoleImage :role="thumbnail.back"/>
                    <RolePicker :player="player" :game="game" slot="popover" @rolePicked="rolePicked"/>
                </v-popover>
            </template>
        </VueFlip>
    </div>
</template>

<script>
import Game from "../../../classes/Game";
import Player from "../../../classes/Player";
import RolePicker from "./RolePicker";
import RoleImage from "./RoleImage";

export default {
    name: "PlayerThumbnail",
    components: { RoleImage, RolePicker },
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
    data() {
        return {
            flipped: false,
            thumbnail: {
                front: undefined,
                back: undefined,
            },
        };
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
        rolePicked(role) {
            this.$refs.frontPopover.hide();
            this.$refs.backPopover.hide();
            this.$emit("rolePicked", { name: this.player.name, role });
        },
        unsetPlayer() {
            this.$emit("unsetPlayer", this.player.name);
        },
    },
    watch: {
        "player.role.current"(newRole, oldRole) {
            if (newRole !== oldRole) {
                this.changeRole(newRole);
            }
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
    }

    .unset-player-button {
        cursor: pointer;
        position: absolute;
        right: -15px;
        top: -15px;
    }
</style>