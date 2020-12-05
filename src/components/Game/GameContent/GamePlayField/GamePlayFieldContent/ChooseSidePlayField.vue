<template>
    <div id="choose-side-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="game.dogWolfPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="choose-side" class="mb-2" @side-selected="sideSelected"/>
        <div class="flex-grow-1">
            <div id="sides" class="row">
                <div id="play-field-villagers-side" class="col text-center side" :class="{ selected: play.side === 'villagers' }"
                     @click="sideSelected('villagers')">
                    <RoleImage class="side-image" role="villagers"/>
                    <RoleText class="side-text mt-1" role="villagers"/>
                </div>
                <div id="play-field-werewolves-side" class="col ml-1 text-center side" :class="{ selected: play.side === 'werewolves' }"
                     @click="sideSelected('werewolves')">
                    <RoleImage class="side-image" role="werewolves"/>
                    <RoleText class="side-text mt-1" role="werewolves"/>
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
    name: "ChooseSidePlayField",
    components: { RoleText, RoleImage, PlayFieldActionText, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        sideSelected(side) {
            this.$emit("side-selected", side);
        },
    },
};
</script>

<style lang="scss" scoped>
    .side {
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

        .side-image {
            width: 150px;
            height: 150px;
        }

        .side-text {
            font-size: 1.2rem;
        }
    }
</style>