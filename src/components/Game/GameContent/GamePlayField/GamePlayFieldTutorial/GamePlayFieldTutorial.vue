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
    props: {
        pastEvents: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", {
            game: "game",
            gameOptions: "gameOptions",
        }),
        // eslint-disable-next-line max-lines-per-function
        steps() {
            const { firstWaiting } = this.game;
            const brothersWakingUpInterval = this.gameOptions.roles.threeBrothers.wakingUpInterval;
            const { ancientPlayer, witchPlayer, guardPlayer } = this.game;
            const action = `${firstWaiting.for}.${firstWaiting.to}`;
            const header = { title: this.$t(`GamePlayFieldTutorial.${action}.howToPlay`) };
            const steps = {
                "seer": this.seerSteps,
                "werewolves": this.werewolvesSteps,
                "witch": this.witchSteps,
                "guard": this.guardSteps,
                "raven": this.ravenSteps,
                "all": this.allSteps,
                "hunter": this.hunterSteps,
                "sheriff": this.sheriffSteps,
                "dog-wolf": this.dogWolfSteps,
                "cupid": this.cupidSteps,
                "lovers": this.loversSteps,
                "two-sisters": this.twoSistersSteps,
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
                "fox": {
                    sniff: [
                        { header, target: "#game-waiting-label", content: this.$t(`GamePlayFieldTutorial.fox.sniff.foxSniffsWhen`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.fox.sniff.foxCanSniff`) },
                        { header, target: "#player-targets", content: this.$t(`GamePlayFieldTutorial.fox.sniff.ifOnePlayerIsWerewolf`) },
                        { header, target: "#fox-player", content: this.$t(`GamePlayFieldTutorial.fox.sniff.foxCanLoosePower`) },
                        { header, target: "#play-submit-button", content: this.$t("GamePlayFieldTutorial.fox.sniff.toValidateSniff") },
                    ],
                },
            };
            return steps[firstWaiting.for] && steps[firstWaiting.for][firstWaiting.to] ? steps[firstWaiting.for][firstWaiting.to] : [];
        },
        seerSteps() {
            const { stepsHeader: header, actionStepsTextPath } = this;
            return {
                look: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.seerLooksWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.seerCanLook`) },
                    { header, target: "#seer-player-card", content: this.$t(`${actionStepsTextPath}.seerPointsAtTarget`) },
                    { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateLook`) },
                ],
            };
        },
        werewolvesSteps() {
            const { stepsHeader: header, actionStepsTextPath } = this;
            return {
                eat: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.werewolvesEatWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.werewolvesEatAVictim`) },
                    { header, target: "#werewolf-players", content: this.$t(`${actionStepsTextPath}.werewolvesPointAtVictim`) },
                    ...this.werewolvesEatGamePlayAlertsSteps,
                    { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateEat`) },
                ],
            };
        },
        werewolvesEatGamePlayAlertsSteps() {
            const { stepsHeader: header, actionStepsTextPath, game } = this;
            const { angelPlayer, doesAngelWinIfHeDiesNow, ancientPlayer, guardPlayer, witchPlayer } = game;
            return [
                ...insertIf(!!angelPlayer && angelPlayer.isAliveAndPowerful && doesAngelWinIfHeDiesNow, {
                    header, target: `#game-play-alert-angel-will-win-if-he-dies`,
                    content: this.$t(`${actionStepsTextPath}.angelCanWin`),
                }),
                ...insertIf(!!ancientPlayer && ancientPlayer.isAlive, {
                    header, target: `#game-play-alert-ancient-can-survive-werewolves`,
                    content: this.$t(`${actionStepsTextPath}.ancientCanSurvive`),
                }),
                ...insertIf(!!guardPlayer && guardPlayer.isAliveAndPowerful, {
                    header, target: `#game-play-alert-guard-can-protect-target`,
                    content: this.$t(`${actionStepsTextPath}.guardCanProtect`),
                }),
                ...insertIf(!!witchPlayer && witchPlayer.isAliveAndPowerful, {
                    header, target: `#game-play-alert-witch-can-protect-target`,
                    content: this.$t(`${actionStepsTextPath}.witchCanSave`),
                }),
                ...this.werewolvesEatVileFatherOfWolvesAlertsSteps,
            ];
        },
        werewolvesEatVileFatherOfWolvesAlertsSteps() {
            const { stepsHeader: header, actionStepsTextPath, game } = this;
            const { vileFatherOfWolvesPlayer, piedPiperPlayer } = game;
            if (!vileFatherOfWolvesPlayer || !vileFatherOfWolvesPlayer.isAlive) {
                return [];
            }
            return [
                {
                    header, target: `#game-play-alert-vile-father-of-wolves-can-infect`,
                    content: this.$t(`${actionStepsTextPath}.vileFatherOfWolvesCanInfect`),
                },
                { header, target: `#play-submit-button`, content: this.$t(`${actionStepsTextPath}.infectOnlyOnce`) },
                ...insertIf(!!piedPiperPlayer && piedPiperPlayer.isAliveAndPowerful, {
                    header, target: `#game-play-alert-pied-piper-will-loose-powers-if-infected`,
                    content: this.$t(`${actionStepsTextPath}.piedPiperWillLoosePowerIfInfected`),
                }),
            ];
        },
        witchSteps() {
            const { stepsHeader: header, actionStepsTextPath, game } = this;
            const { ancientPlayer } = game;
            return {
                "use-potion": [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.witchUsesPotionWhen`) },
                    { header, target: "#potion-tabs", content: this.$t(`${actionStepsTextPath}.witchCanUsePotions`) },
                    { header, target: "#life-potion-tab", content: this.$t(`${actionStepsTextPath}.lifePotionProtects`) },
                    { header, target: "#life-potion-tab", content: this.$t(`${actionStepsTextPath}.ifLifePotionHasBeenUsed`) },
                    { header, target: "#death-potion-tab", content: this.$t(`${actionStepsTextPath}.deathPotionKills`) },
                    { header, target: "#death-potion-tab", content: this.$t(`${actionStepsTextPath}.ifDeathPotionHasBeenUsed`) },
                    ...insertIf(!!ancientPlayer && ancientPlayer.isAlive, {
                        header, target: `#game-play-alert-ancient-can-make-all-powerless`,
                        content: this.$t(`${actionStepsTextPath}.ancientWillHaveHisRevenge`),
                    }),
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.toValidateUsePotion`) },
                ],
            };
        },
        guardSteps() {
            const { stepsHeader: header, actionStepsTextPath, game } = this;
            const { littleGirlPlayer } = game;
            const { isProtectedByGuard: isLittleGirlProtectedByGuard } = game.options.roles.littleGirl;
            return {
                protect: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.guardProtectsWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.guardCanProtect`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.guardCanProtectHimself`) },
                    { header, target: "#guard-player-card", content: this.$t(`${actionStepsTextPath}.guardPointsAtTarget`) },
                    ...insertIf(!!littleGirlPlayer && littleGirlPlayer.isAliveAndPowerful && !isLittleGirlProtectedByGuard, {
                        header, target: `#game-play-alert-guard-cant-protect-little-girl`,
                        content: this.$t(`${actionStepsTextPath}.littleGirlIsNotProtected`),
                    }),
                    { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateProtect`) },
                ],
            };
        },
        ravenSteps() {
            const { stepsHeader: header, actionStepsTextPath } = this;
            return {
                mark: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.ravenMarksWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.ravenCanMark`) },
                    { header, target: "#raven-player-card", content: this.$t(`${actionStepsTextPath}.ravenPointsAtTarget`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.gameMasterWillDropMarkCard`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.toValidateMark`) },
                ],
            };
        },
        allSteps() {
            return {
                "vote": this.allVoteSteps,
                "elect-sheriff": this.allElectSheriffSteps,
            };
        },
        allVoteSteps() {
            const { stepsHeader: header, actionStepsTextPath } = this;
            return [
                { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.allVoteWhen`) },
                { header, target: "#targetable-players-text", content: this.$t(`${actionStepsTextPath}.targetablePlayerAreHere`) },
                { header, target: ".countdown", content: this.$t(`${actionStepsTextPath}.playersHave5Min`) },
                { header, target: "#player-votes", content: this.$t(`${actionStepsTextPath}.eachPlayerVote`) },
                ...this.allVoteGamePlayAlertsSteps,
                { header, target: "#vote-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateAVote`) },
            ];
        },
        allVoteGamePlayAlertsSteps() {
            const { stepsHeader: header, actionStepsTextPath, game } = this;
            const { ancientPlayer, isIdiotProtectedFromVotes, scapegoatPlayer, angelPlayer, doesAngelWinIfHeDiesNow } = game;
            const { hasStutteringJudgeChosenSign, hasStutteringJudgeRequestedVote } = this.pastEvents;
            return [
                ...insertIf(!!ancientPlayer && ancientPlayer.isAlive, {
                    header, target: `#game-play-alert-ancient-can-make-all-powerless`,
                    content: this.$t(`${actionStepsTextPath}.ancientWillHaveHisRevenge`),
                }),
                ...insertIf(isIdiotProtectedFromVotes, {
                    header, target: `#game-play-alert-idiot-wont-die-from-votes`,
                    content: this.$t(`${actionStepsTextPath}.idiotWillBeForgiven`),
                }),
                ...insertIf(!!scapegoatPlayer && scapegoatPlayer.isAliveAndPowerful, {
                    header, target: `#game-play-alert-scapegoat-will-die-from-tie`,
                    content: this.$t(`${actionStepsTextPath}.scapegoatWillDieIfTie`),
                }),
                ...insertIf(!!angelPlayer && doesAngelWinIfHeDiesNow, {
                    header, target: `#game-play-alert-angel-will-win-if-he-dies`,
                    content: this.$t(`${actionStepsTextPath}.angelWillWinIfHeDiesNow`),
                }),
                ...insertIf(game.canStutteringJudgeRequestVote(hasStutteringJudgeChosenSign, hasStutteringJudgeRequestedVote), {
                    header, target: `#game-play-alert-stuttering-judge-can-request-vote`,
                    content: this.$t(`${actionStepsTextPath}.stutteringJudgeCanRequestAnotherVote`),
                }),
            ];
        },
        allElectSheriffSteps() {
            const { stepsHeader: header, actionStepsTextPath, game } = this;
            const { idiotPlayer, villagerVillagerPlayer } = game;
            return [
                { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.sheriffIsElectedWhen`) },
                { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.sheriffSettlesVotes`) },
                { header, target: ".countdown", content: this.$t(`${actionStepsTextPath}.playersHave5Min`) },
                { header, target: "#player-votes", content: this.$t(`${actionStepsTextPath}.eachPlayerVoteForSheriff`) },
                ...insertIf(!!idiotPlayer && idiotPlayer.isAlive && !idiotPlayer.hasAttribute("powerless"), {
                    header, target: `#game-play-alert-idiot-wont-delegate`,
                    content: this.$t(`${actionStepsTextPath}.idiotWontDelegate`),
                }),
                ...insertIf(!!villagerVillagerPlayer && villagerVillagerPlayer.isAlive, {
                    header, target: `#game-play-alert-villager-villager-can-be-trusted`,
                    content: this.$t(`${actionStepsTextPath}.villagerVillagerCanBeTrusted`),
                }),
                { header, target: "#vote-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateAnElection`) },
            ];
        },
        hunterSteps() {
            const { stepsHeader: header, actionStepsTextPath, game } = this;
            const { ancientPlayer } = game;
            return {
                shoot: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.hunterShootsWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.hunterCanShoot`) },
                    ...insertIf(!!ancientPlayer && ancientPlayer.isAlive, {
                        header, target: `#game-play-alert-ancient-can-make-all-powerless`,
                        content: this.$t(`${actionStepsTextPath}.ancientWillHaveHisRevenge`),
                    }),
                    { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateShoot`) },
                ],
            };
        },
        sheriffSteps() {
            return {
                "settle-votes": this.sheriffSettlesVotesSteps,
                "delegate": this.sheriffDelegatesSteps,
            };
        },
        sheriffSettlesVotesSteps() {
            const { stepsHeader: header, actionStepsTextPath, game } = this;
            const { ancientPlayer, idiotPlayer, isIdiotProtectedFromVotes, angelPlayer, doesAngelWinIfHeDiesNow } = game;
            return [
                { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.sheriffSettleVotesWhen`) },
                ...insertIf(!!ancientPlayer && ancientPlayer.isAlive, {
                    header, target: `#game-play-alert-ancient-can-make-all-powerless`,
                    content: this.$t(`GamePlayFieldTutorial.all.vote.ancientWillHaveHisRevenge`),
                }),
                ...insertIf(!!idiotPlayer && isIdiotProtectedFromVotes, {
                    header, target: `#game-play-alert-idiot-wont-die-from-votes`,
                    content: this.$t(`GamePlayFieldTutorial.all.vote.idiotWillBeForgiven`),
                }),
                ...insertIf(!!angelPlayer && doesAngelWinIfHeDiesNow, {
                    header, target: `#game-play-alert-angel-will-win-if-he-dies`,
                    content: this.$t(`GamePlayFieldTutorial.all.vote.angelWillWinIfHeDiesNow`),
                }),
                { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateSettleVotes`) },
            ];
        },
        sheriffDelegatesSteps() {
            const { stepsHeader: header, actionStepsTextPath } = this;
            return [
                { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.sheriffDelegatesWhen`) },
                { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.noDemocracyHere`) },
                { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateDelegation`) },
            ];
        },
        dogWolfSteps() {
            const { stepsHeader: header, actionStepsTextPath } = this;
            return {
                "choose-side": [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.dogWolfChoosesSideWhen`) },
                    { header, target: "#sides", content: this.$t(`${actionStepsTextPath}.dogWolfCanChooseSide`) },
                    { header, target: "#play-field-villagers-side", content: this.$t(`${actionStepsTextPath}.ifItChoosesVillagers`) },
                    { header, target: "#play-field-werewolves-side", content: this.$t(`${actionStepsTextPath}.ifItChoosesWerewolves`) },
                    { header, target: "#choose-side-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateChooseSide`) },
                ],
            };
        },
        cupidSteps() {
            const { stepsHeader: header, actionStepsTextPath } = this;
            return {
                charm: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.cupidCharmsWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.cupidCanCharm`) },
                    { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateCharm`) },
                ],
            };
        },
        loversSteps() {
            const { stepsHeader: header, actionStepsTextPath } = this;
            return {
                "meet-each-other": [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.loversMeetEachOtherWhen`) },
                    { header, target: "#meeting-each-other-players", content: this.$t(`${actionStepsTextPath}.loversMustWinTogether`) },
                    { header, target: ".countdown", content: this.$t(`${actionStepsTextPath}.loversHave20s`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.noActionRequiredToValidate`) },
                ],
            };
        },
        twoSistersSteps() {
            const { stepsHeader: header, actionStepsTextPath } = this;
            const sistersWakingUpInterval = this.gameOptions.roles.twoSisters.wakingUpInterval;
            return {
                "meet-each-other": [
                    {
                        header, target: "#game-waiting-label",
                        content: this.$tc(`${actionStepsTextPath}.twoSistersMeetEachOtherWhen`, sistersWakingUpInterval, { sistersWakingUpInterval }),
                    },
                    { header, target: "#meeting-each-other-players", content: this.$t(`${actionStepsTextPath}.twoSistersTalk`) },
                    { header, target: ".countdown", content: this.$t(`${actionStepsTextPath}.twoSistersHave20s`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.noActionRequiredToValidate`) },
                ],
            };
        },
        stepsHeader() {
            return { title: this.$t(`${this.actionStepsTextPath}.howToPlay`) };
        },
        actionStepsTextPath() {
            const { firstWaiting } = this.game;
            return `GamePlayFieldTutorial.${firstWaiting.for}.${firstWaiting.to}`;
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