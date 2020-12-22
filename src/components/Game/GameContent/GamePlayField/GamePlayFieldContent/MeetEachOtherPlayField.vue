<template>
    <div id="meet-each-other-field" class="d-flex flex-column">
        <div id="meeting-each-other-players" class="d-flex justify-content-center">
            <span v-for="player of meetingEachOtherPlayers" :key="player._id">
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
        meetingEachOtherPlayers() {
            const { firstWaiting } = this.game;
            const meetingEachOtherPlayers = {
                "lovers": this.game.inLovePlayers,
                "two-sisters": this.game.sisterPlayers,
                "three-brothers": this.game.brotherPlayers.filter(({ isAlive }) => isAlive),
            };
            return meetingEachOtherPlayers[firstWaiting.for] ? meetingEachOtherPlayers[firstWaiting.for] : [];
        },
        meetEachOtherText() {
            if (this.game.turn === 1) {
                return this.$t("MeetEachOtherPlayField.meetEachOtherTheFirstTime");
            }
            return this.$t("MeetEachOtherPlayField.meetEachOtherForTalking");
        },
    },
};
</script>

<style scoped>

</style>