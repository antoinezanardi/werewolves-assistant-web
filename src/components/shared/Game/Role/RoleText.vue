<template>
    <div :class="roleTextClasses" v-html="roleText"/>
</template>

<script>
export default {
    name: "RoleText",
    props: {
        role: {
            type: String,
            default: "",
        },
    },
    computed: {
        roleText() {
            return !this.role ? this.$t("RoleText.chooseARole") : this.$t(`Role.the.${this.role}`);
        },
        roleTextClasses() {
            if (this.role) {
                return "text-capitalize cursor-pointer";
            }
            return "text-capitalize cursor-pointer font-weight-bolder animate__animated animate__slow animate__heartBeat";
        },
    },
};
</script>

<style scoped>

</style>