<template>
    <div id="player-targets" class="row justify-content-center align-items-center">
        <div v-for="player in targets" :key="player.name" class="col-2">
            <PlayerCard :ref="`playerCard${player._id}`" :game="game" :player="player" :selectable="true"
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
    },
    methods: {
        playerSelected({ player, selected }) {
            if (selected) {
                for (const { _id } of this.targets) {
                    const playerCardComponent = this.$refs[`playerCard${_id}`][0];
                    if (_id !== player._id && playerCardComponent.selected) {
                        playerCardComponent.unselectPlayer();
                    }
                }
            }
            this.$emit("playerSelected", { player, selected });
        },
    },
};
</script>

<style scoped>

</style>