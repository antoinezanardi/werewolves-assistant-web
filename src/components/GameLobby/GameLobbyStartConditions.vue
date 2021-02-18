<template>
    <transition name="fade" mode="out-in">
        <div id="game-lobby-start-conditions" :key="canStartGameText">
            <div class="animate__animated animate__pulse animate__repeat-2 d-flex justify-content-center align-items-center">
                <i :class="conditionIcon(game.canStartGame(roles))" class="mr-2"/>
                <div class="mr-2 font-weight-bold" v-html="canStartGameText"/>
                <div>
                    <v-popover ref="gameLobbyStartConditionsPopover" class="d-inline" :disabled="game.canStartGame(roles)">
                        <WhatToDoButton v-if="!game.canStartGame(roles)"/>
                        <template #popover>
                            <div v-for="(condition, index) in conditions" :key="condition.text">
                                <div class="condition d-flex align-items-center">
                                    <i class="mx-3 condition-icon" :class="conditionIcon(condition.isMet)"/>
                                    <span v-html="condition.text"/>
                                </div>
                                <button v-if="condition.type === 'thief' && !condition.isMet" v-close-popover="true"
                                        class="btn btn-primary btn-sm btn-block mt-2" @click.prevent="highlightAndSeeThiefAdditionalCards">
                                    <i class="fa fa-chess mr-2"/>
                                    <span v-html="$t('GameLobbyStartConditions.chooseCards')"/>
                                </button>
                                <hr v-if="index + 1 !== conditions.length" class="bg-secondary my-2"/>
                            </div>
                        </template>
                    </v-popover>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";
import WhatToDoButton from "@/components/shared/Game/WhatToDoButton/WhatToDoButton";

export default {
    name: "GameLobbyStartConditions",
    components: { WhatToDoButton },
    computed: {
        ...mapGetters("role", { roles: "roles" }),
        ...mapGetters("game", { game: "game" }),
        canStartGameText() {
            if (this.game.canStartGame(this.roles)) {
                return this.$t("GameLobbyStartConditions.gameCanStart");
            }
            return this.$t("GameLobbyStartConditions.gameCannotStart");
        },
        conditions() {
            const texts = this.$t("GameLobbyStartConditions");
            const conditions = [
                { type: "four-players", text: texts.gameHasMinimumFourPlayers, isMet: this.game.areThereEnoughPlayers },
                { type: "all-have-role", text: texts.allPlayersMustHaveARole, isMet: this.game.allPlayersHaveRole },
                { type: "min-one-villager", text: texts.gameHasMinimumOneVillager, isMet: this.game.areThereEnoughVillagers },
                { type: "min-one-werewolf", text: texts.gameHasMinimumOneWerewolf, isMet: this.game.areThereEnoughWerewolves },
            ];
            if (this.game.getPlayersWithRole("two-sisters").length) {
                conditions.push({ type: "two-sisters", text: texts.gameMustHaveTwoSisters, isMet: this.game.areThereEnoughSisters });
            }
            if (this.game.getPlayersWithRole("three-brothers").length) {
                conditions.push({ type: "three-brothers", text: texts.gameMustHaveThreeBrothers, isMet: this.game.areThereEnoughBrothers });
            }
            if (this.game.getPlayerWithRole("thief")) {
                conditions.push({ type: "thief", text: texts.thiefAdditionalCardsMustBeSet, isMet: this.game.areThereEnoughThiefAdditionalCards });
            }
            return conditions;
        },
    },
    methods: {
        conditionIcon(isMet) {
            return isMet ? "fa fa-check text-success" : "fa fa-times text-danger";
        },
        highlightAndSeeThiefAdditionalCards() {
            this.$emit("highlight-and-see-thief-additional-cards");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/bootstrap/scss/bootstrap-grid";

    #game-lobby-start-conditions {
        font-size: 1rem;
        @include media-breakpoint-up(md) {
            font-size: 1.15rem;
        }
    }

    .condition {
        font-size: 0.80rem;
        .condition-icon {
            font-size: 0.9rem;
        }
    }

</style>