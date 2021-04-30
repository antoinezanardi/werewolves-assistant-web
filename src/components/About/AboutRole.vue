<template>
    <div class="about-role card">
        <div :id="`role-heading-${role.name}`" class="role-heading card-header" @click.prevent="toggleCollapse">
            <button class="btn w-100 h-100 text-left text-white d-flex align-items-center" type="button" data-toggle="collapse"
                    :data-target="`#role-collapse-${role.name}`"
                    aria-expanded="true" :aria-controls="`role-collapse-${role.name}`">
                <span class="d-flex flex-grow-1 align-items-center">
                    <RoleImage :role="role.name"/>
                    <RoleText :role="role.name" prefix="the" class="font-weight-bold ml-2"/>
                </span>
                <i class="fa fa-chevron-down about-role-chevron" :class="{ 'fa-rotate-180': isCollapsed }"/>
            </button>
        </div>
        <div :id="`role-collapse-${role.name}`" class="collapse" :aria-labelledby="`role-heading-${role.name}`">
            <div class="card-body">
                <div class="row d-flex align-items-center">
                    <div class="col-md-2 col-4 d-flex flex-column align-items-center">
                        <RoleImage :role="role.name"/>
                        <RoleTypeBadge :role="role" class="mt-2"/>
                    </div>
                    <RoleText :role="role.name" prefix="the" class="col-md-2 col-8 text-center font-weight-bold cursor-text"/>
                    <div class="col-md-8 mt-md-0 col-12 mt-3">
                        <p v-for="paragraph of $t(`Role.description.${role.name}`)"
                           :key="paragraph" v-html="paragraph"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Role from "@/classes/Role";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleTypeBadge from "@/components/shared/Game/Role/RoleTypeBadge";
import RoleText from "@/components/shared/Game/Role/RoleText";

export default {
    name: "AboutRole",
    components: { RoleText, RoleTypeBadge, RoleImage },
    props: {
        role: {
            type: Role,
            required: true,
        },
    },
    data() {
        return { isCollapsed: false };
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../assets/scss/variables";

    .role-heading {
        padding: 0;
        button {
            @include font-size(1.25rem);

            .about-role-chevron {
                transition: all ease 0.25s;
            }
        }
        img {
            width: 40px;
            height: 40px;
        }
    }
</style>