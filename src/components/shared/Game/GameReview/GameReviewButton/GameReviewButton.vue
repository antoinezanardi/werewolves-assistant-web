<template>
    <button class="btn btn-outline-warning" @click="$emit('show-game-review-modal')">
        <i class="fa fa-star mr-2"/>
        <span v-html="$t('GameReviewButton.rateThisGame')"/>
    </button>
</template>

<script>
export default { name: "GameReviewButton" };
</script>

<style scoped>

</style>