<template>
    <nav id="nav-bar" class="navbar navbar-dark bg-dark">
        <a @click.prevent="backToHomePage" class="navbar-brand" href="#">
            <img id="wolf-emoji" src="../../assets/img/wolf.png" height="30" alt="Wolf" class="mr-2"/>
            {{ $t('NavBar.werewolvesAssistant') }}
        </a>
    </nav>
</template>

<script>
import Swal from "sweetalert2";
// import { inGameSection } from "../../helpers/functions/Router";

export default {
    name: "NavBar",
    methods: {
        confirmBackToPage() {
            const routeNameText = {
                GameLobby: this.$t("NavBar.gameCompositionNotFinished"),
                Game: this.$t("NavBar.yourProgressIsSaved"),
            };
            return Swal.fire({
                title: this.$t("NavBar.areYouSureYouWantToQuit"),
                text: routeNameText[this.$route.name],
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: this.$t("NavBar.quit"),
                cancelButtonText: this.$t("NavBar.cancel"),
            });
        },
        async backToHomePage() {
            // if (inGameSection(this.$route.name)) {
            //     const { value } = await this.confirmBackToPage();
            //     if (value) {
            //         await this.$router.push("/");
            //     }
            // } else {
            // }
            await this.$router.push("/");
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
</style>