<template>
    <div id="game-content-footer">
        <hr class="bg-dark my-1"/>
        <div class="row justify-content-center align-items-center">
            <div class="col-lg-4 col-12 text-center order-lg-0">
                <VCountdown v-if="game.isTimedPlay" :time="game.maxTimeToPlay" @end="countdown.ended = true">
                    <template #default="{ minutes, seconds }">
                        <transition name="fade" mode="out-in">
                            <div v-if="!countdown.ended" id="countdown-running" key="countdown-running" class="countdown">
                                <i class="fa fa-stopwatch mr-2"/>
                                <span v-html="`${$t('GamePlayFieldFooter.timeForDebating')}:`"/>
                                <VRoller class="ml-2 d-inline-flex" :text="`${minutes}:${seconds.toString().padStart(2, '0')}`"/>
                            </div>
                            <div v-else id="countdown-ended" key="countdown-ended"
                                 class="animate__animated animate__pulse animate__infinite countdown">
                                <i class="fa fa-stopwatch mr-2 text-danger"/>
                                <span v-html="`${$t('GamePlayFieldFooter.debateIsOver')}`"/>
                            </div>
                        </transition>
                    </template>
                </VCountdown>
            </div>
            <div class="col-lg-4 col-12 order-last order-lg-1">
                <form @submit.prevent="submitPlay">
                    <SubmitButton id="play-submit-button" classes="btn btn-primary btn-block btn-lg"
                                  :loading="loading" :disabled="!canSubmitPlay">
                        <i class="fa fa-play-circle mr-2"/>
                        <span v-html="$t('GamePlayFieldFooter.next')"/>
                    </SubmitButton>
                </form>
            </div>
            <div class="col-lg-4 col order-lg-2">
                <transition name="fade" mode="out-in">
                    <div v-if="game.isVotePlay" id="vote-play-requirements" key="vote-play-requirements"
                         class="text-center">
                        <VRoller :text="`${play.votes.length}/${game.alivePlayers.length}`" class="d-inline-flex mr-1"/>
                        <span v-html="$t('GamePlayFieldFooter.playersHaveVoted')"/>
                        <div class="text-muted font-italic">
                            <i class="fa mr-2" :class="votePlayRequirementsIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.minOnePlayerHasToVote')"/>
                        </div>
                        <div v-if="game.isForbiddenTieVotePlay" class="text-muted font-italic">
                            <i class="fa mr-2" :class="tieInVotesForbiddenIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.tieInVotesForbidden')"/>
                        </div>
                    </div>
                    <div v-else-if="game.isTargetPlay" id="target-play-requirements" key="target-play-requirements"
                         class="text-center">
                        <VRoller :text="`${play.targets.length}/${game.expectedTargetsLength}`" class="d-inline-flex mr-1"/>
                        <span v-html="$tc('GamePlayFieldFooter.playerTargeted', game.expectedTargetsLength)"/>
                        <div class="text-muted font-italic">
                            <i class="fa mr-2" :class="targetPlayRequirementsIconClass"/>
                            <span class="small" v-html="targetPlayRequirementsText"/>
                        </div>
                    </div>
                    <div v-else-if="game.isChooseSidePlay" id="choose-side-play-requirements" key="choose-side-play-requirements">
                        <div class="text-muted font-italic">
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

export default {
    name: "GamePlayFieldFooter",
    components: { SubmitButton },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            loading: false,
            countdown: { ended: false },
        };
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
            return this.game.isVotePlay && !!this.play.votes.length && (!this.game.isForbiddenTieVotePlay || !this.isThereTieInVotes) ||
                this.game.isTargetPlay && this.play.targets.length === this.game.expectedTargetsLength ||
                this.game.isChooseSidePlay && this.isSideChosen || this.game.isSkippablePlay;
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