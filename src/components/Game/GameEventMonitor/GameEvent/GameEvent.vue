<template>
    <div id="game-event" class="container-fluid d-flex flex-grow-1 flex-column">
        <Keypress key-event="keyup" :key-code="37" @success="previousGameEventMessage"/>
        <Keypress key-event="keyup" :key-code="39" @success="nextGameEventMessage"/>
        <div id="game-event-image-container" class="d-flex justify-content-center align-items-center w-100 visible-scrollbar">
            <div class="d-flex justify-content-center flex-grow-1 w-100">
                <GameEventImage class="w-100" :event="event"/>
            </div>
        </div>
        <div id="game-event-message-container" class="w-100 d-flex pb-2">
            <div class="row align-items-center d-flex flex-grow-1">
                <div class="col-2 col-md-1 px-0 text-center">
                    <v-popover trigger="hover" :disabled="!canGoBackToPreviousGameEventMessage || isTouchDevice">
                        <i class="fa fa-chevron-left fa-3x game-event-message-button animate__animated
                                  animate__heartBeat animate__repeat-2 animate__slow"
                           :class="{ disabled: !canGoBackToPreviousGameEventMessage }"
                           @click="previousGameEventMessage"/>
                        <template #popover>
                            <div v-html="$t('GameEvent.previous')"/>
                            <hr class="bg-secondary my-1"/>
                            <div class="text-muted font-italic">
                                <span v-html="`${$t('GameEvent.press')}`"/>
                                <img width="20" class="mx-2" :src="IMGs.leftArrowKey" alt="Left arrow key"/>
                                <span v-html="`${$t('GameEvent.toGoBack')}`"/>
                            </div>
                        </template>
                    </v-popover>
                </div>
                <div class="col-8 col-md-10 d-flex justify-content-center align-items-center h-100 overflow-auto px-0 visible-scrollbar">
                    <transition mode="out-in" name="fade">
                        <div id="game-event-message" :key="currentGameEventMessage" class="text-center" v-html="currentGameEventMessage"/>
                    </transition>
                </div>
                <div class="col-2 col-md-1 px-0 text-center">
                    <v-popover trigger="hover" :disabled="isTouchDevice">
                        <i class="fa fa-chevron-right fa-3x game-event-message-button animate__animated animate__heartBeat animate__repeat-2
                                  animate__slow" @click="nextGameEventMessage"/>
                        <template #popover>
                            <div v-html="$t('GameEvent.next')"/>
                            <hr class="bg-secondary my-1"/>
                            <div class="text-muted font-italic">
                                <span v-html="`${$t('GameEvent.press')}`"/>
                                <img width="20" class="mx-2" :src="IMGs.rightArrowKey" alt="Right arrow key"/>
                                <span v-html="`${$t('GameEvent.toGoFurther')}`"/>
                            </div>
                        </template>
                    </v-popover>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import GameEvent from "@/classes/GameEvent";
import i18n from "@/plugins/vue-i18n";
import GameEventImage from "@/components/Game/GameEventMonitor/GameEvent/GameEventImage";
import { listPlayerNames } from "@/helpers/functions/Player";
import { insertIf } from "@/helpers/functions/Array";
import { isTouchDevice } from "@/helpers/functions/Device";
import leftArrowKey from "@/assets/img/game/left-arrow-key.png";
import rightArrowKey from "@/assets/img/game/right-arrow-key.png";

