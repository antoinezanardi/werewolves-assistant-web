<template>
    <div id="ban-voting-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="game.scapegoatPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="ban-voting" @player-selected="playerSelected"/>
        <PlayerTargets :targets="game.alivePlayers" :play="play" attribute="ban-voting" class="flex-grow-1" @player-selected="playerSelected"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";
import PlayerTargets from "@/components/shared/Game/PlayerTargets/PlayerTargets";

export default {
    name: "BanVotingPlayField",
    components: { PlayerTargets, PlayFieldActionText, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
    },
};
</script>

<style scoped>

</style>