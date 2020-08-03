<template>
    <div id="game-play-field" class="h-100 d-flex flex-column">
        <GamePlayFieldHeader :game="game"/>
        <GamePlayFieldContent :game="game" :play="play" id="game-content-play-field" @playerVotes="playerVotes"
                              @playerSelected="playerSelected"/>
        <GamePlayFieldFooter :game="game" :play="play" @updateGame="updateGame"/>
    </div>
</template>

<script>
import GamePlayFieldHeader from "./GamePlayFieldHeader/GamePlayFieldHeader";
import GamePlayFieldFooter from "./GamePlayFieldFooter/GamePlayFieldFooter";
import GamePlayFieldContent from "./GamePlayFieldContent/GamePlayFieldContent";
import Game from "../../../../classes/Game";

export default {
    name: "GamePlayField",
    components: { GamePlayFieldContent, GamePlayFieldFooter, GamePlayFieldHeader },
    props: {
        game: {
            type: Game,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
    },
    methods: {
        playerVotes(vote) {
            this.$emit("playerVotes", vote);
        },
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
        },
        updateGame(game) {
            this.$emit("updateGame", game);
        },
    },
};
</script>

<style scoped lang="scss">
    #game-content-play-field {
        overflow-y: scroll;
        width: 100%;
        flex-grow: 1;
    }
</style>