export default {
    name: "GameEvent",
    components: { GameEventImage },
    props: {
        event: {
            type: GameEvent,
            required: true,
        },
    },
    data() {
        return {
            messageIdx: 0,
            IMGs: { leftArrowKey, rightArrowKey },
        };
    },
    computed: {
        ...mapGetters("game", {
            game: "game",
            gameOptions: "gameOptions",
        }),
        ...mapGetters("audioManager", { audioManager: "audioManager" }),
        gameEventMetadata() {
            return {
                "game-starts": this.gameEventGameStartsMetadata,
                "game-ends": this.gameEventGameEndsMetadata,
                "player-starts-game-revealed": this.gameEventPlayerStartsGameRevealedMetadata,
                "player-dies": this.gameEventPlayerDiesMetadata,
                "player-role-revealed": this.gameEventPlayerRoleRevealedMetadata,
                "sheriff-elected": this.gameEventSheriffElectedMetadata,
                "night-falls": this.gameEventNightFallsMetadata,
                "no-death-after-votes": this.gameEventNoDeathAfterVotesMetadata,
                "day-rises": this.gameEventDayRisesMetadata,
                "deaths-during-night": this.gameEventDeathsDuringNightMetadata,
                "no-death-during-night": this.gameEventNoDeathDuringNightMetadata,
                "seer-looks": this.gameEventSeerLooksMetadata,
                "vile-father-of-wolves-infects": this.gameEventVileFatherOfWolvesInfectsMetadata,
                "raven-marks": this.gameEventRavenMarksMetadata,
                "cupid-charms": this.gameEventCupidCharmsMetadata,
                "pied-piper-charms": this.gameEventPiedPiperCharmsMetadata,
                "thief-chooses-card": this.gameEventThiefChoosesCardMetadata,
                "fox-sniffs": this.gameEventFoxSniffsMetadata,
                "bear-growls": this.gameEventBearGrowlsMetadata,
                "bear-stays-calm": this.gameEventBearStaysCalmMetadata,
                "dog-wolf-chooses-side": this.gameEventDogWolfChoosesSideMetadata,
                "wild-child-joins-werewolves": this.gameEventWildChildJoinsWerewolvesMetadata,
                ...this.gameEventTurnMetadata,
            };
        },
        gameEventTurnMetadata() {
            return {
                "all-turn": this.gameEventAllTurnMetadata,
                "sheriff-turn": this.gameEventSheriffTurnMetadata,
                "seer-turn": this.gameEventSeerTurnMetadata,
                "werewolves-turn": this.gameEventWerewolvesTurnMetadata,
                "witch-turn": this.gameEventWitchTurnMetadata,
                "guard-turn": this.gameEventGuardTurnMetadata,
                "raven-turn": this.gameEventRavenTurnMetadata,
                "hunter-turn": this.gameEventHunterTurnMetadata,
                "dog-wolf-turn": this.gameEventDogWolfTurnMetadata,
                "cupid-turn": this.gameEventCupidTurnMetadata,
                "lovers-turn": this.gameEventLoversTurnMetadata,
                "two-sisters-turn": this.gameEventTwoSistersTurnMetadata,
                "three-brothers-turn": this.gameEventThreeBrothersTurnMetadata,
                "wild-child-turn": this.gameEventWildChildTurnMetadata,
                "big-bad-wolf-turn": this.gameEventBigBadWolfTurnMetadata,
                "pied-piper-turn": this.gameEventPiedPiperTurnMetadata,
                "charmed-turn": this.gameEventCharmedTurnMetadata,
                "scapegoat-turn": this.gameEventScapegoatTurnMetadata,
                "thief-turn": this.gameEventThiefTurnMetadata,
                "stuttering-judge-turn": this.gameEventStutteringJudgeTurnMetadata,
                "white-werewolf-turn": this.gameEventWhiteWerewolfTurnMetadata,
                "fox-turn": this.gameEventFoxTurnMetadata,
            };
        },
        gameEventGameStartsMetadata() {
            const { isEnabled, electedAt } = this.gameOptions.roles.sheriff;
            const isSheriffElectedOnFirstNight = electedAt.turn === 1 && electedAt.phase === "night";
            return {
                messages: [
                    i18n.t("GameEvent.messages.welcomeToTheVillage"),
                    this.gameCompositionText,
                    ...insertIf(this.game.thiefPlayer && !this.game.options.repartition.isHidden,
                        i18n.t("GameEvent.messages.moreRolesBecauseOfThief")),
                    i18n.t("GameEvent.messages.looksLifeSomeWerewolvesIntroducedThemselves"),
                    i18n.t("GameEvent.messages.villagersMurderWerewolves"),
                    ...insertIf(isEnabled && isSheriffElectedOnFirstNight, i18n.t("GameEvent.messages.beforeStartingLetsElectSheriff")),
                ],
            };
        },
        gameEventGameEndsMetadata() {
            const deadPlayersCount = this.game.deadPlayers.length;
            return {
                messages: [
                    i18n.t("GameEvent.messages.gameIsDone"),
                    i18n.tc("GameEvent.messages.gameIsDoneAfterDeaths", deadPlayersCount, { deadPlayersCount }),
                    i18n.t("GameEvent.messages.whoWon"),
                    i18n.t("GameEvent.messages.maybeWerewolvesMaybeVillagers"),
                    i18n.t("GameEvent.messages.makeSuspenseLast"),
                ],
                soundEffect: "game-ends",
            };
        },
        gameEventPlayerStartsGameRevealedMetadata() {
            return { messages: [i18n.t("GameEvent.messages.villagerVillagerStartsGameRevealed", { player: this.gameEventFirstTargetName })] };
        },
        gameEventPlayerDiesMetadata() {
            const { didAncientTakeHisRevenge, isPlaying, isDone } = this.game;
            const { areRevealedOnDeath } = this.game.options.roles;
            return {
                messages: [
                    i18n.t("GameEvent.messages.playerDies", { player: this.gameEventFirstTargetName }),
                    ...insertIf(isPlaying && areRevealedOnDeath, i18n.t("GameEvent.messages.playerRevealsRole")),
                    ...insertIf(isPlaying && !areRevealedOnDeath, i18n.t("GameEvent.messages.playerDoesntRevealRole")),
                    ...insertIf(isPlaying && areRevealedOnDeath && this.gameEventFirstTargetMurderCause === "disease",
                        i18n.t("GameEvent.messages.diedFromDisease")),
                    ...insertIf(isPlaying && this.gameEventFirstTargetRole === "idiot" && this.gameEventFirstTarget.player.hasAttribute("sheriff"),
                        i18n.t("GameEvent.messages.noIdiotSheriffAnymore")),
                    ...insertIf(isPlaying && this.gameEventFirstTargetRole === "ancient" && didAncientTakeHisRevenge,
                        i18n.t("GameEvent.messages.ancientTakesHisRevenge")),
                    ...insertIf(isDone, i18n.t("GameEvent.messages.gameIsDoneKeepRoleHidden")),
                ],
                soundEffect: "death",
            };
        },
        gameEventPlayerRoleRevealedMetadata() {
            return {
                messages: [
                    ...insertIf(this.gameEventFirstTargetRole === "idiot", i18n.t("GameEvent.messages.idiotIsForgiven")),
                    i18n.t("GameEvent.messages.playerRoleIsRevealed"),
                ],
            };
        },
        gameEventSheriffElectedMetadata() {
            return {
                messages: [
                    i18n.t("GameEvent.messages.playerHasBeenPromotedSheriff", { player: this.gameEventFirstTargetName }),
                    ...insertIf(this.game.turn === 1, i18n.t("GameEvent.messages.sheriffCanMakeASpeech")),
                ],
                soundEffect: "sheriff-is-elected",
            };
        },
        gameEventNightFallsMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.nightFalls"), i18n.t("GameEvent.messages.inhabitantsFallAsleep")],
                soundEffect: "night-falls",
            };
        },
        gameEventAllTurnMetadata() {
            const { firstWaiting, angelPlayer, ancientPlayer, options } = this.game;
            if (!firstWaiting) {
                return [];
            }
            return {
                messages: [
                    ...insertIf(firstWaiting.to === "vote" && !!angelPlayer && this.game.isFirstWaitingPreFirstNightPlay,
                        i18n.t("GameEvent.messages.gameStartsWithVoteBecauseOfAngel")),
                    ...insertIf(firstWaiting.to === "vote" && firstWaiting.cause === "stuttering-judge-request",
                        i18n.t("GameEvent.messages.allVoteBecauseOfStutteringJudge")),
                    ...insertIf(firstWaiting.to === "vote" && !this.game.isSecondVoteAfterTie, i18n.t("GameEvent.messages.allVote")),
                    ...insertIf(firstWaiting.to === "vote" && this.game.isSecondVoteAfterTie,
                        i18n.t("GameEvent.messages.allVoteAgain", { players: listPlayerNames(this.game.lastActionTargetedPlayers) })),
                    ...insertIf(firstWaiting.to === "vote" && !!ancientPlayer && ancientPlayer.isAlive && options.roles.ancient.doesTakeHisRevenge,
                        i18n.t("GameEvent.messages.attentionToTheAncient")),
                    ...insertIf(firstWaiting.to === "elect-sheriff", i18n.t("GameEvent.messages.allElectSheriff")),
                ],
                soundEffect: "sheriff-election",
            };
        },
        gameEventNoDeathAfterVotesMetadata() {
            return {
                messages: [
                    i18n.t("GameEvent.messages.noDeathAfterVotes"),
                    i18n.t("GameEvent.messages.everybodyFallAsleepAlive"),
                ],
            };
        },
        gameEventSheriffTurnMetadata() {
            const { firstWaiting } = this.game;
            if (!firstWaiting) {
                return [];
            }
            return {
                messages: [
                    ...insertIf(firstWaiting.to === "settle-votes", i18n.t("GameEvent.messages.sheriffSettlesVote")),
                    ...insertIf(firstWaiting.to === "delegate", i18n.t("GameEvent.messages.sheriffDelegates")),
                ],
                soundEffect: "sheriff-election",
            };
        },
        gameEventDayRisesMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.dayRises")],
                soundEffect: "day-rises",
            };
        },
        gameEventDeathsDuringNightMetadata() {
            return {
                messages: [
                    i18n.tc("GameEvent.messages.deathDuringNight", this.event.targets.length, { numberOfDeaths: this.event.targets.length }),
                    i18n.t("GameEvent.messages.letsSeeWhoIsDead"),
                ],
            };
        },
        gameEventNoDeathDuringNightMetadata() {
            return { messages: [i18n.t("GameEvent.messages.noDeathDuringNight")] };
        },
        gameEventSeerTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.seerStarts")],
                soundEffect: "seer-plays",
            };
        },
        gameEventSeerLooksMetadata() {
            let seenTargetText;
            if (this.gameEventFirstTargetRole && this.gameOptions.roles.seer.canSeeRoles) {
                seenTargetText = i18n.t(`Role.a.${this.gameEventFirstTargetRole}`);
            } else if (this.gameEventFirstTargetSide === "werewolves") {
                seenTargetText = i18n.t(`GameEvent.messages.playerInWerewolvesSide`);
            } else {
                seenTargetText = i18n.t(`GameEvent.messages.playerInVillagersSide`);
            }
            return {
                messages: [
                    ...insertIf(!this.gameOptions.roles.seer.isTalkative, i18n.t("GameEvent.messages.followingMessageMustToldDiscreetly")),
                    `${i18n.t("GameEvent.messages.seerHasSeen")} ${seenTargetText} !`,
                ],
                soundEffect: "seer-plays",
            };
        },
        gameEventWerewolvesTurnMetadata() {
            return {
                messages: [i18n.tc("GameEvent.messages.werewolvesStart", this.game.aliveWerewolfPlayers.length)],
                soundEffect: "werewolves-play",
            };
        },
        gameEventVileFatherOfWolvesInfectsMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.gameMasterWillTouchInfected")],
                soundEffect: "vile-father-of-wolves-infects",
            };
        },
        gameEventWitchTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.witchStarts")],
                soundEffect: "witch-plays",
            };
        },
        gameEventGuardTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.guardStarts")],
                soundEffect: "guard-plays",
            };
        },
        gameEventRavenTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.ravenStarts")],
                soundEffect: "raven-plays",
            };
        },
        gameEventRavenMarksMetadata() {
            return {
                messages: [
                    i18n.t("GameEvent.messages.ravenHasMarked"),
                    i18n.t("GameEvent.messages.gameMasterWillDepositMark"),
                ],
                soundEffect: "raven-plays",
            };
        },
        gameEventHunterTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.hunterStarts")],
                soundEffect: "hunter-plays",
            };
        },
        gameEventDogWolfTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.dogWolfStarts")],
                soundEffect: "dog-wolf-plays",
            };
        },
        gameEventCupidTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.cupidStarts")],
                soundEffect: "cupid-plays",
            };
        },
        gameEventCupidCharmsMetadata() {
            return {
                messages: [
                    i18n.t("GameEvent.messages.cupidCharmedTwoPlayers"),
                    i18n.t("GameEvent.messages.gameMasterWillTouchLovers"),
                ],
                soundEffect: "cupid-plays",
            };
        },
        gameEventLoversTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.loversStart")],
                soundEffect: "lovers-play",
            };
        },
        gameEventTwoSistersTurnMetadata() {
            return {
                messages: [
                    ...insertIf(this.game.turn === 1, i18n.t("GameEvent.messages.twoSistersMeetEachOther")),
                    ...insertIf(this.game.turn !== 1, i18n.t("GameEvent.messages.twoSistersWakeUpToTalk")),
                ],
                soundEffect: "two-sisters-play",
            };
        },
        gameEventThreeBrothersTurnMetadata() {
            return {
                messages: [
                    ...insertIf(this.game.turn === 1, i18n.t("GameEvent.messages.threeBrothersMeetEachOther")),
                    ...insertIf(this.game.turn !== 1, i18n.t("GameEvent.messages.threeBrothersWakeUpToTalk")),
                ],
                soundEffect: "three-brothers-play",
            };
        },
        gameEventWildChildTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.wildChildStarts")],
                soundEffect: "wild-child-plays",
            };
        },
        gameEventBigBadWolfTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.bigBadWolfStarts")],
                soundEffect: "big-bad-wolf-plays",
            };
        },
        gameEventPiedPiperTurnMetadata() {
            const { charmedPeopleCountPerNight } = this.gameOptions.roles.piedPiper;
            return {
                messages: [i18n.tc("GameEvent.messages.piedPiperStarts", charmedPeopleCountPerNight, { charmedPeopleCountPerNight })],
                soundEffect: "pied-piper-plays",
            };
        },
        gameEventPiedPiperCharmsMetadata() {
            const { charmedPeopleCountPerNight } = this.gameOptions.roles.piedPiper;
            return {
                messages: [
                    i18n.tc("GameEvent.messages.piedPiperCharmedTwoPlayers", charmedPeopleCountPerNight, { charmedPeopleCountPerNight }),
                    i18n.tc("GameEvent.messages.gameMasterWillTouchCharmed", charmedPeopleCountPerNight, { charmedPeopleCountPerNight }),
                ],
                soundEffect: "pied-piper-plays",
            };
        },
        gameEventCharmedTurnMetadata() {
            return {
                messages: [
                    ...insertIf(this.game.turn === 1, i18n.t("GameEvent.messages.charmedWakeUp")),
                    ...insertIf(this.game.turn !== 1, i18n.t("GameEvent.messages.charmedWakeUpWithOldOnes")),
                ],
                soundEffect: "charmed-play",
            };
        },
        gameEventScapegoatTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.scapegoatStarts")],
                soundEffect: "scapegoat-plays",
            };
        },
        gameEventThiefTurnMetadata() {
            const { additionalCardsCount } = this.gameOptions.roles.thief;
            return {
                messages: [
                    i18n.tc("GameEvent.messages.thiefStarts", additionalCardsCount, { additionalCardsCount }),
                    i18n.tc("GameEvent.messages.gameMasterWillFlipAdditionalCards", additionalCardsCount, { additionalCardsCount }),
                ],
                soundEffect: "thief-plays",
            };
        },
        gameEventThiefChoosesCardMetadata() {
            const { additionalCardsCount } = this.gameOptions.roles.thief;
            return {
                messages: [i18n.tc("GameEvent.messages.thiefChoosesCard", additionalCardsCount, { additionalCardsCount })],
                soundEffect: "thief-plays",
            };
        },
        gameEventStutteringJudgeTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.stutteringJudgeStarts")],
                soundEffect: "stuttering-judge-plays",
            };
        },
        gameEventWhiteWerewolfTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.whiteWerewolfStarts")],
                soundEffect: "white-werewolf-plays",
            };
        },
        gameEventFoxTurnMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.foxStarts")],
                soundEffect: "fox-plays",
            };
        },
        gameEventFoxSniffsMetadata() {
            return {
                messages: [
                    ...insertIf(!this.hasGameEventTargets, i18n.t("GameEvent.messages.foxSkipsHisTurn")),
                    ...insertIf(this.hasGameEventTargets, i18n.t("GameEvent.messages.foxSniffs")),
                    ...insertIf(this.hasGameEventTargets && this.doTargetsIncludeWerewolf, i18n.t("GameEvent.messages.foxFoundWerewolf")),
                    ...insertIf(this.hasGameEventTargets && !this.doTargetsIncludeWerewolf, i18n.t("GameEvent.messages.foxDidntFindWerewolf")),
                ],
                soundEffect: "fox-plays",
            };
        },
        gameEventBearGrowlsMetadata() {
            const { vileFatherOfWolvesPlayer } = this.game;
            const { doesGrowlIfInfected } = this.gameOptions.roles.bearTamer;
            return {
                messages: [
                    i18n.t("GameEvent.messages.bearGrowls"),
                    i18n.t("GameEvent.messages.growlsBecauseWerewolves"),
                    ...insertIf(vileFatherOfWolvesPlayer && doesGrowlIfInfected, i18n.t("GameEvent.messages.growBecauseInfected")),
                ],
                soundEffect: "bear-growls",
            };
        },
        gameEventBearStaysCalmMetadata() {
            return { messages: [i18n.t("GameEvent.messages.bearStaysCalm")] };
        },
        gameEventDogWolfChoosesSideMetadata() {
            const chosenSideText = this.event.side === "werewolves" ? "dogWolfHasChosenWerewolves" : "dogWolfHasChosenVillagers";
            return {
                messages: [i18n.t(`GameEvent.messages.${chosenSideText}`)],
                soundEffect: "dog-wolf-plays",
            };
        },
        gameEventWildChildJoinsWerewolvesMetadata() {
            return {
                messages: [i18n.t("GameEvent.messages.wildChildJoinsWerewolves")],
                soundEffect: "big-bad-wolf-plays",
            };
        },
        hasGameEventTargets() {
            return !!this.event.targets.length;
        },
        gameEventFirstTarget() {
            return this.hasGameEventTargets ? this.event.targets[0] : null;
        },
        gameEventFirstTargetName() {
            return this.hasGameEventTargets ? this.gameEventFirstTarget.player.name : null;
        },
        gameEventFirstTargetRole() {
            return this.hasGameEventTargets ? this.gameEventFirstTarget.player.role.current : null;
        },
        gameEventFirstTargetMurderCause() {
            return this.hasGameEventTargets ? this.gameEventFirstTarget.player.murdered.of : null;
        },
        gameEventFirstTargetSide() {
            return this.hasGameEventTargets ? this.gameEventFirstTarget.player.side.current : null;
        },
        doTargetsIncludeWerewolf() {
            return this.event.targets.find(({ player }) => player.isInWerewolvesSide);
        },
        gameEventMessages() {
            return this.gameEventMetadata[this.event.type] ? this.gameEventMetadata[this.event.type].messages : [];
        },
        gameEventSoundEffect() {
            return this.gameEventMetadata[this.event.type] ? this.gameEventMetadata[this.event.type].soundEffect : undefined;
        },
        currentGameEventMessage() {
            return this.gameEventMessages && this.messageIdx < this.gameEventMessages.length ? this.gameEventMessages[this.messageIdx] : "";
        },
        canGoBackToPreviousGameEventMessage() {
            return this.gameEventMessages && this.messageIdx;
        },
        gameCompositionText() {
            if (this.game.options.repartition.isHidden) {
                return this.$t("GameEvent.messages.compositionIsHidden", { inhabitantCount: this.game.players.length });
            }
            let gameCompositionText = this.$t("GameEvent.messages.compositionIs", { inhabitantCount: this.game.players.length });
            const roles = [];
            for (const player of this.game.players) {
                const existingRole = roles.find(({ name }) => name === player.role.current);
                if (existingRole) {
                    existingRole.count++;
                } else {
                    roles.push({ name: player.role.current, count: 1 });
                }
            }
            for (let i = 0; i < roles.length; i++) {
                gameCompositionText += i + 1 === roles.length ? ` ${this.$t("GameEvent.and")}` : ` `;
                gameCompositionText += ` ${roles[i].count} ${this.$tc(`Role.${roles[i].name}`, roles[i].count)}`;
                if (i + 2 < roles.length) {
                    gameCompositionText += ",";
                }
            }
            gameCompositionText += `.`;
            return gameCompositionText;
        },
        isTouchDevice,
    },
    created() {
        if (this.gameEventSoundEffect) {
            this.audioManager.playSoundEffect(this.gameEventSoundEffect);
        }
        if (this.event.type === "day-rises") {
            this.audioManager.playDayMusic();
        } else if (this.event.type === "night-falls") {
            this.audioManager.playNightMusic();
        } else if (this.event.type === "game-ends") {
            this.audioManager.playSuspenseMusic();
            this.audioManager.stopGamePhaseMusics();
        }
    },
    methods: {
        previousGameEventMessage() {
            if (this.canGoBackToPreviousGameEventMessage) {
                this.messageIdx--;
            }
        },
        nextGameEventMessage() {
            if (this.messageIdx + 1 === this.gameEventMessages.length) {
                this.$emit("skip-event", { _id: this.event._id });
            } else {
                this.messageIdx++;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../../../assets/scss/variables";

    #game-event-image-container {
        height: 60%;
        overflow-y: auto;
    }

    #game-event-message-container {
        height: 40%;

        #game-event-message {
            line-height: 1.1;
            max-height: 100%;
            @include media-breakpoint-up(md) {
                font-size: 1.50rem;
                line-height: 1.5;
            }
        }

        .game-event-message-button {
            cursor: pointer;

            &.disabled {
                cursor: not-allowed;
                color: grey;
            }
        }
    }
</style>