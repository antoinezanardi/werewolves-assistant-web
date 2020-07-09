<template>
    <div id="protect-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :game="game" :player="game.guardPlayer" size="lg"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    <VRoller :defaultChar="protectTargetText" :text="protectTargetText"/>
                </h3>
            </div>
        </div>
        <PlayerTargets :game="game" :targets="game.alivePlayers" class="flex-grow-1" @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import PlayerCard from "../../../shared/Game/PlayerCard";
import Game from "../../../../classes/Game";
import PlayerTargets from "../../../shared/Game/PlayerTargets/PlayerTargets";

export default {
    name: "ProtectPlayField",
    components: { PlayerTargets, PlayerCard },
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
        protectTargetText() {
            const playerTargeted = this.play.targets.length ? this.game.players.find(({ _id }) => _id === this.play.targets[0].player) : null;
            const text = `${this.$t("ProtectPlayField.wantsToProtect")} `;
            if (playerTargeted) {
                return playerTargeted._id === this.game.guardPlayer._id ? this.$t("ProtectPlayField.wantsToSelfProtect") : text + playerTargeted.name;
            } else {
                return `${text} ...`;
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