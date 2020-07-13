<template>
    <div id="loading" class="d-flex justify-content-center align-items-center">
        <HalfCircleSpinner id="icon" :animation-duration="1000" :size="iconSize"/>
        <span v-if='text' :style="{ fontSize: `${this.fontSize}px` }" v-html="text"/>
    </div>
</template>

<script>
import HalfCircleSpinner from "epic-spinners/src/components/lib/HalfCircleSpinner";

export default {
    name: "Loading",
    components: {HalfCircleSpinner},
    props: {
        text: {
            type: String,
        },
        iconSize: {
            type: Number,
            default: 50,
        },
        fontSize: {
            type: Number,
            default: 24,
        },
    },
};
</script>

<style scoped>
    #icon {
        margin: 5px;
    }
</style>