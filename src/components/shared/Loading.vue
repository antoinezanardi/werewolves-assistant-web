<template>
    <div id="loading" class="d-flex justify-content-center align-items-center text-center">
        <HalfCircleSpinner id="loading-icon" :animation-duration="1000" :size="iconSize"/>
        <span id="loading-text" v-if="text" v-html="text"/>
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
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../assets/scss/variables";

    #loading-icon {
        margin: 5px;
    }

    #loading-text {
        margin-left: 5px;
        @include font-size(1.5rem);
    }

</style>