<template>
    <div id="shoot-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :game="game" :player="game.hunterPlayer" size="lg"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    <VRoller :defaultChar="shootTargetText" :text="shootTargetText"/>
                </h3>
            </div>
        </div>
        <PlayerTargets :game="game" :targets="game.alivePlayers" :play="play" attribute="shoot" class="flex-grow-1"
                       @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import PlayerCard from "../../../shared/Game/PlayerCard";
import PlayerTargets from "../../../shared/Game/PlayerTargets/PlayerTargets";
import Game from "../../../../classes/Game";

export default {
    name: "ShootPlayField",
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
        shootTargetText() {
            const playerTargeted = this.play.targets.length ? this.game.players.find(({ _id }) => _id === this.play.targets[0].player) : null;
            const text = `${this.$t("ShootPlayField.wantsToShoot")} `;
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