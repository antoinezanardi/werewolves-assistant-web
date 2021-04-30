<template>
    <div id="game-summary-history">
        <h4 class="text-center my-2">
            <i class="fa fa-clock mr-2"/>
            <span v-html="$t('GameSummaryHistory.gameHistory')"/>
        </h4>
        <div class="row">
            <div class="col-12">
                <table class="table table-hover w-100">
                    <tbody>
                        <template v-for="(gameHistoryEntry, index) in gameHistory">
                            <GameSummaryHistoryPhaseLine :key="`new-phase-${gameHistoryEntry._id}`" :game-history="gameHistory" :index="index"/>
                            <GameSummaryHistoryPlayLine :key="`play-${gameHistoryEntry._id}`" :game-history-entry="gameHistoryEntry"/>
                            <GameSummaryHistoryRevealedPlayerLine v-for="revealedPlayer of gameHistoryEntry.revealedAlivePlayers"
                                                                  :key="`revealed-${revealedPlayer._id}`" :revealed-player="revealedPlayer"/>
                            <GameSummaryHistoryDeadPlayerLine v-for="deadPlayer of gameHistoryEntry.deadPlayers" :key="`death-${deadPlayer._id}`"
                                                              :is-big-bad-wolf-first-werewolf-to-die="isBigBadWolfFirstWerewolfToDie"
                                                              :first-dead-werewolf-not-big-bad-wolf-player="firstDeadWerewolfNotBigBadWolfPlayer"
                                                              :game-history-entry="gameHistoryEntry" :dead-player="deadPlayer"/>
                        </template>
                    </tbody>
                </table>
                <h4 class="d-flex justify-content-center align-items-center">
                    <i class="fa fa-genderless"/>
                    <span class="mx-3" v-html="$t('GameSummaryHistory.endOfGame')"/>
                    <i class="fa fa-genderless"/>
                </h4>
            </div>
        </div>
    </div>
</template>

<script>
import GameSummaryHistoryPhaseLine from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryHistory/GameSummaryHistoryPhaseLine";
import GameSummaryHistoryPlayLine from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryHistory/GameSummaryHistoryPlayLine";
import GameSummaryHistoryRevealedPlayerLine
    from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryHistory/GameSummaryHistoryRevealedPlayerLine";
import GameSummaryHistoryDeadPlayerLine
    from "@/components/shared/Game/GameSummary/GameSummaryModal/GameSummaryHistory/GameSummaryHistoryDeadPlayerLine";

export default {
    name: "GameSummaryHistory",
    components: {
        GameSummaryHistoryDeadPlayerLine,
        GameSummaryHistoryRevealedPlayerLine, GameSummaryHistoryPlayLine, GameSummaryHistoryPhaseLine,
    },
    props: {
        gameHistory: {
            type: Array,
            required: true,
        },
    },
    computed: {
        deadPlayers() {
            return this.gameHistory.reduce((acc, gameHistoryEntry) => {
                acc.push(...gameHistoryEntry.deadPlayers);
                return acc;
            }, []);
        },
        isBigBadWolfFirstWerewolfToDie() {
            return !this.deadPlayers.filter(({ side }) => side.current === "werewolves").findIndex(({ role }) => role.current === "big-bad-wolf");
        },
        firstDeadWerewolfNotBigBadWolfPlayer() {
            return this.deadPlayers.find(({ side, role }) => side.current === "werewolves" && role.current !== "big-bad-wolf");
        },
    },
};
</script>

<style scoped>

</style>