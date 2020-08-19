<template>
    <div id="player-votes" class="row justify-content-center align-items-center">
        <PlayerVote v-for="player in game.alivePlayers" :key="player.name" :player="player"
                    class="col-6 col-lg-3" @playerVotes="playerVotes"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerVote from "./PlayerVote";

export default {
    name: "PlayerVotes",
    components: { PlayerVote },
    computed: {
        ...mapGetters("game", {
            game: "game",
        }),
    },
    methods: {
        playerVotes(vote) {
            this.$emit("playerVotes", vote);
        },
    },
};
</script>

<style scoped>

</style>