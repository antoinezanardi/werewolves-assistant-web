<template>
    <div id="eat-play-field" class="d-flex flex-column">
        <div id="werewolf-players" class="row justify-content-center align-items-center">
            <PlayerCard v-for="player of eatingPlayers" :key="player.name" :player="player" size="lg" class="col-6 col-md-3"/>
        </div>
        <PlayFieldActionText :play="play" attribute="eaten" @player-selected="playerSelected"/>
        <PlayerTargets :targets="eatablePlayers" :play="play" attribute="eaten" class="flex-grow-1"
                       @player-selected="playerSelected"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "../../../../shared/Game/PlayerCard";
import PlayerTargets from "../../../../shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "../../../../shared/Game/PlayField/PlayFieldActionText";

export default {
    name: "EatPlayField",
    components: { PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        eatablePlayers() {
            return this.game.alivePlayers.filter(player => player.side.current !== "werewolves" && !player.hasAttribute("eaten"));
        },
        eatingPlayers() {
            const { firstWaiting } = this.game;
            const eatingPlayers = {
                "werewolves": this.game.aliveWerewolfPlayers,
                "big-bad-wolf": this.game.getPlayersWithRole("big-bad-wolf"),
            };
            return eatingPlayers[firstWaiting.for] ? eatingPlayers[firstWaiting.for] : [];
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
    },
};
</script>

<style lang="scss" scoped>
</style>