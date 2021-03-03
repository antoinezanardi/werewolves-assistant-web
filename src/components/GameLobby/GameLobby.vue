<template>
    <div id="game-lobby" class="container-fluid page-with-navbar pb-2">
        <transition mode="out-in" name="fade">
            <div v-if="loading.searchForPlayingGame" key="loading" class="h-100 d-flex justify-content-center align-items-center">
                <Loading :text="$t('GameLobby.loading')"/>
            </div>
            <div v-else-if="waitingGame._id" key="existing-game" class="h-100 d-flex justify-content-center align-items-center">
                <GameLobbyAlreadyHavePlayingGame :game="waitingGame" @cancel-game="cancelGame"/>
            </div>
            <div v-else key="game-composition" class="d-flex flex-column h-100">
                <div>
                    <div class="row justify-content-center">
                        <div class="col-lg-7 text-center">
                            <h1 id="game-lobby-title" class="d-inline-flex align-items-center justify-content-center">
                                <i class="fa fa-gamepad text-primary"/>
                                <span class="mx-3" v-html="$t('GameLobby.gameComposition')"/>
                                <WhatToDoButton @click.native="startTutorial"/>
                            </h1>
                        </div>
                    </div>
                    <div id="player-form" class="row justify-content-center">
                        <div class="col-lg-5 col-md-8 col-12">
                            <form @submit.prevent="addPlayer">
                                <div class="input-group">
                                    <input id="game-lobby-player-input" v-model="playerName" class="form-control"
                                           :placeholder="playerNameInputPlaceholder" :disabled="game.isMaxPlayerReached"
                                           :class="{ 'is-invalid': isPlayerNameTaken }" maxlength="30"/>
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" :disabled="!canAddPlayer">
                                            <i class="fa fa-plus mr-1"/>
                                            <span v-html="$t('GameLobby.add')"/>
                                        </button>
                                    </div>
                                </div>
                                <div id="player-name-input-error">
                                    <span v-if="isPlayerNameTaken" v-html="$t('GameLobby.playerNameAlreadyTaken')"/>
                                    <span v-else-if="sanitizedPlayerName.length === 30" v-html="$t('GameLobby.playerNameLengthMax')"/>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row my-2">
                        <div class="col-12 d-flex justify-content-center align-items-center">
                            <transition name="fade" mode="out-in">
                                <RequiredActionIcon v-if="!game.areGameOptionsValid" class="mr-2"/>
                            </transition>
                            <button id="game-options-modal-button" ref="showGameOptionsModalButton" class="btn btn-outline-primary btn-sm"
                                    :class="{ 'animate__animated animate__heartBeat': gameOptionsModalButton.isHighlighted }"
                                    @click.prevent="$emit('show-game-options-modal')">
                                <i class="fa fa-dice mr-2"/>
                                <span v-html="$t('GameLobby.gameOptions')"/>
                            </button>
                        </div>
                    </div>
                    <GameLobbyComposition :game="game"/>
                    <div>
                        <hr class="bg-dark mt-3 mb-2"/>
                    </div>
                </div>
                <div id="game-lobby-players-container" class="d-flex flex-column flex-grow-1 visible-scrollbar">
                    <transition mode="out-in" name="fade">
                        <div v-if="!game.players.length" class="d-flex flex-column justify-content-center flex-grow-1">
                            <h3 id="no-player-text"
                                class="text-muted text-center font-italic d-flex justify-content-center align-items-center">
                                <i class="fa fa-user-plus mr-2"/>
                                <span v-html="$t('GameLobby.addPlayerWithName')"/>
                            </h3>
                        </div>
                        <transition-group v-else id="players" tag="div" name="fade-list"
                                          class="row justify-content-center align-items-center flex-grow-1 visible-scrollbar py-2 mx-2">
                            <PlayerCard v-for="player in game.players" :key="player.name" :game="game" :player="player"
                                        class="player-item col-lg-2 col-md-3 col-6 mb-2" @choose-role="showRolePickerModal"
                                        @unset-role="unsetRole" @unset-player="unsetPlayer"/>
                        </transition-group>
                    </transition>
                </div>
                <div>
                    <hr class="bg-dark my-2"/>
                    <div class="row justify-content-center align-items-center my-3">
                        <div class="col-12 text-center">
                            <GameLobbyStartConditions @highlight-and-see-thief-additional-cards="highlightAndSeeThiefAdditionalCards"/>
                        </div>
                    </div>
                    <div id="game-lobby-footer" class="row justify-content-between align-items-center">
                        <div class="col-lg-4 col-sm-6">
                            <form @submit.prevent="getGameRepartition">
                                <SubmitButton id="random-repartition-button"
                                              classes="btn btn-dark btn-block text-uppercase font-weight-bold"
                                              :disabled-tooltip-text="$t('GameLobby.fourPlayerRequiredToGetRandomRepartition')"
                                              :loading="loading.getGameRepartition"
                                              :disabled="loading.createGame || !game.areThereEnoughPlayers">
                                    <i class="fas fa-random mr-2"/>
                                    <span v-html="$t('GameLobby.getRandomRepartition')"/>
                                </SubmitButton>
                            </form>
                        </div>
                        <div class="col-lg-4 col-sm-6 mt-lg-0 mt-2 mt-sm-0">
                            <form @submit.prevent="createGame">
                                <SubmitButton classes="btn btn-primary btn-lg btn-block text-uppercase font-weight-bold"
                                              :loading="loading.createGame"
                                              :disabled="loading.getGameRepartition || !game.canStartGame(roles)">
                                    <i class="fa fa-play-circle mr-2"/>
                                    <span v-html="$t('GameLobby.launchParty')"/>
                                </SubmitButton>
                            </form>
                        </div>
                        <div class="col-lg-4 d-sm-flex d-none mt-2 mt-lg-0">
                            <router-link class="btn btn-secondary btn-block" to="/">
                                <i class="fa fa-sign-out-alt mr-2"/>
                                <span v-html="$t('GameLobby.quit')"/>
                            </router-link>
                        </div>
                    </div>
                </div>
                <GameLobbyTutorial ref="gameLobbyTutorial"/>
                <GameLobbyRolePickerModal ref="gameLobbyRolePickerModal"/>
            </div>
        </transition>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";
