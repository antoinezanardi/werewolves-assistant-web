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
import { inGameSection } from "../../helpers/functions/Router";

export default {
    name: "NavBar",
    methods: {
        confirmBackToPage() {
            return Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
            });
        },
        async backToHomePage() {
            if (inGameSection(this.$route.name)) {
                const { value } = await this.confirmBackToPage();
                if (value) {
                    await this.$router.push("/");
                }
            } else {
                await this.$router.push("/");
            }
        },
    },
};
</script>

<style scoped>
    #wolf-emoji {
        height: 30px;
    }
</style>