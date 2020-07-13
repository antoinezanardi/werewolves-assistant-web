<template>
    <div id="eat-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <PlayerCard v-for="player of game.aliveWerewolfPlayers" :key="player.name" :game="game"
                        :player="player" size="lg" class="col-3"/>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    <VRoller :defaultChar="eatTargetText" :text="eatTargetText"/>
                </h3>
            </div>
        </div>
        <PlayerTargets :game="game" :targets="alivePlayersExceptWerewolves" :play="play" attribute="eaten" class="flex-grow-1" @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import PlayerCard from "../../../shared/Game/PlayerCard";
import PlayerTargets from "../../../shared/Game/PlayerTargets/PlayerTargets";
import Game from "../../../../classes/Game";

export default {
    name: "EatPlayField",
    components: { PlayerTargets, PlayerCard },
    props: {
        game: {
            type: Game,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        alivePlayersExceptWerewolves() {
            return this.game.alivePlayers.filter(player => player.role.group !== "werewolves");
        },
        eatTargetText() {
            const playerTargeted = this.play.targets.length ? this.game.players.find(({ _id }) => _id === this.play.targets[0].player) : null;
            const text = `${this.$tc("EatPlayField.wantToEat", this.game.aliveWerewolfPlayers.length)} `;
            return playerTargeted ? text + playerTargeted.name : `${text} ...`;
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
        },
    },
};
</script>

<style scoped>

</style>