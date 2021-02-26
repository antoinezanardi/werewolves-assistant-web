<template>
    <div id="eat-play-field" class="d-flex flex-column">
        <GamePlayAlerts/>
        <div id="werewolf-players" class="row justify-content-center align-items-center">
            <PlayerCard v-for="player of eatingPlayers" :id="`werewolf-player-${player._id}`" :key="player.name" :player="player" size="lg"
                        class="col-6 col-md-4 col-lg-3"/>
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
import GamePlayAlerts from "@/components/shared/Game/GamePlayAlerts/GamePlayAlerts";

export default {
    name: "EatPlayField",
    components: { GamePlayAlerts, PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        eatablePlayers() {
            const { firstWaiting, aliveVillagerPlayers, aliveWerewolfPlayers } = this.game;
            const eatableVillagers = aliveVillagerPlayers.filter(player => !player.hasAttribute("eaten"));
            const eatableWerewolves = aliveWerewolfPlayers.filter(({ currentRole }) => currentRole !== "white-werewolf");
            return firstWaiting.for === "white-werewolf" ? eatableWerewolves : eatableVillagers;
        },
        eatingPlayers() {
            const { firstWaiting } = this.game;
            const eatingPlayers = {
                "werewolves": this.game.aliveWerewolfPlayers,
                "big-bad-wolf": this.game.getPlayersWithRole("big-bad-wolf"),
                "white-werewolf": this.game.getPlayersWithRole("white-werewolf"),
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