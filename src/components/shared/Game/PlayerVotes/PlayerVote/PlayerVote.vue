<template>
    <div :id="`player-vote-${player._id}`" class="player-vote d-flex flex-column align-items-center p-2">
        <PlayerCard :player="player" :is-nominated="isNominated"/>
        <div class="mb-1 vote-for-text text-center" :class="{ 'text-success': hasVoted }">
            <transition mode="out-in" name="translate-down-fade">
                <i v-if="hasVoted" v-tooltip="$t('PlayerVote.playerHasVoted')" class="fa fa-vote-yea mr-2"/>
            </transition>
            <span class="font-italic" v-html="voteText"/>
        </div>
        <VSelect v-if="player.canVote" :options="targetablePlayersExceptHimself" :placeholder="$t('PlayerVote.none')" :filter="filterByPlayerName"
                 label="name" :class="{ 'border-success': hasVoted }" @input="playerVotes">
            <template #selected-option="{ role, name }">
                <RoleImage :role="role.current" class="role-image-option mr-2"/>
                <span class="text-truncate" v-html="name"/>
            </template>
            <template #option="{ role, name }">
                <RoleImage :role="role.current" class="role-image-option mr-2"/>
                <span class="text-truncate" v-html="name"/>
            </template>
            <template #no-options>
                <i class="fa fa-ban mr-2"/>
                <span v-html="$t('VSelect.noOption')"/>
            </template>
        </VSelect>
        <div class="player-voters mt-1">
            <transition-group tag="div" name="translate-down-fade" class="d-flex justify-content-center flex-wrap">
                <PlayerVoter v-for="voter of votersAgainstPlayer" :key="voter._id" :player="voter" class="m-1"/>
                <i v-if="player.hasActiveAttribute('raven-marked', game)" key="raven-mark" v-tooltip="ravenMarkTooltip"
                   class="fa fa-crow m-1"/>
            </transition-group>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Player from "@/classes/Player";
import PlayerCard from "../../PlayerCard";
import RoleImage from "../../Role/RoleImage";
import { getNominatedPlayers } from "@/helpers/functions/Player";
import { fuseSearch } from "@/helpers/functions/VSelect";
import PlayerVoter from "@/components/shared/Game/PlayerVotes/PlayerVote/PlayerVoter";

export default {
    name: "PlayerVote",
    components: { PlayerVoter, RoleImage, PlayerCard },
    props: {
        player: {
            type: Player,
            required: true,
        },
        play: {
            type: Object,
            required: true,
        },
        targetablePlayers: {
            type: Array,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        targetablePlayersExceptHimself() {
            return this.targetablePlayers.filter(({ name }) => name !== this.player.name);
        },
        isNominated() {
            const nominatedPlayers = getNominatedPlayers(this.play.votes, this.game, this.game.firstWaiting.to);
            return nominatedPlayers ? !!nominatedPlayers.find(({ _id }) => _id === this.player._id) : undefined;
        },
        votersAgainstPlayer() {
            const votesAgainstPlayer = this.play.votes.filter(({ for: target }) => target === this.player._id);
            return votesAgainstPlayer.map(({ from: source }) => this.game.getPlayerWithId(source));
        },
        hasVoted() {
            return this.play.votes.find(({ from: source }) => source === this.player._id);
        },
        voteText() {
            return this.player.canVote(this.game) ? this.$t("PlayerVote.voteFor") : this.$t("PlayerVote.cantVote");
        },
        ravenMarkTooltip() {
            const { markPenalty } = this.game.options.roles.raven;
            return this.$tc("PlayerVote.playerIsRavenMarked", markPenalty, { markPenalty });
        },
    },
    methods: {
        filterByPlayerName(option, search) {
            return fuseSearch(option, search, ["name"]);
        },
        playerVotes(target) {
            target = target ? target._id : null;
            const vote = { from: this.player._id, for: target };
            this.$emit("player-votes", vote);
        },
    },
};
</script>

<style scoped>
    .vote-for-text {
        width: 100%;
        color: #999999;
        padding: 3px 6px;
        transition: all 0.5s ease;
    }

    .role-image-option {
        width: 22px;
        border: 1px solid grey;
    }

    .player-voters {
        min-height: 25px;
    }
</style>