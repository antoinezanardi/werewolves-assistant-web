<template>
    <div id="home" class="container-fluid d-flex flex-column">
        <div id="home-content" class="flex-column flex-grow-1">
            <div class="row">
                <div class="col-12 text-center">
                    <h1 id="title" class="text-center" v-html="$t('Home.werewolvesAssistant')"/>
                    <img src="../../assets/img/wolf.png" alt="Wolf"/>
                </div>
            </div>
            <div class="mt-4 d-flex justify-content-center">
                <div class="col-lg-3 col-sm-12">
                    <button @click="play" class="btn btn-block btn-primary text-uppercase font-weight-bold home-btn">
                        <i class="fa fa-play-circle mr-2"/>
                        <span v-html="$t('Home.play')"/>
                    </button>
                    <transition name="fade" mode="out-in">
                        <router-link v-if="isUserLogged" to="/statistics"
                                     class="btn btn-block btn-dark text-uppercase font-weight-bold home-btn mt-4">
                            <i class="far fa-chart-bar mr-2"/>
                            <span v-html="$t('Home.statistics')"/>
                        </router-link>
                    </transition>
                </div>
            </div>
        </div>
        <div id="home-footer" class="">
            <div class="col-12 text-center">
                <hr class="border-dark"/>
                <transition name="fade" mode="out-in">
                    <div v-if="!isUserLogged" key="not-logged">
                        <button @click="showAccountModal" class="btn btn-secondary">
                            <i class="fa fa-key mr-2"/>
                            <span v-html="$t('Home.logInOrSignUp')"/>
                        </button>
                    </div>
                    <div v-else key="logged">
                        <button @click="logout" class="btn btn-secondary">
                            <i class="fa fa-sign-out-alt mr-2"/>
                            <span v-html="$t('Home.logOut')"/>
                        </button>
                    </div>
                </transition>
            </div>
        </div>
        <AccountModal ref="AccountModal"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AccountModal from "./AccountModal/AccountModal";

export default {
    name: "Home",
    components: { AccountModal },
    computed: {
        ...mapGetters("user", {
            isUserLogged: "isLogged",
        }),
    },
    methods: {
        ...mapActions("user", {
            logout: "logout",
        }),
        showAccountModal() {
            this.$refs.AccountModal.show();
        },
        play() {
            if (this.isUserLogged) {
                this.$router.push("/game-lobby");
            } else {
                this.showAccountModal();
                this.$toasted.info(this.$t("Home.youMustLogInToPlay"), { icon: "info-circle" });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    .home-btn {
        font-size: 2rem;
    }

    #title {
        font-size: 3.5rem;
    }

    #home-footer {
        padding: 15px;
    }
</style>