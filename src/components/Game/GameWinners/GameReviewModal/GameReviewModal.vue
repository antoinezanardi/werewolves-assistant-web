<template>
    <div id="game-review-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="$t('GameReviewModal.rateThisGame')"/>
                </div>
                <div class="modal-body">
                    <div class="row align-items-center">
                        <div class="col-md-1 col-2 pr-0 text-center text-danger">
                            <i class="fa fa-heart fa-2x animate__animated animate__heartBeat animate__slow animate__repeat-2"/>
                        </div>
                        <div id="why-review-text" class="col-md-11 col-10 font-italic"
                             v-html="$t('GameReviewModal.byRatingThisGameYouImproveAssistant')"/>
                    </div>
                    <hr class="my-3 bg-dark"/>
                    <div class="row my-2">
                        <div class="col-12 text-muted text-center" v-html="$t('GameReviewModal.rateYourAssistantExperience')"/>
                    </div>
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <VueStarRating :rating="rating" :increment="0.5" :animate="true" :glow="6" glow-color="#FFFFF"
                                           :star-size="40" :rounded-corners="true" :padding="10" :show-rating="false"
                                           @rating-selected="setRating"/>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <transition mode="out-in" name="fade">
                            <div id="rating-text" :key="ratingMetadata.text"
                                 class="col-12 text-center font-weight-bold" :class="`text-${ratingMetadata.color}`">
                                <i v-if="rating" class="far mr-2" :class="`fa-${ratingMetadata.icon}`"/>
                                <span v-if="rating" v-html="ratingMetadata.text"/>
                            </div>
                        </transition>
                    </div>
                    <div class="row my-1">
                        <div class="col-12">
                            <label for="review-comment" v-html="$t('GameReviewModal.aLittleComment')"/>
                            <textarea id="review-comment" v-model="comment.value" v-tooltip="comment.tooltip.options"
                                      :placeholder="$t('GameReviewModal.dontHesitateToComment')"
                                      class="form-control" maxlength="500" rows="3"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <InputAvailableCharacters :value="comment.value" :max-length="500"/>
                        </div>
                    </div>
                    <div class="row my-2">
                        <div class="col-12">
                            <div class="d-flex justify-content-center align-items-center">
                                <input id="game-review-bug" v-model="dysfunctionFound" type="checkbox" class="mr-2 cursor-pointer"/>
                                <label class="form-check-label d-flex justify-content-center align-items-center cursor-pointer"
                                       for="game-review-bug">
                                    <span class="text-center" v-html="$t('GameReviewModal.IveFoundABug')"/>
                                    <i class="fa fa-bug fa-2x ml-2 text-danger"/>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row align-items-center w-100">
                        <div class="offset-md-4 col-md-4 offset-1 col-8">
                            <SubmitButton classes="btn btn-primary btn-lg btn-block"
                                          :text="`<i class='fa fa-star mr-2'></i>${$t('GameReviewModal.rate')}`"
                                          :loading="loading"/>
                        </div>
                        <div class="col-md-4 col-2 text-right">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                <span class="d-md-inline d-none" v-html="$t('GameReviewModal.close')"/>
                                <span class="d-md-none" v-html="'&times;'"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from "jquery";
import InputAvailableCharacters from "@/components/shared/Forms/InputAvailableCharacters";
import SubmitButton from "@/components/shared/Forms/SubmitButton";

export default {
    name: "GameReviewModal",
    components: { SubmitButton, InputAvailableCharacters },
    data() {
        return {
            currentRating: undefined,
            rating: undefined,
            comment: {
                value: "",
                tooltip: {
                    options: { content: this.$t("GameReviewModal.sorryThatYouFoundABug"), trigger: "manual", show: false },
                    timeout: undefined,
                },
            },
            dysfunctionFound: undefined,
            loading: false,
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        ratingMetadata() {
            if (this.rating >= 4.5) {
                return { text: this.$t("GameReviewModal.assistantExperience.awesome"), color: "success", icon: "grin-stars" };
            } else if (this.rating >= 3.5) {
                return { text: this.$t("GameReviewModal.assistantExperience.good"), color: "success", icon: "grin-alt" };
            } else if (this.rating >= 2.5) {
                return { text: this.$t("GameReviewModal.assistantExperience.average"), color: "warning", icon: "meh" };
            } else if (this.rating >= 1.5) {
                return { text: this.$t("GameReviewModal.assistantExperience.bad"), color: "danger", icon: "frown-open" };
            }
            return { text: this.$t("GameReviewModal.assistantExperience.awful"), color: "danger", icon: "sad-cry" };
        },
    },
    watch: {
        dysfunctionFound(value) {
            if (value) {
                this.comment.tooltip.options.show = true;
                this.comment.tooltip.timeout = setTimeout(() => {
                    this.comment.tooltip.options.show = false;
                }, 5000);
            } else {
                this.comment.tooltip.options.show = false;
                clearTimeout(this.comment.tooltip.timeout);
            }
        },
    },
    methods: {
        show() {
            $("#game-review-modal").modal("show");
            this.rating = this.game.review.rating;
            this.comment.value = this.game.review.comment ? this.game.review.comment : "";
            this.dysfunctionFound = this.game.review.dysfunctionFound;
        },
        setRating(rating) {
            this.rating = rating;
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../../../node_modules/bootstrap/scss/bootstrap-grid";

    #rating-text {
        height: 40px;
        font-size: 1.75rem;
    }

    #why-review-text {
        font-size: 0.8rem;
        @include media-breakpoint-up(md) {
            font-size: 1.25rem;
        }
    }

    #game-review-bug {
        width: 30px;
        height: 30px;
    }
</style>