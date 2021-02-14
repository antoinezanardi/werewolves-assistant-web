<template>
    <div id="game-roles-options">
        <div v-if="!game.canUpdateOptions">
            <div class="row">
                <div class="col-12 text-warning d-flex align-items-center">
                    <i class="fa fa-exclamation-triangle fa-2x mr-3 mb-1"/>
                    <span v-html="$t('GameRolesOptions.gameOptionsCantBeUpdated')"/>
                </div>
            </div>
            <hr class="bg-dark mt-1 mb-2"/>
        </div>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <img :src="SVGs['sheriff']" class="mr-2" alt="Sheriff" width="50"/>
                <div v-html="$t('GameRolesOptions.sheriff')"/>
            </div>
        </div>
        <hr class="bg-dark mt-1 mb-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-sheriff-enabled-option" class="option-label"
                       v-html="$t('GameRolesOptions.isSheriffEnabled.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-sheriff-enabled-option" v-model="isSheriffEnabled" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.withWithout')" :height="25" :width="60" :sync="true"/>
            </div>
            <div class="col-12 text-muted font-italic" v-html="isSheriffEnabledText"/>
        </div>
        <div class="row align-items-center mt-4">
            <div class="col-8">
                <label for="is-sheriff-vote-doubled-option" class="option-label"
                       v-html="$t('GameRolesOptions.isSheriffVoteDoubled.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-sheriff-vote-doubled-option" v-model="isSheriffVoteDoubled"
                               :disabled="!game.canUpdateOptions" :labels="$t('VueToggleButton.yesNo')"
                               :height="25" :width="60" :sync="true"/>
            </div>
            <div class="col-12 text-muted font-italic" v-html="isSheriffVoteDoubledText"/>
        </div>
        <hr class="bg-dark mt-2 mb-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <img :src="SVGs['seer']" class="mr-2" alt="Seer" width="50"/>
                <div v-html="$t('GameRolesOptions.seer')"/>
            </div>
        </div>
        <hr class="bg-dark mt-1 mb-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-seer-talkative-option" class="option-label"
                       v-html="$t('GameRolesOptions.isSeerTalkative.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-seer-talkative-option" v-model="isSeerTalkative" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
            <div class="col-12 text-muted font-italic" v-html="isSeerTalkativeText"/>
        </div>
        <hr class="bg-dark mt-2 mb-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <img :src="SVGs['two-sisters']" class="mr-2" alt="Two Sisters" width="50"/>
                <div v-html="$t('GameRolesOptions.twoSisters')"/>
            </div>
        </div>
        <hr class="bg-dark mt-1 mb-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="sisters-waking-up-interval-option" class="option-label"
                       v-html="$t('GameRolesOptions.sistersWakingUpInterval.label')"/>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="col-lg-8">
                    <input id="sisters-waking-up-interval-option" v-model.number="sistersWakingUpInterval" class="form-control"
                           type="number" min="0" max="5" :disabled="!game.canUpdateOptions"/>
                </div>
            </div>
            <div class="col-12 text-muted font-italic" v-html="sistersWakingUpIntervalText"/>
        </div>
        <hr class="bg-dark mt-2 mb-1"/>
        <div class="row mt-2">
            <div class="option-section col-12 d-flex align-items-center">
                <img :src="PNGs['three-brothers']" class="mr-2" alt="Three Brothers" width="50"/>
                <div v-html="$t('GameRolesOptions.threeBrothers')"/>
            </div>
        </div>
        <hr class="bg-dark mt-1 mb-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="brothers-waking-up-interval-option" class="option-label"
                       v-html="$t('GameRolesOptions.brothersWakingUpInterval.label')"/>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="col-lg-8">
                    <input id="brothers-waking-up-interval-option" v-model.number="brothersWakingUpInterval" class="form-control"
                           type="number" min="0" max="5" :disabled="!game.canUpdateOptions"/>
                </div>
            </div>
            <div class="col-12 text-muted font-italic" v-html="brothersWakingUpIntervalText"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { adjustNumber } from "@/helpers/functions/Number";
