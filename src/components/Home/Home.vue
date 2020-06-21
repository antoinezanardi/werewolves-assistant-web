<template>
    <div id="home">
        <div class="row">
            <div class="col-12 text-center">
                <h1 id="title" class="text-center" v-html="$t('Home.werewolvesAssistant')"/>
                <img src="../../assets/img/wolf.png" alt="Wolf"/>
            </div>
        </div>
        <div class="row mt-4 justify-content-center">
            <div class="col-3">
                <button class="btn btn-block btn-primary text-uppercase font-weight-bold home-btn">
                    <i class="fa fa-play-circle mr-2"/>
                    <span v-html="$t('Home.play')"/>
                </button>
            </div>
        </div>
        <div id="home-footer" class="row">
            <div class="col-12 text-center">
                <hr class="border-dark"/>
                <button v-if="!isUserLogged" @click="showAccountModal" class="btn btn-secondary">
                    <i class="fa fa-key mr-2"/>
                    <span v-html="$t('Home.logInOrSignUp')"/>
                </button>
                <button v-else class="btn btn-secondary">
                    <i class="far fa-chart-bar mr-2"/>
                    <span v-html="$t('Home.statistics')"/>
                </button>
            </div>
        </div>
        <AccountModal ref="AccountModal"/>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AccountModal from "./AccountModal";

export default {
    name: "Home",
    components: { AccountModal },
    computed: {
        ...mapGetters("user", {
            isUserLogged: "isLogged",
        }),
    },
    methods: {
        showAccountModal() {
            this.$refs.AccountModal.show();
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
        position: fixed;
        bottom: 0;
        padding: 25px;
        width: 100%;
    }
</style>