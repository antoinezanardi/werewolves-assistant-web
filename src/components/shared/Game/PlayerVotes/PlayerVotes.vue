<template>
    <div id="player-votes" class="row justify-content-center align-items-center">
        <PlayerVote v-for="player in game.alivePlayers" :key="player.name" :game="game" :player="player"
                    class="col-6 col-lg-3" @playerVotes="playerVotes"/>
    </div>
</template>

<script>
import PlayerVote from "./PlayerVote";
import Game from "../../../../classes/Game";

export default {
    name: "PlayerVotes",
    components: { PlayerVote },
    props: {
        game: {
            type: Game,
            required: true,
        },
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