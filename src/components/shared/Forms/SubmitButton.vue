<template>
    <div id="btn-container" v-tooltip="tooltipOptions">
        <button ref="submitButton" :class="[classes, { disabled: loading || disabled }]"
                :disabled="loading || disabled" class="d-flex justify-content-center align-items-center"
                type="submit" @click="click">
            <transition mode="out-in" name="fade">
                <div v-if="!loading" key="text">
                    <slot/>
                </div>
                <HalfCircleSpinner v-else key="loading" :size="30" :animation-duration="1000"/>
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
            return { content: this.disabled ? this.disabledTooltipText : this.tooltipText };
        },
    },
    methods: {
        click(e) {
            if (!this.loading) {
                this.$emit("click", e);
            }
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