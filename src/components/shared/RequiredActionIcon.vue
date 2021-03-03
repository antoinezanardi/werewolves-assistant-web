<template>
    <i v-tooltip="$t('RequiredActionIcon.actionIsRequired')"
       class="fa fa-exclamation-circle animate__animated animate__heartBeat animate__infinite"
       :class="`text-${color}`"/>
</template>

<script>
export default {
    name: "RequiredActionIcon",
    props: {
        color: {
            type: String,
            default: "danger",
        },
    },
};
</script>

<style scoped>

</style>