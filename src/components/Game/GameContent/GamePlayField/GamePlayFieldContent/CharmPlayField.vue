<template>
    <div id="charm-play-field" class="d-flex flex-column">
        <div id="charming-player" class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="charmingPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" :attribute="targetsAppliedAttribute" @player-selected="playerSelected"/>
        <PlayerTargets :targets="canBeCharmedPlayers" :play="play" :attribute="targetsAppliedAttribute" class="flex-grow-1"
                       @player-selected="playerSelected"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import PlayerTargets from "@/components/shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";

export default {
    name: "CharmPlayField",
    components: { PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        charmingPlayer() {
            const { firstWaiting } = this.game;
            return this.game.getPlayerWithRole(firstWaiting.for);
        },
        targetsAppliedAttribute() {
            const { firstWaiting } = this.game;
            return firstWaiting.for === "pied-piper" ? "charmed" : "in-love";
        },
        canBeCharmedPlayers() {
            const { firstWaiting } = this.game;
            const canBeCharmedPlayers = {
                "pied-piper": this.game.piedPiperTargets,
                "cupid": this.game.alivePlayers,
            };
            return canBeCharmedPlayers[firstWaiting.for] ? canBeCharmedPlayers[firstWaiting.for] : [];
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
    },
};
</script>

<style scoped>

</style>