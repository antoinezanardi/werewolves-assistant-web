<template>
    <div id="game-repartition-options">
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage class="option-section-image mr-2"/>
                <div v-html="$t('GameRepartitionOptions.roles')"/>
            </div>
        </div>
        <hr class="bg-dark mt-1 mb-2"/>
        <div class="row align-items-center">
            <div class="col-6">
                <label for="forbidden-roles" class="option-label"
                       v-html="$t('GameRepartitionOptions.forbiddenRoles.label')"/>
            </div>
            <div class="col-6 text-center">
                <VSelect id="forbidden-roles" :options="forbiddenRoles" :placeholder="$t('GameRepartitionOptions.chooseRoles')" label="name"
                         :filter="filterByRoleName" multiple @input="forbidRoles">
                    <template #selected-option="{ name }">
                        <RoleImage :role="name" class="role-image-option"/>
                    </template>
                    <template #option="{ displayedName, name }" class="d-flex flex-row">
                        <RoleImage :role="name" class="role-image-option mr-2"/>
                        <span class="text-capitalize" v-html="displayedName"/>
                    </template>
                    <template #no-options>
                        <i class="fa fa-ban mr-2"/>
                        <span v-html="$t('VSelect.noOption')"/>
                    </template>
                </VSelect>
            </div>
            <div class="col-12 text-muted font-italic" v-html="forbiddenRolesText"/>
        </div>
        <hr class="bg-dark mt-1 mb-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="are-recommended-min-player-respected" class="option-label"
                       v-html="$t('GameRepartitionOptions.areRecommendedMinPlayersRespected.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="are-recommended-min-player-respected" v-model="areRecommendedMinPlayersRespected"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
            <div class="col-12 text-muted font-italic" v-html="areRecommendedMinPlayersRespectedText"/>
            <div class="col-12">
                <ListInvolvedRoles roles-type="recommended-min-players"/>
            </div>
        </div>
        <hr class="bg-dark mt-2 mb-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="werewolf" class="option-section-image mr-2"/>
                <div v-html="$t('GameRepartitionOptions.werewolvesRoles')"/>
            </div>
        </div>
        <hr class="bg-dark mt-1 mb-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="are-powerful-werewolf-roles-prioritized-option" class="option-label"
                       v-html="$t('GameRepartitionOptions.arePowerfulWerewolfRolesPrioritized.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="are-powerful-werewolf-roles-prioritized-option" v-model="arePowerfulWerewolfRolesPrioritized"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
            <div class="col-12 text-muted font-italic" v-html="arePowerfulWerewolfRolesPrioritizedText"/>
            <div class="col-12">
                <ListInvolvedRoles roles-type="powerful-werewolves"/>
            </div>
        </div>
        <hr class="bg-dark mt-2 mb-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="villager" class="option-section-image mr-2"/>
                <div v-html="$t('GameRepartitionOptions.villagersRoles')"/>
            </div>
        </div>
        <hr class="bg-dark mt-1 mb-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="are-powerful-villager-roles-prioritized-option" class="option-label"
                       v-html="$t('GameRepartitionOptions.arePowerfulVillagerRolesPrioritized.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="are-powerful-villager-roles-prioritized-option" v-model="arePowerfulVillagerRolesPrioritized"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
            <div class="col-12 text-muted font-italic" v-html="arePowerfulVillagerRolesPrioritizedText"/>
            <div class="col-12">
                <ListInvolvedRoles roles-type="powerful-villagers"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import ListInvolvedRoles from "@/components/NavBar/GameOptionsModal/GameRepartitionOptions/ListInvolvedRoles";
import { fuseSearch } from "@/helpers/functions/VSelect";

