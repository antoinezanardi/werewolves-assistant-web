<template>
    <div id="game-content-footer">
        <div class="row justify-content-center align-items-center">
            <div class="col-4"/>
            <div class="col-4">
                <form @submit.prevent="submitPlay">
                    <SubmitButton classes="btn btn-primary btn-block btn-lg" :loading="loading" :disabled="!canSubmitPlay"
                                  :text="`<i class='fa fa-play-circle mr-2'></i>${$t('GameContentFooter.next')}`"/>
                </form>
            </div>
            <div class="col-4">
                <transition name="fade" mode="out-in">
                    <div v-if="game.isVotePlay" class="text-center" key="vote-play-requirements">
                        <VRoller :defaultChar="votePlayRequirementsText" :text="votePlayRequirementsText"/>
                        <div class="text-muted font-italic">
                            <i class="fa mr-2" :class="votePlayRequirementsIconClass"/>
                            <span v-html="$t('GameContentFooter.minOnePlayerHasToVote')"/>
                        </div>
                    </div>
                    <div v-else-if="game.isOneTargetPlay" class="text-center" key="one-target-play-requirements">
                        <VRoller :defaultChar="oneTargetPlayRequirementsText" :text="oneTargetPlayRequirementsText"/>
                        <div class="text-muted font-italic">
                            <i class="fa mr-2" :class="oneTargetPlayRequirementsIconClass"/>
                            <span v-html="$t('GameContentFooter.minOnePlayerHasToBeTargeted')"/>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Game from "../../../../classes/Game";
import SubmitButton from "../../../shared/Forms/SubmitButton";

export default {
    name: "GameContentFooter",
    components: { SubmitButton },
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
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        votePlayRequirementsText() {
            return this.$t("GameContentFooter.playersHaveVoted", { votesCount: this.play.votes.length, playersCount: this.game.alivePlayers.length });
        },
        votePlayRequirementsIconClass() {
            return this.play.votes.length ? "fa-check text-success" : "fa-times text-danger";
        },
        oneTargetPlayRequirementsText() {
            return this.$t("GameContentFooter.playersTargeted", { targetsCount: this.play.targets.length, min: 1 });
        },
        oneTargetPlayRequirementsIconClass() {
            return this.play.targets.length === 1 ? "fa-check text-success" : "fa-times text-danger";
        },
        canSubmitPlay() {
            return this.game.isVotePlay && !!this.play.votes.length ||
                this.game.isOneTargetPlay && this.play.targets.length === 1 ||
                this.game.firstWaiting.to === "use-potion" || this.game.firstWaiting.to === "mark";
        },
    },
    methods: {
        async submitPlay() {
            try {
                this.loading = true;
                const playData = { ...this.play, source: this.game.firstWaiting.for, action: this.game.firstWaiting.to };
                const { data } = await this.$werewolvesAssistantAPI.makeAPlay(this.game._id, playData);
                this.$emit("updateGame", data);
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