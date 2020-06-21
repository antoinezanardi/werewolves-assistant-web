<template>
    <div id="app">
        <transition mode="out-in" name="fade">
            <div v-if="loading" id="loading" key="loading">
                loading...
            </div>
            <router-view v-else key="werewolves-assistant" class="fade-in"/>
        </transition>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "App",
    data() {
        return {
            loading: true,
        };
    },
    async created() {
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
                this.$displayError(err);
            }
        },
    },
};
</script>