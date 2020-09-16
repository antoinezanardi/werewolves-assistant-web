<template>
    <div id="protect-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12 col-lg-4">
                <PlayerCard id="guard-player-card" :player="game.guardPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="protected" @playerSelected="playerSelected"/>
        <PlayerTargets :targets="protectablePlayers" :play="play" attribute="protected" class="flex-grow-1"
                       @playerSelected="playerSelected"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "../../../../shared/Game/PlayerCard";
import PlayerTargets from "../../../../shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "../../../../shared/Game/PlayField/PlayFieldActionText";

export default {
    name: "ProtectPlayField",
    components: { PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        protectTargetText() {
            const playerTargeted = this.play.targets.length ? this.game.players.find(({ _id }) => _id === this.play.targets[0].player) : null;
            const text = `${this.$t("ProtectPlayField.wantsToProtect")} `;
            if (playerTargeted) {
                return playerTargeted._id === this.game.guardPlayer._id ? this.$t("ProtectPlayField.wantsToSelfProtect") : text + playerTargeted.name;
            }
            return `${text} ...`;
        },
        protectablePlayers() {
            const lastProtectEntry = this.game.history.find(gameHistoryEntry => gameHistoryEntry.play.action === "protect");
            if (lastProtectEntry) {
                return this.game.alivePlayers.filter(({ _id }) => _id !== lastProtectEntry.play.targets[0].player._id);
            }
            return this.game.alivePlayers;
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