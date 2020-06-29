<template>
    <div class="player-card d-flex flex-column align-items-center">
        <div class="player-card-thumbnail">
            <i v-tooltip="$t('PlayerCard.unsetPlayer')" @click="unsetPlayer"
               class="fa fa-times-circle unset-player-button"/>
                <VueFlip height="100%" width="100%" v-model="flipped">
                    <template v-slot:front>
                        <v-popover ref="frontPopover" placement="left">
                            <img class="img-fluid" :src="playerFrontThumbnail" alt="Role thumbnail">
                            <RolePicker :player="player" :game="game" slot="popover" @rolePicked="rolePicked"/>
                        </v-popover>
                    </template>
                    <template v-slot:back>
                        <v-popover ref="backPopover" placement="left">
                            <img class="img-fluid" :src="playerBackThumbnail" alt="Role thumbnail">
                            <RolePicker :player="player" :game="game" slot="popover" @rolePicked="rolePicked"/>
                        </v-popover>
                    </template>
                </VueFlip>
        </div>
        <div class="player-card-name text-center" v-html="player.name"/>
        <div class="player-card-role text-center text-muted d-flex align-items-center">
            <i v-if="player.role.current" v-tooltip="$t('PlayerCard.unsetRole')" @click="unsetRole"
               class="fa fa-times-circle mr-1 unset-role-button"/>
            <span v-html="playerRole"/>
        </div>
    </div>
</template>

<script>
import Player from "../../../classes/Player";
import back from "../../../assets/img/roles/back.png";
import guard from "../../../assets/img/roles/guard.png";
import hunter from "../../../assets/img/roles/hunter.png";
import raven from "../../../assets/img/roles/raven.png";
import seer from "../../../assets/img/roles/seer.png";
import villager from "../../../assets/img/roles/villager.png";
import werewolf from "../../../assets/img/roles/werewolf.png";
import witch from "../../../assets/img/roles/witch.png";
import RolePicker from "./RolePicker";
import Game from "../../../classes/Game";

export default {
    name: "PlayerCard",
    components: { RolePicker },
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
            IMGs: { back, guard, hunter, raven, seer, villager, werewolf, witch },
            flipped: false,
            thumbnail: {
                front: undefined,
                back: undefined,
            },
        };
    },
    computed: {
        playerFrontThumbnail() {
            return this.thumbnail.front ? this.IMGs[this.thumbnail.front] : this.IMGs.back;
        },
        playerBackThumbnail() {
            return this.thumbnail.back ? this.IMGs[this.thumbnail.back] : this.IMGs.back;
        },
        playerRole() {
            return this.player.role.current ? this.$t(`Role.${this.player.role.current}`) : this.$t(`PlayerCard.pickRole`);
        },
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
            this.$emit("unsetPlayer", this.player.name);
        },
        unsetRole() {
            this.$emit("unsetRole", this.player.name);
        },
        rolePicked(role) {
            this.$refs.frontPopover.hide();
            this.$refs.backPopover.hide();
            this.$emit("rolePicked", { name: this.player.name, role });
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
    .player-card {
        padding: 5px;
    }

    .player-card-name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .player-card-thumbnail {
        cursor: pointer;
        width: 50px;
        height: 50px;
        border: 3px solid grey;
        border-radius: 5px;
        position: relative;
        transition: all 0.25s ease;

        &:hover {
             border-color: #d4d4d4;
         }
    }

    .unset-role-button {
        cursor: pointer;
        font-size: 0.75rem;
    }

    .unset-player-button {
        cursor: pointer;
        position: absolute;
        right: -15px;
        top: -15px;
    }
</style>