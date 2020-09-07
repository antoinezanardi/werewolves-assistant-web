<template>
    <div id="game-content-footer">
        <hr class="bg-dark my-1"/>
        <div class="row justify-content-center align-items-center">
            <div class="col-lg-4 col-12 text-center order-lg-0">
                <VCountdown v-if="game.isTimedPlay" :time="5 * 60 * 1000" @end="countdown.ended = true">
                    <template slot-scope="{ minutes, seconds }">
                        <transition name="fade" mode="out-in">
                            <div v-if="!countdown.ended" id="countdown-running" key="countdown-running" class="countdown">
                                <i class="fa fa-stopwatch mr-2"/>
                                <span v-html="`${$t('GamePlayFieldFooter.timeForDebating')}:`"/>
                                <span class="ml-2" v-html="`${minutes}:${seconds.toString().padStart(2, '0')}`"/>
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
                                  :loading="loading" :disabled="!canSubmitPlay"
                                  :text="`<i class='fa fa-play-circle mr-2'></i>${$t('GamePlayFieldFooter.next')}`"/>
                </form>
            </div>
            <div class="col-lg-4 col order-lg-2">
                <transition name="fade" mode="out-in">
                    <div v-if="game.isVotePlay" id="vote-play-requirements" key="vote-play-requirements"
                         class="text-center">
                        <VRoller :default-char="votePlayRequirementsText" :text="votePlayRequirementsText"/>
                        <div class="text-muted font-italic">
                            <i class="fa mr-2" :class="votePlayRequirementsIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.minOnePlayerHasToVote')"/>
                        </div>
                        <div v-if="game.isForbiddenTieVotePlay" class="text-muted font-italic">
                            <i class="fa mr-2" :class="tieInVotesForbiddenIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.tieInVotesForbidden')"/>
                        </div>
                    </div>
                    <div v-else-if="game.isOneTargetPlay" id="one-target-play-requirements" key="one-target-play-requirements"
                         class="text-center">
                        <VRoller :default-char="oneTargetPlayRequirementsText" :text="oneTargetPlayRequirementsText"/>
                        <div class="text-muted font-italic">
                            <i class="fa mr-2" :class="oneTargetPlayRequirementsIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.minOnePlayerHasToBeTargeted')"/>
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
            countdown: {
                ended: false,
            },
        };
    },
    computed: {
        ...mapGetters("game", {
            game: "game",
        }),
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
        votePlayRequirementsText() {
            return this.$t("GamePlayFieldFooter.playersHaveVoted", {
                votesCount: this.play.votes.length,
                playersCount: this.game.alivePlayers.length,
            });
        },
        votePlayRequirementsIconClass() {
            return this.play.votes.length ? "fa-check text-success" : "fa-times text-danger";
        },
        oneTargetPlayRequirementsText() {
            return this.$t("GamePlayFieldFooter.playersTargeted", { targetsCount: this.play.targets.length, min: 1 });
        },
        oneTargetPlayRequirementsIconClass() {
            return this.play.targets.length === 1 ? "fa-check text-success" : "fa-times text-danger";
        },
        canSubmitPlay() {
            return this.game.isVotePlay && !!this.play.votes.length && (!this.game.isForbiddenTieVotePlay || !this.isThereTieInVotes) ||
                this.game.isOneTargetPlay && this.play.targets.length === 1 ||
                this.game.firstWaiting.to === "use-potion" || this.game.firstWaiting.to === "mark";
        },
    },
    methods: {
        ...mapActions("game", {
            setGame: "setGame",
        }),
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