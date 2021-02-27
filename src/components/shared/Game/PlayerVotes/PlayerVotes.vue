<template>
    <div id="player-votes" class="row justify-content-center align-items-center">
        <PlayerVote v-for="player in game.alivePlayers" :key="player.name" :player="player" :play="play" :targetable-players="targetablePlayers"
                    class="col-6 col-lg-3" @player-votes="playerVotes"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerVote from "./PlayerVote";

export default {
    name: "PlayerVotes",
    components: { PlayerVote },
    props: {
        play: {
            type: Object,
            required: true,
        },
        targetablePlayers: {
            type: Array,
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