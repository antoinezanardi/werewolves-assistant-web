<template>
    <div id="game-lobby" class="container-fluid page-with-navbar">
        <transition mode="out-in" name="fade">
            <div v-if="loading.searchForPlayingGame" key="loading" class="h-100 d-flex justify-content-center align-items-center">
                <Loading :text="$t('GameLobby.loading')"/>
            </div>
            <div v-else-if="waitingGame._id" key="existing-game" class="h-100 d-flex justify-content-center align-items-center">
                <GameLobbyAlreadyHavePlayingGame :game="waitingGame" @cancelGame="cancelGame"/>
            </div>
            <div key="game-composition" class="p-2 d-flex flex-column h-100" v-else>
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <h1 id="title" class="text-center">
                            <i class="fa fa-gamepad text-primary mr-2"/>
                            <span v-html="$t('GameLobby.gameComposition')"/>
                        </h1>
                        <hr class="bg-dark"/>
                    </div>
                </div>
                <div id="player-form" class="row justify-content-center">
                    <div class="col-lg-4">
                        <form @submit.prevent="addPlayer">
                            <div class="input-group">
                                <input type="text" class="form-control" :placeholder="playerNameInputPlaceholder"
                                       v-model="playerName" :disabled="game.isMaxPlayerReached"
                                       :class="{ 'is-invalid': isPlayerNameTaken }"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" :disabled="!canAddPlayer">
                                        <i class='fa fa-plus mr-1'/>
                                        <span v-html="$t('GameLobby.add')"/>
                                    </button>
                                </div>
                            </div>
                            <div id="player-name-input-error">
                                <span v-if="isPlayerNameTaken" v-html="$t('GameLobby.playerNameAlreadyTaken')"/>
                            </div>
                        </form>
                    </div>
                </div>
                <GameLobbyComposition :game="game"/>
                <div id="game-lobby-players-container" class="flex-grow-1 container-fluid">
                    <transition mode="out-in" name="fade">
                        <div v-if="!game.players.length" class="h-100 container-fluid">
                            <div class="row h-100 justify-content-center align-items-center">
                                <div class="col-12">
                                    <h3 id="no-player-text" class="text-muted text-center font-italic">
                                        <i class="fa fa-user-plus mr-2"/>
                                        <span v-html="$t('GameLobby.addPlayerWithName')"/>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <transition-group v-else tag="div" name="player-item" id="players"
                                          class="row justify-content-center align-items-center h-100 p-2">
                            <PlayerCard v-for="player in game.players" :key="player.name" :game="game" :player="player"
                                        class="player-item col-lg-2 col-4" @rolePicked="rolePicked"
                                        @unsetRole="unsetRole" @unsetPlayer="unsetPlayer"/>
                        </transition-group>
                    </transition>
                </div>
                <div>
                    <hr class="bg-dark"/>
                </div>
                <div id="game-lobby-footer" class="row justify-content-between align-items-center">
                    <div class="col-lg-3 col-sm-6">
                        <form @submit.prevent="getGameRepartition">
                            <SubmitButton classes="btn btn-dark btn-block text-uppercase font-weight-bold"
                                          :disabled-tooltip-text="$t('GameLobby.fourPlayerRequiredToGetRandomRepartition')"
                                          :text="`<i class='fas fa-random mr-2'></i>${$t('GameLobby.getRandomRepartition')}`"
                                          :loading="loading.getGameRepartition"
                                          :disabled="loading.createGame || !game.areThereEnoughPlayers"/>
                        </form>
                    </div>
                    <div class="col-lg-3 col-sm-6 mt-2 mt-lg-0">
                        <form @submit.prevent="createGame">
                            <SubmitButton classes="btn btn-primary btn-lg btn-block text-uppercase font-weight-bold"
                                          :text="`<i class='fa fa-play-circle mr-2'></i>${$t('GameLobby.launchParty')}`"
                                          :disabled-tooltip-text="createGameButtonDisabledText" :loading="loading.createGame"
                                          :disabled="loading.getGameRepartition || !canCreateGame"/>
                        </form>
                    </div>
                    <div class="col-lg-3"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { parse } from "qs";
import Game from "../../classes/Game";
import Loading from "../shared/Loading";
import Player from "../../classes/Player";
import PlayerCard from "../shared/Game/PlayerCard";
import GameLobbyAlreadyHavePlayingGame from "./GameLobbyAlreadyHavePlayingGame";
import SubmitButton from "../shared/Forms/SubmitButton";
import GameLobbyComposition from "./GameLobbyComposition";

