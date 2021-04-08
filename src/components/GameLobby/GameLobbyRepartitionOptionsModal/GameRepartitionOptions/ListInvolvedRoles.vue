<template>
    <div id="list-involved-roles">
        <a id="state-toggle" href="#" @click.prevent="toggleState">
            <i class="fa fa-chevron-down mr-2" :class="{ 'fa-rotate-180': isOpened }"/>
            <span v-html="stateText"/>
        </a>
        <div v-if="isOpened" class="row mt-2 justify-content-center">
            <div v-for="role of involvedRoles" :key="role.name" class="col-md-4 col-6 text-center mb-2">
                <RoleImage class="involved-role-image" :role="role.name"/>
                <RoleText :role="role.name" prefix="the" class="cursor-text"/>
                <div v-if="rolesType === 'recommended-min-players'" class="font-italic text-muted" v-html="recommendedMinPlayersText(role)"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";

export default {
    name: "ListInvolvedRoles",
    components: { RoleText, RoleImage },
    props: {
        rolesType: {
            type: String,
            required: true,
        },
    },
    data() {
        return { isOpened: false };
    },
    computed: {
        ...mapGetters("role", { roles: "roles" }),
        stateText() {
            return this.isOpened ? this.$t(`ListInvolvedRoles.${this.rolesType}.close`) : this.$t(`ListInvolvedRoles.${this.rolesType}.open`);
        },
        involvedRoles() {
            const involvedRoles = {
                "recommended-min-players": this.roles.filter(({ recommendedMinPlayers }) => recommendedMinPlayers),
                "powerful-werewolves": this.roles.filter(({ isInWerewolfSide, name }) => isInWerewolfSide && name !== "werewolf"),
                "powerful-villagers": this.roles.filter(({ isInVillagerSide, name }) => isInVillagerSide && name !== "villager"),
            };
            return involvedRoles[this.rolesType] ? involvedRoles[this.rolesType] : this.roles;
        },
    },
    methods: {
        toggleState() {
            this.isOpened = !this.isOpened;
        },
        recommendedMinPlayersText({ recommendedMinPlayers }) {
            return `(${this.$t("ListInvolvedRoles.recommendedMinPlayers", { recommendedMinPlayers })})`;
        },
    },
};
</script>

<style lang="scss" scoped>
    #state-toggle {
        transition: all 0.25s ease;

        i {
            transition: all 0.25s ease;
        }
    }

    .involved-role-image {
        width: 30px;
        height: 30px;
    }
</style>