<template>
    <div id="game-content-play-field">
        <transition name="fade" mode="out-in">
            <ElectSheriffPlayField v-if="game.firstWaiting.to === 'elect-sheriff'" key="elect-sheriff"
                                   :game="game" class="h-100" @playerVotes="playerVotes"/>
            <div v-else>?</div>
        </transition>
    </div>
</template>

<script>
import Game from "../../../../classes/Game";
import ElectSheriffPlayField from "./ElectSheriffPlayField";

export default {
    name: "GameContentPlayField",
    components: { ElectSheriffPlayField },
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