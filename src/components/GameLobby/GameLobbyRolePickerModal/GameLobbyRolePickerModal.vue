<template>
    <div id="game-lobby-role-picker-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="container-fluid">
                        <div class="row align-items-center">
                            <div class="offset-md-0 col-md-2 order-md-0 offset-2 col-8 order-0 text-center">
                                <div class="font-italic small text-secondary" v-html="$t('GameLobbyRolePickerModal.actualRole')"/>
                                <RoleImage id="selected-player-current-role-image" :role="selected.player.role.current"/>
                                <RoleText v-if="selected.player.role.current" :role="selected.player.role.current"/>
                                <div v-else v-html="$t('GameLobbyRolePickerModal.noRole')"/>
                            </div>
                            <div class="col-md-8 order-md-1 col-12 order-2">
                                <h5 class="modal-title text-center"
                                    v-html="`${$t('GameLobbyRolePickerModal.pickRoleFor')} ${selected.player.name}`"/>
                            </div>
                            <div class="col-md-2 order-md-2 col-2 order-1 text-right">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span class="text-white" aria-hidden="true" v-html="'&times;'"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-body">
                    <div class="container-fluid h-100">
                        <div class="row h-100">
                            <div id="selected-role-panel" class="col-md-4 col-12 visible-scrollbar">
                                <div id="selected-role-thumbnail" class="row align-items-center justify-content-center">
                                    <div class="col-12 d-flex justify-content-center text-center h-100 pt-1">
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
                                <div id="selected-role-data">
                                    <transition mode="out-in" name="fade">
                                        <div v-if="!isRolePicked">
                                            <div class="row mt-2">
                                                <div class="col-12 text-center">
                                                    <div id="choose-role-text" class="my-2"
                                                         v-html="$t('GameLobbyRolePickerModal.chooseRole')"/>
                                                    <i class="fa fa-2x fa-chevron-right animate__animated animate__slow animate__headShake
                                                              animate__infinite d-md-inline-block d-none"/>
                                                    <i class="fa fa-2x fa-chevron-down animate__animated animate__slow animate__swing
                                                              animate__infinite d-md-none"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else :key="selected.role.name">
                                            <div class="row mt-3">
                                                <div class="col-6 text-center">
                                                    <RoleText v-if="isRolePicked" id="selected-role-text" :key="selected.role.name"
                                                              :role="selected.role.name" class="font-weight-bold"/>
                                                </div>
                                                <div class="col-6 d-flex justify-content-center align-items-center">
                                                    <span class="font-weight-bold mr-2" v-html="`${$t('GameLobbyRolePickerModal.side')}: `"/>
                                                    <RoleImage id="selected-role-side-image" :role="selected.role.side"/>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12">
                                                    <div class="mt-2">
                                                        <i class="fa fa-chess-pawn text-info mr-2"/>
                                                        <span v-html="selectedRoleAlreadyTakenText"/>
                                                    </div>
                                                    <div v-if="isRoleCountAlertDisplayed" class="mt-2">
                                                        <i class="fa fa-exclamation-circle animate__animated animate__heartBeat
                                                                    animate__infinite text-danger mr-2"/>
                                                        <span v-html="roleCountAlertText"/>
                                                    </div>
                                                    <div v-if="selected.role.recommendedMinPlayers" class="mt-2">
                                                        <i class="fa fa-chess text-info mr-2"/>
                                                        <span v-html="recommendedMinPlayersText"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-12">
                                                    <hr class="bg-dark mt-1 mb-2"/>
                                                    <p v-for="paragraph of $t(`Role.description.${selected.role.name}`)"
                                                       :key="paragraph" v-html="paragraph"/>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                            </div>
                            <div class="col-12 d-md-none">
                                <hr class="bg-dark my-1"/>
                            </div>
                            <div id="roles-panel" class="col-md-8 col-12 visible-scrollbar">
                                <div class="row justify-content-center">
                                    <RolePickerRole :game="game" class="col-md-2 col-3 text-center p-2"
                                                    @click.native="selectRandomRole"/>
                                    <RolePickerRole v-for="role in roles" :key="role.name" :game="game" :role="role"
                                                    :selected="selected.role.name === role.name"
                                                    class="col-md-2 col-3 text-center p-2" @click.native="changeSelectedRole(role)"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="container-fluid">
                        <div class="row align-items-center">
                            <div v-tooltip="assignRoleTooltip" class="offset-md-4 col-md-4 offset-2 col-8">
                                <form @submit.prevent="assignRole">
                                    <button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="!canAssignRole"
                                            v-html="$t('GameLobbyRolePickerModal.assignRole')"/>
                                </form>
                            </div>
                            <div class="col-md-4 col-2 text-right">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                    <i class="d-md-none fa fa-times"/>
                                    <span class="d-md-inline d-none" v-html="$t('GameLobbyRolePickerModal.close')"/>
                                </button>
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
import VueScrollTo from "vue-scrollto";
import Game from "@/classes/Game";
import Player from "@/classes/Player";
import Role from "@/classes/Role";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";
import RolePickerRole from "@/components/GameLobby/GameLobbyRolePickerModal/RolePickerRole";

