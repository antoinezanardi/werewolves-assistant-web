<template>
    <div id="werewolves-side" class="visible-scrollbar">
        <div class="row mt-2">
            <div class="col-12 text-center pr-0">
                <h3 v-html="`${$t('GameWerewolvesSide.werewolves')}`"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center pr-0">
                <AliveWerewolves/>
            </div>
        </div>
        <div class="row player-side-list">
            <transition-group name="flip-list" class="w-100 d-flex flex-column align-items-end">
                <div v-for="player in sortedWerewolves" :key="player.name" class="player-strip werewolf-player-strip">
                    <div class="text-center text-truncate m-1" v-html="player.name"/>
                    <hr class="bg-dark mt-1 mb-2"/>
                    <div class="d-flex">
                        <PlayerThumbnail :player="player" class="ml-1"/>
                        <transition-group name="fade-list" class="d-flex flex-wrap align-items-center flex-grow-1 p-1">
                            <PlayerAttribute v-for="attribute in player.attributes" :key="attribute.name" :attribute="attribute" :player="player"/>
                        </transition-group>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerAttribute from "../../PlayerAttribute/PlayerAttribute";
import PlayerThumbnail from "../../PlayerThumbnail";
import AliveWerewolves from "@/components/shared/Game/Sides/AliveWerewolves";

export default {
    name: "GameWerewolvesSide",
    components: { AliveWerewolves, PlayerThumbnail, PlayerAttribute },
    computed: {
        ...mapGetters("game", { game: "game" }),
        sortedWerewolves() {
            const wereWolvesPlayers = [...this.game.werewolfPlayers];
            return [...wereWolvesPlayers.sort(player => player.isAlive ? -1 : 1)];
        },
    },
};
</script>

<style lang="scss" scoped>
    #werewolves-side {
        overflow-y: auto !important;
        overflow-x: hidden;
    }
    .player-strip {
        height: 100px;
        width: 100%;
        margin-top: 5px;
        margin-bottom: 10px;
        border: 1px solid grey;

        &.werewolf-player-strip {
            border-bottom-left-radius: 5px;
            border-top-left-radius: 5px;
            border-right: unset;
            background-image: linear-gradient(to right, #646464, #3c3c3c);
        }
    }
</style>