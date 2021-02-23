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
                                      @player-votes="playerVotes" @player-selected="playerSelected" @side-selected="sideSelected"/>
                <GamePlayFieldFooter :play="play" @vile-father-of-wolves-infects="vileFatherOfWolvesInfects"/>
                <GamePlayFieldTutorial ref="gamePlayFieldTutorial"/>
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
                hasWitchUsedLDeathPotion: undefined,
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
        startTutorial() {
            this.$refs.gamePlayFieldTutorial.startTour();
        },
        vileFatherOfWolvesInfects() {
            this.$emit("vile-father-of-wolves-infects");
        },
        fillVileFatherOfWolvesInfectionUsage() {
            this.loadings.pastEvents = true;
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
        fillWitchPotionsUsage() {
            this.loadings.pastEvents = true;
        },
        fillLastGuardTarget() {
            this.loadings.pastEvents = true;
        },
        async getPastEvents() {
            const { firstWaiting, stutteringJudgePlayer, vileFatherOfWolves } = this.game;
            try {
                if (firstWaiting.to === "protect") {
                    await this.fillLastGuardTarget();
                } else if (firstWaiting.to === "use-potion") {
                    await this.fillWitchPotionsUsage();
                } else if (firstWaiting.to === "vote" && !!stutteringJudgePlayer) {
                    await this.fillStutteringJudgePastEvents();
                } else if (firstWaiting.to === "eat" && !!vileFatherOfWolves) {
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
        overflow-y: scroll;
        width: 100%;
        flex-grow: 1;
    }
</style>