<template>
    <div id="game-content-header">
        <div class="row align-items-center">
            <div id="game-phase" class="col-2 font-weight-bold">
                <span class="fa mr-2" :class="gamePhaseClasses"/>
                <span class="mr-2" v-html="gamePhaseText"/>
                <span v-html="game.turn"/>
            </div>
            <div class="col-10">
                <h1>
                    <span v-html="game.firstWaiting"/>
                </h1>
            </div>
        </div>
    </div>
</template>

<script>
import Game from "../../../../classes/Game";

export default {
    name: "GameContentHeader",
    props: {
        game: {
            type: Game,
            required: true,
        },
    },
    computed: {
        gamePhaseClasses() {
            return this.game.phase === "day" ? "fa-sun sun-color" : "fa-moon moon-color";
        },
        gamePhaseText() {
            return this.game.phase === "day" ? this.$t("GameContentHeader.day") : this.$t("GameContentHeader.night");
        },
    },
};
</script>

<style scoped>
    #game-phase {
        font-size: 1.5rem;
    }

    .sun-color {
        color: #FFE321
    }

    .moon-color {
        color: #96C8FF;
    }
</style>