<template>
    <div id="home" class="container-fluid d-flex flex-column">
        <div id="home-content" class="flex-column flex-grow-1 d-flex justify-content-center">
            <Particles id="home-particles" :options="particles.options"/>
            <div class="row">
                <div class="col-12 text-center">
                    <img id="home-logo" src="../../assets/img/wolf.png" alt="Wolf"/>
                    <h1 id="title" class="text-center">
                        <span id="title-wrapper" class="text-center">
                            <span v-html="$t('Home.werewolvesAssistant')"/>
                            <a id="version" v-tooltip="$t('Home.checkChangelogOnGithub')" target="_blank"
                               href="https://github.com/antoinezanardi/werewolves-assistant-web/blob/master/CHANGELOG.md"
                               class="badge badge-dark text-center text-uppercase">
                                <i class="fab fa-github mr-2 text-white"/>
                                <span v-html="'v1.0.0'"/>
                                <span class="text-muted" v-html="' - beta'"/>
                            </a>
                        </span>
                    </h1>
                    <h4 id="subtitle" class="text-center">
                        <i class="fa fa-star mr-2 text-warning"/>
                        <span class="text-gray" v-html="$t('Home.bestToolForGameMastering')"/>
                    </h4>
                </div>
            </div>
            <div class="mt-4 d-flex justify-content-center">
                <div class="col-lg-4 col-md-6 col-sm-12">
                    <button id="play-btn" class="btn btn-block btn-primary text-uppercase font-weight-bold" @click="play">
                        <i class="fa fa-play-circle mr-2"/>
                        <span v-html="$t('Home.play')"/>
                    </button>
                    <transition name="fade">
                        <router-link v-if="isUserLogged" key="statistics" to="/statistics"
                                     class="btn btn-block btn-dark font-weight-bold home-btn mt-4">
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
                                class="btn btn-secondary btn-block mt-4 font-weight-bold home-btn"
                                @click="showAccountModal">
                            <i class="fa fa-key mr-2"/>
                            <span v-html="$t('Home.logInOrSignUp')"/>
                        </button>
                        <button v-else key="logged"
                                class="btn btn-secondary btn-block mt-4 font-weight-bold home-btn"
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
import homeParticleOptions from "@/assets/json/home-particles-options.json";

export default {
    name: "Home",
    components: { AccountModal },
    data() {
        return { particles: { options: homeParticleOptions } };
    },
    computed: {
        ...mapGetters("user", { isUserLogged: "isLogged" }),
        aboutPageVisited() {
            return localStorage.getItem("aboutPageVisited") === "true";
        },
    },
    methods: {
        ...mapActions("user", { logout: "logout" }),
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
    @import "../../../node_modules/bootstrap/scss/bootstrap-grid";

    #play-btn {
        font-size: 1.5rem;
        @include media-breakpoint-up(md) {
            font-size: 2rem;
        }
    }

    .home-btn {
        font-size: 1.2rem;
        @include media-breakpoint-up(md) {
            font-size: 1.5rem;
        }
    }

    .bmc-button img {
        height: 24px !important;
        width: 25px !important;
        margin-bottom: 1px !important;
        box-shadow: none !important;
        border: none !important;
    }

    #bmc-button {
        padding: 5px 0 7px 15px !important;
        line-height: 24px !important;
        height: 38px !important;
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
        font-size: 1.5rem;
        @include media-breakpoint-up(md) {
            font-size: 3rem;
        }
        position: relative;
        text-shadow: 1px 1px 3px black;
        #title-wrapper {
            position: relative;
        }
    }

    #subtitle {
        font-size: 1rem;
        @include media-breakpoint-up(md) {
            font-size: 1.2rem;
        }
        text-shadow: 1px 1px 3px black;
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

    #home-logo {
        width: 120px;
        @include media-breakpoint-up(md) {
            width: 150px;
        }
    }

    #home-particles {
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
    }

    #home {
        background: url("https://images6.alphacoders.com/559/559873.jpg") no-repeat
        center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
</style>