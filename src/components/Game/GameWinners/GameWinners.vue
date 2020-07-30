<template>
    <div id="game-winners" class="d-flex flex-column">
        <div class="d-flex flex-column justify-content-center flex-grow-1">
            <div class="row">
                <div class="col-12 text-center">
                    <img :src="SVGs.trophy" class="animate__animated animate__tada animate__infinite animate__slower"
                         width="100" alt="Trophy"/>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 text-center">
                    <h1 v-html="winnersText"/>
                </div>
            </div>
            <div class="row justify-content-center mt-4">
                <PlayerCard v-for="player in winners" :key="player.name" :game="game" :player="player" class="col-lg-2 col-3"/>
            </div>
        </div>
        <div class="row justify-content-between align-items-center">
            <div class="col-lg-5">
                <button class="btn btn-primary btn-block btn-lg" @click="restartGame">
                    <i class="fa fa-redo mr-2"/>
                    <span v-html="$t('GameWinners.restartGame')"/>
                </button>
            </div>
            <div class="col-lg-5 mt-2 mt-lg-0">
                <router-link class="btn btn-secondary btn-block" to="/">
                    <i class="fa fa-sign-out-alt mr-2"/>
                    <span v-html="$t('GameWinners.quit')"/>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import { stringify } from "qs";
import trophy from "../../../assets/svg/game/trophy.svg";
import Game from "../../../classes/Game";
import PlayerCard from "../../shared/Game/PlayerCard";

export default {
    name: "GameWinners",
    components: { PlayerCard },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    data() {
        return {
            SVGs: { trophy },
        };
    },
    computed: {
        winnersText() {
            return this.game.won.by === "werewolves" ? this.$tc("GameWinners.wonByWerewolves", this.winners.length) : this.$tc("GameWinners.wonByVillagers", this.winners.length);
        },
        winners() {
            return this.game.won.by === "werewolves" ? this.game.werewolfPlayers : this.game.villagerPlayers;
        },
    },
    methods: {
        confirmRestartGame() {
            return Swal.fire({
                title: this.$t("GameWinners.newGame"),
                text: this.$t("GameWinners.doYouWantToKeepSamePlayers"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("GameWinners.keepSamePlayers"),
                cancelButtonText: this.$t("GameWinners.fromScratch"),
            });
        },
        async restartGame() {
            const { value } = await this.confirmRestartGame();
            if (value) {
                return await this.$router.push(`/game-lobby?${stringify({ players: this.game.players.map(player => ({ name: player.name })) })}`);
            } else {
                return await this.$router.push("/game-lobby");
            }
        },
    },
};
</script>

<style scoped>

</style>