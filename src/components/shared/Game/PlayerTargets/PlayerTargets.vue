<template>
    <div id="player-targets" class="row justify-content-center align-items-center">
        <div v-if="!targets.length" class="d-flex h-100 flex-grow-1 flex-column justify-content-center align-items-center">
            <h3 class="text-muted font-italic text-center">
                <i class="fa fa-ban mr-2"/>
                <span v-html="$t('PlayerTargets.noPossibleTargets')"/>
            </h3>
        </div>
        <div v-for="player in targets" v-else :key="player.name" class="col-lg-2 col-4 player-target d-flex align-items-center px-2">
            <PlayerCard :ref="`playerCard${player._id}`" :player="player" :selectable="true"
                        :selected="isPlayerSelected(player)" :class="{ selected: isPlayerSelected(player) }"
                        @player-selected="playerSelected"/>
        </div>
    </div>
</template>

<script>
import PlayerCard from "../PlayerCard";

export default {
    name: "PlayerTargets",
    components: { PlayerCard },
    props: {
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
            this.$emit("player-selected", { player, selected, attribute: this.attribute });
        },
        isPlayerSelected(player) {
            return !!this.play.targets.find(target => target.player === player._id && target.attribute === this.attribute);
        },
    },
};
</script>

<style scoped>
    .player-target {
        height: 120px;
    }
</style>