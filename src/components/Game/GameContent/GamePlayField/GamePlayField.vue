<template>
    <div id="game-play-field" class="h-100">
        <transition mode="out-in" name="fade">
            <div v-if="loadings.pastEvents" key="loading-past-events" class="d-flex justify-content-center align-items-center h-100">
                <Loading/>
            </div>
            <div v-else-if="cantGetPastEvents" key="cant-load-past-events" class="d-flex justify-content-center align-items-center flex-column h-100">
                <h3 class="text-muted font-italic text-center">
                    <i class="fa fa-ban mr-2"/>
                    <span v-html="$t('GamePlayField.cantLoadGame')"/>
                </h3>
                <button class="btn btn-primary" @click="getPastEvents">
                    <i class="fa fa-sync mr-2"/>
                    <span v-html="$t('GamePlayField.retry')"/>
                </button>
            </div>
            <div v-else key="game-play-field" class="h-100 d-flex flex-column">
                <GamePlayFieldHeader @start-tutorial="startTutorial"/>
                <GamePlayFieldContent id="game-content-play-field" :play="play" :past-events="pastEvents" class="visible-scrollbar pt-2"
                                      @player-votes="playerVotes" @player-selected="playerSelected" @side-selected="sideSelected"
                                      @card-selected="cardSelected" @stuttering-judge-requests-another-vote="stutteringJudgeRequestsAnotherVote"/>
                <GamePlayFieldFooter :play="play" :past-events="pastEvents" @vile-father-of-wolves-infects="vileFatherOfWolvesInfects"/>
                <GamePlayFieldTutorial ref="gamePlayFieldTutorial" :past-events="pastEvents"/>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import GamePlayFieldHeader from "./GamePlayFieldHeader/GamePlayFieldHeader";
import GamePlayFieldFooter from "./GamePlayFieldFooter/GamePlayFieldFooter";
import GamePlayFieldContent from "./GamePlayFieldContent/GamePlayFieldContent";
import GamePlayFieldTutorial from "@/components/Game/GameContent/GamePlayField/GamePlayFieldTutorial/GamePlayFieldTutorial";
import Loading from "@/components/shared/Loading";
import GameHistory from "@/classes/GameHistory";

export default {
    name: "GamePlayField",
    components: { Loading, GamePlayFieldTutorial, GamePlayFieldContent, GamePlayFieldFooter, GamePlayFieldHeader },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            loadings: { pastEvents: false },
            pastEvents: {
                lastGuardTarget: undefined,
                hasWitchUsedLifePotion: undefined,
                hasWitchUsedDeathPotion: undefined,
                hasStutteringJudgeChosenSign: undefined,
                hasStutteringJudgeRequestedVote: undefined,
                hasVileFatherOfWolvesInfected: undefined,
            },
            cantGetPastEvents: false,
        };
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    async created() {
        await this.getPastEvents();
    },
    methods: {
        playerVotes(vote) {
            this.$emit("player-votes", vote);
        },
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
        sideSelected(side) {
            this.$emit("side-selected", side);
        },
        cardSelected(card) {
            this.$emit("card-selected", card);
        },
        startTutorial() {
            this.$refs.gamePlayFieldTutorial.startTour();
        },
        vileFatherOfWolvesInfects() {
            this.$emit("vile-father-of-wolves-infects");
        },
        stutteringJudgeRequestsAnotherVote(payload) {
            this.$emit("stuttering-judge-requests-another-vote", payload);
        },
        async fillVileFatherOfWolvesInfectionUsage() {
            this.loadings.pastEvents = true;
            const eatQueryStrings = { "play-source": "werewolves", "play-action": "eat" };
            const { data } = await this.$werewolvesAssistantAPI.getGameHistory(this.game._id, eatQueryStrings);
            const eatPlays = data.map(gameHistoryEntry => new GameHistory(gameHistoryEntry));
            this.pastEvents.hasVileFatherOfWolvesInfected = !!eatPlays.find(play => play.didVileFatherOfWolvesInfectTarget);
        },
        async fillStutteringJudgePastEvents() {
            this.loadings.pastEvents = true;
            const chooseSignQueryStrings = { "play-source": "stuttering-judge", "play-action": "choose-sign" };
            const { data: chooseSignPlays } = await this.$werewolvesAssistantAPI.getGameHistory(this.game._id, chooseSignQueryStrings);
            this.pastEvents.hasStutteringJudgeChosenSign = !!chooseSignPlays.length;
            const voteQueryStrings = { "play-source": "all", "play-action": "vote" };
            const { data } = await this.$werewolvesAssistantAPI.getGameHistory(this.game._id, voteQueryStrings);
            const votePlays = data.map(gameHistoryEntry => new GameHistory(gameHistoryEntry));
            this.pastEvents.hasStutteringJudgeRequestedVote = !!votePlays.find(votePlay => votePlay.hasStutteringJudgeRequestedVote);
        },
        async fillWitchPotionsUsage() {
            this.loadings.pastEvents = true;
            const usePotionsQueryStrings = { "play-source": "witch", "play-action": "use-potion" };
            const { data } = await this.$werewolvesAssistantAPI.getGameHistory(this.game._id, usePotionsQueryStrings);
            const usePotionPlays = data.map(gameHistoryEntry => new GameHistory(gameHistoryEntry));
            this.pastEvents.hasWitchUsedLifePotion = !!usePotionPlays.find(({ didWitchUsedLifePotion }) => didWitchUsedLifePotion);
            this.pastEvents.hasWitchUsedDeathPotion = !!usePotionPlays.find(({ didWitchUsedDeathPotion }) => didWitchUsedDeathPotion);
        },
        async fillLastGuardTarget() {
            this.loadings.pastEvents = true;
            const protectQueryStrings = { "play-source": "guard", "play-action": "protect" };
            const { data } = await this.$werewolvesAssistantAPI.getGameHistory(this.game._id, protectQueryStrings);
            if (data.length) {
                const lastProtectPlay = new GameHistory(data[data.length - 1]);
                this.pastEvents.lastGuardTarget = lastProtectPlay.play.targets[0].player;
            }
        },
        async getPastEvents() {
            const { firstWaiting, stutteringJudgePlayer, vileFatherOfWolvesPlayer } = this.game;
            try {
                if (!this.game.options.roles.guard.canProtectTwice && firstWaiting.to === "protect") {
                    await this.fillLastGuardTarget();
                } else if (firstWaiting.to === "use-potion") {
                    await this.fillWitchPotionsUsage();
                } else if (firstWaiting.to === "vote" && !!stutteringJudgePlayer && stutteringJudgePlayer.isAliveAndPowerful) {
                    await this.fillStutteringJudgePastEvents();
                } else if (firstWaiting.to === "eat" && firstWaiting.for === "werewolves" && !!vileFatherOfWolvesPlayer &&
                    vileFatherOfWolvesPlayer.isAlive) {
                    await this.fillVileFatherOfWolvesInfectionUsage();
                }
                this.cantGetPastEvents = false;
            } catch (err) {
                this.cantGetPastEvents = true;
                this.$error.display(err);
            } finally {
                this.loadings.pastEvents = false;
            }
        },
    },
};
</script>

<style scoped lang="scss">
    #game-content-play-field {
        overflow-y: auto;
        width: 100%;
        flex-grow: 1;
    }
</style>