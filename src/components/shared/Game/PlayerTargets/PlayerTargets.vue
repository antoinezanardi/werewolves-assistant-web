<template>
    <div id="player-targets" class="row justify-content-center align-items-center">
        <div v-for="player in targets" :key="player.name" class="col-lg-2 col-4">
            <PlayerCard :ref="`playerCard${player._id}`" :game="game" :player="player" :selectable="true"
                        :selected="isPlayerSelected(player)" :class="{ selected: isPlayerSelected(player) }"
                        @playerSelected="playerSelected"/>
        </div>
    </div>
</template>

<script>
import PlayerCard from "../PlayerCard";
import Game from "../../../../classes/Game";

export default {
    name: "PlayerTargets",
    components: { PlayerCard },
    props: {
        game: {
            type: Game,
            required: true,
        },
        targets: {
            type: Array,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
        attribute: {
            type: String,
            required: true,
        },
    },
    methods: {
        playerSelected({ player, selected }) {
            this.$emit("playerSelected", { player, selected, attribute: this.attribute });
        },
        isPlayerSelected(player) {
            return !!this.play.targets.find(target => target.player === player._id && target.attribute === this.attribute);
        },
    },
};
</script>

<style scoped>

</style>