<template>
    <div id="game-event-monitor" class="d-flex flex-column h-100">
        <div id="game-event-monitor-content" class="d-flex flex-grow-1">
            <transition mode="out-in" name="fade">
                <GameEvent v-if="currentEvent" :key="currentEvent._id" :event="currentEvent" @skip-event="skipEvent"/>
            </transition>
        </div>
        <div id="game-event-monitor-footer" class="row justify-content-center">
            <div class="col-12 text-right">
                <button v-tooltip="$t('GameEventMonitor.skipToNextEvent')" class="btn btn-secondary" @click="skipEvent">
                    <i class="fa fa-forward mr-2"/>
                    <span v-html="$t('GameEventMonitor.skip')"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import GameEvent from "./GameEvent/GameEvent";

export default {
    name: "GameEventMonitor",
    components: { GameEvent },
    props: {
        events: {
            type: Array,
            required: true,
        },
    },
    computed: {
        currentEvent() {
            return this.events.length ? this.events[0] : null;
        },
    },
    methods: {
        skipEvent() {
            if (this.currentEvent) {
                this.$emit("skip-event", { _id: this.currentEvent._id });
            }
        },
    },
};
</script>

<style scoped>

</style>