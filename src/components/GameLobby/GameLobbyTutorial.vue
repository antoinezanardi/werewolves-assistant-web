<template>
    <v-tour name="gameLobbyTutorial" :steps="steps" :options="options">
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
    name: "GameLobbyTutorial",
    computed: {
        steps() {
            const header = { title: this.$t(`GameLobbyTutorial.howToUseGameLobby`) };
            return [
                { header, target: "#game-lobby-title", content: this.$t("GameLobbyTutorial.toStartAGame") },
                { header, target: "#game-lobby-player-input", content: this.$t("GameLobbyTutorial.eachPlayerName") },
                { header, target: "#random-repartition-button", content: this.$t("GameLobbyTutorial.randomRepartition") },
                { header, target: "#random-repartition-options-button", content: this.$t("GameLobbyTutorial.randomRepartitionOptions") },
                { header, target: "#game-options-modal-button", content: this.$t("GameLobbyTutorial.gameOptionsCanBeChanged") },
                { header, target: "#game-options-modal-button", content: this.$t("GameLobbyTutorial.additionalCardsAndPlayerPositionsCanBeSet") },
                { header, target: "#game-lobby-start-conditions", content: this.$t("GameLobbyTutorial.requirementsToStartAGame") },
                { header, target: "#player-help-for-roles-button", content: this.$t("GameLobbyTutorial.ifPlayersDontKnowRoles") },
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
            this.$tours.gameLobbyTutorial.start();
        },
    },
};
</script>

<style scoped>

</style>