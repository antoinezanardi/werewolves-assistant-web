<template>
    <div class="modal fade" id="account-modal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static"
         data-keyboard="false">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div id="account-modal-title" class="modal-title">
                        <ul class="nav nav-pills nav-fill">
                            <li class="nav-item">
                                <a class="nav-link" :class="{ active: panel === 'log-in' }" href="#"
                                   @click.prevent="panel = 'log-in'">
                                    <i class="fa fa-sign-in-alt mr-2"/>
                                    <span v-html="$t('AccountModal.logIn')"/>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" :class="{ active: panel === 'register' }" href="#"
                                   @click.prevent="panel = 'register'">
                                    <i class="fa fa-user-plus mr-2"/>
                                    <span v-html="$t('AccountModal.register')"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <form @submit.prevent="submit">
                    <div class="modal-body">
                        <transition mode="out-in" name="fade-in">
                            <div v-if="panel === 'log-in'" key="log-in-panel">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="log-in-email">
                                                <span v-html="$t('AccountModal.email')"/>
                                                <RedAsterisk class="ml-1"/>
                                            </label>
                                            <ValidationProvider v-slot="{ errors, classes }">
                                                <div class="input-group">
                                                    <div class="input-group-prepend" :class="classes">
                                                        <span class="input-group-text">
                                                            <i class="fa fa-at"/>
                                                        </span>
                                                    </div>
                                                        <input id="log-in-email" type="email" class="form-control" v-model="logIn.email"
                                                               :placeholder="$t('AccountModal.required')" required :class="classes"/>
                                                </div>
                                                <div v-html="errors[0]"/>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label for="log-in-password">
                                                <span v-html="$t('AccountModal.password')"/>
                                                <RedAsterisk class="ml-1"/>
                                            </label>
                                            <ValidationProvider rules="required" v-slot="{ errors, classes }">
                                                <div class="input-group">
                                                    <div class="input-group-prepend" :class="classes">
                                                        <span class="input-group-text">
                                                            <i class="fa fa-lock"/>
                                                        </span>
                                                    </div>
                                                    <input id="log-in-password" type="password" class="form-control"
                                                           :class="classes" :placeholder="$t('AccountModal.required')"
                                                           v-model="logIn.password" required/>
                                                </div>
                                                <div v-html="errors[0]"/>
                                            </ValidationProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="panel === 'register'" key="register-panel">
                                REGISTER
                            </div>
                        </transition>
                    </div>
                    <div class="modal-footer d-flex justify-content-between">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">
                            <i class="fa fa-times mr-2"/>
                            <span v-html="$t('AccountModal.close')"/>
                        </button>
                        <button type="submit" class="btn btn-primary" v-html="submitBtnText"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
import RedAsterisk from "../shared/Forms/RedAsterisk";

export default {
    name: "AccountModal",
    components: { RedAsterisk },
    data() {
        return {
            panel: "log-in",
            loading: false,
            logIn: {
                email: undefined,
                password: undefined,
            },
        };
    },
    computed: {
        submitBtnText() {
            return this.panel === "log-in" ? this.$t("AccountModal.logIn") : this.$t("AccountModal.register");
        },
    },
    methods: {
        show() {
            $("#account-modal").modal("show");
        },
        async submitLogIn() {
            console.log("coucou");
        },
        async submitRegister() {
            console.log("coucou2");
        },
        async submit() {
            try {
                if (this.panel === "log-in") {
                    await this.submitLogIn();
                } else if (this.panel === "register") {
                    await this.submitRegister();
                }
            } catch (e) {
                this.$error.display(e);
            }
        },
    },
};
</script>

<style scoped>
    #account-modal-title {
        width: 100%;
    }

    .nav-link {
        transition: all 0.25s ease;
    }
</style>