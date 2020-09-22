<template>
    <div id="mark-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12 col-lg-4">
                <PlayerCard id="raven-player-card" :player="game.ravenPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="raven-marked" @playerSelected="playerSelected"/>
        <PlayerTargets :targets="game.alivePlayers" :play="play" attribute="raven-marked" class="flex-grow-1"
                       @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "../../../../shared/Game/PlayerCard";
import PlayerTargets from "../../../../shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "../../../../shared/Game/PlayField/PlayFieldActionText";

export default {
    name: "MarkPlayField",
    components: { PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        markTargetText() {
            const playerTargeted = this.play.targets.length ? this.game.players.find(({ _id }) => _id === this.play.targets[0].player) : null;
            const text = `${this.$t("MarkPlayField.wantsToMark")} `;
            if (playerTargeted) {
                return playerTargeted._id === this.game.ravenPlayer._id ? this.$t("MarkPlayField.wantsToSelfMark") : text + playerTargeted.name;
            }
            return this.$t("MarkPlayField.skip");
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