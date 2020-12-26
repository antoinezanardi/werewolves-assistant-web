<template>
    <div :class="roleTextClasses" v-html="roleText"/>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "RoleText",
    props: {
        role: {
            type: String,
            default: "",
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        roleText() {
            if (!this.role) {
                return this.$t("RoleText.chooseARole");
            }
            let prefix;
            const groups = ["all", "villagers", "werewolves", "lovers"];
            if (groups.includes(this.role) || this.role === "sheriff") {
                prefix = "the";
            } else {
                prefix = this.game.getPlayersWithRole(this.role).length === 1 ? "the" : "a";
            }
            return this.$t(`Role.${prefix}.${this.role}`);
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