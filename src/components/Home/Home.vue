<template>
    <div id="home" class="container-fluid d-flex flex-column">
        <div id="home-content" class="flex-column flex-grow-1 d-flex justify-content-center">
            <div class="row">
                <div class="col-12 text-center">
                    <img width="150" src="../../assets/img/wolf.png" alt="Wolf"/>
                    <h1 id="title" class="text-center">
                        <span id="title-wrapper" class="text-center">
                            <span v-html="$t('Home.werewolvesAssistant')"/>
                            <span id="version" class="badge badge-dark text-center text-uppercase">
                                <span v-html="'v1.0.0'"/>
                                <span class="text-muted" v-html="' - beta'"/>
                            </span>
                        </span>
                    </h1>
                    <h4 id="subtitle" class="text-center">
                        <i class="fa fa-star mr-2 text-warning"/>
                        <span class="text-secondary" v-html="$t('Home.bestToolForGameMastering')"/>
                    </h4>
                </div>
            </div>
            <div class="mt-4 d-flex justify-content-center">
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <button class="btn btn-block btn-primary text-uppercase font-weight-bold home-btn" @click="play">
                        <i class="fa fa-play-circle mr-2"/>
                        <span v-html="$t('Home.play')"/>
                    </button>
                    <transition name="fade">
                        <router-link v-if="isUserLogged" key="statistics" to="/statistics"
                                     class="btn btn-block btn-dark text-uppercase font-weight-bold home-btn mt-4">
                            <i class="far fa-chart-bar mr-2"/>
                            <span v-html="$t('Home.statistics')"/>
                        </router-link>
                    </transition>
                    <router-link key="about" to="/about" class="btn btn-block btn-dark font-weight-bold home-btn mt-4">
                        <span v-html="$t('Home.whatIsItAbout')"/>
                        <i class="fas fa-question ml-2"
                           :class="{ 'animate__animated animate__heartBeat animate__infinite': !aboutPageVisited }"/>
                    </router-link>
                    <transition name="fade" mode="out-in">
                        <button v-if="!isUserLogged" key="not-logged"
                                class="btn btn-secondary btn-block mt-4 text-uppercase font-weight-bold account-btn"
                                @click="showAccountModal">
                            <i class="fa fa-key mr-2"/>
                            <span v-html="$t('Home.logInOrSignUp')"/>
                        </button>
                        <button v-else key="logged"
                                class="btn btn-secondary btn-block mt-4 text-uppercase font-weight-bold account-btn"
                                @click="logout">
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
                <div class="col-md-4 col-2 d-flex align-items-center">
                    <a href="mailto:werewolves.assistant@gmail.com" target="_blank" class="btn btn-secondary">
                        <i class="fa fa-envelope"/>
                        <span class="d-none d-md-inline-block ml-2" v-html="$t('Home.contactMe')"/>
                    </a>
                </div>
                <div class="col-md-8 col-10 d-flex align-items-center justify-content-end">
                    <a href="https://github.com/antoinezanardi/werewolves-assistant-web" target="_blank"
                       class="btn btn-info">
                        <i class="fab fa-github"/>
                        <span class="d-none d-md-inline-block ml-2" v-html="$t('Home.thisProjectIsOpenSource')"/>
                    </a>
                    <a id="bmc-button" class="ml-2" target="_blank" href="https://www.buymeacoffee.com/antoinezanardi">
                        <img src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee"/>
                        <span id="bmc-button-text" class="d-none d-md-inline-block ml-2" v-html="$t('Home.buyMeACoffee')"/>
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
        aboutPageVisited() {
            return localStorage.getItem("aboutPageVisited") === "true";
        },
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
        height: 24px !important;
        width: 25px !important;
        margin-bottom: 1px !important;
        box-shadow: none !important;
        border: none !important;
    }

    #bmc-button {
        padding: 5px 15px 7px 10px !important;
        line-height: 24px !important;
        height: 36px !important;
        text-decoration: none !important;
        display: inline-flex !important;
        color: #FFFFFF !important;
        background-color: #FF813F !important;
        border-radius: 5px !important;
        border: 1px solid transparent !important;
        font-size: 16px !important;
        -webkit-box-sizing: border-box !important;
        box-sizing: border-box !important;
        transition: all 0.25s linear;

        #bmc-button-text {
            margin-left: 5px;
            font-size: 18px;
        }
    }

    .bmc-button:hover, .bmc-button:active, .bmc-button:focus {
        text-decoration: none !important;
        opacity: 0.85 !important;
        color: #FFFFFF !important;
    }

    #title {
        @include font-size(3rem);
        position: relative;

        #title-wrapper {
            position: relative;
        }
    }

    #subtitle {
        @include font-size(1.2rem);
    }

    #version {
        font-size: 1rem;
        position: absolute;
        right: 0;
        bottom: 100%;
    }

    #home-footer {
        padding: 15px;
    }
</style>