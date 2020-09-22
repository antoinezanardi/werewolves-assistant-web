<template>
    <div id="villagers-side">
        <div class="row">
            <div class="col-12 text-center pl-0">
                <h3 v-html="$t('GameVillagersSide.villagers')"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center pl-0">
                <AliveVillagers/>
            </div>
        </div>
        <div id="villagers-list" class="row">
            <transition-group name="flip-list" class="w-100">
                <div v-for="player in sortedVillagers" :key="player.name" class="player-strip villager-player-strip">
                    <div class="text-center text-truncate m-1">
                        <transition name="translate-down-fade" mode="out-in">
                            <i v-if="player.isAlive === false" v-tooltip="$t('GameVillagersSide.thisPlayerIsDead')"
                               class="fa fa-skull-crossbones mr-2"/>
                        </transition>
                        <span v-html="player.name"/>
                    </div>
                    <hr class="bg-dark mt-1 mb-2"/>
                    <div class="d-flex">
                        <transition-group name="fade-list" class="d-flex flex-wrap align-items-center flex-grow-1 p-1">
                            <PlayerAttribute v-for="({ attribute, source }) in player.attributes" :key="attribute"
                                             :attribute="attribute" :source="source"/>
                        </transition-group>
                        <PlayerThumbnail :player="player" class="mr-1"/>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerThumbnail from "../../shared/Game/PlayerThumbnail";
import PlayerAttribute from "../../shared/Game/PlayerAttribute/PlayerAttribute";
import AliveVillagers from "@/components/shared/Game/Sides/AliveVillagers";

export default {
    name: "GameVillagersSide",
    components: { AliveVillagers, PlayerAttribute, PlayerThumbnail },
    computed: {
        ...mapGetters("game", { game: "game" }),
        sortedVillagers() {
            const villagerPlayers = [...this.game.villagerPlayers];
            return [
                ...villagerPlayers.sort((playerA, playerB) => {
                    if (!playerA.isAlive) {
                        return 1;
                    } else if (playerB.isAlive) {
                        return playerA.role.current === "villager" ? 1 : -1;
                    }
                    return -1;
                }),
            ];
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