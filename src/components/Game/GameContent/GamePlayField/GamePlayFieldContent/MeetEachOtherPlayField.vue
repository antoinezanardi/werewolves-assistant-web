<template>
    <div id="meet-each-other-field" class="d-flex flex-column">
        <div id="meeting-each-other-players" class="row justify-content-center align-items-center">
            <PlayerCard v-for="player of game.alivePlayersExpectedToPlay" :key="player.name" :player="player" size="lg"
                        class="col-6 col-md-4 col-lg-3"/>
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
        meetEachOtherText() {
            const { firstWaiting } = this.game;
            if (firstWaiting.for === "charmed") {
                return this.$t("MeetEachOtherPlayField.meetEachOtherInSilence");
            } else if (this.game.turn === 1) {
                return this.$t("MeetEachOtherPlayField.meetEachOtherTheFirstTime");
            }
            return this.$t("MeetEachOtherPlayField.meetEachOtherForTalking");
        },
    },
};
</script>

<style scoped>

</style>