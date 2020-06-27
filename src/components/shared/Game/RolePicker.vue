<template>
    <div id="role-picker" class="container-fluid">
        <div class="row role-thumbnail-row">
            <div class="col d-flex role-thumbnail justify-content-center align-items-center flex-wrap">
                <div class="role-img-container" v-for="role in roles" :key="role.name"
                     @click="$emit('rolePicked', role)" @mouseover="hoverOn = role.name"
                     @mouseleave="hoverOn = undefined">
                    <img class="img-fluid" :src="getThumbnail(role.name)" alt="Role thumbnail">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div v-html="roleText"/>
            </div>
        </div>
    </div>
</template>

<script>
import back from "../../../assets/img/roles/back.png";
import guard from "../../../assets/img/roles/guard.png";
import hunter from "../../../assets/img/roles/hunter.png";
import raven from "../../../assets/img/roles/raven.png";
import seer from "../../../assets/img/roles/seer.png";
import villager from "../../../assets/img/roles/villager.png";
import werewolf from "../../../assets/img/roles/werewolf.png";
import witch from "../../../assets/img/roles/witch.png";

export default {
    name: "RolePicker",
    data() {
        return {
            roles: [
                { name: "villager", group: "villagers", maxInGame: 99 },
                { name: "werewolf", group: "werewolves", maxInGame: 99 },
                { name: "hunter", group: "villagers", maxInGame: 1 },
                { name: "seer", group: "villagers", maxInGame: 1 },
                { name: "witch", group: "villagers", maxInGame: 1 },
                { name: "guard", group: "villagers", maxInGame: 1 },
                { name: "raven", group: "villagers", maxInGame: 1 },
            ],
            hoverOn: undefined,
            IMGs: { back, guard, hunter, raven, seer, villager, werewolf, witch },
        };
    },
    computed: {
        roleText() {
            return this.hoverOn ? this.$t(`Role.${this.hoverOn}`) : `<i class="fa fa-chevron-up animated mr-2"></i>${this.$t("RolePicker.chooseRole")}`;
        },
    },
    methods: {
        getThumbnail(role) {
            return this.IMGs[role];
        },
    },
};
</script>

<style scoped lang="scss">

    .role-thumbnail-row {
        overflow-y: auto;
    }

    .role-thumbnail {
        height: 150px;
    }

    .role-img-container {
        border: 3px solid grey;
        border-radius: 5px;
        margin: 3px;
        width: 50px;
        height: 50px;
        transition: all 0.25s ease;
        cursor: pointer;

        &:hover {
            border-color: #cacaca;
        }
    }
</style>