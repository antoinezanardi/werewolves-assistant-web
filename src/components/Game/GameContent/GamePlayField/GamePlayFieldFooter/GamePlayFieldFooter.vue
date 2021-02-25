<template>
    <div id="game-content-footer">
        <hr class="bg-dark my-1"/>
        <div class="row justify-content-center align-items-center">
            <div class="col-md-4 col-12 text-center order-md-0 mt-1 mt-md-0">
                <GamePlayFieldCountdownFooter v-if="game.isFirstWaitingTimedAction"/>
            </div>
            <div class="col-md-4 col-12 order-last order-md-1">
                <transition name="fade" mode="out-in">
                    <Loading v-if="loading.getHistory" key="loading" :icon-size="35"/>
                    <form v-else key="submit-form" @submit.prevent="submitPlay">
                        <SubmitButton id="play-submit-button" classes="btn btn-primary btn-block btn-lg mt-2 mt-md-0"
                                      :loading="loading.makeAPlay" :disabled="!canSubmitPlay">
                            <i class="fa fa-play-circle mr-2"/>
                            <span v-html="$t('GamePlayFieldFooter.next')"/>
                        </SubmitButton>
                    </form>
                </transition>
            </div>
            <div class="col-md-4 col order-md-2">
                <transition name="fade" mode="out-in">
                    <div v-if="game.isFirstWaitingVoteAction" id="vote-play-requirements" key="vote-play-requirements" class="text-center">
                        <VRoller :text="`${play.votes.length}/${game.alivePlayers.length}`" class="d-inline-flex mr-1"/>
                        <span v-html="$t('GamePlayFieldFooter.playersHaveVoted')"/>
                        <div class="text-muted font-italic d-flex justify-content-center align-items-center">
                            <i class="fa mr-2" :class="votePlayRequirementsIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.minOnePlayerHasToVote')"/>
                        </div>
                        <div v-if="game.isFirstWaitingForbiddenTieVoteAction"
                             class="text-muted font-italic d-flex justify-content-center align-items-center">
                            <i class="fa mr-2" :class="tieInVotesForbiddenIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.tieInVotesForbidden')"/>
                        </div>
                    </div>
                    <div v-else-if="game.isFirstWaitingTargetAction" id="target-play-requirements" key="target-play-requirements"
                         class="text-center">
                        <VRoller :text="`${play.targets.length}/${game.expectedTargetsLength}`" class="d-inline-flex mr-1"/>
                        <span v-html="$tc('GamePlayFieldFooter.playerTargeted', game.expectedTargetsLength)"/>
                        <div class="text-muted d-flex justify-content-center align-items-center">
                            <i class="fa mr-2" :class="targetPlayRequirementsIconClass"/>
                            <span class="small" v-html="targetPlayRequirementsText"/>
                        </div>
                    </div>
                    <div v-else-if="game.isFirstWaitingChooseSideAction" id="choose-side-play-requirements" key="choose-side-play-requirements">
                        <div class="text-muted font-italic d-flex justify-content-center align-items-center">
                            <i class="fa mr-2" :class="chooseSidePlayRequirementsIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.oneSideMustBeChosen')"/>
                        </div>
                    </div>
                    <div v-else-if="game.isFirstWaitingChooseCardAction && !game.isFirstWaitingSkippableAction"
                         id="choose-card-play-requirements" key="choose-card-play-requirements">
                        <div class="text-muted font-italic d-flex justify-content-center align-items-center">
                            <i class="fa mr-2" :class="chooseCardPlayRequirementsIconClass"/>
                            <span class="small" v-html="$t('GamePlayFieldFooter.oneCardMustBeChosen')"/>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";
import SubmitButton from "@/components/shared/Forms/SubmitButton";
import { getNominatedPlayers } from "@/helpers/functions/Player";
import GamePlayFieldCountdownFooter from "@/components/Game/GameContent/GamePlayField/GamePlayFieldFooter/GamePlayFieldCountdownFooter";
import Loading from "@/components/shared/Loading";
import sleepingTimeSVG from "@/assets/svg/game/sleeping-time.svg";
import Config from "../../../../../../config";

