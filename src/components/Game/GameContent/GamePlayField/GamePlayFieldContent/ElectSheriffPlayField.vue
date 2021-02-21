<template>
    <div id="elect-sheriff-play-field">
        <GamePlayAlerts/>
        <PlayerVotes class="h-100" :play="play" :targetable-players="game.alivePlayers" @player-votes="playerVotes"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerVotes from "@/components/shared/Game/PlayerVotes/PlayerVotes";
import GamePlayAlerts from "@/components/shared/Game/GamePlayAlerts/GamePlayAlerts";

export default {
    name: "ElectSheriffPlayField",
    components: { GamePlayAlerts, PlayerVotes },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        playerVotes(vote) {
            this.$emit("player-votes", vote);
        },
    },
};
</script>

<style scoped>

</style>