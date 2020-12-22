<template>
    <v-tour name="gamePlayFieldTour" :steps="steps" :options="options">
        <template #default="tour">
            <transition name="fade">
                <v-step v-if="tour.steps[tour.currentStep]" :key="tour.currentStep" :step="tour.steps[tour.currentStep]"
                        :previous-step="tour.previousStep" :next-step="tour.nextStep" :stop="tour.stop"
                        :is-first="tour.isFirst" :is-last="tour.isLast" :labels="tour.labels"
                        :highlight="tour.highlight"/>
            </transition>
        </template>
    </v-tour>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "GamePlayFieldTutorial",
    computed: {
        ...mapGetters("game", {
            game: "game",
            gameOptions: "gameOptions",
        }),
        // eslint-disable-next-line max-lines-per-function
        steps() {
            const { firstWaiting } = this.game;
            const { sistersWakingUpInterval, brothersWakingUpInterval } = this.gameOptions;
            const action = `${firstWaiting.for}.${firstWaiting.to}`;
            const header = { title: this.$t(`GamePlayFieldTutorial.${action}.howToPlay`) };
            const steps = {
                "elect-sheriff": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.elect-sheriff.sheriffIsElectedWhen") },
                    { header, target: ".countdown", content: this.$t("GamePlayFieldTutorial.elect-sheriff.playersHave5Min") },
                    { header, target: "#player-votes", content: this.$t("GamePlayFieldTutorial.elect-sheriff.eachPlayerVoteForSheriff") },
                    { header, target: "#vote-play-requirements", content: this.$t("GamePlayFieldTutorial.elect-sheriff.toValidateAnElection") },
                ],
                "seer": {
                    look: [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.${action}.seerLooksWhen`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.${action}.seerCanLook`) },
                        { header, target: "#seer-player-card", content: this.$t(`GamePlayFieldTutorial.${action}.seerPointsAtTarget`) },
                        { header, target: "#target-play-requirements", content: this.$t(`GamePlayFieldTutorial.${action}.toValidateLook`) },
                    ],
                },
                "eat": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.eat.werewolvesEatWhen") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.eat.werewolvesEatAVictim") },
                    { header, target: "#werewolf-players", content: this.$t("GamePlayFieldTutorial.eat.werewolvesPointAtVictim") },
                    { header, target: "#target-play-requirements", content: this.$t("GamePlayFieldTutorial.eat.toValidateEat") },
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
                    { header, target: "#target-play-requirements", content: this.$t("GamePlayFieldTutorial.protect.toValidateProtect") },
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
                    { header, target: "#target-play-requirements", content: this.$t("GamePlayFieldTutorial.delegate.toValidateDelegation") },
                ],
                "shoot": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.shoot.hunterShootsWhen") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.shoot.hunterCanShoot") },
                    { header, target: "#target-play-requirements", content: this.$t("GamePlayFieldTutorial.shoot.toValidateShoot") },
                ],
                "settle-votes": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.settle-votes.sheriffSettleVotesWhen") },
                    { header, target: "#target-play-requirements", content: this.$t("GamePlayFieldTutorial.settle-votes.toValidateSettleVotes") },
                ],
                "choose-side": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.choose-side.dogWolfChoosesSideWhen") },
                    { header, target: "#sides", content: this.$t("GamePlayFieldTutorial.choose-side.dogWolfCanChooseSide") },
                    { header, target: "#play-field-villagers-side", content: this.$t("GamePlayFieldTutorial.choose-side.ifItChoosesVillagers") },
                    { header, target: "#play-field-werewolves-side", content: this.$t("GamePlayFieldTutorial.choose-side.ifItChoosesWerewolves") },
                    { header, target: "#choose-side-play-requirements", content: this.$t("GamePlayFieldTutorial.choose-side.toValidateChooseSide") },
                ],
                "charm": [
                    { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.charm.cupidCharmsWhen") },
                    { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.charm.cupidCanCharm") },
                    { header, target: "#target-play-requirements", content: this.$t("GamePlayFieldTutorial.charm.toValidateCharm") },
                ],
                "lovers": {
                    "meet-each-other": [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.${action}.loversMeetEachOtherWhen`) },
                        { header, target: "#meeting-each-other-players", content: this.$t(`GamePlayFieldTutorial.${action}.loversMustWinTogether`) },
                        { header, target: ".countdown", content: this.$t(`GamePlayFieldTutorial.${action}.loversHave20s`) },
                        { header, target: "#play-submit-button", content: this.$t(`GamePlayFieldTutorial.${action}.noActionRequiredToValidate`) },
                    ],
                },
                "two-sisters": {
                    "meet-each-other": [
                        {
                            header,
                            target: "#game-waiting-label",
                            // eslint-disable-next-line max-len,vue/max-len
                            content: this.$tc(`GamePlayFieldTutorial.${action}.twoSistersMeetEachOtherWhen`, sistersWakingUpInterval, { sistersWakingUpInterval }),
                        },
                        { header, target: "#meeting-each-other-players", content: this.$t(`GamePlayFieldTutorial.${action}.twoSistersTalk`) },
                        { header, target: ".countdown", content: this.$t(`GamePlayFieldTutorial.${action}.twoSistersHave20s`) },
                        { header, target: "#play-submit-button", content: this.$t(`GamePlayFieldTutorial.${action}.noActionRequiredToValidate`) },
                    ],
                },
                "three-brothers": {
                    "meet-each-other": [
                        {
                            header,
                            target: "#game-waiting-label",
                            // eslint-disable-next-line max-len,vue/max-len
                            content: this.$tc(`GamePlayFieldTutorial.${action}.threeBrothersMeetEachOtherWhen`, brothersWakingUpInterval, { brothersWakingUpInterval }),
                        },
                        { header, target: "#meeting-each-other-players", content: this.$t(`GamePlayFieldTutorial.${action}.threeBrothersTalk`) },
                        { header, target: ".countdown", content: this.$t(`GamePlayFieldTutorial.${action}.threeBrothersHave20s`) },
                        { header, target: "#play-submit-button", content: this.$t(`GamePlayFieldTutorial.${action}.noActionRequiredToValidate`) },
                    ],
                },
                "wild-child": {
                    "choose-model": [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.${action}.wildChildChooseModelWhen`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.${action}.wildChildCanChooseModel`) },
                        { header, target: "#target-play-requirements", content: this.$t(`GamePlayFieldTutorial.${action}.toValidateChooseModel`) },
                    ],
                },
            };
            return steps[firstWaiting.for] && steps[firstWaiting.for][firstWaiting.to] ? steps[firstWaiting.for][firstWaiting.to] : [];
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
            this.$tours.gamePlayFieldTour.start();
        },
    },
};
</script>

<style scoped>

</style>