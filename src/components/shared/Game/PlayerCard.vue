<template>
    <div class="player-card d-flex flex-column align-items-center">
        <div class="player-card-thumbnail">
            <img class="img-fluid" :src="playerThumbnail" alt="Role thumbnail">
        </div>
        <div class="player-card-name text-center" v-html="player.name"/>
        <div class="player-card-role text-center text-muted" v-html="playerRole"/>
    </div>
</template>

<script>
import Player from "../../../classes/Player";
import wolf from "../../../assets/img/wolf.png";
import unknown from "../../../assets/img/roles/unknown.png";

export default {
    name: "PlayerCard",
    props: {
        player: {
            type: Player,
            required: true,
        },
    },
    data() {
        return {
            IMGs: { wolf, unknown },
        };
    },
    computed: {
        playerThumbnail() {
            return this.player.role.current ? this.IMGs[this.player.role.current] : this.IMGs.unknown;
        },
        playerRole() {
            return this.player.role.current ? this.$t(`Role.${this.player.role.current}`) : this.$t(`PlayerCard.pickRole`);
        },
    },
};
</script>

<style scoped>
    .player-card {
        padding: 5px;
    }

    .player-card-name {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .player-card-thumbnail {
        width: 50px;
        height: 50px;
        border: 3px solid grey;
        border-radius: 5px;
    }
</style>