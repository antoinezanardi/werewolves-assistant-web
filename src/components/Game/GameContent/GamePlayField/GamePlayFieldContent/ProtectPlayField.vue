<template>
    <div id="protect-play-field" class="d-flex flex-column">
        <GamePlayAlerts :past-events="pastEvents"/>
        <div class="row justify-content-center align-items-center">
            <div class="col-12 col-lg-4">
                <PlayerCard id="guard-player-card" :player="game.guardPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="protected" @player-selected="playerSelected"/>
        <div class="flex-grow-1">
            <PlayerTargets :targets="protectablePlayers" :play="play" attribute="protected" @player-selected="playerSelected"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import PlayerTargets from "@/components/shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";
import GamePlayAlerts from "@/components/shared/Game/GamePlayAlerts/GamePlayAlerts";

export default {
    name: "ProtectPlayField",
    components: { GamePlayAlerts, PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
        pastEvents: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        protectablePlayers() {
            const { lastGuardTarget } = this.pastEvents;
            return this.pastEvents.lastGuardTarget ? this.game.alivePlayers.filter(({ _id }) => _id !== lastGuardTarget._id) : this.game.alivePlayers;
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