<template>
    <div id="game-event" class="container-fluid d-flex flex-grow-1 flex-column">
        <Keypress key-event="keyup" :key-code="37" @success="previousGameEventMessage"/>
        <Keypress key-event="keyup" :key-code="39" @success="nextGameEventMessage"/>
        <div id="game-event-image-container" class="row justify-content-center align-items-center">
            <div class="col-12 d-flex justify-content-center flex-grow-1">
                <GameEventImage :game="game" :event="event"/>
            </div>
        </div>
        <div id="game-event-message-container" class="w-100 d-flex">
            <div class="row align-items-center d-flex flex-grow-1">
                <div class="col-2 col-md-1 px-0">
                    <v-popover trigger="hover" :disabled="!canGoBackToPreviousGameEventMessage || isTouchDevice">
                        <i class="fa fa-chevron-left fa-3x game-event-message-button" @click="previousGameEventMessage"
                           :class="{ disabled: !canGoBackToPreviousGameEventMessage }"/>
                        <template slot="popover">
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
                <div class="col-8 col-md-10 text-center">
                    <transition mode="out-in" name="fade">
                        <div id="game-event-message" class="text-center" :key="currentGameEventMessage"
                             v-html="currentGameEventMessage"/>
                    </transition>
                </div>
                <div class="col-2 col-md-1 px-0 text-right">
                    <v-popover trigger="hover" :disabled="isTouchDevice">
                        <i class="fa fa-chevron-right fa-3x game-event-message-button" @click="nextGameEventMessage"/>
                        <template slot="popover">
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
import Game from "@/classes/Game";
import GameEvent from "@/classes/GameEvent";
import i18n from "@/plugins/vue-i18n";
import GameEventImage from "@/components/Game/GameEventMonitor/GameEvent/GameEventImage";
import { insertIf } from "@/helpers/functions/Array";
import { isTouchDevice } from "@/helpers/functions/Device";
import leftArrowKey from "@/assets/img/game/left-arrow-key.png";
import rightArrowKey from "@/assets/img/game/right-arrow-key.png";

export default {
    name: "GameEvent",
    components: { GameEventImage },
    props: {
        game: {
            type: Game,
            required: true,
        },
        event: {
            type: GameEvent,
            required: true,
        },
    },
    data() {
        return {
            messageIdx: 0,
            IMGs: {
                leftArrowKey, rightArrowKey,
            },
        };
    },
    computed: {
        // eslint-disable-next-line max-lines-per-function
        gameEventMetadata() {
            return {
                "game-starts": {
                    messages: [
                        i18n.t("GameEvent.messages.welcomeToTheVillage"),
                        this.gameCompositionText,
                        i18n.t("GameEvent.messages.looksLifeSomeWerewolvesIntroducedThemselves"),
                        i18n.t("GameEvent.messages.villagersMurderWerewolves"),
                        i18n.t("GameEvent.messages.beforeStartingLetsElectSheriff"),
                    ],
                },
                "player-dies": {
                    messages: [
                        i18n.t("GameEvent.messages.playerDies", { player: this.hasGameEventTarget ? this.event.targets[0].player.name : null }),
                        i18n.t("GameEvent.messages.playerRevealsRole"),
                    ],
                },
                "sheriff-elected": {
                    messages: [
                        i18n.t("GameEvent.messages.playerHasBeenPromotedSheriff", { player: this.hasGameEventTarget ? this.event.targets[0].player.name : null }),
                        ...insertIf(this.game.tick === 1, i18n.t("GameEvent.messages.sheriffCanMakeASpeech")),
                    ],
                },
                "night-falls": {
                    messages: [i18n.t("GameEvent.messages.nightFalls"), i18n.t("GameEvent.messages.inhabitantsFallAsleep")],
                },
                "day-rises": {
                    messages: [i18n.t("GameEvent.messages.dayRises")],
                },
                "seer-starts": {
                    messages: [i18n.t("GameEvent.messages.seerStarts")],
                },
                "seer-looks": {
                    messages: [
                        `${i18n.t("GameEvent.messages.seerHasSeen")} ${i18n.t(`Role.a.${this.hasGameEventTarget ? this.event.targets[0].player.role.current : "villager"}`)} !`,
                    ],
                },
                "werewolves-start": {
                    messages: [i18n.tc("GameEvent.messages.werewolvesStart", this.game.aliveWerewolfPlayers.length)],
                },
                "witch-starts": {
                    messages: [i18n.t("GameEvent.messages.witchStarts")],
                },
                "guard-starts": {
                    messages: [i18n.t("GameEvent.messages.guardStarts")],
                },
                "raven-starts": {
                    messages: [i18n.t("GameEvent.messages.ravenStarts")],
                },
                "hunter-starts": {
                    messages: [i18n.t("GameEvent.messages.hunterStarts")],
                },
            };
        },
        hasGameEventTarget() {
            return !!this.event.targets.length;
        },
        gameEventMessages() {
            return this.gameEventMetadata[this.event.type] ? this.gameEventMetadata[this.event.type].messages : [];
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
                gameCompositionText += i + 1 === roles.length ? ` et` : ` `;
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
    methods: {
        previousGameEventMessage() {
            if (this.canGoBackToPreviousGameEventMessage) {
                this.messageIdx--;
            }
        },
        nextGameEventMessage() {
            if (this.messageIdx + 1 === this.gameEventMessages.length) {
                this.$emit("skipEvent", { _id: this.event._id });
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
        height: 50%;
    }

    #game-event-message-container {
        height: 50%;

        #game-event-message {
            @include font-size(1.25rem);
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