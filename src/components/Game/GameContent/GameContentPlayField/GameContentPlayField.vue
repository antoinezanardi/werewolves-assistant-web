<template>
    <div id="game-content-play-field">
        play field
    </div>
</template>

<script>
import Game from "../../../../classes/Game";

export default {
    name: "GameContentPlayField",
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
};
</script>

<style scoped>

</style>