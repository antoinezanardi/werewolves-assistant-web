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
import { insertIf } from "@/helpers/functions/Array";

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
            const sistersWakingUpInterval = this.gameOptions.roles.twoSisters.wakingUpInterval;
            const brothersWakingUpInterval = this.gameOptions.roles.threeBrothers.wakingUpInterval;
            const {
                scapegoatPlayer, vileFatherOfWolvesPlayer, idiotPlayer, ancientPlayer, villagerVillagerPlayer, angelPlayer,
                isIdiotProtectedFromVotes, doesAngelWinIfHeDiesNow, witchPlayer, guardPlayer,
            } = this.game;
            const action = `${firstWaiting.for}.${firstWaiting.to}`;
            const header = { title: this.$t(`GamePlayFieldTutorial.${action}.howToPlay`) };
            const steps = {
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
                        ...insertIf(!!angelPlayer && angelPlayer.isAliveAndPowerful && doesAngelWinIfHeDiesNow, {
                            header,
                            target: `#game-play-alert-angel-will-win-if-he-dies`,
                            content: this.$t("GamePlayFieldTutorial.werewolves.eat.angelCanWin"),
                        }),
                        ...insertIf(!!ancientPlayer && ancientPlayer.isAlive, {
                            header,
                            target: `#game-play-alert-ancient-can-survive-werewolves`,
                            content: this.$t("GamePlayFieldTutorial.werewolves.eat.ancientCanSurvive"),
                        }),
                        ...insertIf(!!guardPlayer && guardPlayer.isAliveAndPowerful, {
                            header,
                            target: `#game-play-alert-guard-can-protect-target`,
                            content: this.$t("GamePlayFieldTutorial.werewolves.eat.guardCanProtect"),
                        }),
                        ...insertIf(!!witchPlayer && witchPlayer.isAliveAndPowerful, {
                            header,
                            target: `#game-play-alert-witch-can-protect-target`,
                            content: this.$t("GamePlayFieldTutorial.werewolves.eat.witchCanSave"),
                        }),
                        ...insertIf(!!vileFatherOfWolvesPlayer && vileFatherOfWolvesPlayer.isAlive, {
                            header,
                            target: `#game-play-alert-vile-father-of-wolves-can-infect`,
                            content: this.$t("GamePlayFieldTutorial.werewolves.eat.vileFatherOfWolvesCanInfect"),
                        }),
                        ...insertIf(!!vileFatherOfWolvesPlayer && vileFatherOfWolvesPlayer.isAlive, {
                            header,
                            target: `#play-submit-button`,
                            content: this.$t("GamePlayFieldTutorial.werewolves.eat.infectOnlyOnce"),
                        }),
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
                    "vote": [
                        { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.all.vote.allVoteWhen") },
                        { header, target: "#targetable-players-text", content: this.$t("GamePlayFieldTutorial.all.vote.targetablePlayerAreHere") },
                        { header, target: ".countdown", content: this.$t("GamePlayFieldTutorial.all.vote.playersHave5Min") },
                        { header, target: "#player-votes", content: this.$t("GamePlayFieldTutorial.all.vote.eachPlayerVote") },
                        ...insertIf(!!ancientPlayer && ancientPlayer.isAlive, {
                            header,
                            target: `#game-play-alert-ancient-can-make-all-powerless`,
                            content: this.$t("GamePlayFieldTutorial.all.vote.ancientWillHaveHisRevenge"),
                        }),
                        ...insertIf(!!idiotPlayer && isIdiotProtectedFromVotes, {
                            header,
                            target: `#game-play-alert-idiot-wont-die-from-votes`,
                            content: this.$t("GamePlayFieldTutorial.all.vote.idiotWillBeForgiven"),
                        }),
                        ...insertIf(!!scapegoatPlayer && scapegoatPlayer.isAliveAndPowerful, {
                            header,
                            target: `#game-play-alert-scapegoat-will-die-from-tie`,
                            content: this.$t("GamePlayFieldTutorial.all.vote.scapegoatWillDieIfTie"),
                        }),
                        ...insertIf(!!angelPlayer && doesAngelWinIfHeDiesNow, {
                            header,
                            target: `#game-play-alert-angel-will-win-if-he-dies`,
                            content: this.$t("GamePlayFieldTutorial.all.vote.angelWillWinIfHeDiesNow"),
                        }),
                        { header, target: "#vote-play-requirements", content: this.$t("GamePlayFieldTutorial.all.vote.toValidateAVote") },
                    ],
                    "elect-sheriff": [
                        { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.all.elect-sheriff.sheriffIsElectedWhen") },
                        { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.all.elect-sheriff.sheriffSettlesVotes") },
                        { header, target: ".countdown", content: this.$t("GamePlayFieldTutorial.all.elect-sheriff.playersHave5Min") },
                        { header, target: "#player-votes", content: this.$t("GamePlayFieldTutorial.all.elect-sheriff.eachPlayerVoteForSheriff") },
                        ...insertIf(idiotPlayer && idiotPlayer.isAlive && !idiotPlayer.hasAttribute("powerless"), {
                            header,
                            target: `#game-play-alert-idiot-wont-delegate`,
                            content: this.$t("GamePlayFieldTutorial.all.elect-sheriff.idiotWontDelegate"),
                        }),
                        ...insertIf(villagerVillagerPlayer && villagerVillagerPlayer.isAlive, {
                            header,
                            target: `#game-play-alert-villager-villager-can-be-trusted`,
                            content: this.$t("GamePlayFieldTutorial.all.elect-sheriff.villagerVillagerCanBeTrusted"),
                        }),
                        {
                            header,
                            target: "#vote-play-requirements",
                            content: this.$t("GamePlayFieldTutorial.all.elect-sheriff.toValidateAnElection"),
                        },
                    ],
                },
                "hunter": {
                    shoot: [
                        { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.hunter.shoot.hunterShootsWhen") },
                        { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.hunter.shoot.hunterCanShoot") },
                        { header, target: "#target-play-requirements", content: this.$t("GamePlayFieldTutorial.hunter.shoot.toValidateShoot") },
                    ],
                },
                "sheriff": {
                    "settle-votes": [
                        {
                            header,
                            target: "#game-waiting-label",
                            content: this.$t("GamePlayFieldTutorial.sheriff.settle-votes.sheriffSettleVotesWhen"),
                        },
                        {
                            header,
                            target: "#target-play-requirements",
                            content: this.$t("GamePlayFieldTutorial.sheriff.settle-votes.toValidateSettleVotes"),
                        },
                    ],
                    "delegate": [
                        { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.sheriff.delegate.sheriffDelegatesWhen") },
                        { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.sheriff.delegate.noDemocracyHere") },
                        {
                            header,
                            target: "#target-play-requirements",
                            content: this.$t("GamePlayFieldTutorial.sheriff.delegate.toValidateDelegation"),
                        },
                    ],
                },
                "dog-wolf": {
                    "choose-side": [
                        {
                            header,
                            target: "#game-waiting-label",
                            content: this.$t("GamePlayFieldTutorial.dog-wolf.choose-side.dogWolfChoosesSideWhen"),
                        },
                        { header, target: "#sides", content: this.$t("GamePlayFieldTutorial.dog-wolf.choose-side.dogWolfCanChooseSide") },
                        {
                            header,
                            target: "#play-field-villagers-side",
                            content: this.$t("GamePlayFieldTutorial.dog-wolf.choose-side.ifItChoosesVillagers"),
                        },
                        {
                            header,
                            target: "#play-field-werewolves-side",
                            content: this.$t("GamePlayFieldTutorial.dog-wolf.choose-side.ifItChoosesWerewolves"),
                        },
                        {
                            header,
                            target: "#choose-side-play-requirements",
                            content: this.$t("GamePlayFieldTutorial.dog-wolf.choose-side.toValidateChooseSide"),
                        },
                    ],
                },
                "cupid": {
                    charm: [
                        { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.cupid.charm.cupidCharmsWhen") },
                        { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.cupid.charm.cupidCanCharm") },
                        { header, target: "#target-play-requirements", content: this.$t("GamePlayFieldTutorial.cupid.charm.toValidateCharm") },
                    ],
                },
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
                            content: `${this.$tc(`GamePlayFieldTutorial.two-sisters.meet-each-other.twoSistersMeetEachOtherWhen`, sistersWakingUpInterval, { sistersWakingUpInterval })} ${this.$t("GamePlayFieldTutorial.two-sisters.meet-each-other.intervalCanBeChanged")}`,
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
                            content: `${this.$tc(`GamePlayFieldTutorial.three-brothers.meet-each-other.threeBrothersMeetEachOtherWhen`, brothersWakingUpInterval, { brothersWakingUpInterval })} ${this.$t("GamePlayFieldTutorial.three-brothers.meet-each-other.intervalCanBeChanged")}`,
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
                "pied-piper": {
                    charm: [
                        { header, target: "#game-waiting-label", content: this.$t("GamePlayFieldTutorial.pied-piper.charm.piedPiperCharmsWhen") },
                        { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.pied-piper.charm.piedPiperCanCharm") },
                        { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.pied-piper.charm.ifAllAreCharmed") },
                        ...insertIf(!!this.game.vileFatherOfWolvesPlayer, {
                            header,
                            target: "#pied-piper-player ",
                            content: this.$t("GamePlayFieldTutorial.pied-piper.charm.ifPiedPiperIsInfected"),
                        }),
                        { header, target: "#target-play-requirements", content: this.$t("GamePlayFieldTutorial.pied-piper.charm.toValidateCharm") },
                    ],
                },
                "charmed": {
                    "meet-each-other": [
                        {
                            header,
                            target: "#game-waiting-label",
                            content: this.$t(`GamePlayFieldTutorial.charmed.meet-each-other.charmedMeetEachOtherWhen`),
                        },
                        {
                            header,
                            target: "#meeting-each-other-players",
                            content: this.$t(`GamePlayFieldTutorial.charmed.meet-each-other.ifAllAreCharmed`),
                        },
                        {
                            header,
                            target: ".countdown",
                            content: this.$t(`GamePlayFieldTutorial.charmed.meet-each-other.charmedHave20s`),
                        },
                        {
                            header,
                            target: "#play-submit-button",
                            content: this.$t(`GamePlayFieldTutorial.charmed.meet-each-other.noActionRequiredToValidate`),
                        },
                    ],
                },
                "scapegoat": {
                    "ban-voting": [
                        {
                            header, target: "#game-waiting-label",
                            content: this.$t(`GamePlayFieldTutorial.scapegoat.ban-voting.scapegoatBansVotingWhen`),
                        },
                        { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.scapegoat.ban-voting.scapegoatCanBanVoting") },
                        { header, target: "#player-targets", content: this.$t("GamePlayFieldTutorial.scapegoat.ban-voting.noVoteIfAllCantVote") },
                        {
                            header,
                            target: "#play-submit-button",
                            content: this.$t("GamePlayFieldTutorial.scapegoat.ban-voting.toValidateBanVoting"),
                        },
                    ],
                },
                "thief": {
                    "choose-card": [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.thief.choose-card.thiefChoosesCardWhen`) },
                        { header, target: "#additional-cards", content: this.$t("GamePlayFieldTutorial.thief.choose-card.thiefCanChooseCard") },
                        { header, target: "#play-submit-button", content: this.$t("GamePlayFieldTutorial.thief.choose-card.toValidateChooseCard") },
                    ],
                },
                "stuttering-judge": {
                    "choose-sign": [
                        {
                            header,
                            target: "#game-waiting-label",
                            content: this.$t(`GamePlayFieldTutorial.stuttering-judge.choose-sign.stutteringJudgeChoosesSignWhen`),
                        },
                        {
                            header,
                            target: "#stuttering-judge-player",
                            content: this.$t(`GamePlayFieldTutorial.stuttering-judge.choose-sign.stutteringJudgeCanRequestVote`),
                        },
                        {
                            header,
                            target: "#stuttering-judge-player",
                            content: this.$t(`GamePlayFieldTutorial.stuttering-judge.choose-sign.stutteringJudgeCanChooseSign`),
                        },
                        {
                            header,
                            target: "#play-submit-button",
                            content: this.$t("GamePlayFieldTutorial.stuttering-judge.choose-sign.toValidateChooseSign"),
                        },
                    ],
                },
                "white-werewolf": {
                    eat: [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.white-werewolf.eat.whiteWerewolfEatsWhen`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.white-werewolf.eat.whiteWerewolfCanEat`) },
                        { header, target: "#play-submit-button", content: this.$t("GamePlayFieldTutorial.white-werewolf.eat.toValidateEat") },
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