<template>
    <div id="werewolves-side" class="visible-scrollbar">
        <div class="row">
            <div class="col-12 text-center pr-0">
                <h3 v-html="`${$t('GameWerewolvesSide.werewolves')}`"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center pr-0">
                <AliveWerewolves/>
            </div>
        </div>
        <div class="row">
            <transition-group name="flip-list" class="w-100 d-flex flex-column align-items-end">
                <div v-for="player in sortedWerewolves" :key="player.name" class="player-strip werewolf-player-strip">
                    <div class="text-center text-truncate m-1">
                        <transition name="translate-down-fade" mode="out-in">
                            <i v-if="player.isAlive === false" v-tooltip="$t('GameWerewolvesSide.thisPlayerIsDead')"
                               class="fa fa-skull-crossbones mr-2"/>
                        </transition>
                        <span v-html="player.name"/>
                    </div>
                    <hr class="bg-dark mt-1 mb-2"/>
                    <div class="d-flex">
                        <PlayerThumbnail :player="player" class="ml-1"/>
                        <transition-group name="fade-list" class="d-flex flex-wrap align-items-center flex-grow-1 p-1">
                            <PlayerAttribute v-for="({ name, source }) in player.attributes" :key="name" :attribute="name" :source="source"/>
                        </transition-group>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerAttribute from "../../shared/Game/PlayerAttribute/PlayerAttribute";
import PlayerThumbnail from "../../shared/Game/PlayerThumbnail";
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
    }
    .player-strip {
        height: 100px;
        width: 90%;
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