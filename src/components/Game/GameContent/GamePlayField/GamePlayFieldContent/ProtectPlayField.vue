<template>
    <div id="protect-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12 col-lg-4">
                <PlayerCard id="guard-player-card" :player="game.guardPlayer" size="lg"/>
            </div>
        </div>
        <PlayFieldActionText :play="play" attribute="protected" @player-selected="playerSelected"/>
        <transition mode="out-in" name="fade" class="flex-grow-1">
            <div v-if="loading.lastProtectEntry" key="loading" class="d-flex flex-grow-1 justify-content-center align-items-center">
                <Loading :text="$t('ProtectPlayField.loadingTargets')"/>
            </div>
            <div v-else-if="!protectablePlayers" key="cant-load-targets"
                 class="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
                <h3 class="text-muted font-italic text-center">
                    <i class="fa fa-ban mr-2"/>
                    <span v-html="$t('ProtectPlayField.cantLoadGuardTargets')"/>
                </h3>
                <button class="btn btn-primary" @click="retrieveProtectablePlayers">
                    <i class="fa fa-sync mr-2"/>
                    <span v-html="$t('ProtectPlayField.retry')"/>
                </button>
            </div>
            <PlayerTargets v-else key="targets" :targets="protectablePlayers" :play="play" attribute="protected" @player-selected="playerSelected"/>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import GameHistory from "@/classes/GameHistory";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import PlayerTargets from "@/components/shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";
import Loading from "@/components/shared/Loading";

export default {
    name: "ProtectPlayField",
    components: { Loading, PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            loading: { lastProtectEntry: false },
            protectablePlayers: undefined,
        };
    },
    computed: { ...mapGetters("game", { game: "game" }) },
    async created() {
        await this.retrieveProtectablePlayers();
    },
    methods: {
        async retrieveProtectablePlayers() {
            try {
                this.loading.lastProtectEntry = true;
                const queryStrings = { "play-source": "guard", "play-action": "protect" };
                const { data } = await this.$werewolvesAssistantAPI.getGameHistory(this.game._id, queryStrings);
                const guardActions = data.map(gameHistoryEntry => new GameHistory(gameHistoryEntry));
                if (guardActions.length) {
                    const lastGuardAction = guardActions[guardActions.length - 1];
                    this.protectablePlayers = this.game.alivePlayers.filter(({ _id }) => _id !== lastGuardAction.play.targets[0].player._id);
                } else {
                    this.protectablePlayers = this.game.alivePlayers;
                }
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading.lastProtectEntry = false;
            }
        },
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
    },
};
</script>

<style scoped>

</style>