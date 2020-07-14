<template>
    <div id="mark-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :game="game" :player="game.ravenPlayer" size="lg"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    <VRoller :default-char="markTargetText" :text="markTargetText" class="d-inline-flex"/>
                    <CancelPlayerTarget :play="play" attribute="raven-marked" class="ml-2" @playerSelected="playerSelected"/>
                </h3>
            </div>
        </div>
        <PlayerTargets :game="game" :targets="game.alivePlayers" :play="play" attribute="raven-marked" class="flex-grow-1" @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import PlayerCard from "../../../shared/Game/PlayerCard";
import PlayerTargets from "../../../shared/Game/PlayerTargets/PlayerTargets";
import Game from "../../../../classes/Game";
import CancelPlayerTarget from "../../../shared/Game/CancelPlayerTarget";

export default {
    name: "MarkPlayField",
    components: { CancelPlayerTarget, PlayerTargets, PlayerCard },
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
        markTargetText() {
            const playerTargeted = this.play.targets.length ? this.game.players.find(({ _id }) => _id === this.play.targets[0].player) : null;
            const text = `${this.$t("MarkPlayField.wantsToMark")} `;
            if (playerTargeted) {
                return playerTargeted._id === this.game.ravenPlayer._id ? this.$t("MarkPlayField.wantsToSelfMark") : text + playerTargeted.name;
            } else {
                return this.$t("MarkPlayField.skip");
            }
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