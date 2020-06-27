<template>
    <div id="game-lobby" class="container-fluid">
        <transition mode="out-in" name="fade">
            <div v-if="loading.searchForPlayingGame" key="loading" class="h-100 d-flex justify-content-center align-items-center">
                <Loading :text="$t('GameLobby.loading')"/>
            </div>
            <div v-else-if="waitingGame._id" key="existing-game" class="h-100 d-flex justify-content-center align-items-center">
                <GameLobbyAlreadyHavePlayingGame/>
            </div>
            <div key="game-composition" class="p-2 d-flex flex-column h-100" v-else>
                <div id="title" class="row justify-content-center">
                    <div class="col-lg-8">
                        <h1 class="text-center">
                            <i class="fa fa-gamepad text-primary mr-3"/>
                            <span v-html="$t('GameLobby.gameComposition')"/>
                        </h1>
                        <hr class="bg-dark"/>
                    </div>
                </div>
                <div id="player-form" class="row justify-content-center">
                    <div class="col-lg-4">
                        <form @submit.prevent="addPlayer">
                            <div class="input-group">
                                <input type="text" class="form-control" :placeholder="$t('GameLobby.playerName')"
                                       v-model="playerName" :class="{ 'is-invalid': isPlayerNameTaken }"/>
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
                <div id="composition" class="row">
                    <div class="col text-center">
                        <span v-html="$tc('GameLobby.villagersCount', villagerPlayers.length, { count: villagerPlayers.length })"/>
                    </div>
                    <div class="col text-center font-weight-bold">
                        <span v-html="$tc('GameLobby.playerCount', players.length, { count: players.length })"/>
                    </div>
                    <div class="col text-center">
                        <span v-html="$tc('GameLobby.werewolvesCount', werewolfPlayers.length, { count: werewolfPlayers.length })"/>
                    </div>
                </div>
                <div class="flex-grow-1">
                    <transition mode="out-in" name="fade">
                        <div v-if="!players.length" class="h-100 row justify-content-center align-items-center">
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="text-muted font-italic">
                                        <i class="fa fa-user-plus mr-3"/>
                                        <span v-html="$t('GameLobby.addPlayerWithName')"/>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <transition-group v-else tag="div" name="player-item" id="players"
                                          class="row justify-content-center align-items-center h-100 p-2">
                            <PlayerCard v-for="player in players" :key="player.name" :player="player"
                                        class="player-item col-lg-2 col-xs-4" @unsetPlayer="unsetPlayer"/>
                        </transition-group>
                    </transition>
                </div>
                <div>
                    <hr class="bg-dark"/>
                </div>
                <div id="game-lobby-footer" class="row justify-content-between align-items-center">
                    <div class="col-lg-3">
                        <SubmitButton classes="btn btn-dark btn-block text-uppercase font-weight-bold" @click.native="getGameRepartition()"
                                      :disabled-tooltip-text="!loading.createGame && $t('GameLobby.fourPlayerRequiredToGetRandomRepartition')"
                                      :text="`<i class='fas fa-random mr-2'></i>${$t('GameLobby.getRandomRepartition')}`"
                                      :loading="loading.getGameRepartition" :disabled="loading.createGame || !areThereEnoughPlayers"/>
                    </div>
                    <div class="col-lg-3">
                        <SubmitButton classes="btn btn-primary btn-lg btn-block text-uppercase font-weight-bold"
                                      :text="`<i class='fa fa-play-circle mr-2'></i>${$t('GameLobby.launchParty')}`"
                                      :loading="loading.createGame" :disabled="loading.getGameRepartition"/>
                    </div>
                    <div class="col-lg-3"/>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import Game from "../../classes/Game";
import Loading from "../shared/Loading";
import Player from "../../classes/Player";
import PlayerCard from "../shared/Game/PlayerCard";
import GameLobbyAlreadyHavePlayingGame from "./GameLobbyAlreadyHavePlayingGame";
import SubmitButton from "../shared/Forms/SubmitButton";

export default {
    name: "GameLobby",
    components: { SubmitButton, GameLobbyAlreadyHavePlayingGame, PlayerCard, Loading },
    data() {
        return {
            waitingGame: new Game(),
            loading: {
                searchForPlayingGame: true,
                createGame: false,
                getGameRepartition: false,
            },
            players: [],
            playerName: "",
        };
    },
    computed: {
        werewolfPlayers() {
            return this.players.filter(player => player.role.group === "werewolves");
        },
        villagerPlayers() {
            return this.players.filter(player => player.role.group === "villagers");
        },
        isPlayerNameTaken() {
            return this.players.find(({ name }) => name === this.playerName.trim());
        },
        canAddPlayer() {
            return !this.isPlayerNameTaken && this.players.length < 20;
        },
        areThereEnoughPlayers() {
            return this.players.length >= 4;
        },
        areThereEnoughVillagers() {
            return !!this.villagerPlayers.length;
        },
        areThereEnoughWerewolves() {
            return !!this.werewolfPlayers.length;
        },
    },
    async created() {
        try {
            await this.checkUserAuthentication();
            const { data } = await this.$werewolvesAssistantAPI.getGames();
            if (data.length) {
                this.waitingGame = new Game(data[0]);
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
                this.players.push(new Player({ name: playerName }));
                this.playerName = "";
            }
        },
        async getGameRepartition() {
            try {
                if (!this.areThereEnoughPlayers) {
                    return;
                }
                this.loading.getGameRepartition = true;
                const players = this.players.map(({ name }) => ({ name }));
                const { data } = await this.$werewolvesAssistantAPI.getGameRepartition({ players });
                for (const { name, role } of data) {
                    const player = this.players.find(player => player.name === name);
                    player.role.current = role;
                }
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading.getGameRepartition = false;
            }
        },
        unsetPlayer(playerName) {
            const idx = this.players.findIndex(({ name }) => name === playerName);
            if (idx !== -1) {
                this.players.splice(idx, 1);
            }
        },
    },
};
</script>

<style>
    .player-item {
        transition: all 0.5s;
    }
    .player-item-enter, .player-item-leave-to {
        opacity: 0;
    }
    .player-item-leave-active {
        position: absolute !important;
    }

    #player-name-input-error {
        height: 25px;
    }
</style>