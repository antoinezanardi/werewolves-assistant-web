<template>
    <div id="vote-play-field">
        <PlayerVotes class="h-100" @playerVotes="playerVotes"/>
    </div>
</template>

<script>
import PlayerVotes from "../../../../shared/Game/PlayerVotes/PlayerVotes";

export default {
    name: "VotePlayField",
    components: { PlayerVotes },
    methods: {
        playerVotes(vote) {
            this.$emit("playerVotes", vote);
        },
    },
};
</script>

<style scoped>

</style>