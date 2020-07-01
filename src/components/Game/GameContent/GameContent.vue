<template>
    <div id="game-content" class="d-flex flex-column">
        <GameContentHeader :game="game"/>
        <GameContentPlayField :game="game" class="flex-grow-1"/>
        <GameContentFooter :game="game"/>
    </div>
</template>

<script>
import Game from "../../../classes/Game";
import GameContentHeader from "./GameContentHeader/GameContentHeader";
import GameContentFooter from "./GameContentFooter/GameContentFooter";
import GameContentPlayField from "./GameContentPlayField/GameContentPlayField";

export default {
    name: "GameContent",
    components: { GameContentPlayField, GameContentFooter, GameContentHeader },
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