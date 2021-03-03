<template>
    <div id="app">
        <transition mode="out-in" name="fade">
            <SpinningLoader v-if="loading" key="loading"/>
            <NotAvailable v-else-if="unavailableAPI"/>
            <div v-else id="werewolves-assistant" key="werewolves-assistant" class="d-flex flex-column">
                <transition name="fade-in">
                    <NavBar v-if="$route.name !== 'Home'" ref="navBar"/>
                </transition>
                <router-view class="fade-in flex-grow-1" @show-game-options-modal="showGameOptionsModal"/>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import i18n from "@/plugins/vue-i18n";
import SpinningLoader from "@/components/SpinningLoader/SpinningLoader";
import NavBar from "@/components/NavBar/NavBar";
import NotAvailable from "@/components/NotAvailable/NotAvailable";

export default {
    name: "App",
    components: { NotAvailable, NavBar, SpinningLoader },
    data() {
        return { loading: true, unavailableAPI: false };
    },
    async mounted() {
        try {
            await this.checkTokenAndLogin();
            await this.getAndSetRoles();
        } catch (e) {
            this.unavailableAPI = true;
        } finally {
            this.loading = false;
        }
    },
    methods: {
        ...mapActions("user", {
            checkUserTokenAndLogin: "checkTokenAndLogin",
            logOutUser: "logout",
        }),
        ...mapActions("role", { getAndSetRoles: "getAndSetRoles" }),
        async checkTokenAndLogin() {
            try {
                await this.checkUserTokenAndLogin();
            } catch (err) {
                if (this.$route.name !== "login") {
                    await this.logOutUser({ toasted: false });
                }
                this.$error.display(err);
            }
        },
        showGameOptionsModal(options) {
            if (this.$refs.navBar) {
                this.$refs.navBar.showGameOptionsModal(options);
            }
        },
    },
    metaInfo: {
        htmlAttrs: { lang: i18n.t("App.metaInfo.lang") },
        title: i18n.t("App.metaInfo.title"),
        meta: [
            { charset: "UTF-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1.0" },
            { "http-equiv": "X-UA-Compatible", "content": "IE=edge" },
            { name: "description", content: i18n.t("App.metaInfo.description") },
            { name: "keywords", content: i18n.t("App.metaInfo.keywords") },
        ],
    },
};
</script>

<style lang="scss">
    #app {
        height: 100%;
        #werewolves-assistant {
            height: 100%;
        }
    }
</style>