export default {
    name: "GameLobbyRolePickerModal",
    components: { RolePickerRole, RoleText, RoleImage },
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
        selectedRoleAlreadyTakenText() {
            const totalInGame = this.game.getPlayersWithRole(this.selected.role.name).length;
            return this.$tc("GameLobbyRolePickerModal.totalInGame", totalInGame, { total: totalInGame });
        },
        canAssignRole() {
            return this.isRolePicked && this.selected.role.name !== this.selected.player.currentRole;
        },
        assignRoleTooltip() {
            if (!this.isRolePicked) {
                return this.$t("GameLobbyRolePickerModal.pleaseChooseRole");
            } else if (this.isRolePicked && this.selected.role.name === this.selected.player.currentRole) {
                return this.$t("GameLobbyRolePickerModal.selectedPlayerAlreadyHasSelectedRole");
            }
            return "";
        },
        recommendedMinPlayersText() {
            return this.$t("GameLobbyRolePickerModal.recommendedMinPlayers", { count: this.selected.role.recommendedMinPlayers });
        },
        isRoleCountAlertDisplayed() {
            const roleCount = this.game.getPlayersWithRole(this.selected.role.name).length;
            return !!roleCount && (this.selected.role.maxInGame === roleCount || this.selected.role.minInGame > roleCount);
        },
        roleCountAlertText() {
            const roleCount = this.game.getPlayersWithRole(this.selected.role.name).length;
            if (this.selected.role.maxInGame === roleCount) {
                return this.$t("GameLobbyRolePickerModal.maxInGameReached");
            }
            return this.$t("GameLobbyRolePickerModal.leftToStartGame", { count: this.selected.role.minInGame - roleCount });
        },
    },
    methods: {
        show(selectedPlayer) {
            this.selectedRoleThumbnail = {
                front: undefined,
                back: undefined,
            };
            this.selected.player = new Player(selectedPlayer);
            this.selected.role = new Role();
            $("#game-lobby-role-picker-modal").modal("show");
        },
        hide() {
            $("#game-lobby-role-picker-modal").modal("hide");
            this.selected.role = new Role();
            this.selectedRoleThumbnail = {
                front: undefined,
                back: undefined,
            };
        },
        selectRandomRole() {
            const randomIdx = Math.floor(Math.random() * this.roles.length);
            this.changeSelectedRole(this.roles[randomIdx]);
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
                this.selected.role = newRole;
                VueScrollTo.scrollTo(".modal-body", 500, { container: "#selected-role-panel" });
            }
        },
        confirmPickRole() {
            return Swal.fire({
                title: this.$t("GameLobbyRolePickerModal.maxInGameReached"),
                text: this.$t("GameLobbyRolePickerModal.doYouWantToSetItAnyway"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("GameLobbyRolePickerModal.confirm"),
                cancelButtonText: this.$t("GameLobbyRolePickerModal.cancel"),
                footer: this.$t("GameLobbyRolePickerModal.roleWillBeSwitchedWithOtherPlayer"),
                heightAuto: false,
            });
        },
        async assignRole() {
            const { player: selectedPlayer, role: selectedRole } = this.selected;
            if (selectedPlayer.role.current === selectedRole.name) {
                return;
            }
            if (selectedRole.maxInGame <= this.game.players.filter(player => player.role.current === selectedRole.name).length) {
                const { value } = await this.confirmPickRole();
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
    @import "../../../../node_modules/bootstrap/scss/bootstrap-grid";

    #game-lobby-role-picker-modal {
        overflow-y: hidden;

        .modal-body {
            height: calc(85vh - 225px);
            #roles-panel {
                overflow-y: auto;
            }
        }
    }

    #selected-role-panel {
        overflow-y: scroll;
        height: 45%;
        @include media-breakpoint-up(md) {
            height: 100%;
        }
    }

    #selected-role-thumbnail {
        height: 47%;
    }

    #selected-role-data {
        height: 47%;
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

    #roles-panel {
        height: 55%;
        @include media-breakpoint-up(md) {
            height: 100%;
        }
    }
</style>