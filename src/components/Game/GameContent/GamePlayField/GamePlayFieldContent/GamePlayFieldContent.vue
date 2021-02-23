<template>
    <div id="game-content-play-field">
        <transition name="fade" mode="out-in">
            <ElectSheriffPlayField v-if="game.firstWaiting.to === 'elect-sheriff'" key="elect-sheriff" :play="play"
                                   class="h-100 container-fluid" @player-votes="playerVotes"/>
            <LookPlayField v-else-if="game.firstWaiting.to === 'look'" key="look" :play="play"
                           class="h-100 container-fluid" @player-selected="playerSelected"/>
            <EatPlayField v-else-if="game.firstWaiting.to === 'eat'" key="eat" :play="play"
                          class="h-100 container-fluid" @player-selected="playerSelected"/>
            <UsePotionPlayField v-else-if="game.firstWaiting.to === 'use-potion'" key="use-potion" :play="play"
                                class="h-100 container-fluid" @player-selected="playerSelected"/>
            <ProtectPlayField v-else-if="game.firstWaiting.to === 'protect'" key="protect" :play="play"
                              class="h-100 container-fluid" @player-selected="playerSelected"/>
            <MarkPlayField v-else-if="game.firstWaiting.to === 'mark'" key="mark" :play="play"
                           class="h-100 container-fluid" @player-selected="playerSelected"/>
            <VotePlayField v-else-if="game.firstWaiting.to === 'vote'" key="vote" :play="play" :past-events="pastEvents"
                           class="h-100 container-fluid" @player-votes="playerVotes"/>
            <SettleVotesPlayField v-else-if="game.firstWaiting.to === 'settle-votes'" key="settle-votes"
                                  :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
            <DelegatePlayField v-else-if="game.firstWaiting.to === 'delegate'" key="delegate"
                               :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
            <ShootPlayField v-else-if="game.firstWaiting.to === 'shoot'" key="shoot"
                            :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
            <ChooseSidePlayField v-else-if="game.firstWaiting.to === 'choose-side'" key="choose-side"
                                 :play="play" class="h-100 container-fluid" @side-selected="sideSelected"/>
            <CharmPlayField v-else-if="game.firstWaiting.to === 'charm'" key="charm"
                            :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
            <MeetEachOtherPlayField v-else-if="game.firstWaiting.to === 'meet-each-other'" key="meet-each-other" class="h-100 container-fluid"/>
            <ChooseModelPlayField v-else-if="game.firstWaiting.to === 'choose-model'" key="choose-model" :play="play" class="h-100 container-fluid"
                                  @player-selected="playerSelected"/>
            <BanVotingPlayField v-else-if="game.firstWaiting.to === 'ban-voting'" key="ban-voting" :play="play" class="h-100 container-fluid"
                                @player-selected="playerSelected"/>
            <div v-else key="unknown">
                ?
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
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
import ChooseSidePlayField from "@/components/Game/GameContent/GamePlayField/GamePlayFieldContent/ChooseSidePlayField";
import CharmPlayField from "@/components/Game/GameContent/GamePlayField/GamePlayFieldContent/CharmPlayField";
import MeetEachOtherPlayField
    from "@/components/Game/GameContent/GamePlayField/GamePlayFieldContent/MeetEachOtherPlayField";
import ChooseModelPlayField
    from "@/components/Game/GameContent/GamePlayField/GamePlayFieldContent/ChooseModelPlayField";
import BanVotingPlayField from "@/components/Game/GameContent/GamePlayField/GamePlayFieldContent/BanVotingPlayField";

export default {
    name: "GamePlayFieldContent",
    components: {
        BanVotingPlayField,
        ChooseModelPlayField,
        MeetEachOtherPlayField,
        CharmPlayField,
        ChooseSidePlayField,
        ShootPlayField, DelegatePlayField, SettleVotesPlayField, VotePlayField, MarkPlayField, ProtectPlayField, UsePotionPlayField,
        EatPlayField, LookPlayField, ElectSheriffPlayField,
    },
    props: {
        play: {
            type: Object,
            required: true,
        },
        pastEvents: {
            type: Object,
            required: true,
        },
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        playerVotes(vote) {
            this.$emit("player-votes", vote);
        },
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
        sideSelected(payload) {
            this.$emit("side-selected", payload);
        },
    },
};
</script>

<style scoped>

</style>