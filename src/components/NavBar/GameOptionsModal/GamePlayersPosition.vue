<template>
    <div id="game-players-position">
        <div v-if="!game.players.length" class="mt-4">
            <h3 class="text-muted text-center font-italic">
                <i class="fa fa-user-plus mr-2"/>
                <span v-html="$t('GamePlayersPosition.addPlayersToPlaceThem')"/>
            </h3>
        </div>
        <div v-else>
            <Draggable v-model="players" v-bind="dragOptions" @start="isDragging = true" @end="isDragging = false">
                <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
                    <div v-for="player in players" :key="player.name" class="d-flex align-items-center player-handle">
                        <RoleImage :role="player.role.current" class="player-role-image mr-2"/>
                        <span v-html="player.name"/>
                    </div>
                </transition-group>
            </Draggable>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import RoleImage from "@/components/shared/Game/Role/RoleImage";

export default {
    name: "GamePlayersPosition",
    components: { RoleImage, Draggable: draggable },
    data() {
        return { isDragging: false };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        players: {
            get() {
                return this.game.players;
            },
            async set(value) {
                await this.setGamePlayers(value);
            },
        },
        dragOptions() {
            return { animation: 200 };
        },
    },
    methods: { ...mapActions("game", { setGamePlayers: "setGamePlayers" }) },
};
</script>

<style lang="scss" scoped>

    .player-handle {
        background-color: #3c3c3c;
        margin-bottom: 5px;
        padding: 3px;
        cursor: move;

        .player-role-image {
            width: 20px;
            height: 20px;
        }
    }

    .flip-list-move {
        transition: transform 0.5s;
    }
</style>