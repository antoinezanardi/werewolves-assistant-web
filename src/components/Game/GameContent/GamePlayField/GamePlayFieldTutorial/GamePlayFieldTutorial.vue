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
                "three-brothers": this.threeBrothersSteps,
                "wild-child": this.wildChildSteps,
                "big-bad-wolf": this.bigBadWolfSteps,
                "pied-piper": this.piedPiperSteps,
                "charmed": this.charmedSteps,
                "scapegoat": this.scapegoatSteps,
                "thief": this.thiefSteps,
                "stuttering-judge": this.stutteringJudgeSteps,
                "white-werewolf": this.whiteWerewolfSteps,
                "fox": this.foxSteps,
            };
            return steps[firstWaiting.for] && steps[firstWaiting.for][firstWaiting.to] ? steps[firstWaiting.for][firstWaiting.to] : [];
        },
        seerSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.seer.look";
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
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.werewolves.eat";
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
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.werewolves.eat";
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
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.werewolves.eat";
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
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.witch.use-potion";
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
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.guard.protect";
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
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.raven.mark";
            return {
                mark: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.ravenMarksWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.ravenCanMark`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.targetWillHavePenalty`) },
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
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.all.vote";
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
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.all.vote";
            const { ancientPlayer, isIdiotProtectedFromVotes, scapegoatPlayer, angelPlayer, doesAngelWinIfHeDiesNow } = game;
            const { hasStutteringJudgeChosenSign, stutteringJudgeVoteRequestsCount } = this.pastEvents;
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
                ...insertIf(game.canStutteringJudgeRequestVote(hasStutteringJudgeChosenSign, stutteringJudgeVoteRequestsCount), {
                    header, target: `#game-play-alert-stuttering-judge-can-request-vote`,
                    content: this.$t(`${actionStepsTextPath}.stutteringJudgeCanRequestAnotherVote`),
                }),
                ...this.bearTamerGrowlingAlertStep,
            ];
        },
        bearTamerGrowlingAlertStep() {
            const { stepsHeader: header, game } = this;
            let actionStepsTextPath = "GamePlayFieldTutorial.all.vote";
            const { bearTamerPlayer, vileFatherOfWolvesPlayer } = game;
            const { doesGrowlIfInfected } = this.gameOptions.roles.bearTamer;
            const isBearTamerAlertShowed = bearTamerPlayer && bearTamerPlayer.isAliveAndPowerful && bearTamerPlayer.hasActiveAttribute("growls");
            if (!isBearTamerAlertShowed) {
                return [];
            }
            const bearTamerAlertType = vileFatherOfWolvesPlayer && doesGrowlIfInfected ? "bear-tamer-growls-and-infected" : "bear-tamer-growls";
            const target = `#game-play-alert-${bearTamerAlertType}`;
            actionStepsTextPath += bearTamerAlertType === "bear-tamer-growls-and-infected" ? ".bearTamerGrowlsAndInfected" : ".bearTamerGrowls";
            return [{ header, target, content: this.$t(`${actionStepsTextPath}`) }];
        },
        allElectSheriffSteps() {
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.all.elect-sheriff";
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
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.hunter.shoot";
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
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.sheriff.settle-votes";
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
                ...this.bearTamerGrowlingAlertStep,
                { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateSettleVotes`) },
            ];
        },
        sheriffDelegatesSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.sheriff.delegate";
            return [
                { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.sheriffDelegatesWhen`) },
                { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.noDemocracyHere`) },
                { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateDelegation`) },
            ];
        },
        dogWolfSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.dog-wolf.choose-side";
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
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.cupid.charm";
            return {
                charm: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.cupidCharmsWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.cupidCanCharm`) },
                    { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateCharm`) },
                ],
            };
        },
        loversSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.lovers.meet-each-other";
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
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.two-sisters.meet-each-other";
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
        threeBrothersSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.three-brothers.meet-each-other";
            const { wakingUpInterval } = this.gameOptions.roles.threeBrothers;
            return {
                "meet-each-other": [
                    {
                        header, target: "#game-waiting-label",
                        content: this.$tc(`${actionStepsTextPath}.threeBrothersMeetEachOtherWhen`, wakingUpInterval, { wakingUpInterval }),
                    },
                    { header, target: "#meeting-each-other-players", content: this.$t(`${actionStepsTextPath}.threeBrothersTalk`) },
                    { header, target: ".countdown", content: this.$t(`${actionStepsTextPath}.threeBrothersHave20s`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.noActionRequiredToValidate`) },
                ],
            };
        },
        wildChildSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.wild-child.choose-model";
            return {
                "choose-model": [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.wildChildChooseModelWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.wildChildCanChooseModel`) },
                    { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateChooseModel`) },
                ],
            };
        },
        bigBadWolfSteps() {
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.big-bad-wolf.eat";
            const { ancientPlayer, guardPlayer, witchPlayer } = game;
            return {
                eat: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.bigBadWolfEatsWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.bigBadWolfEatsAVictim`) },
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.bigBadWolfLoosesHisPowerIfWerewolfDies`) },
                    { header, target: "#werewolf-players", content: this.$t(`${actionStepsTextPath}.bigBadWolfPointsAtVictim`) },
                    ...insertIf(!!ancientPlayer && ancientPlayer.isAlive, {
                        header, target: `#game-play-alert-ancient-can-survive-werewolves`,
                        content: this.$t("GamePlayFieldTutorial.werewolves.eat.ancientCanSurvive"),
                    }),
                    ...insertIf(!!guardPlayer && guardPlayer.isAliveAndPowerful, {
                        header, target: `#game-play-alert-guard-can-protect-target`,
                        content: this.$t("GamePlayFieldTutorial.werewolves.eat.guardCanProtect"),
                    }),
                    ...insertIf(!!witchPlayer && witchPlayer.isAliveAndPowerful, {
                        header, target: `#game-play-alert-witch-can-protect-target`,
                        content: this.$t("GamePlayFieldTutorial.werewolves.eat.witchCanSave"),
                    }),
                    { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateEat`) },
                ],
            };
        },
        piedPiperSteps() {
            const { stepsHeader: header, game } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.pied-piper.charm";
            return {
                charm: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.piedPiperCharmsWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.piedPiperCanCharm`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.ifAllAreCharmed`) },
                    ...insertIf(!!game.vileFatherOfWolvesPlayer, {
                        header, target: "#pied-piper-player",
                        content: this.$t(`${actionStepsTextPath}.ifPiedPiperIsInfected`),
                    }),
                    { header, target: "#target-play-requirements", content: this.$t(`${actionStepsTextPath}.toValidateCharm`) },
                ],
            };
        },
        charmedSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.charmed.meet-each-other";
            return {
                "meet-each-other": [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.charmedMeetEachOtherWhen`) },
                    { header, target: "#meeting-each-other-players", content: this.$t(`${actionStepsTextPath}.ifAllAreCharmed`) },
                    { header, target: ".countdown", content: this.$t(`${actionStepsTextPath}.charmedHave20s`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.noActionRequiredToValidate`) },
                ],
            };
        },
        scapegoatSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.scapegoat.ban-voting";
            return {
                "ban-voting": [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.scapegoatBansVotingWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.scapegoatCanBanVoting`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.noVoteIfAllCantVote`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.toValidateBanVoting`) },
                ],
            };
        },
        thiefSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.thief.choose-card";
            return {
                "choose-card": [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.thiefChoosesCardWhen`) },
                    { header, target: "#additional-cards", content: this.$t(`${actionStepsTextPath}.thiefCanChooseCard`) },
                    { header, target: "#additional-cards", content: this.$t(`${actionStepsTextPath}.thiefMustChooseIfWerewolves`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.toValidateChooseCard`) },
                ],
            };
        },
        stutteringJudgeSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.stuttering-judge.choose-sign";
            return {
                "choose-sign": [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.stutteringJudgeChoosesSignWhen`) },
                    { header, target: "#stuttering-judge-player", content: this.$t(`${actionStepsTextPath}.stutteringJudgeCanRequestVote`) },
                    { header, target: "#stuttering-judge-player", content: this.$t(`${actionStepsTextPath}.stutteringJudgeCanChooseSign`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.toValidateChooseSign`) },
                ],
            };
        },
        whiteWerewolfSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.white-werewolf.eat";
            return {
                eat: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.whiteWerewolfEatsWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.whiteWerewolfCanEat`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.toValidateEat`) },
                ],
            };
        },
        foxSteps() {
            const { stepsHeader: header } = this;
            const actionStepsTextPath = "GamePlayFieldTutorial.fox.sniff";
            return {
                sniff: [
                    { header, target: "#game-waiting-label", content: this.$t(`${actionStepsTextPath}.foxSniffsWhen`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.foxCanSniff`) },
                    { header, target: "#player-targets", content: this.$t(`${actionStepsTextPath}.ifOnePlayerIsWerewolf`) },
                    { header, target: "#fox-player", content: this.$t(`${actionStepsTextPath}.foxCanLoosePower`) },
                    { header, target: "#play-submit-button", content: this.$t(`${actionStepsTextPath}.toValidateSniff`) },
                ],
            };
        },
        stepsHeader() {
            const { firstWaiting } = this.game;
            return { title: this.$t(`GamePlayFieldTutorial.${firstWaiting.for}.${firstWaiting.to}.howToPlay`) };
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