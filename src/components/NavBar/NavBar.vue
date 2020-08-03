<template>
    <nav id="nav-bar" class="navbar navbar-dark bg-dark">
        <a @click.prevent="backToHomePage" class="navbar-brand" href="#">
            <img id="wolf-emoji" src="../../assets/img/wolf.png" height="30" alt="Wolf" class="mr-2"/>
            {{ $t('NavBar.werewolvesAssistant') }}
        </a>
    </nav>
</template>

<script>

export default {
    name: "NavBar",
    methods: {
        async backToHomePage() {
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