import twoSistersSVG from "@/assets/svg/roles/two-sisters.svg";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";
import lookSVG from "@/assets/svg/actions/look.svg";
import threeBrothersPNG from "@/assets/img/roles/three-brothers.png";

export default {
    name: "GameRolesOptions",
    data() {
        return {
            SVGs: { "two-sisters": twoSistersSVG, "sheriff": sheriffSVG, "seer": lookSVG },
            PNGs: { "three-brothers": threeBrothersPNG },
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        isSheriffEnabled: {
            get() {
                return this.game.options.roles.sheriff.isEnabled;
            },
            set(isSheriffEnabled) {
                this.setGameOptionIsSheriffEnabled(isSheriffEnabled);
                this.$emit("options-updated");
            },
        },
        isSheriffVoteDoubled: {
            get() {
                return this.game.options.roles.sheriff.hasDoubledVote;
            },
            set(isSheriffVoteDoubled) {
                this.setGameOptionIsSheriffVoteDoubled(isSheriffVoteDoubled);
                this.$emit("options-updated");
            },
        },
        sistersWakingUpInterval: {
            get() {
                return this.game.options.roles.twoSisters.wakingUpInterval;
            },
            set(newSistersWakingUpInterval) {
                newSistersWakingUpInterval = adjustNumber(newSistersWakingUpInterval, { min: 0, max: 5 });
                this.setGameOptionSistersWakingUpInterval(newSistersWakingUpInterval);
                this.$emit("options-updated");
            },
        },
        brothersWakingUpInterval: {
            get() {
                return this.game.options.roles.threeBrothers.wakingUpInterval;
            },
            set(newBrothersWakingUpInterval) {
                newBrothersWakingUpInterval = adjustNumber(newBrothersWakingUpInterval, { min: 0, max: 5 });
                this.setGameOptionBrothersWakingUpInterval(newBrothersWakingUpInterval);
                this.$emit("options-updated");
            },
        },
        isSeerTalkative: {
            get() {
                return this.game.options.roles.seer.isTalkative;
            },
            set(isSeerTalkative) {
                this.setGameOptionIsSeerTalkative(isSeerTalkative);
                this.$emit("options-updated");
            },
        },
        sistersWakingUpIntervalText() {
            const { sistersWakingUpInterval } = this;
            return this.$tc("GameRolesOptions.sistersWakingUpInterval.description", sistersWakingUpInterval, { sistersWakingUpInterval });
        },
        brothersWakingUpIntervalText() {
            const { brothersWakingUpInterval } = this;
            return this.$tc("GameRolesOptions.brothersWakingUpInterval.description", brothersWakingUpInterval, { brothersWakingUpInterval });
        },
        isSheriffEnabledText() {
            const description = this.isSheriffEnabled ? "sheriffIsEnabled" : "sheriffIsNotEnabled";
            return this.$t(`GameRolesOptions.isSheriffEnabled.description.${description}`);
        },
        isSheriffVoteDoubledText() {
            const description = this.isSheriffVoteDoubled ? "sheriffVoteIsDoubled" : "sheriffVoteIsNotDoubled";
            return this.$t(`GameRolesOptions.isSheriffVoteDoubled.description.${description}`);
        },
        isSeerTalkativeText() {
            const description = this.isSeerTalkative ? "seerIsTalkative" : "seerIsNotTalkative";
            return this.$t(`GameRolesOptions.isSeerTalkative.description.${description}`);
        },
    },
    methods: {
        ...mapActions("game", {
            setGameOptionIsSheriffVoteDoubled: "setGameOptionIsSheriffVoteDoubled",
            setGameOptionIsSheriffEnabled: "setGameOptionIsSheriffEnabled",
            setGameOptionSistersWakingUpInterval: "setGameOptionSistersWakingUpInterval",
            setGameOptionBrothersWakingUpInterval: "setGameOptionBrothersWakingUpInterval",
            setGameOptionIsSeerTalkative: "setGameOptionIsSeerTalkative",
        }),
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
</style>