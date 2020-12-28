<template>
    <div id="game-result">
        <img :src="winnersIcon" width="100" alt="Winner Icon" class="mr-2"/>
        <img :src="SVGs.trophy" width="100" alt="Trophy"
             :class="{ 'animate__animated animate__tada animate__infinite animate__slower': game.won.by, 'no-winner': !game.won.by }"/>
        <h2 class="mt-4" v-html="winnersText"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import trophy from "@/assets/svg/game/trophy.svg";
import dead from "@/assets/svg/attributes/dead.svg";
import eaten from "@/assets/svg/attributes/eaten.svg";
import inLove from "@/assets/svg/attributes/in-love.svg";
import villager from "@/assets/svg/roles/villager.svg";

export default {
    name: "GameResult",
    data() {
        return { SVGs: { trophy } };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        winnersIcon() {
            const winners = {
                werewolves: eaten,
                villagers: villager,
                lovers: inLove,
            };
            return winners[this.game.won.by] ? winners[this.game.won.by] : dead;
        },
        winnersText() {
            const winners = this.game.won.by ? this.game.won.by : "nobody";
            return this.$tc(`GameResult.wonBy.${winners}`, this.winners.length);
        },
        winners() {
            const winners = {
                werewolves: this.game.werewolfPlayers,
                villagers: this.game.villagerPlayers,
                lovers: this.game.inLovePlayers,
            };
            return winners[this.game.won.by] ? winners[this.game.won.by] : [];
        },
    },
};
</script>

<style lang="scss">
    img {
        z-index: 300;
        .no-winner {
            filter: grayscale(1);
        }
    }
</style>