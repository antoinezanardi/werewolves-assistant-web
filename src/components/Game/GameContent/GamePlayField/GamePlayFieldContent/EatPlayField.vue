<template>
    <div id="eat-play-field" class="d-flex flex-column">
        <div id="werewolf-players" class="row justify-content-center align-items-center">
            <PlayerCard v-for="player of game.aliveWerewolfPlayers" :key="player.name" :player="player" size="lg"
                        class="col-6 col-lg-3"/>
        </div>
        <PlayFieldActionText :play="play" attribute="eaten" @playerSelected="playerSelected"/>
        <PlayerTargets :targets="alivePlayersExceptWerewolves" :play="play" attribute="eaten" class="flex-grow-1"
                       @playerSelected="playerSelected"/>
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
        ...mapGetters("game", {
            game: "game",
        }),
        alivePlayersExceptWerewolves() {
            return this.game.alivePlayers.filter(player => player.role.group !== "werewolves");
        },
    },
    methods: {
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
        },
    },
};
</script>

<style lang="scss" scoped>
</style>