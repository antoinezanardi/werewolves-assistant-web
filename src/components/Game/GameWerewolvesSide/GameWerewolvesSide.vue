<template>
    <div id="werewolves-side" class="pr-0">
        <div class="row">
            <div class="col-12 text-center">
                <h3 v-html="`${$t('GameWerewolvesSide.werewolves')}`"/>
            </div>
        </div>
        <div class="row pr-0">
            <div class="col-12 text-center pr-0">
                <span v-html="'🐺'" class="mr-2"/>
                <span v-html="wolvesAliveText"/>
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row justify-content-end">
            <div v-for="player in sortedWerewolves" :key="player.name" class="player-strip werewolf-player-strip">
                <div class="text-center text-truncate mt-1">
                    <i v-if="player.isAlive === false" v-tooltip="$t('GameWerewolvesSide.thisPlayerIsDead')"
                       class="fa fa-skull-crossbones mr-2"/>
                    <span v-html="player.name"/>
                </div>
                <hr class="bg-dark mt-1 mb-2"/>
                <div class="d-flex">
                    <PlayerThumbnail :game="game" :player="player" class="ml-1"/>
                    <div class="d-flex flex-wrap align-items-center flex-grow-1 p-1">
                        <PlayerAttribute v-for="({ attribute, source }) in player.attributes" :key="attribute"
                                             :attribute="attribute" :source="source"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Game from "../../../classes/Game";
import PlayerAttribute from "../../shared/Game/PlayerAttribute/PlayerAttribute";
import PlayerThumbnail from "../../shared/Game/PlayerThumbnail";

export default {
    name: "GameWerewolvesSide",
    components: { PlayerThumbnail, PlayerAttribute },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        wolvesAliveText() {
            return `${this.game.aliveWerewolfPlayers.length} / ${this.game.werewolfPlayers.length} ${this.$t("GameWerewolvesSide.alive")}`;
        },
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