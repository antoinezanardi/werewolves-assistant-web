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
                    <div class="row">
                        <div class="option-section col-12 d-flex justify-content-center align-items-center">
                            <img :src="SVGs['sheriff']" class="mr-2" alt="Sheriff" width="50"/>
                            <div v-html="$t('GameOptionsModal.sheriff')"/>
                        </div>
                    </div>
                    <hr class="bg-dark mt-1 mb-2"/>
                    <div class="row align-items-center">
                        <div class="col-8">
                            <label for="is-sheriff-vote-doubled-option" class="option-label"
                                   v-html="$t('GameOptionsModal.isSheriffVoteDoubled.label')"/>
                        </div>
                        <div class="col-4 text-center">
                            <toggle-button id="is-sheriff-vote-doubled-option" v-model="isSheriffVoteDoubled"
                                           :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
                        </div>
                        <div class="col-12 text-muted font-italic" v-html="isSheriffVoteDoubledText"/>
                    </div>
                    <div class="row">
                        <div class="option-section col-12 d-flex justify-content-center align-items-center">
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
                            <toggle-button id="is-seer-talkative-option" v-model="isSeerTalkative"
                                           :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
                        </div>
                        <div class="col-12 text-muted font-italic" v-html="isSeerTalkativeText"/>
                    </div>
                    <div class="row">
                        <div class="option-section col-12 d-flex justify-content-center align-items-center">
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
                        <div class="col-4 text-right">
                            <input id="sisters-waking-up-interval-option" v-model.number="sistersWakingUpInterval" class="form-control" type="number"
                                   min="0" max="100"/>
                        </div>
                        <div class="col-12 text-muted font-italic" v-html="sistersWakingUpIntervalText"/>
                    </div>
                    <div class="row mt-2">
                        <div class="option-section col-12 d-flex justify-content-center align-items-center">
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
                        <div class="col-4 text-right">
                            <input id="brothers-waking-up-interval-option" v-model.number="brothersWakingUpInterval" class="form-control"
                                   type="number" min="0" max="100"/>
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
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        isSheriffVoteDoubled: {
            get() {
                return this.game.options.isSheriffVoteDoubled;
            },
            set(isSheriffVoteDoubled) {
                this.setGameOptionIsSheriffVoteDoubled(isSheriffVoteDoubled);
            },
        },
        sistersWakingUpInterval: {
            get() {
                return this.game.options.sistersWakingUpInterval;
            },
            set(newSistersWakingUpInterval) {
                newSistersWakingUpInterval = adjustNumber(newSistersWakingUpInterval, { min: 0, max: 100 });
                this.setGameOptionSistersWakingUpInterval(newSistersWakingUpInterval);
            },
        },
        brothersWakingUpInterval: {
            get() {
                return this.game.options.brothersWakingUpInterval;
            },
            set(newBrothersWakingUpInterval) {
                newBrothersWakingUpInterval = adjustNumber(newBrothersWakingUpInterval, { min: 0, max: 100 });
                this.setGameOptionBrothersWakingUpInterval(newBrothersWakingUpInterval);
            },
        },
        isSeerTalkative: {
            get() {
                return this.game.options.isSeerTalkative;
            },
            set(isSeerTalkative) {
                this.setGameOptionIsSeerTalkative(isSeerTalkative);
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
        isSheriffVoteDoubledText() {
            const description = this.isSheriffVoteDoubled ? "sheriffVoteIsDoubled" : "sheriffVoteIsNotDoubled";
            return this.$t(`GameOptionsModal.isSheriffVoteDoubled.description.${description}`);
        },
        isSeerTalkativeText() {
            const description = this.isSeerTalkative ? "seerIsTalkative" : "seerIsNotTalkative";
            return this.$t(`GameOptionsModal.isSeerTalkative.description.${description}`);
        },
    },
    methods: {
        ...mapActions("game", {
            setGameOptionIsSheriffVoteDoubled: "setGameOptionIsSheriffVoteDoubled",
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