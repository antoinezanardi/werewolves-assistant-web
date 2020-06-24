<template>
    <div id="game-lobby-already-have-playing-game" class="row">
        <div class="col-12">
            <h1>
                <i class="fa fa-gamepad text-primary mr-3"/>
                <span v-html="$t('GameLobbyAlreadyHavePlayingGame.youAlreadyHavePlayingGame')"/>
            </h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "GameLobbyAlreadyHavePlayingGame",
};
</script>

<style scoped>

</style>