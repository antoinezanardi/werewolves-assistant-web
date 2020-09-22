<template>
    <button id="what-to-do-button" v-tooltip="$t('WhatToDoButton.whatAmISupposedToDo')" class="btn btn-primary">
        <i class="fa fa-question-circle"/>
    </button>
</template>

<script>
export default { name: "WhatToDoButton" };
</script>

<style scoped>

    #what-to-do-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.25rem 0.25rem;
        border-radius: 20px;
    }
</style>