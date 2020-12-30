<template>
    <transition name="fade" mode="out-in">
        <div id="game-lobby-start-conditions" :key="canStartGameText">
            <div class="animate__animated animate__pulse animate__repeat-2 d-flex justify-content-center align-items-center">
                <i :class="conditionIcon(game.canStartGame(roles))" class="mr-2"/>
                <div class="mr-2 font-weight-bold" v-html="canStartGameText"/>
                <div>
                    <v-popover class="d-inline" :disabled="game.canStartGame(roles)">
                        <WhatToDoButton v-if="!game.canStartGame(roles)"/>
                        <template #popover>
                            <div v-for="(condition, index) in conditions" :key="condition.text">
                                <div class="d-flex align-items-center">
                                    <i class="mx-3 condition-icon" :class="conditionIcon(condition.isMet)"/>
                                    <span v-html="condition.text"/>
                                </div>
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
import Game from "@/classes/Game";
import WhatToDoButton from "@/components/shared/Game/WhatToDoButton/WhatToDoButton";

export default {
    name: "GameLobbyStartConditions",
    components: { WhatToDoButton },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        ...mapGetters("role", { roles: "roles" }),
        canStartGameText() {
            if (this.game.canStartGame(this.roles)) {
                return this.$t("GameLobbyStartConditions.gameCanStart");
            }
            return this.$t("GameLobbyStartConditions.gameCannotStart");
        },
        conditions() {
            const conditions = [
                { text: this.$t("GameLobbyStartConditions.gameHasMinimumFourPlayers"), isMet: this.game.areThereEnoughPlayers },
                { text: this.$t("GameLobbyStartConditions.allPlayersMustHaveARole"), isMet: this.game.allPlayersHaveRole },
                { text: this.$t("GameLobbyStartConditions.gameHasMinimumOneVillager"), isMet: this.game.areThereEnoughVillagers },
                { text: this.$t("GameLobbyStartConditions.gameHasMinimumOneWerewolf"), isMet: this.game.areThereEnoughWerewolves },
            ];
            if (this.game.getPlayersWithRole("two-sisters").length) {
                conditions.push({ text: this.$t("GameLobbyStartConditions.gameMustHaveTwoSisters"), isMet: this.game.areThereEnoughSisters });
            }
            if (this.game.getPlayersWithRole("three-brothers").length) {
                conditions.push({ text: this.$t("GameLobbyStartConditions.gameMustHaveThreeBrothers"), isMet: this.game.areThereEnoughBrothers });
            }
            return conditions;
        },
    },
    methods: {
        conditionIcon(isMet) {
            return isMet ? "fa fa-check text-success" : "fa fa-times text-danger";
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

    .condition-icon {
        font-size: 1.35rem;
    }
</style>