export default {
    name: "GameRepartitionOptions",
    components: { ListInvolvedRoles, RoleImage },
    computed: {
        ...mapGetters("role", { roles: "roles" }),
        ...mapGetters("user", { userPreferences: "userPreferences" }),
        forbiddenRoles: {
            get() {
                let { forbiddenRoles } = this.userPreferences.game.repartition;
                forbiddenRoles = this.roles.filter(({ name }) => name !== "villager" && name !== "werewolf" && !forbiddenRoles.includes(name));
                return forbiddenRoles.map(role => ({ ...role, displayedName: this.$t(`Role.the.${role.name}`) }));
            },
            set(forbiddenRoles) {
                this.setPreferenceGameRepartitionForbiddenRoles(forbiddenRoles);
                this.$emit("options-updated");
            },
        },
        areRecommendedMinPlayersRespected: {
            get() {
                return this.userPreferences.game.repartition.areRecommendedMinPlayersRespected;
            },
            set(areRecommendedPlayersRespected) {
                this.setPreferenceGameRepartitionAreRecommendedMinPlayersRespected(areRecommendedPlayersRespected);
                this.$emit("options-updated");
            },
        },
        arePowerfulWerewolfRolesPrioritized: {
            get() {
                return this.userPreferences.game.repartition.arePowerfulWerewolfRolesPrioritized;
            },
            set(arePowerfulWerewolfRolesPrioritized) {
                this.setPreferenceGameRepartitionArePowerfulWerewolfRolesPrioritized(arePowerfulWerewolfRolesPrioritized);
                this.$emit("options-updated");
            },
        },
        arePowerfulVillagerRolesPrioritized: {
            get() {
                return this.userPreferences.game.repartition.arePowerfulVillagerRolesPrioritized;
            },
            set(arePowerfulVillagerRolesPrioritized) {
                this.setPreferenceGameRepartitionArePowerfulVillagerRolesPrioritized(arePowerfulVillagerRolesPrioritized);
                this.$emit("options-updated");
            },
        },
        areRecommendedMinPlayersRespectedText() {
            const description = this.areRecommendedMinPlayersRespected ? "recommendedMinPlayersRespected" : "recommendedMinPlayersNotRespected";
            return this.$t(`GameRepartitionOptions.areRecommendedMinPlayersRespected.description.${description}`);
        },
        arePowerfulWerewolfRolesPrioritizedText() {
            const description = this.arePowerfulWerewolfRolesPrioritized ? "powerfulWerewolfRolesPrioritized" : "powerfulWerewolfRolesNotPrioritized";
            return this.$t(`GameRepartitionOptions.arePowerfulWerewolfRolesPrioritized.description.${description}`);
        },
        arePowerfulVillagerRolesPrioritizedText() {
            const description = this.arePowerfulVillagerRolesPrioritized ? "powerfulVillagerRolesPrioritized" : "powerfulVillagerRolesNotPrioritized";
            return this.$t(`GameRepartitionOptions.arePowerfulVillagerRolesPrioritized.description.${description}`);
        },
    },
    methods: {
        ...mapActions("user", {
            setPreferenceGameRepartitionForbiddenRoles: "setPreferenceGameRepartitionForbiddenRoles",
            setPreferenceGameRepartitionAreRecommendedMinPlayersRespected: "setPreferenceGameRepartitionAreRecommendedMinPlayersRespected",
            setPreferenceGameRepartitionArePowerfulVillagerRolesPrioritized: "setPreferenceGameRepartitionArePowerfulVillagerRolesPrioritized",
            setPreferenceGameRepartitionArePowerfulWerewolfRolesPrioritized: "setPreferenceGameRepartitionArePowerfulWerewolfRolesPrioritized",
        }),
        filterByRoleName(option, search) {
            return fuseSearch(option, search, ["displayedName"]);
        },
        forbidRoles(roles) {
            this.forbiddenRoles = roles.map(({ name }) => name);
        },
    },
};
</script>

<style scoped>
    .option-section {
        font-size: 1.2rem;
    }

    .option-label {
        font-size: 1rem;
    }

    .option-section-image {
        width: 50px;
        height: 50px;
    }

    .role-image-option {
        min-width: 20px;
        min-height: 20px;
        max-width: 20px;
        max-height: 20px;
    }
</style>