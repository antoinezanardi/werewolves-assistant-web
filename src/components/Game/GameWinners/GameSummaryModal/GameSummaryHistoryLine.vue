<template>
    <div id="game-summary-history-line" class="row">
        <div class="col-12">
            <hr class="bg-dark my-3"/>
        </div>
        <div class="col-2 d-flex flex-column justify-content-center align-items-center">
            <i class="fa" :class="phaseClasses"/>
            <div class="text-center" v-html="phaseText"/>
        </div>
    </div>
</template>

<script>
import Game from "@/classes/Game";
import GameHistory from "@/classes/GameHistory";

export default {
    name: "GameSummaryHistoryLine",
    props: {
        game: {
            type: Game,
            required: true,
        },
        gameHistoryEntry: {
            type: GameHistory,
            required: true,
        },
    },
    computed: {
        phaseClasses() {
            return this.gameHistoryEntry.phase === "day" ? "fa-sun sun-color" : "fa-moon moon-color";
        },
        phaseText() {
            const { phase, turn } = this.gameHistoryEntry;
            if (phase === "day") {
                return `${this.$t("GameSummaryHistoryLine.day")} ${turn}`;
            } else {
                return `${this.$t("GameSummaryHistoryLine.night")} ${turn}`;
            }
        },
    },
};
</script>

<style scoped>

</style>