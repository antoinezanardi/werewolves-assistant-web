<template>
    <div id="game-lobby-composition" class="row">
        <div class="col-md-4 text-center d-none d-md-block">
            <span v-html="$tc('GameLobbyComposition.villagersCount', game.villagerPlayers.length, { count: game.villagerPlayers.length })"/>
            <div class="text-muted font-italic">
                <i class="fa mr-2" :class="villagersMinToStartIconClass"/>
                <span v-html="$t('GameLobbyComposition.minToStart', { min: 1 })"/>
            </div>
        </div>
        <div class="col-md-4 text-center d-none d-md-block">
            <span class="font-weight-bold"
                  v-html="$tc('GameLobbyComposition.playerCount', game.players.length, { count: game.players.length })"/>
            <div class="text-muted font-italic">
                <i class="fa mr-2" :class="playersMinToStartIconClass"/>
                <span v-html="$t('GameLobbyComposition.minToStart', { min: 4 })"/>
            </div>
        </div>
        <div class="col-md-4 text-center d-none d-md-block">
            <span v-html="$tc('GameLobbyComposition.werewolvesCount', game.werewolfPlayers.length, { count: game.werewolfPlayers.length })"/>
            <div class="text-muted font-italic">
                <i class="fa mr-2" :class="werewolvesMinToStartIconClass"/>
                <span v-html="$t('GameLobbyComposition.minToStart', { min: 1 })"/>
            </div>
        </div>
        <div class="col-12 text-center d-md-none">
            <span class="font-weight-bold"
                  v-html="$tc('GameLobbyComposition.playerCount', game.players.length, { count: game.players.length })"/>
            <div class="text-muted font-italic">
                <i class="fa mr-2" :class="minPlayerRequirementsToStartClass"/>
                <span v-html="$t('GameLobbyComposition.minPlayerRequirementsToStart')"/>
            </div>
        </div>
    </div>
</template>

<script>
import Game from "../../classes/Game";

export default {
    name: "GameLobbyComposition",
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        werewolvesMinToStartIconClass() {
            return this.game.areThereEnoughWerewolves ? "fa-check text-success" : "fa-times text-danger";
        },
        villagersMinToStartIconClass() {
            return this.game.areThereEnoughVillagers ? "fa-check text-success" : "fa-times text-danger";
        },
        playersMinToStartIconClass() {
            return this.game.areThereEnoughPlayers ? "fa-check text-success" : "fa-times text-danger";
        },
        minPlayerRequirementsToStartClass() {
            return this.game.canStartGame ? "fa-check text-success" : "fa-times text-danger";
        },
    },
};
</script>

<style scoped>

</style>