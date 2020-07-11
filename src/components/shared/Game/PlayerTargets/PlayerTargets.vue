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
            if (selected) {
                for (const target of this.targets) {
                    const playerCardComponent = this.$refs[`playerCard${target._id}`][0];
                    if (target._id !== player._id) {
                        const playTarget = this.play.targets.find(playTarget => playTarget.player === target._id);
                        if (playTarget && playTarget.attribute === this.attribute) {
                            playerCardComponent.unselectPlayer();
                        }
                    }
                }
            }
            this.$emit("playerSelected", { player, selected, attribute: this.attribute });
        },
    },
};
</script>

<style scoped>

</style>