<template>
    <nav id="nav-bar" class="navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand" href="#" @click.prevent="backToHomePage">
            <img id="wolf-emoji" src="../../assets/img/wolf.png" alt="Wolf" class="mr-md-2 mr-0"/>
            <span class="d-none d-md-inline-block" v-html="$t('NavBar.werewolvesAssistant')"/>
        </a>
        <div class="navbar-nav d-flex w-100 justify-content-end">
            <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true">
                    <i class="fa fa-cog mr-2"/>
                    <span class="d-none d-md-inline-block" v-html="$t('NavBar.options')"/>
                </a>
                <div class="dropdown-menu animate__animated animate__zoomIn animate__faster">
                    <a v-if="$route.name === 'Game' && game.status === 'playing'" href="#" class="dropdown-item"
                       @click.prevent="cancelGame">
                        <i class="fa fa-times-circle text-danger mr-2"/>
                        <span v-html="$t('NavBar.cancelGame')"/>
                    </a>
                    <router-link class="dropdown-item" to="/">
                        <i class="fa fa-sign-out-alt mr-2"/>
                        <span v-html="$t('NavBar.quit')"/>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Swal from "sweetalert2";
import { mapActions, mapGetters } from "vuex";

export default {
    name: "NavBar",
    computed: { ...mapGetters("game", { game: "game" }) },
    methods: {
        ...mapActions("game", { setGame: "setGame" }),
        async backToHomePage() {
            await this.$router.push("/");
        },
        confirmCancelGame() {
            return Swal.fire({
                title: this.$t("NavBar.areYouSureYouWantToCancelGame"),
                text: this.$t("NavBar.thisCantBeUndo"),
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("NavBar.confirm"),
                cancelButtonText: this.$t("NavBar.cancel"),
            });
        },
        async cancelGame() {
            try {
                const { value } = await this.confirmCancelGame();
                if (value) {
                    const { data } = await this.$werewolvesAssistantAPI.patchGame(this.game._id, { status: "canceled" });
                    this.$toasted.success(this.$t("NavBar.gameCanceled"), { icon: "check" });
                    await this.setGame(data);
                }
            } catch (e) {
                this.$error.display(e);
            }
        },
    },
};
</script>

<style scoped>
#nav-bar {
    height: 60px;
}

#wolf-emoji {
    height: 30px;
}

.dropdown-menu {
    right: 0;
    left: unset !important;
}
</style>