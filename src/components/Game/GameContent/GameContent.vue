<template>
    <div id="game-content" class="d-flex flex-column">
        <GameContentHeader :game="game"/>
        <GameContentPlayField :game="game" :play="play" class="flex-grow-1" @playerVotes="playerVotes"
                              @playerSelected="playerSelected"/>
        <GameContentFooter :game="game" :play="play" @updateGame="updateGame"/>
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
                targets: [],
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
        playerSelected({ player, selected, attribute }) {
            const target = { player: player._id, attribute };
            if (attribute === "drank-life-potion") {
                target.potion = { life: true };
            } else if (attribute === "drank-death-potion") {
                target.potion = { death: true };
            }
            const idx = this.play.targets.findIndex(target => target.player === player._id);
            if (idx !== -1) {
                return selected ? this.play.targets.splice(idx, 1, target) : this.play.targets.splice(idx, 1);
            } else if (selected) {
                return this.play.targets.push(target);
            }
        },
        resetPlay() {
            this.play.votes = [];
            this.play.targets = [];
        },
        updateGame(game) {
            this.resetPlay();
            this.$emit("updateGame", game);
        },
    },
};
</script>

<style scoped>

</style>