<template>
    <div id="game-content-play-field">
        <ElectSheriffPlayField v-if="currentAction === 'elect-sheriff'" :play="play" class="h-100 container-fluid" @player-votes="playerVotes"/>
        <LookPlayField v-else-if="currentAction === 'look'" :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
        <EatPlayField v-else-if="currentAction === 'eat'" :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
        <UsePotionPlayField v-else-if="currentAction === 'use-potion'" :play="play" :past-events="pastEvents" class="h-100 container-fluid"
                            @player-selected="playerSelected"/>
        <ProtectPlayField v-else-if="currentAction === 'protect'" :play="play" class="h-100 container-fluid" :past-events="pastEvents"
                          @player-selected="playerSelected"/>
        <MarkPlayField v-else-if="currentAction === 'mark'" :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
        <VotePlayField v-else-if="currentAction === 'vote'" :play="play" :past-events="pastEvents" class="h-100 container-fluid"
                       @player-votes="playerVotes"/>
        <SettleVotesPlayField v-else-if="currentAction === 'settle-votes'" :play="play" class="h-100 container-fluid"
                              @player-selected="playerSelected"/>
        <DelegatePlayField v-else-if="currentAction === 'delegate'" :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
        <ShootPlayField v-else-if="currentAction === 'shoot'" :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
        <ChooseSidePlayField v-else-if="currentAction === 'choose-side'" :play="play" class="h-100 container-fluid" @side-selected="sideSelected"/>
        <CharmPlayField v-else-if="currentAction === 'charm'" :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
        <MeetEachOtherPlayField v-else-if="currentAction === 'meet-each-other'" key="meet-each-other" class="h-100 container-fluid"/>
        <ChooseModelPlayField v-else-if="currentAction === 'choose-model'" :play="play" class="h-100 container-fluid"
                              @player-selected="playerSelected"/>
        <BanVotingPlayField v-else-if="currentAction === 'ban-voting'" :play="play" class="h-100 container-fluid" @player-selected="playerSelected"/>
        <ChooseCardPlayField v-else-if="currentAction === 'choose-card'" :play="play" class="h-100 container-fluid" @card-selected="cardSelected"/>
        <ChooseSignPlayField v-else-if="currentAction === 'choose-sign'" :play="play" class="h-100 container-fluid"/>
        <div v-else key="unknown">
            ?
        </div>
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
import ChooseCardPlayField from "@/components/Game/GameContent/GamePlayField/GamePlayFieldContent/ChooseCardPlayField";
import ChooseSignPlayField from "@/components/Game/GameContent/GamePlayField/GamePlayFieldContent/ChooseSignPlayField";

export default {
    name: "GamePlayFieldContent",
    components: {
        ChooseSignPlayField,
        ChooseCardPlayField,
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
    computed: {
        ...mapGetters("game", { game: "game" }),
        currentAction() {
            return this.game.firstWaiting.to;
        },
    },
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
        cardSelected(payload) {
            this.$emit("card-selected", payload);
        },
    },
};
</script>

<style scoped>

</style>