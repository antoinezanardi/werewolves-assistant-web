<template>
    <v-tour name="gamePlayFieldTour" :steps="steps" :options="options">
        <template slot-scope="tour">
            <transition name="fade">
                <v-step  v-if="tour.steps[tour.currentStep]" :key="tour.currentStep" :step="tour.steps[tour.currentStep]"
                         :previous-step="tour.previousStep" :next-step="tour.nextStep" :stop="tour.stop"
                         :is-first="tour.isFirst" :is-last="tour.isLast" :labels="tour.labels" :highlight="tour.highlight"/>
            </transition>
        </template>
    </v-tour>
</template>

<script>
import Game from "@/classes/Game";

export default {
    name: "GamePlayFieldTutorial",
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        // eslint-disable-next-line max-lines-per-function
        steps() {
            const header = { title: this.$t(`GamePlayFieldTutorial.${this.game.firstWaiting.to}.howToPlay`) };
            const steps = {
                "elect-sheriff": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.elect-sheriff.sheriffIsElectedWhen") },
                    { header, target: ".countdown", content: this.$t("GamePlayFieldTutorial.elect-sheriff.playersHave5Min") },
                    { header, target: "#player-votes", content: this.$t("GamePlayFieldTutorial.elect-sheriff.eachPlayerVoteForSheriff") },
                    { header, target: "#vote-play-requirements", content: this.$t("GamePlayFieldTutorial.elect-sheriff.toValidateAnElection") },
                ],
                "look": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.look.seerLooksWhen") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.look.seerCanLook") },
                    { header, target: "#seer-player-card", content: this.$t("GamePlayFieldTutorial.look.seerPointsAtTarget") },
                    { header, target: "#one-target-play-requirements", content: this.$t("GamePlayFieldTutorial.look.toValidateLook") },
                ],
                "eat": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.eat.werewolvesEatWhen") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.eat.werewolvesEatAVictim") },
                    { header, target: "#werewolf-players", content: this.$t("GamePlayFieldTutorial.eat.werewolvesPointAtVictim") },
                    { header, target: "#one-target-play-requirements", content: this.$t("GamePlayFieldTutorial.eat.toValidateEat") },
                ],
                "use-potion": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.use-potion.witchUsesPotionWhen") },
                    { header, target: "#potion-tabs", content: this.$t("GamePlayFieldTutorial.use-potion.witchCanUsePotions") },
                    { header, target: "#life-potion-tab", content: this.$t("GamePlayFieldTutorial.use-potion.lifePotionProtects") },
                    { header, target: "#life-potion-tab", content: this.$t("GamePlayFieldTutorial.use-potion.ifLifePotionHasBeenUsed") },
                    { header, target: "#death-potion-tab", content: this.$t("GamePlayFieldTutorial.use-potion.deathPotionKills") },
                    { header, target: "#death-potion-tab", content: this.$t("GamePlayFieldTutorial.use-potion.ifDeathPotionHasBeenUsed") },
                    { header, target: "#play-submit-button", content: this.$t("GamePlayFieldTutorial.use-potion.toValidateUsePotion") },
                ],
                "protect": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.protect.guardProtectsWhen") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.protect.guardCanProtect") },
                    { header, target: "#guard-player-card", content: this.$t("GamePlayFieldTutorial.protect.guardPointsAtTarget") },
                    { header, target: "#one-target-play-requirements", content: this.$t("GamePlayFieldTutorial.protect.toValidateProtect") },
                ],
                "mark": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.mark.ravenMarksWhen") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.mark.ravenCanMark") },
                    { header, target: "#raven-player-card", content: this.$t("GamePlayFieldTutorial.mark.ravenPointsAtTarget") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.mark.gameMasterWillDropMarkCard") },
                    { header, target: "#play-submit-button", content: this.$t("GamePlayFieldTutorial.mark.toValidateMark") },
                ],
                "vote": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.vote.allVoteWhen") },
                    { header, target: ".countdown", content: this.$t("GamePlayFieldTutorial.vote.playersHave5Min") },
                    { header, target: "#player-votes", content: this.$t("GamePlayFieldTutorial.vote.eachPlayerVote") },
                    { header, target: "#vote-play-requirements", content: this.$t("GamePlayFieldTutorial.vote.toValidateAVote") },
                ],
                "delegate": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.delegate.sheriffDelegatesWhen") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.delegate.noDemocracyHere") },
                    { header, target: "#one-target-play-requirements", content: this.$t("GamePlayFieldTutorial.delegate.toValidateDelegation") },
                ],
                "shoot": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.shoot.hunterShootsWhen") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.shoot.hunterCanShoot") },
                    { header, target: "#one-target-play-requirements", content: this.$t("GamePlayFieldTutorial.shoot.toValidateShoot") },
                ],
                "settle-votes": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.settle-votes.sheriffSettleVotesWhen") },
                    { header, target: "#one-target-play-requirements", content: this.$t("GamePlayFieldTutorial.settle-votes.toValidateSettleVotes") },
                ],
            };
            return steps[this.game.firstWaiting.to];
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
            this.$tours["gamePlayFieldTour"].start();
        },
    },
};
</script>

<style scoped>

</style>