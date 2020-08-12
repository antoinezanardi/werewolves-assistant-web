<template>
    <div class="page-with-navbar d-flex flex-column justify-content-center align-items-center">
        <h1 class="text-center" v-html="$t('NotFound.looksLikeYouGotLost')"/>
        <h3 class="text-center" v-html="$t('NotFound.getOutBeforeWerewolvesCome')"/>
        <router-link to="/" class="btn btn-primary btn-lg mt-4">
            <i class="fa fa-running mr-2"/>
            <span v-html="$t('NotFound.flee')"/>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "NotFound",
};
</script>

<style scoped>

</style>