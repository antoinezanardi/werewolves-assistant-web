<template>
    <nav id="nav-bar" class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand" href="#" @click.prevent="backToHomePage">
            <img id="wolf-emoji" src="@/assets/img/wolf.png" alt="Wolf" class="mr-md-2 mr-0"/>
            <span class="d-none d-md-inline-block" v-html="$t('NavBar.werewolvesAssistant')"/>
        </a>
        <div class="navbar-nav d-flex w-100 justify-content-end">
            <div class="nav-item">
                <MuteButton class="nav-link"/>
            </div>
            <transition mode="out-in" name="fade">
                <div v-if="game.isCreated" class="nav-item d-md-none d-sm-block">
                    <a class="nav-link" href="#" role="button" aria-haspopup="true" @click.prevent="showGameSidesModal">
                        <i class="fa fa-chess mr-2"/>
                    </a>
                </div>
            </transition>
            <div id="nav-bar-options" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true">
                    <i class="fa fa-cog mr-2"/>
                    <span class="d-none d-md-inline-block" v-html="$t('NavBar.options')"/>
                </a>
                <div class="dropdown-menu animate__animated animate__zoomIn animate__faster">
                    <a v-if="$route.name === 'Game' || $route.name === 'GameLobby'" href="#" class="dropdown-item"
                       @click.prevent="showParametersModal">
                        <i class="option-icon fa fa-cog mr-1"/>
                        <span v-html="$t('NavBar.parameters')"/>
                    </a>
                    <a v-if="$route.name === 'Game' || $route.name === 'GameLobby'" href="#" class="dropdown-item"
                       @click.prevent="showGameOptionsModal">
                        <i class="option-icon fa fa-dice text-primary mr-1"/>
                        <span v-html="$t('NavBar.gameOptions')"/>
                    </a>
                    <a v-if="$route.name === 'Game' && game.status === 'playing'" href="#" class="dropdown-item" @click.prevent="cancelGame">
                        <i class="option-icon fa fa-times-circle text-danger mr-1"/>
                        <span v-html="$t('NavBar.cancelGame')"/>
                    </a>
                    <router-link class="dropdown-item" to="/">
                        <i class="option-icon text-secondary fa fa-sign-out-alt mr-1"/>
                        <span v-html="$t('NavBar.quit')"/>
                    </router-link>
                </div>
            </div>
        </div>
        <ParametersModal ref="parametersModal"/>
        <GameOptionsModal ref="gameOptionsModal"/>
        <GameSidesModal v-if="game.isCreated" ref="gameSidesModal"/>
    </nav>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";
import GameOptionsModal from "@/components/NavBar/GameOptionsModal/GameOptionsModal";
import GameSidesModal from "@/components/NavBar/GameSidesModal/GameSidesModal";
import MuteButton from "@/components/shared/AudioManager/MuteButton";
import ParametersModal from "@/components/NavBar/ParametersModal/ParametersModal";

export default {
    name: "NavBar",
    components: { ParametersModal, MuteButton, GameSidesModal, GameOptionsModal },
    computed: {
        ...mapGetters("game", { game: "game" }),
        ...mapGetters("audioManager", { audioManager: "audioManager" }),
    },
    methods: {
        ...mapActions("game", { setGame: "setGame" }),
        async backToHomePage() {
            await this.$router.push("/");
        },
        confirmCancelGame() {
            return Swal.fire({
                title: this.$t("NavBar.areYouSureYouWantToCancelGame"),
                text: this.$t("NavBar.thisCantBeUndo"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("NavBar.confirm"),
                cancelButtonText: this.$t("NavBar.cancel"),
                heightAuto: false,
            });
        },
        async cancelGame() {
            try {
                const { value } = await this.confirmCancelGame();
                if (value) {
                    const { data } = await this.$werewolvesAssistantAPI.patchGame(this.game._id, { status: "canceled" });
                    this.$toasted.success(this.$t("NavBar.gameCanceled"), { icon: "check" });
                    await this.setGame(data);
                }
            } catch (e) {
                this.$error.display(e);
            }
        },
        showParametersModal() {
            this.$refs.parametersModal.show();
        },
        showGameOptionsModal(options) {
            this.$refs.gameOptionsModal.show(options);
        },
        showGameSidesModal() {
            this.$refs.gameSidesModal.show();
        },
    },
};
</script>

<style lang="scss" scoped>
    #nav-bar {
        height: 60px;
    }

    #wolf-emoji {
        height: 30px;
    }

    .dropdown-menu {
        right: 0;
        left: unset !important;

        .option-icon {
            min-width: 20px;
            text-align: right;
        }
    }
</style>