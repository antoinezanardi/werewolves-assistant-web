<template>
    <div id="game-lobby-role-picker-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container-fluid">
                        <div class="row align-items-center">
                            <div class="col-md-2 text-center">
                                <RoleImage id="selected-player-current-role-image" :role="selected.player.role.current"/>
                                <RoleText v-if="selected.player.role.current" :role="selected.player.role.current"/>
                                <div v-else v-html="$t('GameLobbyRolePickerModal.noRole')"/>
                            </div>
                            <div class="col-md-8">
                                <h5 class="modal-title text-center"
                                    v-html="`${$t('GameLobbyRolePickerModal.pickRoleFor')} ${selected.player.name}`"/>
                            </div>
                            <div class="col-md-2 text-right">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span class="text-white" aria-hidden="true">
                                        &times;
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="container-fluid h-100">
                        <div class="row h-100">
                            <div id="selected-role-panel" class="col-md-4 h-100">
                                <div class="row align-items-center justify-content-center h-50">
                                    <div class="col-12 d-flex justify-content-center text-center h-100 pt-3">
                                        <VueFlip v-model="selectedRoleThumbnail.flipped" height="100%" width="100%">
                                            <template #front>
                                                <RoleImage class="h-100" :role="selectedRoleThumbnail.front"/>
                                            </template>
                                            <template #back>
                                                <RoleImage class="h-100" :role="selectedRoleThumbnail.back"/>
                                            </template>
                                        </VueFlip>
                                    </div>
                                </div>
                                <div class="h-50">
                                    <transition mode="out-in" name="fade">
                                        <div v-if="!isRolePicked">
                                            <div class="row mt-2">
                                                <div class="col-12 text-center">
                                                    <div id="choose-role-text" class="my-3"
                                                         v-html="$t('GameLobbyRolePickerModal.chooseRoleOnTheRight')"/>
                                                    <i class="fa fa-2x fa-chevron-right animate__animated animate__slow animate__headShake
                                                              animate__infinite"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else :key="selected.role.name">
                                            <div class="row mt-2">
                                                <div class="col-12 text-center">
                                                    <RoleText v-if="isRolePicked" id="selected-role-text" :key="selected.role.name"
                                                              :role="selected.role.name"/>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12 d-flex justify-content-center align-items-center">
                                                    <span class="font-weight-bold mr-2" v-html="`${$t('GameLobbyRolePickerModal.side')}: `"/>
                                                    <RoleImage id="selected-role-side-image" :role="selected.role.group"/>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12">
                                                    <p v-for="paragraph of $t(`Role.description.${selected.role.name}`)"
                                                       :key="paragraph" v-html="paragraph"/>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div id="roles-panel" class="col-md-8 h-100">
                                <div class="row align-items-center justify-content-center">
                                    <div v-for="role in roles" :key="role.name" class="col-lg-2 col-4 text-center p-2"
                                         @click="changeSelectedRole(role)">
                                        <div class="role-image-container" :class="{ selected: role === selected.role }">
                                            <RoleImage :role="role.name"/>
                                        </div>
                                        <RoleText :role="role.name"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="container-fluid">
                        <div class="row align-items-center">
                            <div class="col-4"/>
                            <div v-tooltip="!isRolePicked && $t('GameLobbyRolePickerModal.pleaseChooseRole')" class="col-4">
                                <form @submit.prevent="assignRole">
                                    <button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="!isRolePicked"
                                            v-html="$t('GameLobbyRolePickerModal.assignRole')"/>
                                </form>
                            </div>
                            <div class="col-4 text-right">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" v-html="$t('GameLobbyRolePickerModal.close')"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";
import $ from "jquery";
import Game from "@/classes/Game";
import Player from "@/classes/Player";
import Role from "@/classes/Role";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";

export default {
    name: "GameLobbyRolePickerModal",
    components: { RoleText, RoleImage },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    data() {
        return {
            selected: {
                role: new Role(),
                player: new Player(),
            },
            selectedRoleThumbnail: {
                flipped: false,
                front: undefined,
                back: undefined,
            },
        };
    },
    computed: {
        ...mapGetters("role", { roles: "roles" }),
        isRolePicked() {
            return this.selected.role.name;
        },
    },
    methods: {
        show(selectedPlayer) {
            $("#game-lobby-role-picker-modal").modal("show");
            this.selected.player = new Player(selectedPlayer);
            this.selected.role = new Role();
            this.selectedRoleThumbnail = {
                flipped: false,
                front: undefined,
                back: undefined,
            };
        },
        hide() {
            $("#game-lobby-role-picker-modal").modal("hide");
        },
        changeSelectedRole(newRole) {
            if (newRole !== this.selected.role) {
                if (!this.selectedRoleThumbnail.flipped) {
                    this.selectedRoleThumbnail.back = newRole.name;
                    this.selectedRoleThumbnail.flipped = true;
                } else {
                    this.selectedRoleThumbnail.front = newRole.name;
                    this.selectedRoleThumbnail.flipped = false;
                }
            }
            this.selected.role = newRole;
        },
        confirmPickRole(role) {
            let footer = "";
            if (role.maxInGame === 1) {
                footer = this.$t("RolePicker.roleWillBeSwitchedWithOtherPlayer", { roleName: this.roleText });
            } else {
                footer = this.$t("RolePicker.roleWillBeSwitchedWithAnotherPlayer", { roleName: this.roleText });
            }
            return Swal.fire({
                title: this.$t("RolePicker.maxInGameReached"),
                text: this.$t("RolePicker.doYouWantToSetItAnyway"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("RolePicker.confirm"),
                cancelButtonText: this.$t("RolePicker.cancel"),
                footer,
            });
        },
        async assignRole() {
            const { player: selectedPlayer, role: selectedRole } = this.selected;
            if (selectedPlayer.role.current === selectedRole.name) {
                return;
            }
            if (selectedRole.maxInGame <= this.game.players.filter(player => player.role.current === selectedRole.name).length) {
                const { value } = await this.confirmPickRole(selectedRole);
                if (value) {
                    this.$emit("role-picked", this.selected);
                    this.hide();
                }
            } else {
                this.$emit("role-picked", this.selected);
                this.hide();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    #game-lobby-role-picker-modal {
        overflow-y: hidden;

        .modal-body {
            height: calc(85vh - 113px);
            #roles-panel {
                overflow-y: auto;
            }
        }
    }

    #selected-role-panel {
        overflow-y: scroll;
    }

    #selected-player-current-role-image {
        width: 35px;
    }

    #choose-role-text {
        font-size: 1.25rem;
    }

    #selected-role-text {
        font-size: 1.25rem;
    }

    #selected-role-side-image {
        height: 35px;
        width: 35px;
    }

    .role-image-container {
        border: 3px solid grey;
        border-radius: 8px;
        margin: 3px;
        transition: all 0.25s ease;
        cursor: pointer;

        &:hover {
            border-color: #CACACA;
        }

        &.selected {
            border-color: #eeeeee;
        }
    }
</style>