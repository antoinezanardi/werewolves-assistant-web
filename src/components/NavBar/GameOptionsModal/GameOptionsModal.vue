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
                            <img :src="SVGs['two-sisters']" class="mr-3" alt="Two Sisters" width="50"/>
                            <div v-html="$t('GameOptionsModal.twoSisters')"/>
                        </div>
                    </div>
                    <hr class="bg-dark my-1"/>
                    <div class="row align-items-center">
                        <div class="col-8">
                            <label for="sisters-waking-up-interval-option" class="option-label"
                                   v-html="$t('GameOptionsModal.sistersWakingUpInterval.label')"/>
                        </div>
                        <div class="col-4 text-right">
                            <input id="sisters-waking-up-interval-option" v-model.number="sistersWakingUpInterval" class="form-control" type="number"
                                   min="0"/>
                        </div>
                        <div class="col-12 text-muted font-italic" v-html="sistersWakingUpIntervalText"/>
                    </div>
                    <div class="row mt-2">
                        <div class="option-section col-12 d-flex justify-content-center align-items-center">
                            <img :src="PNGs['three-brothers']" class="mr-3" alt="Three Brothers" width="50"/>
                            <div v-html="$t('GameOptionsModal.threeBrothers')"/>
                        </div>
                    </div>
                    <hr class="bg-dark my-1"/>
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
import twoSistersSVG from "@/assets/svg/roles/two-sisters.svg";
import threeBrothersPNG from "@/assets/img/roles/three-brothers.png";

export default {
    name: "GameOptionsModal",
    data() {
        return {
            SVGs: { "two-sisters": twoSistersSVG },
            PNGs: { "three-brothers": threeBrothersPNG },
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        sistersWakingUpInterval: {
            get() {
                return this.game.options.sistersWakingUpInterval;
            },
            set(newSistersWakingUpInterval) {
                if (isNaN(newSistersWakingUpInterval) || newSistersWakingUpInterval === "") {
                    newSistersWakingUpInterval = 0;
                } else if (newSistersWakingUpInterval < 0) {
                    newSistersWakingUpInterval = Math.abs(newSistersWakingUpInterval);
                }
                this.setGameOptionSistersWakingUpInterval(newSistersWakingUpInterval);
            },
        },
        sistersWakingUpIntervalText() {
            const { sistersWakingUpInterval } = this;
            return this.$tc("GameOptionsModal.sistersWakingUpInterval.description", sistersWakingUpInterval, { sistersWakingUpInterval });
        },
    },
    methods: {
        ...mapActions("game", { setGameOptionSistersWakingUpInterval: "setGameOptionSistersWakingUpInterval" }),
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