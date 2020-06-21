<template>
    <span id="btn-container" v-tooltip="tooltipOptions">
        <button ref="button" :class="[ classes, { disabled: loading || disabled } ]" @click="click"
                :disabled="loading || disabled" type="submit">
            <span v-html="text" v-if="!loading"></span>
            <HalfCircleSpinner :size="20" v-else :animation-duration="1000"/>
        </button>
    </span>
</template>

<script>
import HalfCircleSpinner from "epic-spinners/src/components/lib/HalfCircleSpinner";

export default {
    name: "SubmitBtn",
    components: {HalfCircleSpinner},
    data() {
        return {
            width: "",
            mounted: false,
        };
    },
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
    mounted() {
        this.mounted = true;
    },
    methods: {
        click(e) {
            this.$emit("click", e);
        },
    },
    computed: {
        tooltipOptions() {
            return {
                container: "body",
                content: this.disabled ? this.disabledTooltipText : this.tooltipText,
            };
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