import { parse } from "qs";
import Game from "@/classes/Game";
import Player from "@/classes/Player";
import GameLobbyAlreadyHavePlayingGame from "./GameLobbyAlreadyHavePlayingGame";
import GameLobbyComposition from "./GameLobbyComposition";
import Loading from "@/components/shared/Loading";
import SubmitButton from "@/components/shared/Forms/SubmitButton";
import WhatToDoButton from "@/components/shared/Game/WhatToDoButton/WhatToDoButton";
import GameLobbyTutorial from "@/components/GameLobby/GameLobbyTutorial";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import { filterOutHTMLTags } from "@/helpers/functions/String";
import GameLobbyRolePickerModal from "@/components/GameLobby/GameLobbyRolePickerModal/GameLobbyRolePickerModal";
import GameLobbyStartConditions from "@/components/GameLobby/GameLobbyStartConditions";
import RequiredActionIcon from "@/components/shared/RequiredActionIcon";

export default {
    name: "GameLobby",
    components: {
        RequiredActionIcon,
        GameLobbyStartConditions,
        GameLobbyRolePickerModal,
        PlayerCard,
        GameLobbyTutorial,
        WhatToDoButton,
        GameLobbyComposition,
        SubmitButton,
        GameLobbyAlreadyHavePlayingGame,
        Loading,
    },
    async beforeRouteLeave(to, from, next) {
        if (!this.waitingGame._id && this.game.players.length && to.name !== "Game") {
            const { value: confirmLeaveGameLobby } = await this.confirmLeaveGameLobby();
            return confirmLeaveGameLobby ? next() : next(false);
        }
        return next();
    },
    data() {
        return {
            waitingGame: new Game(),
            loading: {
                searchForPlayingGame: true,
                createGame: false,
                getGameRepartition: false,
            },
            gameRepartitionRequestCount: 0,
            gameOptionsModalButton: { isHighlighted: false },
            playerName: "",
        };
    },
    computed: {
        ...mapGetters("role", { roles: "roles" }),
        ...mapGetters("game", { game: "game" }),
        ...mapGetters("user", { userPreferences: "userPreferences" }),
        isPlayerNameTaken() {
            return this.game.players.find(({ name }) => name === this.sanitizedPlayerName);
        },
        canAddPlayer() {
            return !this.isPlayerNameTaken && !this.game.isMaxPlayerReached;
        },
        playerNameInputPlaceholder() {
            return this.game.isMaxPlayerReached ? this.$t("GameLobby.maxPlayerReached") : this.$t("GameLobby.playerName");
        },
        sanitizedPlayerName() {
            return filterOutHTMLTags(this.playerName.trim());
        },
        kebabCasedGameRepartitionOptions() {
            return {
                "forbidden-roles": this.userPreferences.game.repartition.forbiddenRoles,
                "are-recommended-min-players-respected": this.userPreferences.game.repartition.areRecommendedMinPlayersRespected,
                "are-powerful-villager-roles-prioritized": this.userPreferences.game.repartition.arePowerfulVillagerRolesPrioritized,
                "are-powerful-werewolf-roles-prioritized": this.userPreferences.game.repartition.arePowerfulWerewolfRolesPrioritized,
            };
        },
    },
    watch: {
        gameRepartitionRequestCount(value) {
            if (value === 3 && this.userPreferences.game.repartition.isProTipShown) {
                const options = {
                    icon: "exclamation-circle", duration: 7000,
                    action: [
                        {
                            text: this.$t("GameLobby.seeOptions"),
                            onClick: this.highlightAndSeeGameRepartitionOptions,
                        }, {
                            text: this.$t("GameLobby.dontShowMeAgain"),
                            onClick: this.hideGameRepartitionProTipForever,
                        },
                    ],
                };
                this.$toasted.info(this.$t("GameLobby.youCanChangeGameRepartitionOptions"), options);
            }
        },
    },
    async created() {
        try {
            await this.setGame(new Game());
            await this.checkUserAuthentication();
            const { data } = await this.$werewolvesAssistantAPI.getGames({ status: "playing" });
            if (data.length) {
                this.waitingGame = new Game(data[0]);
            }
            if (Object.keys(this.$route.query).length !== 0) {
                const query = parse(this.$route.query);
                this.setGamePlayers(query.players.map(player => new Player(player)));
            }
        } catch (err) {
            this.$error.display(err);
        } finally {
            this.loading.searchForPlayingGame = false;
        }
    },
    methods: {
        ...mapActions("user", {
            checkUserAuthentication: "checkUserAuthentication",
            setPreferenceGameRepartitionIsProTipShown: "setPreferenceGameRepartitionIsProTipShown",
        }),
        ...mapActions("game", {
            setGame: "setGame",
            setGamePlayers: "setGamePlayers",
            addGamePlayer: "addGamePlayer",
            setCurrentRoleForPlayerWithName: "setCurrentRoleForPlayerWithName",
            setCurrentSideForPlayerWithName: "setCurrentSideForPlayerWithName",
            unsetPlayerWithName: "unsetPlayerWithName",
            unsetRoleForPlayerWithName: "unsetRoleForPlayerWithName",
        }),
        addPlayer() {
            if (!this.sanitizedPlayerName || !this.canAddPlayer) {
                this.playerName = "";
            } else {
                this.addGamePlayer(new Player({ name: this.sanitizedPlayerName }));
                this.playerName = "";
            }
        },
        async getGameRepartition() {
            try {
                if (!this.game.areThereEnoughPlayers) {
                    return;
                }
                this.loading.getGameRepartition = true;
                const players = this.game.players.map(({ name }) => ({ name }));
                const { data } = await this.$werewolvesAssistantAPI.getGameRepartition({ players, ...this.kebabCasedGameRepartitionOptions });
                for (const { name: playerName, role: roleName } of data.players) {
                    const role = this.roles.find(({ name }) => name === roleName);
                    if (role) {
                        this.setCurrentRoleForPlayerWithName({ name: playerName, role: role.name });
                        this.setCurrentSideForPlayerWithName({ name: playerName, side: role.side });
                    }
                }
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.gameRepartitionRequestCount++;
                this.loading.getGameRepartition = false;
            }
        },
        unsetPlayer(playerName) {
            this.unsetPlayerWithName(playerName);
        },
        unsetRole(playerName) {
            this.unsetRoleForPlayerWithName(playerName);
        },
        async createGame() {
            try {
                this.loading.createGame = true;
                const players = this.game.players.map(({ name, role }) => ({ name, role: role.current }));
                const { options, additionalCards } = this.game;
                const body = { options, players };
                if (this.game.thiefPlayer) {
                    body.additionalCards = additionalCards.map(({ role, for: recipient }) => ({ role, for: recipient }));
                }
                const { data } = await this.$werewolvesAssistantAPI.createGame(body);
                this.$toasted.success(this.$t("GameLobby.gameCreated"), { icon: "gamepad" });
                await this.$router.push(`/game/${data._id}`);
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading.createGame = false;
            }
        },
        cancelGame() {
            this.waitingGame = new Game();
        },
        confirmLeaveGameLobby() {
            return Swal.fire({
                title: this.$t("GameLobby.areYouSureYouWantToQuit"),
                html: this.$t("GameLobby.gameCompositionNotFinished"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: `<i class='fa fa-sign-out-alt mr-2'></i>${this.$t("GameLobby.quit")}`,
                cancelButtonText: this.$t("GameLobby.cancel"),
                heightAuto: false,
            });
        },
        startTutorial() {
            this.$refs.gameLobbyTutorial.startTour();
        },
        showRolePickerModal(player) {
            this.$refs.gameLobbyRolePickerModal.show(player);
        },
        highlightAndSeeGameRepartitionOptions(e, toastObject) {
            toastObject.goAway(0);
            this.gameOptionsModalButton.isHighlighted = true;
            setTimeout(() => {
                this.gameOptionsModalButton.isHighlighted = false;
                this.$emit("show-game-options-modal", { panel: "game-repartition-options" });
            }, 1000);
        },
        highlightAndSeeThiefAdditionalCards() {
            this.gameOptionsModalButton.isHighlighted = true;
            setTimeout(() => {
                this.gameOptionsModalButton.isHighlighted = false;
                this.$emit("show-game-options-modal", { panel: "game-roles-options", scrollTo: "thief-section" });
            }, 1000);
        },
        hideGameRepartitionProTipForever(e, toastObject) {
            toastObject.goAway(0);
            this.setPreferenceGameRepartitionIsProTipShown(false);
        },
    },
};
</script>

<style lang="scss">
    @import "../../../node_modules/bootstrap/scss/bootstrap-grid";
    @import "../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../assets/scss/_variables";

    #game-lobby {
        overflow-x: hidden;
    }

    #game-lobby-title {
        font-size: 1.25rem;
        @include media-breakpoint-up(sm) {
            font-size: 2rem;
        }
        padding: 10px 10px 0;
    }

    #no-player-text {
        @include font-size(1.5rem);
    }

    #players {
        overflow-x: hidden !important;
    }

    #player-name-input-error {
        height: 15px;
    }

    #game-lobby-players-container {
        overflow-y: auto;
        min-height: 75px;
    }
</style>