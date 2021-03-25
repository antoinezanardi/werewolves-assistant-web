<template>
    <div id="login-panel">
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="log-in-email">
                        <span v-html="$t('LoginPanel.email')"/>
                        <RedAsterisk class="ml-1"/>
                    </label>
                    <ValidationProvider ref="emailValidationProvider" #default="{ errors, classes }">
                        <div class="input-group">
                            <div class="input-group-prepend" :class="classes">
                                <span class="input-group-text">
                                    <i class="fa fa-at"/>
                                </span>
                            </div>
                            <input id="log-in-email" ref="logInEmailInput" v-model="credentials.email" type="email"
                                   class="form-control" :placeholder="$t('LoginPanel.required')" maxlength="50"
                                   required :class="classes" :disabled="loading"/>
                        </div>
                        <div class="input-error" v-html="errors[0]"/>
                    </ValidationProvider>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="log-in-password">
                        <span v-html="$t('LoginPanel.password')"/>
                        <RedAsterisk class="ml-1"/>
                    </label>
                    <ValidationProvider #default="{ errors, classes }" rules="required">
                        <div class="input-group">
                            <div class="input-group-prepend" :class="classes">
                                <span class="input-group-text">
                                    <i class="fa fa-lock"/>
                                </span>
                            </div>
                            <input id="log-in-password" ref="logInPasswordInput" v-model="credentials.password"
                                   type="password" class="form-control" :class="classes"
                                   :placeholder="$t('LoginPanel.required')" required minlength="5" maxlength="50"
                                   :disabled="loading"/>
                        </div>
                        <div class="input-error" v-html="errors[0]"/>
                    </ValidationProvider>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <a href="#" @click.prevent="$emit('open-register-tab')" v-html="$t('LoginPanel.IDontHaveAnAccountYet')"/>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <FacebookLoginButton class="mt-2 text-center" @hide-account-modal="hideAccountModal"/>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import RedAsterisk from "../../shared/Forms/RedAsterisk";
import FacebookLoginButton from "@/components/Home/AccountModal/FacebookLoginButton";

export default {
    name: "LoginPanel",
    components: { FacebookLoginButton, RedAsterisk },
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            credentials: {
                email: undefined,
                password: undefined,
            },
        };
    },
    mounted() {
        this.focusEmailInput();
    },
    methods: {
        getCredentials() {
            return this.credentials;
        },
        setEmail(value) {
            this.credentials.email = value;
        },
        setPassword(value) {
            this.credentials.password = value;
        },
        focusEmailInput() {
            Vue.nextTick(() => {
                this.$refs.logInEmailInput.focus();
            });
        },
        focusPasswordInput() {
            Vue.nextTick(() => {
                this.$refs.logInPasswordInput.focus();
            });
        },
        validateEmailValidationProvider() {
            this.$refs.emailValidationProvider.validate();
        },
        reset() {
            this.credentials.email = undefined;
            this.credentials.password = undefined;
        },
        hideAccountModal() {
            this.$emit("hide-account-modal");
        },
    },
};
</script>

<style scoped>

</style>