<template>
    <div id="choose-side-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="game.thiefPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="choose-card" class="mb-2" @card-selected="cardSelected"/>
        <div class="flex-grow-1">
            <div id="additional-cards" class="row">
                <div v-for="card of game.thiefAdditionalCards" :key="card._id" class="additional-card col text-center"
                     :class="{ selected: play.card === card._id }" @click.prevent="cardSelected(card)">
                    <RoleImage class="additional-card-image" :role="card.role"/>
                    <RoleText class="additional-card-text mt-1" :role="card.role"/>
                </div>
            </div>
            <div v-if="!game.isFirstWaitingSkippableAction" class="row mt-3">
                <div class="col-12">
                    <h5 class="text-muted text-center font-italic">
                        <i class="fa fa-exclamation-triangle mr-2"/>
                        <span v-html="$t('ChooseCardPlayField.thiefMustChooseCard')"/>
                    </h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import RoleText from "@/components/shared/Game/Role/RoleText";

export default {
    name: "ChooseCardPlayField",
    components: { RoleText, RoleImage, PlayFieldActionText, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        cardSelected(card) {
            this.$emit("card-selected", card);
        },
    },
};
</script>

<style lang="scss" scoped>
    .additional-card {
        border: 2px solid transparent;
        padding: 10px;
        cursor: pointer;
        transition: all 0.25s ease;
        border-radius: 10px;

        &:hover {
            border: 2px solid #9b9b9b;
        }

        &.selected {
            border: 2px solid #d6d6d6 !important;
        }

        .additional-card-image {
            width: 150px;
            height: auto;
        }

        .additional-card-text {
            font-size: 1.2rem;
        }
    }
</style>