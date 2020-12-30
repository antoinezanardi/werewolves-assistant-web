<template>
    <div id="choose-model-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="game.wildChildPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="worshiped" @player-selected="playerSelected"/>
        <PlayerTargets :targets="alivePlayersExceptWildChild" :play="play" attribute="worshiped" class="flex-grow-1"
                       @player-selected="playerSelected"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";
import PlayerTargets from "@/components/shared/Game/PlayerTargets/PlayerTargets";

export default {
    name: "ChooseModelPlayField",
    components: { PlayerTargets, PlayFieldActionText, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        alivePlayersExceptWildChild() {
            return this.game.alivePlayers.filter(player => player.role.current !== "wild-child");
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
    },
};
</script>

<style scoped>

</style>