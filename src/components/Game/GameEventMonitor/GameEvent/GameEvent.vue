<template>
    <div id="game-event" class="container-fluid d-flex flex-column align-items-center justify-content-center h-100">
        <div id="game-event-image-container" class="row justify-content-center align-items-center w-100">
            <div class="col-12 h-100">
                <GameEventImage :game="game" :event="event"/>
            </div>
        </div>
        <div id="game-event-message-container" class="w-100">
            <div class="row align-items-center h-100">
                <div class="col-1">
                    <i class="fa fa-chevron-left fa-3x game-event-message-button" @click="previousGameEventMessage"
                       v-tooltip="canGoBackToPreviousGameEventMessage && $t('GameEvent.previous')"
                       :class="{ disabled: !canGoBackToPreviousGameEventMessage }"/>
                </div>
                <div class="col-10 text-center">
                    <transition mode="out-in" name="fade">
                        <div id="game-event-message" class="text-center" :key="currentGameEventMessage"
                             v-html="currentGameEventMessage"/>
                    </transition>
                </div>
                <div class="col-1">
                    <i class="fa fa-chevron-right fa-3x game-event-message-button" @click="nextGameEventMessage"
                       v-tooltip="$t('GameEvent.next')"/>
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
        };
    },
    computed: {
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
                "sheriff-elected": {
                    messages: [i18n.t("GameEvent.messages.playerHasBeenPromotedSheriff", { player: this.hasGameEventTarget ? this.event.targets[0].player.name : null })],
                },
                "night-falls": {
                    messages: [i18n.t("GameEvent.messages.nightFalls"), i18n.t("GameEvent.messages.inhabitantsFallAsleep")],
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
            @include font-size(1.75rem);
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