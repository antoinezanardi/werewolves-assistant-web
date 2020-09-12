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
            const roleText = {
                back: "",
                guard: this.$t("Role.the.guard"),
                hunter: this.$t("Role.the.hunter"),
                raven: this.$t("Role.the.raven"),
                seer: this.$t("Role.the.seer"),
                villager: this.$t("Role.the.villager"),
                werewolf: this.$t("Role.the.werewolf"),
                werewolves: this.$t("Role.the.werewolves"),
                witch: this.$t("Role.the.witch"),
                sheriff: this.$t("Role.the.sheriff"),
                all: this.$t("Role.the.all"),
            };
            return this.role && roleText[this.role] ? roleText[this.role] : this.$t("RoleText.chooseARole");
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