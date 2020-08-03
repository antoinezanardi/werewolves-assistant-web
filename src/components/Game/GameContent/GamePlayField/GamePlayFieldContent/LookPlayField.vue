<template>
    <div id="look-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :game="game" :player="game.seerPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :game="game" :play="play" attribute="seen" @playerSelected="playerSelected"/>
        <PlayerTargets :game="game" :targets="alivePlayersExceptSeer" :play="play" attribute="seen" class="flex-grow-1"
                       @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import Game from "../../../../../classes/Game";
import PlayerTargets from "../../../../shared/Game/PlayerTargets/PlayerTargets";
import PlayerCard from "../../../../shared/Game/PlayerCard";
import PlayFieldActionText from "../../../../shared/Game/PlayField/PlayFieldActionText";

export default {
    name: "LookPlayField",
    components: { PlayFieldActionText, PlayerCard, PlayerTargets },
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
        alivePlayersExceptSeer() {
            return this.game.alivePlayers.filter(player => player.role.current !== "seer");
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
        },
    },
};
</script>