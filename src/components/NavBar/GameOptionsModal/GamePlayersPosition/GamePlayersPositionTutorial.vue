<template>
    <v-tour name="GamePlayersPositionTutorial" :steps="steps" :options="options">
        <template #default="tour">
            <transition name="fade">
                <v-step v-if="tour.steps[tour.currentStep]" :key="tour.currentStep" :step="tour.steps[tour.currentStep]"
                        :previous-step="tour.previousStep" :next-step="tour.nextStep" :stop="tour.stop"
                        :is-first="tour.isFirst" :is-last="tour.isLast" :labels="tour.labels" :highlight="tour.highlight"/>
            </transition>
        </template>
    </v-tour>
</template>

<script>
export default {
    name: "GamePlayersPositionTutorial",
    computed: {
        steps() {
            const header = { title: this.$t(`GamePlayersPositionTutorial.howToPlacePlayers`) };
            return [
                { header, target: "#player-positions-list", content: this.$t("GamePlayersPositionTutorial.toPlacePlayers") },
                { header, target: "#left-neighbors-flow", content: this.$t("GamePlayersPositionTutorial.leftNeighborsAbove") },
                { header, target: "#right-neighbors-flow", content: this.$t("GamePlayersPositionTutorial.rightNeighborsBelow") },
                {
                    header,
                    target: "#players-horizontal-list-position",
                    content: this.$t("GamePlayersPositionTutorial.useHorizontalListToCheckPositions"),
                },
            ];
        },
        options() {
            return {
                labels: this.$t("VueTour.labels"),
                highlight: true,
            };
        },
    },
    methods: {
        startTour() {
            this.$tours.GamePlayersPositionTutorial.start();
        },
    },
};
</script>

<style scoped>

</style>