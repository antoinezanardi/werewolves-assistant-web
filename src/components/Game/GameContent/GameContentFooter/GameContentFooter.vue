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
                <div v-if="game.isVotePlay" class="text-center">
                    <VRoller :defaultChar="$t('GameContentFooter.playersHaveVoted', { votesCount: play.votes.length, playersCount: game.alivePlayers.length })"
                             :text="$t('GameContentFooter.playersHaveVoted', { votesCount: play.votes.length, playersCount: game.alivePlayers.length })"/>
                    <div class="text-muted font-italic">
                        <i class="fa mr-2" :class="votesMinToStartIconClass"/>
                        <span v-html="$t('GameContentFooter.minOnePlayerHasToVote')"/>
                    </div>
                </div>
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
        votesMinToStartIconClass() {
            return this.play.votes.length ? "fa-check text-success" : "fa-times text-danger";
        },
        canSubmitPlay() {
            return this.game.isVotePlay && !!this.play.votes.length;
        },
    },
    methods: {
        async submitPlay() {
            try {
                this.loading = true;

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