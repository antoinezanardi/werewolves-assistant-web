<template>
    <transition mode="out-in" name="fadeIn">
        <i v-if="targetSelected" id="cancel-player-target" v-tooltip="$t('CancelPlayerTarget.cancelTarget')"
           class="fa fa-times-circle" @click="cancelTarget"/>
    </transition>
</template>

<script>
export default {
    name: "CancelPlayerTarget",
    props: {
        play: {
            type: Object,
            required: true,
        },
        attribute: {
            type: String,
            required: true,
        },
    },
    computed: {
        targetSelected() {
            return this.play.targets.find(target => target.attribute === this.attribute);
        },
    },
    methods: {
        cancelTarget() {
            if (this.targetSelected) {
                this.$emit("playerSelected", { player: { _id: this.targetSelected.player }, selected: false, attribute: this.attribute });
            }
        },
    },
};
</script>

<style scoped>
    #cancel-player-target {
        font-size: 1rem;
        cursor: pointer;
        color: #989898;
    }
</style>