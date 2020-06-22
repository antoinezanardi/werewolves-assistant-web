<template>
    <div id="app">
        <transition mode="out-in" name="fade">
            <SpinningLoader v-if="loading" key="loading"/>
            <router-view v-else key="werewolves-assistant" class="fade-in"/>
        </transition>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import SpinningLoader from "./components/SpinningLoader/SpinningLoader";

export default {
    name: "App",
    components: { SpinningLoader },
    data() {
        return {
            loading: true,
        };
    },
    async mounted() {
        await this.checkTokenAndLogin();
        this.loading = false;
    },
    methods: {
        ...mapActions("user", {
            checkUserTokenAndLogin: "checkTokenAndLogin",
            logOutUser: "logout",
        }),
        async checkTokenAndLogin() {
            try {
                await this.checkUserTokenAndLogin();
            } catch (err) {
                if (this.$route.name !== "login") {
                    await this.logOutUser();
                }
                this.$error.display(err);
            }
        },
    },
};
</script>