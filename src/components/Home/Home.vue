<template>
    <div id="home" class="container-fluid d-flex flex-column">
        <div id="home-content" class="flex-column flex-grow-1 d-flex justify-content-center">
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
                    <transition name="fade">
                        <router-link v-if="isUserLogged" to="/statistics" key="statistics"
                                     class="btn btn-block btn-dark text-uppercase font-weight-bold home-btn mt-4">
                            <i class="far fa-chart-bar mr-2"/>
                            <span v-html="$t('Home.statistics')"/>
                        </router-link>
                    </transition>
                    <transition name="fade" mode="out-in">
                        <button v-if="!isUserLogged" key="not-logged" @click="showAccountModal"
                                class="btn btn-secondary btn-block mt-4 text-uppercase font-weight-bold account-btn">
                            <i class="fa fa-key mr-2"/>
                            <span v-html="$t('Home.logInOrSignUp')"/>
                        </button>
                        <button v-else key="logged" @click="logout"
                                class="btn btn-secondary btn-block mt-4 text-uppercase font-weight-bold account-btn">
                            <i class="fa fa-sign-out-alt mr-2"/>
                            <span v-html="$t('Home.logOut')"/>
                        </button>
                    </transition>
                </div>
            </div>
        </div>
        <div id="home-footer">
            <hr class="border-dark"/>
            <div class="row">
                <div class="col-lg-6 col-2 d-flex align-items-center">
                    <a href="mailto:werewolves.assistant@gmail.com" target="_blank" class="btn btn-secondary btn-lg">
                        <i class="fa fa-envelope"/>
                        <span class="d-none d-md-inline-block ml-2" v-html="$t('Home.contactMe')"/>
                    </a>
                </div>
                <div class="col-lg-6 col-10 d-flex align-items-center justify-content-end">
                    <a href="https://github.com/antoinezanardi/werewolves-assistant-web" target="_blank"
                       class="btn btn-info btn-lg">
                        <i class="fab fa-github"/>
                        <span class="d-none d-md-inline-block ml-2" v-html="$t('Home.thisProjectIsOpenSource')"/>
                    </a>
                    <a class="bmc-button ml-2" target="_blank" href="https://www.buymeacoffee.com/antoinezanardi">
                        <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee">
                        <span class="d-none d-md-inline-block ml-2" style="margin-left:5px;font-size:18px !important;"
                              v-html="$t('Home.buyMeACoffee')"/>
                    </a>
                </div>
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
    @import "../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../assets/scss/variables";

    .home-btn {
        @include font-size(2rem);
    }

    .account-btn {
        @include font-size(1rem);
    }

    .bmc-button img {
        height: 34px !important;
        width: 35px !important;
        margin-bottom: 1px !important;
        box-shadow: none !important;
        border: none !important;
    }

    .bmc-button {
        padding: 5px 15px 7px 10px !important;
        line-height: 35px !important;
        height: 46px !important;
        text-decoration: none !important;
        display: inline-flex !important;
        color: #FFFFFF !important;
        background-color: #FF813F !important;
        border-radius: 5px !important;
        border: 1px solid transparent !important;
        font-size: 22px !important;
        -webkit-box-sizing: border-box !important;
        box-sizing: border-box !important;
        transition: all 0.25s linear;
    }

    .bmc-button:hover, .bmc-button:active, .bmc-button:focus {
        text-decoration: none !important;
        opacity: 0.85 !important;
        color: #FFFFFF !important;
    }

    #title {
        @include font-size(3rem);
    }

    #home-footer {
        padding: 15px;
    }
</style>