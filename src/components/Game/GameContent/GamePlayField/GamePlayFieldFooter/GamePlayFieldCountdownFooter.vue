<template>
    <VCountdown :time="game.maxTimeToPlay" @end="countdown.ended = true">
        <template #default="{ minutes, seconds }">
            <transition name="fade" mode="out-in">
                <div v-if="!countdown.ended" id="countdown-running" key="countdown-running" class="countdown">
                    <i class="fa fa-stopwatch mr-2"/>
                    <span v-html="`${timeForActionText}:`"/>
                    <VRoller class="ml-2 d-inline-flex" :text="countdownText(minutes, seconds)"/>
                </div>
                <div v-else id="countdown-ended" key="countdown-ended"
                     class="animate__animated animate__pulse animate__infinite countdown">
                    <i class="fa fa-stopwatch mr-2 text-danger"/>
                    <span v-html="timeIsUpForActionText"/>
                </div>
            </transition>
        </template>
    </VCountdown>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "GamePlayFieldCountdownFooter",
    data() {
        return { countdown: { ended: false } };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        timeForActionText() {
            const { firstWaiting } = this.game;
            return this.$t(`GamePlayFieldCountdownFooter.timeFor.${firstWaiting.to}.${firstWaiting.for}`);
        },
        timeIsUpForActionText() {
            const { firstWaiting } = this.game;
            return this.$t(`GamePlayFieldCountdownFooter.timeIsUpFor.${firstWaiting.to}.${firstWaiting.for}`);
        },
    },
    methods: {
        countdownText(minutes, seconds) {
            return `${minutes}:${seconds.toString().padStart(2, "0")}`;
        },
    },
};
</script>

<style scoped>

</style>