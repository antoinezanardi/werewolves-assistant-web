<template>
    <div id="game-content" class="d-flex flex-column">
        <GameContentHeader :game="game"/>
        <GameContentPlayField :game="game" :play="play" class="flex-grow-1" @playerVotes="playerVotes"/>
        <GameContentFooter :game="game" :play="play"/>
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
    data() {
        return {
            play: {
                votes: [],
            },
        };
    },
    methods: {
        playerVotes(vote) {
            const idx = this.play.votes.findIndex(({ from }) => from === vote.from);
            if (idx !== -1) {
                return vote.for ? this.play.votes.splice(idx, 1, vote) : this.play.votes.splice(idx, 1);
            } else if (vote.for) {
                return this.play.votes.push(vote);
            }
        },
    },
};
</script>

<style scoped>

</style>