<template>
    <nav id="nav-bar" class="navbar navbar-expand navbar-dark bg-dark">
        <a @click.prevent="backToHomePage" class="navbar-brand" href="#">
            <img id="wolf-emoji" src="../../assets/img/wolf.png" alt="Wolf" class="mr-md-2 mr-0"/>
            <span v-html="$t('NavBar.werewolvesAssistant')" class="d-none d-md-inline-block"/>
        </a>
        <div class="navbar-nav d-flex w-100 justify-content-end">
            <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true">
                    <i class="fa fa-cog mr-2"/>
                    <span class="d-none d-md-inline-block" v-html="$t('NavBar.options')"/>
                </a>
                <div class="dropdown-menu">
                    <router-link class="dropdown-item" to="/">
                        <i class="fa fa-sign-out-alt mr-2"/>
                        <span v-html="$t('NavBar.quit')"/>
                    </router-link>
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

    .dropdown-menu {
        right: 0;
        left: unset !important;
    }
</style>