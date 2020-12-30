<template>
    <div id="game-content-footer">
        <hr class="bg-dark my-1"/>
        <div class="row justify-content-center align-items-center">
            <div class="col-md-4 col-12 text-center order-md-0 mb-1 mb-md-0">
                <GamePlayFieldCountdownFooter v-if="game.isFirstWaitingTimedAction"/>
            </div>
            <div class="col-md-4 col-12 order-last order-md-1">
                <form @submit.prevent="submitPlay">
                    <SubmitButton id="play-submit-button" classes="btn btn-primary btn-block btn-lg"
                                  :loading="loading" :disabled="!canSubmitPlay">
                        <i class="fa fa-play-circle mr-2"/>
                        <span v-html="$t('GamePlayFieldFooter.next')"/>
                    </SubmitButton>
                </form>
            </div>
            <div class="col-md-4 col order-md-2">
                <transition name="fade" mode="out-in">
                    <div v-if="game.isFirstWaitingVoteAction" id="vote-play-requirements" key="vote-play-requirements" class="text-center">
                        <VRoller :text="`${play.votes.length}/${game.alivePlayers.length}`" class="d-inline-flex mr-1"/>
                        <span v-html="$t('GamePlayFieldFooter.playersHaveVoted')"/>
                        <div class="text-muted font-italic">
                            <i class="fa mr-2" :class="votePlayRequirementsIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.minOnePlayerHasToVote')"/>
                        </div>
                        <div v-if="game.isFirstWaitingForbiddenTieVoteAction" class="text-muted font-italic text-center">
                            <i class="fa mr-2" :class="tieInVotesForbiddenIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.tieInVotesForbidden')"/>
                        </div>
                    </div>
                    <div v-else-if="game.isFirstWaitingTargetAction" id="target-play-requirements" key="target-play-requirements"
                         class="text-center">
                        <VRoller :text="`${play.targets.length}/${game.expectedTargetsLength}`" class="d-inline-flex mr-1"/>
                        <span v-html="$tc('GamePlayFieldFooter.playerTargeted', game.expectedTargetsLength)"/>
                        <div class="text-muted font-italic">
                            <i class="fa mr-2" :class="targetPlayRequirementsIconClass"/>
                            <span class="small" v-html="targetPlayRequirementsText"/>
                        </div>
                    </div>
                    <div v-else-if="game.isFirstWaitingChooseSideAction" id="choose-side-play-requirements" key="choose-side-play-requirements">
                        <div class="text-muted font-italic text-center">
                            <i class="fa mr-2" :class="chooseSidePlayRequirementsIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.oneSideMustBeChosen')"/>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SubmitButton from "@/components/shared/Forms/SubmitButton";
import { getNominatedPlayers } from "@/helpers/functions/Player";
import GamePlayFieldCountdownFooter from "@/components/Game/GameContent/GamePlayField/GamePlayFieldFooter/GamePlayFieldCountdownFooter";

export default {
    name: "GamePlayFieldFooter",
    components: { GamePlayFieldCountdownFooter, SubmitButton },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    data() {
        return { loading: false };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        isThereTieInVotes() {
            if (!this.play.votes.length) {
                return undefined;
            }
            const nominatedPlayers = getNominatedPlayers(this.play.votes, this.game, this.game.firstWaiting.to);
            return nominatedPlayers.length > 1;
        },
        tieInVotesForbiddenIconClass() {
            return this.isThereTieInVotes ? "fa-times text-danger" : "fa-check text-success";
        },
        votePlayRequirementsIconClass() {
            return this.play.votes.length ? "fa-check text-success" : "fa-times text-danger";
        },
        targetPlayRequirementsIconClass() {
            return this.play.targets.length === this.game.expectedTargetsLength ? "fa-check text-success" : "fa-times text-danger";
        },
        targetPlayRequirementsText() {
            const expectedTargetsLength = this.game.expectedTargetsLength;
            return this.$tc("GamePlayFieldFooter.minPlayerHasToBeTargeted", expectedTargetsLength, { min: expectedTargetsLength });
        },
        isSideChosen() {
            return this.play.side;
        },
        chooseSidePlayRequirementsIconClass() {
            return this.isSideChosen ? "fa-check text-success" : "fa-times text-danger";
        },
        canSubmitPlay() {
            return this.game.isFirstWaitingVoteAction && !!this.play.votes.length &&
                (!this.game.isFirstWaitingForbiddenTieVoteAction || !this.isThereTieInVotes) ||
                this.game.isFirstWaitingTargetAction && this.play.targets.length === this.game.expectedTargetsLength ||
                this.game.isFirstWaitingChooseSideAction && this.isSideChosen || this.game.isFirstWaitingSkippableAction;
        },
    },
    methods: {
        ...mapActions("game", { setGame: "setGame" }),
        async submitPlay() {
            try {
                this.loading = true;
                const playData = { ...this.play, source: this.game.firstWaiting.for, action: this.game.firstWaiting.to };
                const { data } = await this.$werewolvesAssistantAPI.makeAPlay(this.game._id, playData);
                await this.setGame(data);
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>

</style>