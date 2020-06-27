<template>
    <div id="btn-container" v-tooltip="tooltipOptions">
        <button ref="submitButton" :class="[ classes, { disabled: loading || disabled } ]" @click="click"
                :disabled="loading || disabled" type="submit">
            <transition mode="out-in" name="fade">
                <span v-if="!loading" key="text" v-html="text"/>
                <HalfCircleSpinner v-else key="loading" :size="24" :animation-duration="1000"/>
            </transition>
        </button>
    </div>
</template>

<script>
import HalfCircleSpinner from "epic-spinners/src/components/lib/HalfCircleSpinner";

export default {
    name: "SubmitButton",
    components: { HalfCircleSpinner },
    props: {
        classes: {
            type: String,
            default: "",
        },
        loading: {
            type: Boolean,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        disabledTooltipText: {
            type: String,
            default: null,
        },
        tooltipText: {
            type: String,
            default: null,
        },
    },
    computed: {
        tooltipOptions() {
            return {
                content: this.disabled ? this.disabledTooltipText : this.tooltipText,
            };
        },
    },
    methods: {
        click(e) {
            this.$emit("click", e);
        },
    },
};
</script>

<style lang="scss" scoped>
    #btn-container {
        button {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .disabled {
        cursor: default !important;
        pointer-events: none;
    }
</style>