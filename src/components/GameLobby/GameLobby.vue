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
                            <div class="input-group input-group-lg">
                                <input type="text" class="form-control" :placeholder="$t('GameLobby.playerName')"
                                       v-model="playerName" :class="{ 'is-invalid': isPlayerNameTaken }"/>
                                <div class="input-group-append">
                                    <button class="btn btn-lg btn-primary" :disabled="isPlayerNameTaken">
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
                <transition-group tag="div" name="player-item" id="players"
                                  class="row justify-content-center align-items-center flex-grow-1 p-2">
                    <PlayerCard v-for="player in players" :key="player.name" :player="player"
                                class="player-item col-lg-2 col-xs-4"/>
                </transition-group>
                <div>
                    <hr class="bg-dark"/>
                </div>
                <div id="game-lobby-footer" class="row justify-content-center align-items-center">
                    <div class="col-lg-3">
                        <SubmitButton classes="btn btn-primary btn-lg btn-block text-uppercase font-weight-bold"
                                      :text="`<i class='fa fa-play-circle mr-2'></i>${$t('GameLobby.launchParty')}`"
                                      :loading="loading.createGame" :disabled="loading.getGameRepartition"/>
                    </div>
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
        isPlayerNameTaken() {
            return this.players.find(({ name }) => name === this.playerName.trim());
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
            if (!playerName || this.isPlayerNameTaken) {
                return this.playerName = "";
            } else {
                this.players.push(new Player({ name: playerName }));
                this.playerName = "";
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
        transform: translateY(30px);
    }
    .player-item-leave-active {
        position: absolute;
    }

    #player-name-input-error {
        height: 25px;
    }
</style>