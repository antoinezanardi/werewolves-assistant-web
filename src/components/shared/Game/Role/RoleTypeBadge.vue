<template>
    <span v-tooltip="roleTypeTooltip" class="badge badge-pill role-badge cursor-pointer" :class="roleTypeClasses" v-html="roleTypeText"/>
</template>

<script>
import Role from "@/classes/Role";

export default {
    name: "RoleTypeBadge",
    props: {
        role: {
            type: Role,
            required: true,
        },
    },
    data() {
        return {
            classes: {
                villager: "badge-success",
                werewolf: "badge-danger",
                ambiguous: "badge-warning",
                lonely: "badge-info",
            },
        };
    },
    computed: {
        roleTypeText() {
            return this.$t(`RoleTypeBadge.type.${this.role.type}.title`);
        },
        roleTypeTooltip() {
            return this.$t(`RoleTypeBadge.type.${this.role.type}.description`);
        },
        roleTypeClasses() {
            return this.classes[this.role.type] ? this.classes[this.role.type] : undefined;
        },
    },
};
</script>

<style scoped>

</style>