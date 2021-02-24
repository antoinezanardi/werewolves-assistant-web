<template>
    <div id="choose-sign-play-field" class="d-flex flex-column">
        <div class="row">
            <div class="col-12">
                <PlayerCard :player="game.stutteringJudgePlayer" size="lg"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h3 class="text-center" v-html="$t('ChooseSignPlayField.choosesHisSign')"/>
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
    name: "ChooseSignPlayField",
    components: { NoActionExpected, PlayerCard },
    computed: { ...mapGetters("game", { game: "game" }) },
};
</script>

<style scoped>

</style>