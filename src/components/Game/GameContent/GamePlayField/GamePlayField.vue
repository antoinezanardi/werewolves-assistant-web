<template>
    <div id="game-play-field" class="h-100 d-flex flex-column">
        <GamePlayFieldHeader @start-tutorial="startTutorial"/>
        <GamePlayFieldContent id="game-content-play-field" :play="play" class="visible-scrollbar"
                              @player-votes="playerVotes" @player-selected="playerSelected"/>
        <GamePlayFieldFooter :play="play"/>
        <GamePlayFieldTutorial ref="gamePlayFieldTutorial"/>
    </div>
</template>

<script>
import GamePlayFieldHeader from "./GamePlayFieldHeader/GamePlayFieldHeader";
import GamePlayFieldFooter from "./GamePlayFieldFooter/GamePlayFieldFooter";
import GamePlayFieldContent from "./GamePlayFieldContent/GamePlayFieldContent";
import GamePlayFieldTutorial
    from "@/components/Game/GameContent/GamePlayField/GamePlayFieldTutorial/GamePlayFieldTutorial";

export default {
    name: "GamePlayField",
    components: { GamePlayFieldTutorial, GamePlayFieldContent, GamePlayFieldFooter, GamePlayFieldHeader },
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
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
        startTutorial() {
            this.$refs.gamePlayFieldTutorial.startTour();
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