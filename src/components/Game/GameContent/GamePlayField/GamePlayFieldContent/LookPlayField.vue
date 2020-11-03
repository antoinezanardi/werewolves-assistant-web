<template>
    <div id="look-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12 col-lg-4">
                <PlayerCard id="seer-player-card" :player="game.seerPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="seen" @player-selected="playerSelected"/>
        <PlayerTargets :targets="alivePlayersExceptSeer" :play="play" attribute="seen" class="flex-grow-1"
                       @player-selected="playerSelected"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerTargets from "../../../../shared/Game/PlayerTargets/PlayerTargets";
import PlayerCard from "../../../../shared/Game/PlayerCard";
import PlayFieldActionText from "../../../../shared/Game/PlayField/PlayFieldActionText";

export default {
    name: "LookPlayField",
    components: { PlayFieldActionText, PlayerCard, PlayerTargets },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        alivePlayersExceptSeer() {
            return this.game.alivePlayers.filter(player => player.role.current !== "seer");
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
    },
};
</script>