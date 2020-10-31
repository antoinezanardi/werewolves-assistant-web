<template>
    <div class="input-available-characters" :class="classes">
        <VRoller class="d-inline" :text="valueLength.toString()"/>
        <span v-html="$t('InputAvailableCharacters.maxAvailableCharacters', { max: maxLength })"/>
    </div>
</template>

<script>
export default {
    name: "InputAvailableCharacters",
    props: {
        value: {
            type: String,
            required: true,
        },
        maxLength: {
            type: Number,
            required: true,
        },
        trim: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        valueLength() {
            if (this.value) {
                return this.trim ? this.value.trim().length : this.value.length;
            }
            return 0;
        },
        classes() {
            return this.valueLength === this.maxLength ? "text-danger" : "text-muted";
        },
    },
};
</script>

<style lang="scss" scoped>

    .input-available-characters {
        transition: all 0.5s ease;
    }
</style>