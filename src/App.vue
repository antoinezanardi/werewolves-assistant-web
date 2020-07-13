<template>
    <div id="app">
        <transition mode="out-in" name="fade">
            <SpinningLoader v-if="loading" key="loading"/>
            <div v-else id="werewolves-assistant" key="werewolves-assistant" class="d-flex flex-column">
                <transition name="fade-in">
                    <NavBar v-if="$route.name !== 'Home'"/>
                </transition>
                <router-view class="fade-in flex-grow-1"/>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import SpinningLoader from "./components/SpinningLoader/SpinningLoader";
import NavBar from "./components/NavBar/NavBar";

export default {
    name: "App",
    components: { NavBar, SpinningLoader },
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
                    await this.logOutUser({ toasted: false });
                }
                this.$error.display(err);
            }
        },
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