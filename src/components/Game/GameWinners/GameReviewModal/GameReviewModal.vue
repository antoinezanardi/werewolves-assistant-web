<template>
    <div id="game-review-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-html="$t('GameReviewModal.rateThisGame')"/>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 d-flex justify-content-center">
                            <VueStarRating :rating="rating" :increment="0.5" :animate="true" :glow="6" glow-color="#FFFFF"
                                           :show-rating="false"/>
                        </div>
                    </div>
                    <div class="row my-2">
                        <div class="col-12">
                            <textarea v-model="comment" class="form-control" maxlength="500" rows="15"/>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            v-html="$t('GameReviewModal.close')"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import $ from "jquery";

export default {
    name: "GameReviewModal",
    data() {
        return {
            rating: undefined,
            comment: undefined,
            dysfunctionFound: undefined,
        };
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        show() {
            $("#game-review-modal").modal("show");
            this.rating = this.game.review.rating;
            this.comment = this.game.review.comment;
            this.dysfunctionFound = this.game.review.dysfunctionFound;
        },
    },
};
</script>

<style scoped>

</style>