<template>
    <div id="about" class="container page-with-navbar">
        <div class="row mt-2">
            <div class="col-12">
                <h1 class="section-title">
                    <RoleImage role="werewolf" class="rounded" alt="werewolf"/>
                    <span class="ml-3" v-html="$t('About.werewolvesAssistantWhatFor')"/>
                </h1>
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="row justify-content-between align-items-center">
                    <div class="col-lg-8 col-12">
                        <h3 class="section-subtitle">
                            <i class="fas fa-dice fa-2x mr-3 text-primary"/>
                            <span v-html="`${$t('About.theGame')} ${$t('About.werewolvesOfMillersHollowTM')}`"/>
                        </h3>
                    </div>
                    <div class="col-lg-4 col-12">
                        <a v-tooltip="$t('About.watchYouTubeVideo')" class="btn btn-primary btn-block"
                           href="https://www.youtube.com/watch?v=3HUz8CAORro" target="_blank">
                            <i class="fa fa-question-circle mr-2"/>
                            <span v-html="$t('About.iDontKnowThisGame')"/>
                        </a>
                    </div>
                </div>
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row section-content">
            <div class="col-12">
                <p v-html="`${$t('About.werewolvesOfMillersHollowTM')} ${$t('About.isAGame')} `"/>
                <p v-html="$t('About.forAGameToBeSuccessful')"/>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <h3 class="section-subtitle">
                    <i class="fas fa-star fa-2x mr-3 text-warning"/>
                    <span v-html="$t('About.werewolvesAssistantIsHere')"/>
                </h3>
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row section-content">
            <div class="col-12">
                <p v-html="$t('About.forHelpingGameMaster')"/>
                <p v-html="$t('About.theAssistantHasManyFeaturesLike')"/>
                <ul>
                    <li v-html="$t('About.screenForGameComposition')"/>
                    <li class="mt-3" v-html="$t('About.interfaceForGameMonitoring')"/>
                    <li class="mt-3" v-html="$t('About.interfaceForEachActionAndEvents')"/>
                    <li class="mt-3" v-html="$t('About.gameSummaryWhenPartyIsDone')"/>
                </ul>
                <p v-html="$t('About.assistantIsFreeAndAvailable')"/>
                <p class="text-center">
                    <i class="fa fa-exclamation-triangle fa-2x text-warning mr-3"/>
                    <span class="font-weight-bold" v-html="$t('About.attentionPlease')"/>
                </p>
                <hr class="bg-dark"/>
                <p v-html="$t('About.assistantDoesntReplaceTheOriginalGame')"/>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <h3 class="section-subtitle">
                    <RoleImage :role="undefined" class="mr-3"/>
                    <span v-html="$t('About.availableRoles')"/>
                </h3>
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row section-content">
            <div class="col-12">
                <p v-html="$tc('About.thereAreCountAvailableRoles', roles.length, { count: roles.length })"/>
                <div id="roles-accordion" class="accordion">
                    <AboutRole v-for="role in roles" :key="role.name" :role="role"/>
                </div>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <h3 class="section-subtitle">
                    <i class="fas fa-hands-helping fa-2x mr-3 text-success"/>
                    <span v-html="$t('About.howToContribute')"/>
                </h3>
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row section-content">
            <div class="col-12">
                <p v-html="$t('About.someMethodsToContribute')"/>
                <ul>
                    <li>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <div>
                                <span v-html="`${$t('About.theAssistantIsOpenSource')} ${$t('About.availableOnGitHub')} `"/>
                                <a target="_blank" href="https://github.com/antoinezanardi/werewolves-assistant-web"
                                   v-html="`${$t('About.atThisAddress')}`"/>
                                <span v-html="`, ${$t('About.pleaseAddAStar')}`"/>
                            </div>
                            <div class="mt-3">
                                <gh-btns-star slug="antoinezanardi/werewolves-assistant-web" show-count/>
                                <gh-btns-follow user="antoinezanardi" show-count/>
                            </div>
                        </div>
                    </li>
                    <li class="mt-4">
                        <span v-html="`${$t('About.thisProjectNotWithoutFees')} `"/>
                        <a target="_blank" href="https://www.buymeacoffee.com/antoinezanardi"
                           v-html="$t('About.hisBuyMeACoffeePage')"/>
                        <span v-html="'.'"/>
                    </li>
                    <li class="mt-4" v-html="$t('About.speakAboutThisProject')"/>
                </ul>
            </div>
        </div>
        <div class="row mt-4">
            <div class="col-12">
                <h3 class="section-subtitle">
                    <i class="fas fa-pen-fancy fa-2x mr-3 text-info"/>
                    <span v-html="$t('About.aWordFromCreator')"/>
                </h3>
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row section-content">
            <div class="col-12">
                <p>
                    <span v-html="`${$t('About.ImTheCreator')} `"/>
                    <a href="https://www.antoinezanardi.fr/" target="_blank" v-html="$t('About.myPortfolio')"/>
                    <span v-html="'.'"/>
                </p>
                <p v-html="`${$t('About.forMe')}, ${$t('About.werewolvesOfMillersHollowTM')} ${$t('About.isOneOfTheBestGame')}`"/>
                <p v-html="$t('About.ImAFanOfGameMastering')"/>
                <p>
                    <span v-html="$t('About.pleaseRateThisProjectAndHaveFun')"/>
                    <i class="fa fa-hand-peace animate__animated animate__tada animate__slow animate__infinite text-warning"/>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <hr class="bg-dark"/>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-lg-4">
                <router-link class="btn btn-secondary btn-block mb-3" to="/">
                    <i class="fa fa-sign-out-alt mr-2"/>
                    <span v-html="$t('Statistics.backToHome')"/>
                </router-link>
            </div>
        </div>
        <BackToTop v-tooltip="{ content: $t('About.backToTop'), trigger: 'focus hover' }" :visibleoffset="100">
            <i class="fa fa-chevron-up fa-2x"/>
        </BackToTop>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import AboutRole from "@/components/About/AboutRole";
import { i18n } from "@/plugins";

export default {
    name: "About",
    components: { AboutRole, RoleImage },
    computed: { ...mapGetters("role", { roles: "roles" }) },
    created() {
        localStorage.setItem("aboutPageVisited", "true");
    },
    metaInfo: { titleTemplate: `%s - ${i18n.t("About.metaInfo.title")}` },
};
</script>

<style lang="scss" scoped>
    @import "../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../assets/scss/variables";

    .section-title {
        display: flex;
        justify-content: center;
        align-content: center;
        @include font-size(2.5rem);

        img {
            width: 65px;
            height: 65px;
        }
        span {
            display: flex;
            align-items: center;
            text-align: center;
        }
    }

    .section-subtitle {
        display: flex;
        align-content: center;
        @include font-size(1.75rem);

        i {
            display: flex;
            align-items: center;
        }
        img {
            width: 65px;
            height: 65px;
        }
        span {
            display: flex;
            align-items: center;
            text-align: center;
        }
    }

    .section-content {
        @include font-size(1.15rem);
        text-align: justify;
    }
</style>