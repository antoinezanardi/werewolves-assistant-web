<template>
    <div id="role-picker" class="container-fluid">
        <div class="row role-thumbnail-row">
            <div class="col d-flex role-thumbnail justify-content-center align-items-center flex-wrap">
                <div class="role-img-container" v-for="role in availableRoles" :key="role.name"
                     @click="pickRole(role)" @mouseover="hoverOn = role.name"
                     @mouseleave="hoverOn = undefined" :class="{ selected: player.role.current === role.name }">
                    <img class="img-fluid" :src="getThumbnail(role.name)" alt="Role thumbnail">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div v-html="roleText"/>
            </div>
        </div>
    </div>
</template>

<script>

import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import back from "../../../assets/img/roles/back.png";
import guard from "../../../assets/img/roles/guard.png";
import hunter from "../../../assets/img/roles/hunter.png";
import raven from "../../../assets/img/roles/raven.png";
import seer from "../../../assets/img/roles/seer.png";
import villager from "../../../assets/img/roles/villager.png";
import werewolf from "../../../assets/img/roles/werewolf.png";
import witch from "../../../assets/img/roles/witch.png";
import Player from "../../../classes/Player";
import Game from "../../../classes/Game";

export default {
    name: "RolePicker",
    props: {
        player: {
            type: Player,
            required: true,
        },
        game: {
            type: Game,
            required: true,
        },
    },
    data() {
        return {
            hoverOn: undefined,
            IMGs: { back, guard, hunter, raven, seer, villager, werewolf, witch },
        };
    },
    computed: {
        ...mapGetters("role", {
            roles: "roles",
        }),
        roleText() {
            return this.hoverOn ? this.$t(`Role.${this.hoverOn}`) : `<i class="fa fa-chevron-up animated mr-2"></i>${this.$t("RolePicker.chooseRole")}`;
        },
        availableRoles() {
            return this.roles.filter(({ name }) => name !== this.player.role.current);
        },
    },
    methods: {
        getThumbnail(roleName) {
            return this.IMGs[roleName];
        },
        confirmPickRole(role) {
            return Swal.fire({
                title: this.$t("RolePicker.maxInGameReached"),
                text: this.$t("RolePicker.doYouWantToSetItAnyway"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("RolePicker.confirm"),
                cancelButtonText: this.$t("RolePicker.cancel"),
                footer: role.maxInGame === 1 ? this.$t("RolePicker.roleWillBeSwitchedWithOtherPlayer", { roleName: this.roleText }) : this.$t("RolePicker.roleWillBeSwitchedWithAnotherPlayer", { roleName: this.roleText }),
            });
        },
        async pickRole(role) {
            if (this.player.role.current === role.name) {
                return;
            }
            if (role.maxInGame <= this.game.players.filter(player => player.role.current === role.name).length) {
                const { value } = await this.confirmPickRole(role);
                if (value) {
                    this.$emit("rolePicked", role);
                }
            } else {
                this.$emit("rolePicked", role);
            }
        },
    },
};
</script>

<style scoped lang="scss">

    .role-thumbnail-row {
        overflow-y: auto;
    }

    .role-thumbnail {
        height: 150px;
    }

    .role-img-container {
        border: 3px solid grey;
        border-radius: 5px;
        margin: 3px;
        width: 50px;
        height: 50px;
        transition: all 0.25s ease;
        cursor: pointer;

        &:hover {
            border-color: #CACACA;
        }
    }
</style>