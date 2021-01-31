<template>
    <div id="game-options-modal" class="modal fade" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        <i class="fa fa-dice mr-2"/>
                        <span v-html="$t('GameOptionsModal.gameOptions')"/>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" class="text-white">
                            &times;
                        </span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="!game.canUpdateOptions">
                        <div class="row">
                            <div class="col-12 text-warning d-flex align-items-center">
                                <i class="fa fa-exclamation-triangle fa-2x mr-3 mb-1"/>
                                <span v-html="$t('GameOptionsModal.gameOptionsCantBeUpdated')"/>
                            </div>
                        </div>
                        <hr class="bg-dark mt-1 mb-2"/>
                    </div>
                    <div class="row">
                        <div class="option-section col-12 d-flex align-items-center">
                            <img :src="SVGs['sheriff']" class="mr-2" alt="Sheriff" width="50"/>
                            <div v-html="$t('GameOptionsModal.sheriff')"/>
                        </div>
                    </div>
                    <hr class="bg-dark mt-1 mb-2"/>
                    <div class="row align-items-center">
                        <div class="col-8">
                            <label for="is-sheriff-enabled-option" class="option-label"
                                   v-html="$t('GameOptionsModal.isSheriffEnabled.label')"/>
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
                                   v-html="$t('GameOptionsModal.isSheriffVoteDoubled.label')"/>
                        </div>
                        <div class="col-4 text-center">
                            <toggle-button id="is-sheriff-vote-doubled-option" v-model="isSheriffVoteDoubled" :disabled="!game.canUpdateOptions"
                                           :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
                        </div>
                        <div class="col-12 text-muted font-italic" v-html="isSheriffVoteDoubledText"/>
                    </div>
                    <hr class="bg-dark mt-2 mb-1"/>
                    <div class="row">
                        <div class="option-section col-12 d-flex align-items-center">
                            <img :src="SVGs['seer']" class="mr-2" alt="Seer" width="50"/>
                            <div v-html="$t('GameOptionsModal.seer')"/>
                        </div>
                    </div>
                    <hr class="bg-dark mt-1 mb-2"/>
                    <div class="row align-items-center">
                        <div class="col-8">
                            <label for="is-seer-talkative-option" class="option-label"
                                   v-html="$t('GameOptionsModal.isSeerTalkative.label')"/>
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
                            <div v-html="$t('GameOptionsModal.twoSisters')"/>
                        </div>
                    </div>
                    <hr class="bg-dark mt-1 mb-2"/>
                    <div class="row align-items-center">
                        <div class="col-8">
                            <label for="sisters-waking-up-interval-option" class="option-label"
                                   v-html="$t('GameOptionsModal.sistersWakingUpInterval.label')"/>
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
                            <div v-html="$t('GameOptionsModal.threeBrothers')"/>
                        </div>
                    </div>
                    <hr class="bg-dark mt-1 mb-2"/>
                    <div class="row align-items-center">
                        <div class="col-8">
                            <label for="brothers-waking-up-interval-option" class="option-label"
                                   v-html="$t('GameOptionsModal.brothersWakingUpInterval.label')"/>
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-block" data-dismiss="modal" v-html="$t('GameOptionsModal.close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import $ from "jquery";
import { adjustNumber } from "@/helpers/functions/Number";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";
import lookSVG from "@/assets/svg/actions/look.svg";
import twoSistersSVG from "@/assets/svg/roles/two-sisters.svg";
import threeBrothersPNG from "@/assets/img/roles/three-brothers.png";

export default {
    name: "GameOptionsModal",
    data() {
        return {
            SVGs: { "two-sisters": twoSistersSVG, "sheriff": sheriffSVG, "seer": lookSVG },
            PNGs: { "three-brothers": threeBrothersPNG },
            optionsUpdated: false,
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        isSheriffEnabled: {
            get() {
                return this.game.options.roles.sheriff.enabled;
            },
            set(isSheriffEnabled) {
                this.setGameOptionIsSheriffEnabled(isSheriffEnabled);
                this.optionsUpdated = true;
            },
        },
        isSheriffVoteDoubled: {
            get() {
                return this.game.options.roles.sheriff.hasDoubledVote;
            },
            set(isSheriffVoteDoubled) {
                this.setGameOptionIsSheriffVoteDoubled(isSheriffVoteDoubled);
                this.optionsUpdated = true;
            },
        },
        sistersWakingUpInterval: {
            get() {
                return this.game.options.roles.twoSisters.wakingUpInterval;
            },
            set(newSistersWakingUpInterval) {
                newSistersWakingUpInterval = adjustNumber(newSistersWakingUpInterval, { min: 0, max: 5 });
                this.setGameOptionSistersWakingUpInterval(newSistersWakingUpInterval);
                this.optionsUpdated = true;
            },
        },
        brothersWakingUpInterval: {
            get() {
                return this.game.options.roles.threeBrothers.wakingUpInterval;
            },
            set(newBrothersWakingUpInterval) {
                newBrothersWakingUpInterval = adjustNumber(newBrothersWakingUpInterval, { min: 0, max: 5 });
                this.setGameOptionBrothersWakingUpInterval(newBrothersWakingUpInterval);
                this.optionsUpdated = true;
            },
        },
        isSeerTalkative: {
            get() {
                return this.game.options.roles.seer.isTalkative;
            },
            set(isSeerTalkative) {
                this.setGameOptionIsSeerTalkative(isSeerTalkative);
                this.optionsUpdated = true;
            },
        },
        sistersWakingUpIntervalText() {
            const { sistersWakingUpInterval } = this;
            return this.$tc("GameOptionsModal.sistersWakingUpInterval.description", sistersWakingUpInterval, { sistersWakingUpInterval });
        },
        brothersWakingUpIntervalText() {
            const { brothersWakingUpInterval } = this;
            return this.$tc("GameOptionsModal.brothersWakingUpInterval.description", brothersWakingUpInterval, { brothersWakingUpInterval });
        },
        isSheriffEnabledText() {
            const description = this.isSheriffEnabled ? "sheriffIsEnabled" : "sheriffIsNotEnabled";
            return this.$t(`GameOptionsModal.isSheriffEnabled.description.${description}`);
        },
        isSheriffVoteDoubledText() {
            const description = this.isSheriffVoteDoubled ? "sheriffVoteIsDoubled" : "sheriffVoteIsNotDoubled";
            return this.$t(`GameOptionsModal.isSheriffVoteDoubled.description.${description}`);
        },
        isSeerTalkativeText() {
            const description = this.isSeerTalkative ? "seerIsTalkative" : "seerIsNotTalkative";
            return this.$t(`GameOptionsModal.isSeerTalkative.description.${description}`);
        },
    },
    watch: {
        optionsUpdated(newValue, oldValue) {
            if (newValue && !oldValue) {
                this.$toasted.success(this.$t("GameOptionsModal.optionsAreSaved"), { icon: "check", duration: 5000 });
            }
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
        show() {
            $("#game-options-modal").modal("show");
        },

    },
};
</script>

<style lang="scss" scoped>

    .option-section {
        font-size: 1.2rem;
    }

    .option-label {
        font-size: 1rem;
    }
</style>