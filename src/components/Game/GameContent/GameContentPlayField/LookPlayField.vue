<template>
    <div id="look-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :game="game" :player="game.seerPlayer" size="lg"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    <VRoller :default-char="lookTargetText" :text="lookTargetText" class="d-inline-flex"/>
                    <CancelPlayerTarget :play="play" attribute="seen" class="ml-2" @playerSelected="playerSelected"/>
                </h3>
            </div>
        </div>
        <PlayerTargets :game="game" :targets="alivePlayersExceptSeer" :play="play" attribute="seen" class="flex-grow-1"
                       @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import Game from "../../../../classes/Game";
import PlayerTargets from "../../../shared/Game/PlayerTargets/PlayerTargets";
import PlayerCard from "../../../shared/Game/PlayerCard";
import CancelPlayerTarget from "../../../shared/Game/CancelPlayerTarget";

export default {
    name: "LookPlayField",
    components: { CancelPlayerTarget, PlayerCard, PlayerTargets },
    props: {
        game: {
            type: Game,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        alivePlayersExceptSeer() {
            return this.game.alivePlayers.filter(player => player.role.current !== "seer");
        },
        lookTargetText() {
            const playerTargeted = this.play.targets.length ? this.game.players.find(({ _id }) => _id === this.play.targets[0].player) : null;
            const text = `${this.$t("LookPlayField.wantsToLook")} `;
            return playerTargeted ? text + playerTargeted.name : `${text} ...`;
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
        },
    },
};
</script>

<style scoped>

</style>