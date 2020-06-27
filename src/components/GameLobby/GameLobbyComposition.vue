<template>
    <div id="game-lobby-composition" class="row">
        <div class="col text-center">
            <span v-html="$tc('GameLobbyComposition.villagersCount', villagerPlayers.length, { count: villagerPlayers.length })"/>
            <div class="text-muted font-italic">
                <i class="fa mr-2" :class="villagersMinToStartIconClass"/>
                <span v-html="$t('GameLobbyComposition.minToStart', { min: 1 })"/>
            </div>
        </div>
        <div class="col text-center">
            <span class="font-weight-bold" v-html="$tc('GameLobbyComposition.playerCount', players.length, { count: players.length })"/>
            <div class="text-muted font-italic">
                <i class="fa mr-2" :class="playersMinToStartIconClass"/>
                <span v-html="$t('GameLobbyComposition.minToStart', { min: 4 })"/>
            </div>
        </div>
        <div class="col text-center">
            <span v-html="$tc('GameLobbyComposition.werewolvesCount', werewolfPlayers.length, { count: werewolfPlayers.length })"/>
            <div class="text-muted font-italic">
                <i class="fa mr-2" :class="werewolvesMinToStartIconClass"/>
                <span v-html="$t('GameLobbyComposition.minToStart', { min: 1 })"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameLobbyComposition",
    props: {
        players: {
            type: Array,
            required: true,
        },
    },
    computed: {
        werewolfPlayers() {
            return this.players.filter(player => player.role.group === "werewolves");
        },
        villagerPlayers() {
            return this.players.filter(player => player.role.group === "villagers");
        },
        areThereEnoughVillagers() {
            return !!this.villagerPlayers.length;
        },
        areThereEnoughWerewolves() {
            return !!this.werewolfPlayers.length;
        },
        areThereEnoughPlayers() {
            return this.players.length >= 4;
        },
        werewolvesMinToStartIconClass() {
            return this.areThereEnoughWerewolves ? "fa-check text-success" : "fa-times text-danger";
        },
        villagersMinToStartIconClass() {
            return this.areThereEnoughVillagers ? "fa-check text-success" : "fa-times text-danger";
        },
        playersMinToStartIconClass() {
            return this.areThereEnoughPlayers ? "fa-check text-success" : "fa-times text-danger";
        },
    },
};
</script>

<style scoped>

</style>