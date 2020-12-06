<template>
    <div id="meet-each-other-field" class="d-flex flex-column">
        <div class="d-flex justify-content-center">
            <span v-for="player of wakingUpPlayers" :key="player._id">
                <PlayerCard :player="player" size="lg"/>
            </span>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center" v-html="meetEachOtherText"/>
            </div>
        </div>
        <NoActionExpected class="flex-grow-1 d-flex align-items-center justify-content-center"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import PlayerCard from "@/components/shared/Game/PlayerCard";
import NoActionExpected from "@/components/shared/Game/NoActionExpected/NoActionExpected";

export default {
    name: "MeetEachOtherPlayField",
    components: { NoActionExpected, PlayerCard },
    computed: {
        ...mapGetters("game", { game: "game" }),
        wakingUpPlayers() {
            if (this.game.firstWaiting.for === "lovers") {
                return this.game.inLovePlayers;
            }
            return [];
        },
        meetEachOtherText() {
            if (this.game.firstWaiting.for === "lovers") {
                return this.$t("MeetEachOtherPlayField.meetEachOtherTheFirstTime");
            }
            return "";
        },
    },
};
</script>

<style scoped>

</style>