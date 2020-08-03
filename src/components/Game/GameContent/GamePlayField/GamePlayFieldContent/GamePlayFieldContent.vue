<template>
    <div id="game-content-play-field">
        <transition name="fade" mode="out-in">
            <ElectSheriffPlayField v-if="game.firstWaiting.to === 'elect-sheriff'" key="elect-sheriff" :game="game"
                                   class="h-100 container-fluid" @playerVotes="playerVotes"/>
            <LookPlayField v-else-if="game.firstWaiting.to === 'look'" key="look" :game="game" :play="play"
                           class="h-100 container-fluid" @playerSelected="playerSelected"/>
            <EatPlayField v-else-if="game.firstWaiting.to === 'eat'" key="eat" :game="game" :play="play"
                          class="h-100 container-fluid" @playerSelected="playerSelected"/>
            <UsePotionPlayField v-else-if="game.firstWaiting.to === 'use-potion'" key="use-potion" :game="game" :play="play"
                                class="h-100 container-fluid" @playerSelected="playerSelected"/>
            <ProtectPlayField v-else-if="game.firstWaiting.to === 'protect'" key="protect" :game="game" :play="play"
                              class="h-100 container-fluid" @playerSelected="playerSelected"/>
            <MarkPlayField v-else-if="game.firstWaiting.to === 'mark'" key="mark" :game="game" :play="play"
                           class="h-100 container-fluid" @playerSelected="playerSelected"/>
            <VotePlayField v-else-if="game.firstWaiting.to === 'vote'" key="vote" :game="game"
                           class="h-100 container-fluid" @playerVotes="playerVotes"/>
            <SettleVotesPlayField v-else-if="game.firstWaiting.to === 'settle-votes'" key="settle-votes" :game="game"
                                  :play="play" class="h-100 container-fluid" @playerSelected="playerSelected"/>
            <DelegatePlayField v-else-if="game.firstWaiting.to === 'delegate'" key="delegate" :game="game"
                               :play="play" class="h-100 container-fluid" @playerSelected="playerSelected"/>
            <ShootPlayField v-else-if="game.firstWaiting.to === 'shoot'" key="shoot" :game="game"
                            :play="play" class="h-100 container-fluid" @playerSelected="playerSelected"/>
            <div v-else key="unknown">?</div>
        </transition>
    </div>
</template>

<script>
import Game from "../../../../../classes/Game";
import ElectSheriffPlayField from "./ElectSheriffPlayField";
import LookPlayField from "./LookPlayField";
import EatPlayField from "./EatPlayField";
import UsePotionPlayField from "./UsePotionPlayField";
import ProtectPlayField from "./ProtectPlayField";
import MarkPlayField from "./MarkPlayField";
import VotePlayField from "./VotePlayField";
import SettleVotesPlayField from "./SettleVotesPlayField";
import DelegatePlayField from "./DelegatePlayField";
import ShootPlayField from "./ShootPlayField";

export default {
    name: "GamePlayFieldContent",
    components: { ShootPlayField, DelegatePlayField, SettleVotesPlayField, VotePlayField, MarkPlayField, ProtectPlayField, UsePotionPlayField, EatPlayField, LookPlayField, ElectSheriffPlayField },
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
    methods: {
        playerVotes(vote) {
            this.$emit("playerVotes", vote);
        },
        playerSelected(payload) {
            this.$emit("playerSelected", payload);
        },
    },
};
</script>

<style scoped>

</style>