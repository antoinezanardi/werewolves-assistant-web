<template>
    <div id="villagers-side">
        <div class="row">
            <div class="col-12 text-center">
                <h3 v-html="$t('GameVillagersSide.villagers')"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <span v-html="'🧑🏻‍🌾'" class="mr-2"/>
                <span v-html="villagersAliveText"/>
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row">
            <div v-for="player in game.villagerPlayers" :key="player.name" class="player-strip villager-player-strip">
                <div class="text-center text-truncate mt-1" v-html="player.name"/>
                <hr class="bg-dark mt-1 mb-2"/>
                <div class="d-flex">
                    <div class="d-flex flex-wrap align-items-center flex-grow-1 p-1">
                        <PlayerAttribute v-for="({ attribute, source }) in player.attributes" :key="attribute"
                                             :attribute="attribute" :source="source"/>
                    </div>
                    <PlayerThumbnail :game="game" :player="player" class="mr-1"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlayerThumbnail from "../../shared/Game/PlayerThumbnail";
import PlayerAttribute from "../../shared/Game/PlayerAttribute/PlayerAttribute";
import Game from "../../../classes/Game";
export default {
    name: "GameVillagersSide",
    components: { PlayerAttribute, PlayerThumbnail },
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        villagersAliveText() {
            return `${this.game.aliveVillagerPlayers.length} / ${this.game.villagerPlayers.length} ${this.$t("GameVillagersSide.alive")}`;
        },
    },
};
</script>

<style lang="scss" scoped>
    #villagers-side {
        overflow-y: auto !important;
    }

    .player-strip {
        height: 100px;
        width: 90%;
        margin-top: 5px;
        margin-bottom: 10px;
        border: 1px solid grey;

        &.villager-player-strip {
            border-bottom-right-radius: 5px;
            border-top-right-radius: 5px;
            border-left: unset;
            background-image: linear-gradient(to right, #3c3c3c, #646464);
        }
    }
</style>