<template>
    <tr v-if="historyPhaseLineDisplayed" class="row">
        <td class="col-12 text-center">
            <h3 class="my-1">
                <i class="fa mr-2" :class="phaseClasses"/>
                <span v-html="phaseText"/>
            </h3>
        </td>
    </tr>
</template>

<script>
export default {
    name: "GameSummaryHistoryPhaseLine",
    props: {
        gameHistory: {
            type: Array,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    computed: {
        historyPhaseLineDisplayed() {
            return !this.previousGameHistoryEntry || this.previousGameHistoryEntry.phase !== this.gameHistoryEntry.phase ||
                this.previousGameHistoryEntry.turn !== this.gameHistoryEntry.turn;
        },
        gameHistoryEntry() {
            return this.gameHistory[this.index];
        },
        previousGameHistoryEntry() {
            return this.index ? this.gameHistory[this.index - 1] : null;
        },
        phaseClasses() {
            return this.gameHistoryEntry.phase === "day" ? "fa-sun sun-color" : "fa-moon moon-color";
        },
        phaseText() {
            const { phase, turn } = this.gameHistoryEntry;
            if (phase === "day") {
                return `${this.$t("GameSummaryHistoryPlayLine.day")} ${turn}`;
            }
            return `${this.$t("GameSummaryHistoryPlayLine.night")} ${turn}`;
        },
    },
};
</script>

<style scoped>

</style>