export default {
    name: "GamePlayFieldFooter",
    components: { Loading, GamePlayFieldCountdownFooter, SubmitButton },
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
    data() {
        return { loading: { makeAPlay: false } };
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
        isCardChosen() {
            return this.play.chosenCard;
        },
        chooseSidePlayRequirementsIconClass() {
            return this.isSideChosen ? "fa-check text-success" : "fa-times text-danger";
        },
        chooseCardPlayRequirementsIconClass() {
            return this.isCardChosen ? "fa-check text-success" : "fa-times text-danger";
        },
        canSubmitPlay() {
            return this.game.isFirstWaitingVoteAction && !!this.play.votes.length &&
                (!this.game.isFirstWaitingForbiddenTieVoteAction || !this.isThereTieInVotes) ||
                this.game.isFirstWaitingTargetAction && this.play.targets.length === this.game.expectedTargetsLength ||
                this.game.isFirstWaitingChooseSideAction && this.isSideChosen ||
                this.game.isFirstWaitingChooseCardAction && !this.game.isFirstWaitingSkippableAction && this.isCardChosen ||
                this.game.isFirstWaitingSkippableAction;
        },
    },
    methods: {
        ...mapActions("game", { setGame: "setGame" }),
        askIfVileFatherOfWolvesInfects() {
            return Swal.fire({
                title: this.$t("GamePlayFieldFooter.doesVileFatherOfWolvesInfect"),
                text: this.$t("GamePlayFieldFooter.ifVileFatherOfWolvesInfects"),
                imageUrl: `${Config.API.werewolvesAssistant.baseURL}/img/roles/vile-father-of-wolves.png`,
                imageWidth: 200,
                imageHeight: 200,
                customClass: { image: "swal2-role-image" },
                showCancelButton: true,
                confirmButtonText: this.$t("GamePlayFieldFooter.infect"),
                cancelButtonText: this.$t("GamePlayFieldFooter.dontInfect"),
                heightAuto: false,
            });
        },
        makeSourcePlayersGoToBed() {
            return Swal.fire({
                title: this.$t(`GamePlayFieldFooter.timeToBedForSource`, { source: this.$t(`Role.the.${this.game.firstWaiting.for}`) }),
                imageUrl: sleepingTimeSVG,
                imageWidth: 100,
                imageHeight: 100,
                showCancelButton: true,
                confirmButtonText: this.$t("GamePlayFieldFooter.everybodyIsAsleep"),
                cancelButtonText: this.$t("GamePlayFieldFooter.cancel"),
                heightAuto: false,
            });
        },
        askIfSignIsWellDefined() {
            return Swal.fire({
                title: this.$t("GamePlayFieldFooter.isSignWellDefined"),
                text: this.$t("GamePlayFieldFooter.payAttentionToSignForNextVotes"),
                imageUrl: `${Config.API.werewolvesAssistant.baseURL}/img/roles/stuttering-judge.png`,
                imageWidth: 200,
                imageHeight: 200,
                customClass: { image: "swal2-role-image" },
                showCancelButton: true,
                confirmButtonText: this.$t("GamePlayFieldFooter.signIsWellDefined"),
                cancelButtonText: this.$t("GamePlayFieldFooter.cancel"),
                heightAuto: false,
            });
        },
        async launchPreSubmitRequests() {
            let isSubmittingAllowed = true;
            const { firstWaiting, vileFatherOfWolvesPlayer, doesSourceGoToBed } = this.game;
            if (firstWaiting.to === "choose-sign") {
                const { isConfirmed } = await this.askIfSignIsWellDefined();
                isSubmittingAllowed = isConfirmed;
            }
            if (isSubmittingAllowed && doesSourceGoToBed) {
                const { isConfirmed } = await this.makeSourcePlayersGoToBed();
                isSubmittingAllowed = isConfirmed;
            }
            if (isSubmittingAllowed && firstWaiting.to === "eat" && !!vileFatherOfWolvesPlayer && vileFatherOfWolvesPlayer.isAlive &&
                !this.pastEvents.hasVileFatherOfWolvesInfected) {
                const { isConfirmed } = await this.askIfVileFatherOfWolvesInfects();
                if (isConfirmed) {
                    this.$emit("vile-father-of-wolves-infects");
                }
            }
            return isSubmittingAllowed;
        },
        async submitPlay() {
            try {
                this.loading.makeAPlay = true;
                const playData = { ...this.play, source: this.game.firstWaiting.for, action: this.game.firstWaiting.to };
                if (await this.launchPreSubmitRequests()) {
                    const { data } = await this.$werewolvesAssistantAPI.makeAPlay(this.game._id, playData);
                    await this.setGame(data);
                }
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading.makeAPlay = false;
            }
        },
    },
};
</script>

<style scoped>

</style>