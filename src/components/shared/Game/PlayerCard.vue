<template>
    <div class="player-card d-flex flex-column align-items-center">
        <div class="player-card-thumbnail">
            <i v-tooltip="$t('PlayerCard.unsetPlayer')" @click="unsetPlayer"
               class="fa fa-times-circle unset-player-button"/>
            <img class="img-fluid" :src="playerThumbnail" alt="Role thumbnail">
        </div>
        <div class="player-card-name text-center" v-html="player.name"/>
        <div class="player-card-role text-center text-muted d-flex align-items-center">
            <i v-if="player.role.current" v-tooltip="$t('PlayerCard.unsetRole')" @click="player.role.current = undefined"
               class="fa fa-times-circle mr-1 unset-role-button"/>
            <span v-html="playerRole"/>
        </div>
    </div>
</template>

<script>
import Player from "../../../classes/Player";
import back from "../../../assets/img/roles/back.png";
import guard from "../../../assets/img/roles/guard.png";
import hunter from "../../../assets/img/roles/hunter.png";
import raven from "../../../assets/img/roles/raven.png";
import seer from "../../../assets/img/roles/seer.png";
import villager from "../../../assets/img/roles/villager.png";
import werewolf from "../../../assets/img/roles/werewolf.png";
import witch from "../../../assets/img/roles/witch.png";

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
            IMGs: { back, guard, hunter, raven, seer, villager, werewolf, witch },
        };
    },
    computed: {
        playerThumbnail() {
            return this.player.role.current ? this.IMGs[this.player.role.current] : this.IMGs.back;
        },
        playerRole() {
            return this.player.role.current ? this.$t(`Role.${this.player.role.current}`) : this.$t(`PlayerCard.pickRole`);
        },
    },
    methods: {
        unsetPlayer() {
            this.$emit("unsetPlayer", this.player.name);
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
        position: relative;
    }

    .unset-role-button {
        cursor: pointer;
        font-size: 0.75rem;
    }

    .unset-player-button {
        cursor: pointer;
        position: absolute;
        right: -15px;
        top: -15px;
    }
</style>