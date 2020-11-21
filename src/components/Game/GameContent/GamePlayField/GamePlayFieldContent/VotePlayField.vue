<template>
    <div id="vote-play-field">
        <PlayerVotes :play="play" class="h-100" @player-votes="playerVotes"/>
    </div>
</template>

<script>
import PlayerVotes from "@/components/shared/Game/PlayerVotes/PlayerVotes";

export default {
    name: "VotePlayField",
    components: { PlayerVotes },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    methods: {
        playerVotes(vote) {
            this.$emit("player-votes", vote);
        },
    },
};
</script>

<style scoped>

</style>