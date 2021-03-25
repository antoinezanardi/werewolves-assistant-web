<template>
    <div id="account-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"
         data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div id="account-modal-title" class="modal-title">
                        <ul class="nav nav-pills nav-fill">
                            <li class="nav-item">
                                <a class="nav-link" :class="{ active: panel === 'log-in' }" href="#" :disabled="loading"
                                   @click.prevent="switchPanel('log-in')">
                                    <i class="fa fa-sign-in-alt mr-2"/>
                                    <span v-html="$t('AccountModal.logIn')"/>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" :class="{ active: panel === 'register' }" href="#"
                                   :disabled="loading" @click.prevent="switchPanel('register')">
                                    <i class="fa fa-user-plus mr-2"/>
                                    <span v-html="$t('AccountModal.register')"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <ValidationObserver #default="{ invalid }" ref="accountModalValidationObserver">
                    <form @submit.prevent="submit">
                        <div class="modal-body">
                            <transition mode="out-in" name="switch-panel">
                                <LoginPanel v-if="panel === 'log-in'" ref="loginPanel" key="log-in-panel"
                                            :loading="loading" class="account-panel" @open-register-tab="panel = 'register'"
                                            @hide-account-modal="hide"/>
                                <RegisterPanel v-else-if="panel === 'register'" ref="registerPanel" key="register-panel"
                                               :loading="loading" class="account-panel" @open-login-tab="panel = 'log-in'"/>
                            </transition>
                        </div>
                        <div class="modal-footer d-flex justify-content-between">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" :disabled="loading">
                                <i class="fa fa-times mr-2"/>
                                <span v-html="$t('AccountModal.close')"/>
                            </button>
                            <SubmitButton classes="btn btn-primary" :loading="loading" :disabled="invalid">
                                <span v-html="submitBtnText"/>
                            </SubmitButton>
                        </div>
                    </form>
                </ValidationObserver>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import { mapActions } from "vuex";
import $ from "jquery";
import SubmitButton from "@/components/shared/Forms/SubmitButton";
import LoginPanel from "./LoginPanel";
import RegisterPanel from "./RegisterPanel";
import { isAPIError } from "@/helpers/functions/Error";

export default {
    name: "AccountModal",
    components: { RegisterPanel, LoginPanel, SubmitButton },
    data() {
        return {
            panel: "log-in",
            loading: false,
        };
    },
    computed: {
        submitBtnText() {
            return this.panel === "log-in" ? this.$t("AccountModal.logIn") : this.$t("AccountModal.register");
        },
    },
    methods: {
        ...mapActions("user", { login: "login" }),
        show() {
            this.switchPanel("log-in");
            Vue.nextTick(() => this.$refs.loginPanel.reset());
            this.$refs.accountModalValidationObserver.reset();
            $("#account-modal").modal("show");
            // setTimeout(() => this.$refs.loginPanel.focusEmailInput(), 500);
        },
        switchPanel(panel) {
            this.$refs.accountModalValidationObserver.reset();
            Vue.nextTick(() => {
                if (!this.loading) {
                    this.panel = panel;
                }
            });
        },
        async register() {
            const credentials = this.$refs.registerPanel.getCredentials();
            await this.$werewolvesAssistantAPI.register(credentials);
            this.panel = "log-in";
            this.$toasted.success(this.$t("AccountModal.userCreated"), { icon: "user-plus" });
            setTimeout(() => {
                this.$refs.loginPanel.setEmail(credentials.email);
                this.$refs.loginPanel.validateEmailValidationProvider();
                this.$refs.loginPanel.focusPasswordInput();
            }, 500);
        },
        async submit() {
            try {
                this.loading = true;
                if (this.panel === "log-in") {
                    await this.login(this.$refs.loginPanel.getCredentials());
                    this.hide();
                } else if (this.panel === "register") {
                    await this.register();
                }
                this.loading = false;
            } catch (e) {
                this.loading = false;
                this.$error.display(e);
                if (this.panel === "log-in") {
                    this.$refs.loginPanel.setPassword(undefined);
                    this.$refs.loginPanel.focusPasswordInput();
                } else if (this.panel === "register" && isAPIError(e) && e.response.data.type === "EMAIL_EXISTS") {
                    this.$refs.registerPanel.focusEmailInput();
                }
            }
        },
        hide() {
            $("#account-modal").modal("hide");
        },
    },
};
</script>

<style lang="scss" scoped>
    #account-modal-title {
        width: 100%;
        font-size: 1.20rem;
    }

    .nav-link {
        transition: all 0.25s;
    }

    .switch-panel-enter-active, .switch-panel-leave-active {
        transition: all 0.35s ease-in-out;
        max-height: 900px;
    }
    .switch-panel-enter, .switch-panel-leave-to {
        opacity: 0;
        max-height: 240px;
    }
</style>