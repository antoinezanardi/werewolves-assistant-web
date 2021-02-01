<template>
    <div id="look-play-field" class="d-flex flex-column">
        <div class="row justify-content-center align-items-center">
            <div class="col-12">
                <PlayerCard :player="game.witchPlayer" size="lg"/>
            </div>
        </div>
        <div class="row justify-content-center mb-2">
            <PlayFieldActionText id="use-life-potion-play-field-action-text" :play="play" attribute="drank-life-potion" class="col-lg-6"
                                 @player-selected="playerSelected"/>
            <PlayFieldActionText id="use-death-potion-play-field-action-text" :play="play" attribute="drank-death-potion" class="col-lg-6"
                                 @player-selected="playerSelected"/>
        </div>
        <transition mode="out-in" name="fade" class="flex-grow-1">
            <div v-if="loading.potionUsage" key="loading" class="d-flex flex-grow-1 justify-content-center align-items-center">
                <Loading :text="$t('UsePotionPlayField.loadingPotions')"/>
            </div>
            <div v-else-if="!arePotionsLoaded" key="cant-find-potions"
                 class="d-flex flex-grow-1 flex-column justify-content-center align-items-center">
                <h3 class="text-muted font-italic text-center">
                    <i class="fa fa-ban mr-2"/>
                    <span v-html="$t('UsePotionPlayField.cantLoadPotions')"/>
                </h3>
                <button class="btn btn-primary" @click="retrievePotionsUsage">
                    <i class="fa fa-sync mr-2"/>
                    <span v-html="$t('UsePotionPlayField.retry')"/>
                </button>
            </div>
            <div v-else key="witch-potions" class="h-100 d-flex flex-column">
                <div class="row">
                    <div class="col-12">
                        <ul id="potion-tabs" class="nav nav-pills nav-fill">
                            <li id="life-potion-tab" class="nav-item" @click="openLifePotionPanel">
                                <a id="use-life-potion-tab" class="nav-link"
                                   :class="{ active: panel === 'life-potion', disabled: isLifePotionUsed }" href="#">
                                    <img :src="SVGs.lifePotionSVG" width="25" alt="Life Potion" class="mr-2"
                                         :class="{ 'used-potion-svg': isLifePotionUsed }"/>
                                    <span v-html="lifePotionPanelTabText"/>
                                </a>
                            </li>
                            <li id="death-potion-tab" class="nav-item" @click="openDeathPotionPanel">
                                <a id="use-death-potion-tab" class="nav-link"
                                   :class="{ active: panel === 'death-potion', disabled: isDeathPotionUsed }" href="#">
                                    <img :src="SVGs.deathPotionSVG" width="25" alt="Death Potion" class="mr-2"
                                         :class="{ 'used-potion-svg': isDeathPotionUsed }"/>
                                    <span v-html="deathPotionPanelTabText"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row flex-grow-1">
                    <div class="col-12">
                        <transition mode="out-in" name="translate-down-fade">
                            <div v-if="panel === 'life-potion'" id="use-life-potion-content" key="life-potion-panel" class="h-100">
                                <PlayerTargets :targets="game.eatenPlayers" :play="play" attribute="drank-life-potion"
                                               class="h-100" @player-selected="playerSelected"/>
                            </div>
                            <div v-else-if="panel === 'death-potion'" id="use-death-potion-content" key="death-potion-panel"
                                 class="h-100">
                                <PlayerTargets :targets="alivePlayersWithoutWerewolvesTarget" :play="play" attribute="drank-death-potion"
                                               class="h-100" @player-selected="playerSelected"/>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import lifePotionSVG from "@/assets/svg/attributes/drank-life-potion.svg";
import deathPotionSVG from "@/assets/svg/attributes/drank-death-potion.svg";
import PlayerTargets from "@/components/shared/Game/PlayerTargets/PlayerTargets";
import PlayFieldActionText from "@/components/shared/Game/PlayField/PlayFieldActionText";
import Loading from "@/components/shared/Loading";
import GameHistory from "@/classes/GameHistory";

export default {
    name: "UsePotionPlayField",
    components: { Loading, PlayFieldActionText, PlayerTargets, PlayerCard },
    props: {
        play: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            SVGs: { lifePotionSVG, deathPotionSVG },
            loading: { potionUsage: false },
            panel: undefined,
            isLifePotionUsed: undefined,
            isDeathPotionUsed: undefined,
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        useDeathPotionText() {
            const drankDeathPotionTarget = this.play.targets.find(target => target.attribute === "drank-death-potion");
            if (drankDeathPotionTarget) {
                const playerTargeted = this.game.players.find(({ _id }) => _id === drankDeathPotionTarget.player);
                return `${this.$t("UsePotionPlayField.wantsToUseDeathPotionOn")} ${playerTargeted.name}`;
            }
            return this.$t("UsePotionPlayField.doesntWantToUseDeathPotion");
        },
        lifePotionPanelTabText() {
            return this.isLifePotionUsed ? this.$t("UsePotionPlayField.lifePotionUsed") : this.$t("UsePotionPlayField.useLifePotionOn");
        },
        deathPotionPanelTabText() {
            return this.isDeathPotionUsed ? this.$t("UsePotionPlayField.deathPotionUsed") : this.$t("UsePotionPlayField.useDeathPotionOn");
        },
        alivePlayersWithoutWerewolvesTarget() {
            return this.game.alivePlayers.filter(player => !player.hasAttribute("eaten"));
        },
        arePotionsLoaded() {
            return this.isLifePotionUsed !== undefined && this.isDeathPotionUsed !== undefined;
        },
    },
    async created() {
        await this.retrievePotionsUsage();
    },
    methods: {
        playerSelected(payload) {
            this.$emit("player-selected", payload);
        },
        async retrievePotionsUsage() {
            try {
                this.loading.potionUsage = true;
                const queryStrings = { "play-source": "witch", "play-action": "use-potion" };
                const { data } = await this.$werewolvesAssistantAPI.getGameHistory(this.game._id, queryStrings);
                const witchActions = data.map(gameHistoryEntry => new GameHistory(gameHistoryEntry));
                this.isLifePotionUsed = !!witchActions.find(witchAction => witchAction.didWitchUsedLifePotion);
                this.isDeathPotionUsed = !!witchActions.find(witchAction => witchAction.didWitchUsedDeathPotion);
            } catch (e) {
                this.$error.display(e);
            } finally {
                this.loading.potionUsage = false;
            }
        },
        openLifePotionPanel() {
            if (!this.isLifePotionUsed) {
                this.panel = "life-potion";
            }
        },
        openDeathPotionPanel() {
            if (!this.isDeathPotionUsed) {
                this.panel = "death-potion";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .used-potion-svg {
        filter: grayscale(1);
    }

    .nav-link {
        transition: all 0.25s linear;
    }
</style>