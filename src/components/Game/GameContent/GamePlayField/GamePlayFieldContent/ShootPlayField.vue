<template>
    <div id="shoot-play-field" class="d-flex flex-column">
        <GamePlayAlerts :past-events="pastEvents"/>
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="game.hunterPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="shoot" @player-selected="playerSelected"/>
        <PlayerTargets :targets="game.alivePlayers" :play="play" attribute="shoot" class="flex-grow-1"
                       @player-selected="playerSelected"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import PlayerTargets from "@/components/shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";
import GamePlayAlerts from "@/components/shared/Game/GamePlayAlerts/GamePlayAlerts";

export default {
    name: "ShootPlayField",
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
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
    },
};
</script>

<style scoped>

</style>