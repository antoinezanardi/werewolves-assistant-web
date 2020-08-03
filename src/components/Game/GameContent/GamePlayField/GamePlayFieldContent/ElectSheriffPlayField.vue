<template>
    <div id="elect-sheriff-play-field">
        <PlayerVotes :game="game" class="h-100" @playerVotes="playerVotes"/>
    </div>
</template>

<script>
import Game from "../../../../../classes/Game";
import PlayerVotes from "../../../../shared/Game/PlayerVotes/PlayerVotes";

export default {
    name: "ElectSheriffPlayField",
    components: { PlayerVotes },
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