<template>
    <div id="elect-sheriff-play-field">
        <PlayerVotes class="h-100" :play="play" @player-votes="playerVotes"/>
    </div>
</template>

<script>
import PlayerVotes from "@/components/shared/Game/PlayerVotes/PlayerVotes";

export default {
    name: "ElectSheriffPlayField",
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