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
                        <div id="game-event-message" :key="currentGameEventMessage" class="text-center my-2"
                             v-html="currentGameEventMessage"/>
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
        // eslint-disable-next-line max-lines-per-function
        gameEventMetadata() {
            const { ancientPlayer, angelPlayer, didAncientTakeHisRevenge, firstWaiting } = this.game;
            const gameEventFirstTarget = this.hasGameEventTargets ? this.event.targets[0] : null;
            const gameEventTargetName = this.hasGameEventTargets ? gameEventFirstTarget.player.name : null;
            const gameEventTargetRole = this.hasGameEventTargets ? gameEventFirstTarget.player.role.current : null;
            const gameEventTargetRoleText = gameEventTargetRole ? i18n.t(`Role.a.${gameEventFirstTarget.player.role.current}`) : null;
            return {
                "game-starts": {
                    messages: [
                        i18n.t("GameEvent.messages.welcomeToTheVillage"),
                        this.gameCompositionText,
                        ...insertIf(this.game.thiefPlayer, i18n.t("GameEvent.messages.moreRolesBecauseOfThief")),
                        i18n.t("GameEvent.messages.looksLifeSomeWerewolvesIntroducedThemselves"),
                        i18n.t("GameEvent.messages.villagersMurderWerewolves"),
                        ...insertIf(this.gameOptions.roles.sheriff.isEnabled, i18n.t("GameEvent.messages.beforeStartingLetsElectSheriff")),
                    ],
                },
                "player-starts-game-revealed": {
                    messages: [
                        i18n.t("GameEvent.messages.villagerVillagerStartsGameRevealed",
                            { player: gameEventTargetName }),
                    ],
                },
                "player-dies": {
                    messages: [
                        i18n.t("GameEvent.messages.playerDies", { player: gameEventTargetName }),
                        i18n.t("GameEvent.messages.playerRevealsRole"),
                        ...insertIf(gameEventTargetRole === "idiot" && gameEventFirstTarget.player.hasAttribute("sheriff"),
                            i18n.t("GameEvent.messages.noIdiotSheriffAnymore")),
                        ...insertIf(gameEventTargetRole === "ancient" && didAncientTakeHisRevenge,
                            i18n.t("GameEvent.messages.ancientTakesHisRevenge")),
                    ],
                    soundEffect: "death",
                },
                "player-role-revealed": {
                    messages: [
                        ...insertIf(gameEventTargetRole === "idiot", i18n.t("GameEvent.messages.idiotIsForgiven")),
                        i18n.t("GameEvent.messages.playerRoleIsRevealed"),
                    ],
                },
                "sheriff-elected": {
                    messages: [
                        i18n.t("GameEvent.messages.playerHasBeenPromotedSheriff", { gameEventTargetName }),
                        ...insertIf(this.game.turn === 1, i18n.t("GameEvent.messages.sheriffCanMakeASpeech")),
                    ],
                    soundEffect: "sheriff-is-elected",
                },
                "night-falls": {
                    messages: [i18n.t("GameEvent.messages.nightFalls"), i18n.t("GameEvent.messages.inhabitantsFallAsleep")],
                    soundEffect: "night-falls",
                },
                "all-turn": {
                    messages: [
                        ...insertIf(firstWaiting.to === "vote" && !!angelPlayer && this.game.isFirstWaitingPreFirstNightPlay,
                            i18n.t("GameEvent.messages.gameStartsWithVoteBecauseOfAngel")),
                        ...insertIf(firstWaiting.to === "vote" && firstWaiting.cause === "stuttering-judge-request",
                            i18n.t("GameEvent.messages.allVoteBecauseOfStutteringJudge")),
                        ...insertIf(firstWaiting.to === "vote" && !this.game.isSecondVoteAfterTie, i18n.t("GameEvent.messages.allVote")),
                        ...insertIf(firstWaiting.to === "vote" && this.game.isSecondVoteAfterTie,
                            i18n.t("GameEvent.messages.allVoteAgain", { players: listPlayerNames(this.game.lastActionTargetedPlayers) })),
                        ...insertIf(firstWaiting.to === "vote" && !!ancientPlayer && ancientPlayer.isAlive,
                            i18n.t("GameEvent.messages.attentionToTheAncient")),
                        ...insertIf(firstWaiting.to === "elect-sheriff", i18n.t("GameEvent.messages.allElectSheriff")),
                    ],
                    soundEffect: "sheriff-election",
                },
                "no-death-after-votes": {
                    messages: [
                        i18n.t("GameEvent.messages.noDeathAfterVotes"),
                        i18n.t("GameEvent.messages.everybodyFallAsleepAlive"),
                    ],
                },
                "sheriff-turn": {
                    messages: [
                        ...insertIf(firstWaiting.to === "settle-votes", i18n.t("GameEvent.messages.sheriffSettlesVote")),
                        ...insertIf(firstWaiting.to === "delegate", i18n.t("GameEvent.messages.sheriffDelegates")),
                    ],
                    soundEffect: "sheriff-election",
                },
                "day-rises": {
                    messages: [i18n.t("GameEvent.messages.dayRises")],
                    soundEffect: "day-rises",
                },
                "deaths-during-night": {
                    messages: [
                        i18n.tc("GameEvent.messages.deathDuringNight", this.event.targets.length, { numberOfDeaths: this.event.targets.length }),
                        i18n.t("GameEvent.messages.letsSeeWhoIsDead"),
                    ],
                },
                "no-death-during-night": { messages: [i18n.t("GameEvent.messages.noDeathDuringNight")] },
                "seer-turn": {
                    messages: [i18n.t("GameEvent.messages.seerStarts")],
                    soundEffect: "seer-plays",
                },
                "seer-looks": {
                    messages: [
                        ...insertIf(!this.gameOptions.roles.seer.isTalkative, i18n.t("GameEvent.messages.followingMessageMustBeMimed")),
                        `${i18n.t("GameEvent.messages.seerHasSeen")} ${gameEventTargetRoleText} !`,
                    ],
                    soundEffect: "seer-plays",
                },
                "werewolves-turn": {
                    messages: [i18n.tc("GameEvent.messages.werewolvesStart", this.game.aliveWerewolfPlayers.length)],
                    soundEffect: "werewolves-play",
                },
                "vile-father-of-wolves-infects": {
                    messages: [i18n.t("GameEvent.messages.gameMasterWillTouchInfected")],
                    soundEffect: "vile-father-of-wolves-infects",
                },
                "witch-turn": {
                    messages: [i18n.t("GameEvent.messages.witchStarts")],
                    soundEffect: "witch-plays",
                },
                "guard-turn": {
                    messages: [i18n.t("GameEvent.messages.guardStarts")],
                    soundEffect: "guard-plays",
                },
                "raven-turn": {
                    messages: [i18n.t("GameEvent.messages.ravenStarts")],
                    soundEffect: "raven-plays",
                },
                "raven-marks": {
                    messages: [
                        i18n.t("GameEvent.messages.ravenHasMarked"),
                        i18n.t("GameEvent.messages.gameMasterWillDepositMark"),
                    ],
                    soundEffect: "raven-plays",
                },
                "hunter-turn": {
                    messages: [i18n.t("GameEvent.messages.hunterStarts")],
                    soundEffect: "hunter-plays",
                },
                "dog-wolf-turn": {
                    messages: [i18n.t("GameEvent.messages.dogWolfStarts")],
                    soundEffect: "dog-wolf-plays",
                },
                "cupid-turn": {
                    messages: [i18n.t("GameEvent.messages.cupidStarts")],
                    soundEffect: "cupid-plays",
                },
                "cupid-charms": {
                    messages: [
                        i18n.t("GameEvent.messages.cupidCharmedTwoPlayers"),
                        i18n.t("GameEvent.messages.gameMasterWillTouchLovers"),
                    ],
                    soundEffect: "cupid-plays",
                },
                "lovers-turn": {
                    messages: [i18n.t("GameEvent.messages.loversStart")],
                    soundEffect: "lovers-play",
                },
                "two-sisters-turn": {
                    messages: [
                        ...insertIf(this.game.turn === 1, i18n.t("GameEvent.messages.twoSistersMeetEachOther")),
                        ...insertIf(this.game.turn !== 1, i18n.t("GameEvent.messages.twoSistersWakeUpToTalk")),
                    ],
                    soundEffect: "two-sisters-play",
                },
                "three-brothers-turn": {
                    messages: [
                        ...insertIf(this.game.turn === 1, i18n.t("GameEvent.messages.threeBrothersMeetEachOther")),
                        ...insertIf(this.game.turn !== 1, i18n.t("GameEvent.messages.threeBrothersWakeUpToTalk")),
                    ],
                    soundEffect: "three-brothers-play",
                },
                "wild-child-turn": {
                    messages: [i18n.t("GameEvent.messages.wildChildStarts")],
                    soundEffect: "wild-child-plays",
                },
                "big-bad-wolf-turn": {
                    messages: [i18n.t("GameEvent.messages.bigBadWolfStarts")],
                    soundEffect: "big-bad-wolf-plays",
                },
                "pied-piper-turn": {
                    messages: [i18n.t("GameEvent.messages.piedPiperStarts")],
                    soundEffect: "pied-piper-plays",
                },
                "pied-piper-charms": {
                    messages: [
                        i18n.t("GameEvent.messages.piedPiperCharmedTwoPlayers"),
                        i18n.t("GameEvent.messages.gameMasterWillTouchCharmed"),
                    ],
                    soundEffect: "pied-piper-plays",
                },
                "charmed-turn": {
                    messages: [
                        ...insertIf(this.game.turn === 1, i18n.t("GameEvent.messages.charmedWakeUp")),
                        ...insertIf(this.game.turn !== 1, i18n.t("GameEvent.messages.charmedWakeUpWithOldOnes")),
                    ],
                    soundEffect: "charmed-play",
                },
                "scapegoat-turn": {
                    messages: [i18n.t("GameEvent.messages.scapegoatStarts")],
                    soundEffect: "scapegoat-plays",
                },
                "thief-turn": {
                    messages: [
                        i18n.t("GameEvent.messages.thiefStarts"),
                        i18n.t("GameEvent.messages.gameMasterWillFlipAdditionalCards"),
                    ],
                    soundEffect: "thief-plays",
                },
                "thief-chooses-card": {
                    messages: [i18n.t("GameEvent.messages.thiefChoosesCard")],
                    soundEffect: "thief-plays",
                },
                "stuttering-judge-turn": {
                    messages: [i18n.t("GameEvent.messages.stutteringJudgeStarts")],
                    soundEffect: "stuttering-judge-plays",
                },
                "white-werewolf-turn": {
                    messages: [i18n.t("GameEvent.messages.whiteWerewolfStarts")],
                    soundEffect: "white-werewolf-plays",
                },
                "fox-turn": {
                    messages: [i18n.t("GameEvent.messages.foxStarts")],
                    soundEffect: "fox-plays",
                },
            };
        },
        hasGameEventTargets() {
            return !!this.event.targets.length;
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
            max-height: 100%;
            @include media-breakpoint-up(md) {
                font-size: 1.50rem;
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