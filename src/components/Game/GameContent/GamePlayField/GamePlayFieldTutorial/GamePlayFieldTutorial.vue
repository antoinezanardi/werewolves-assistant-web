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
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.seer.look.seerLooksWhen`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.seer.look.seerCanLook`) },
                        { header, target: "#seer-player-card", content: this.$t(`GamePlayFieldTutorial.seer.look.seerPointsAtTarget`) },
                        { header, target: "#target-play-requirements", content: this.$t(`GamePlayFieldTutorial.seer.look.toValidateLook`) },
                    ],
                },
                "werewolves": {
                    eat: [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.werewolves.eat.werewolvesEatWhen`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.werewolves.eat.werewolvesEatAVictim`) },
                        { header, target: "#werewolf-players", content: this.$t(`GamePlayFieldTutorial.werewolves.eat.werewolvesPointAtVictim`) },
                        { header, target: "#target-play-requirements", content: this.$t(`GamePlayFieldTutorial.werewolves.eat.toValidateEat`) },
                    ],
                },
                "witch": {
                    "use-potion": [
                        { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.witch.use-potion.witchUsesPotionWhen") },
                        { header, target: "#potion-tabs", content: this.$t("GamePlayFieldTutorial.witch.use-potion.witchCanUsePotions") },
                        { header, target: "#life-potion-tab", content: this.$t("GamePlayFieldTutorial.witch.use-potion.lifePotionProtects") },
                        { header, target: "#life-potion-tab", content: this.$t("GamePlayFieldTutorial.witch.use-potion.ifLifePotionHasBeenUsed") },
                        { header, target: "#death-potion-tab", content: this.$t("GamePlayFieldTutorial.witch.use-potion.deathPotionKills") },
                        { header, target: "#death-potion-tab", content: this.$t("GamePlayFieldTutorial.witch.use-potion.ifDeathPotionHasBeenUsed") },
                        { header, target: "#play-submit-button", content: this.$t("GamePlayFieldTutorial.witch.use-potion.toValidateUsePotion") },
                    ],
                },
                "guard": {
                    protect: [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.guard.protect.guardProtectsWhen`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.guard.protect.guardCanProtect`) },
                        { header, target: "#guard-player-card", content: this.$t(`GamePlayFieldTutorial.guard.protect.guardPointsAtTarget`) },
                        { header, target: "#target-play-requirements", content: this.$t(`GamePlayFieldTutorial.guard.protect.toValidateProtect`) },
                    ],
                },
                "raven": {
                    mark: [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.raven.mark.ravenMarksWhen`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.raven.mark.ravenCanMark`) },
                        { header, target: "#raven-player-card", content: this.$t(`GamePlayFieldTutorial.raven.mark.ravenPointsAtTarget`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.raven.mark.gameMasterWillDropMarkCard`) },
                        { header, target: "#play-submit-button", content: this.$t(`GamePlayFieldTutorial.raven.mark.toValidateMark`) },
                    ],
                },
                "all": {
                    vote: [
                        { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.all.vote.allVoteWhen") },
                        { header, target: ".countdown", content: this.$t("GamePlayFieldTutorial.all.vote.playersHave5Min") },
                        { header, target: "#player-votes", content: this.$t("GamePlayFieldTutorial.all.vote.eachPlayerVote") },
                        { header, target: "#vote-play-requirements", content: this.$t("GamePlayFieldTutorial.all.vote.toValidateAVote") },
                    ],
                },
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
                        {
                            header,
                            target: "#game-waiting-label",
                            content: this.$t(`GamePlayFieldTutorial.lovers.meet-each-other.loversMeetEachOtherWhen`),
                        },
                        {
                            header,
                            target: "#meeting-each-other-players",
                            content: this.$t(`GamePlayFieldTutorial.lovers.meet-each-other.loversMustWinTogether`),
                        },
                        {
                            header,
                            target: ".countdown",
                            content: this.$t(`GamePlayFieldTutorial.lovers.meet-each-other.loversHave20s`),
                        },
                        {
                            header,
                            target: "#play-submit-button",
                            content: this.$t(`GamePlayFieldTutorial.lovers.meet-each-other.noActionRequiredToValidate`),
                        },
                    ],
                },
                "two-sisters": {
                    "meet-each-other": [
                        {
                            header,
                            target: "#game-waiting-label",
                            // eslint-disable-next-line max-len,vue/max-len
                            content: this.$tc(`GamePlayFieldTutorial.two-sisters.meet-each-other.twoSistersMeetEachOtherWhen`, sistersWakingUpInterval, { sistersWakingUpInterval }),
                        },
                        {
                            header,
                            target: "#meeting-each-other-players",
                            content: this.$t(`GamePlayFieldTutorial.two-sisters.meet-each-other.twoSistersTalk`),
                        },
                        {
                            header,
                            target: ".countdown",
                            content: this.$t(`GamePlayFieldTutorial.two-sisters.meet-each-other.twoSistersHave20s`),
                        },
                        {
                            header,
                            target: "#play-submit-button",
                            content: this.$t(`GamePlayFieldTutorial.two-sisters.meet-each-other.noActionRequiredToValidate`),
                        },
                    ],
                },
                "three-brothers": {
                    "meet-each-other": [
                        {
                            header,
                            target: "#game-waiting-label",
                            // eslint-disable-next-line max-len,vue/max-len
                            content: this.$tc(`GamePlayFieldTutorial.three-brothers.meet-each-other.threeBrothersMeetEachOtherWhen`, brothersWakingUpInterval, { brothersWakingUpInterval }),
                        },
                        {
                            header,
                            target: "#meeting-each-other-players",
                            content: this.$t(`GamePlayFieldTutorial.three-brothers.meet-each-other.threeBrothersTalk`),
                        },
                        {
                            header,
                            target: ".countdown",
                            content: this.$t(`GamePlayFieldTutorial.three-brothers.meet-each-other.threeBrothersHave20s`),
                        },
                        {
                            header,
                            target: "#play-submit-button",
                            content: this.$t(`GamePlayFieldTutorial.three-brothers.meet-each-other.noActionRequiredToValidate`),
                        },
                    ],
                },
                "wild-child": {
                    "choose-model": [
                        {
                            header,
                            target: "#game-waiting-label",
                            content: this.$t(`GamePlayFieldTutorial.wild-child.choose-model.wildChildChooseModelWhen`),
                        },
                        {
                            header,
                            target: "#player-targets",
                            content: this.$t(`GamePlayFieldTutorial.wild-child.choose-model.wildChildCanChooseModel`),
                        },
                        {
                            header,
                            target: "#target-play-requirements",
                            content: this.$t(`GamePlayFieldTutorial.wild-child.choose-model.toValidateChooseModel`),
                        },
                    ],
                },
                "big-bad-wolf": {
                    eat: [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.big-bad-wolf.eat.bigBadWolfEatsWhen`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.big-bad-wolf.eat.bigBadWolfEatsAVictim`) },
                        { header, target: "#werewolf-players", content: this.$t(`GamePlayFieldTutorial.big-bad-wolf.eat.bigBadWolfPointsAtVictim`) },
                        { header, target: "#target-play-requirements", content: this.$t(`GamePlayFieldTutorial.big-bad-wolf.eat.toValidateEat`) },
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