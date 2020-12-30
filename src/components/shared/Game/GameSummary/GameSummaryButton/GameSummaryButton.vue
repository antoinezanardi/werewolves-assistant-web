<template>
    <button class="btn btn-outline-primary" @click="$emit('show-game-summary-modal')">
        <i class="fa fa-list mr-2"/>
        <span v-html="$t('GameSummaryButton.seeGameSummary')"/>
    </button>
</template>

<script>
export default { name: "GameSummaryButton" };
</script>

<style scoped>

</style>