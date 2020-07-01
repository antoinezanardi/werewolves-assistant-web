<template>
    <div id="game-content-footer">
        footer
    </div>
</template>

<script>
import Game from "../../../../classes/Game";

export default {
    name: "GameContentFooter",
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