export default {
    name: "GameLobby",
    components: { GameLobbyComposition, SubmitButton, GameLobbyAlreadyHavePlayingGame, PlayerCard, Loading },
    data() {
        return {
            waitingGame: new Game(),
            loading: {
                searchForPlayingGame: true,
                createGame: false,
                getGameRepartition: false,
            },
            game: new Game(),
            playerName: "",
        };
    },
    computed: {
        isPlayerNameTaken() {
            return this.game.players.find(({ name }) => name === this.playerName.trim());
        },
        canAddPlayer() {
            return !this.isPlayerNameTaken && !this.game.isMaxPlayerReached;
        },
        canCreateGame() {
            return this.game.areThereEnoughPlayers && this.game.areThereEnoughVillagers &&
                this.game.areThereEnoughWerewolves && this.game.allPlayersHaveRole;
        },
        playerNameInputPlaceholder() {
            return this.game.isMaxPlayerReached ? this.$t("GameLobby.maxPlayerReached") : this.$t("GameLobby.playerName");
        },
        createGameButtonDisabledText() {
            if (!this.game.areThereEnoughPlayers) {
                const missingCount = 4 - this.game.players.length;
                return this.$tc("GameLobby.missingPlayersToStart", missingCount, { missingCount });
            } else if (!this.game.areThereEnoughWerewolves) {
                return this.$t("GameLobby.missingOneWerewolfToStart");
            } else if (!this.game.areThereEnoughVillagers) {
                return this.$t("GameLobby.missingOneVillagerToStart");
            } else if (!this.game.allPlayersHaveRole) {
                return this.$t("GameLobby.allPlayerDontHaveARole");
            } else {
                return "";
            }
        },
    },
    async created() {
        try {
            await this.checkUserAuthentication();
            const { data } = await this.$werewolvesAssistantAPI.getGames({ status: "playing" });
            if (data.length) {
                this.waitingGame = new Game(data[0]);
            }
            if (Object.keys(this.$route.query).length !== 0) {
                const query = parse(this.$route.query);
                this.game.players.push(...query.players.map(player => new Player(player)));
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
        }),
        addPlayer() {
            const playerName = this.playerName.trim();
            if (!playerName || !this.canAddPlayer) {
                return this.playerName = "";
            } else {
                this.game.players.push(new Player({ name: playerName }));
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
                const { data } = await this.$werewolvesAssistantAPI.getGameRepartition({ players });
                for (const { name, role, group } of data.players) {
                    const player = this.game.players.find(player => player.name === name);
                    player.role.current = role;
                    player.role.group = group;
                }
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading.getGameRepartition = false;
            }
        },
        rolePicked({ name: playerName, role }) {
            for (const player of this.game.players) {
                if (playerName === player.name) {
                    if (role.maxInGame <= this.game.players.filter(({ role: playerRole }) => playerRole.current === role.name).length) {
                        const sameRolePlayer = this.game.players.find(({ role: playerRole }) => playerRole.current === role.name);
                        sameRolePlayer.role.current = player.role.current;
                        sameRolePlayer.role.group = player.role.group;
                    }
                    player.role.current = role.name;
                    player.role.group = role.group;
                    break;
                }
            }
        },
        unsetPlayer(playerName) {
            const idx = this.game.players.findIndex(({ name }) => name === playerName);
            if (idx !== -1) {
                this.game.players.splice(idx, 1);
            }
        },
        unsetRole(playerName) {
            for (const player of this.game.players) {
                if (playerName === player.name) {
                    player.role.current = undefined;
                    player.role.group = undefined;
                    break;
                }
            }
        },
        async createGame() {
            try {
                this.loading.createGame = true;
                const players = this.game.players.map(({ name, role }) => ({ name, role: role.current }));
                const { data } = await this.$werewolvesAssistantAPI.createGame({ players });
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
    },
};
</script>

<style lang="scss">
    @import "../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../assets/scss/_variables";

    #title {
        @include font-size(2rem);
    }

    #no-player-text {
        @include font-size(1.5rem);
    }

    .player-item {
        transition: all 0.5s;
    }
    .player-item-enter, .player-item-leave-to {
        opacity: 0;
    }
    .player-item-leave-active {
        position: absolute !important;
    }

    .flip-list-move {
        transition: transform 1s;
    }

    #player-name-input-error {
        height: 25px;
    }

    #game-lobby-players-container {
        overflow-y: scroll;
    }
</style>