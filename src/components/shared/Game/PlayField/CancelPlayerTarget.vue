<template>
    <transition mode="out-in" name="translate-down-fade">
        <span v-if="!!targetedPlayer" id="cancel-player-target" key="cancel-player-target"
              v-tooltip="$t('CancelPlayerTarget.cancelTarget')" class="badge-pill badge-dark" @click="cancelTarget">
            <span v-html="$t('CancelPlayerTarget.cancel')"/>
            <i class="fa fa-times-circle ml-2"/>
        </span>
    </transition>
</template>

<script>
import Player from "@/classes/Player";

export default {
    name: "CancelPlayerTarget",
    props: {
        attribute: {
            type: String,
            required: true,
        },
        targetedPlayer: {
            validator: value => value instanceof Player || value === null,
            required: true,
        },
    },
    methods: {
        cancelTarget() {
            if (this.targetedPlayer) {
                this.$emit("player-selected", { player: { _id: this.targetedPlayer._id }, selected: false, attribute: this.attribute });
            }
        },
    },
};
</script>

<style scoped>
    #cancel-player-target {
        padding: 5px 10px;
        font-size: 1rem;
        cursor: pointer;
        color: #989898;
    }
</style>