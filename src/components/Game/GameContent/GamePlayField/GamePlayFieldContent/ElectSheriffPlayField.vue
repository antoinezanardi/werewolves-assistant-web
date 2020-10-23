<template>
    <div id="elect-sheriff-play-field">
        <PlayerVotes class="h-100" @player-votes="playerVotes"/>
    </div>
</template>

<script>
import PlayerVotes from "../../../../shared/Game/PlayerVotes/PlayerVotes";

export default {
    name: "ElectSheriffPlayField",
    components: { PlayerVotes },
    methods: {
        playerVotes(vote) {
            this.$emit("player-votes", vote);
        },
    },
};
</script>

<style scoped>

</style>