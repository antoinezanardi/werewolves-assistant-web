<template>
    <div id="register-panel">
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="register-email">
                        <span v-html="$t('RegisterPanel.email')"/>
                        <RedAsterisk class="ml-1"/>
                    </label>
                    <ValidationProvider v-slot="{ errors, classes }">
                        <div class="input-group">
                            <div class="input-group-prepend" :class="classes">
                                <span class="input-group-text">
                                    <i class="fa fa-at"/>
                                </span>
                            </div>
                            <input id="register-email" ref="registerEmailInput" v-model="credentials.email"
                                   type="email" class="form-control" :placeholder="$t('RegisterPanel.required')"
                                   required :class="classes" :disabled="loading"/>
                        </div>
                        <div v-html="errors[0]"/>
                    </ValidationProvider>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="register-password">
                        <span v-html="$t('RegisterPanel.password')"/>
                        <RedAsterisk class="ml-1"/>
                    </label>
                    <ValidationProvider v-slot="{ errors, classes }" rules="required" vid="confirmation">
                        <div class="input-group">
                            <div class="input-group-prepend" :class="classes">
                                <span class="input-group-text">
                                    <i class="fa fa-lock"/>
                                </span>
                            </div>
                            <input id="register-password" v-model="credentials.password" type="password"
                                   class="form-control" :class="classes" :placeholder="$t('RegisterPanel.required')"
                                   required minlength="5" :disabled="loading"/>
                        </div>
                        <div v-html="errors[0]"/>
                    </ValidationProvider>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="register-confirm-password">
                        <span v-html="$t('RegisterPanel.confirmPassword')"/>
                        <RedAsterisk class="ml-1"/>
                    </label>
                    <ValidationProvider v-slot="{ errors, classes }" rules="confirm_password:confirmation">
                        <div class="input-group">
                            <div class="input-group-prepend" :class="classes">
                                <span class="input-group-text">
                                    <i class="fa fa-lock"/>
                                </span>
                            </div>
                            <input id="register-confirm-password" v-model="confirmPassword" type="password"
                                   class="form-control" :class="classes" :placeholder="$t('RegisterPanel.required')"
                                   required minlength="5" :disabled="loading"/>
                        </div>
                        <div v-html="errors[0]"/>
                    </ValidationProvider>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-2 col-lg-1 d-flex align-items-center">
                <i class="fa fa-info-circle fa-2x"/>
            </div>
            <div class="col-10 col-lg-10">
                <span id="register-data-disclaimer-text" v-html="$t('RegisterPanel.userDataOnlyForAccount')"/>
            </div>
        </div>
    </div>
</template>

<script>
import RedAsterisk from "../../shared/Forms/RedAsterisk";
import Vue from "vue";

export default {
    name: "RegisterPanel",
    components: { RedAsterisk },
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
            confirmPassword: undefined,
        };
    },
    mounted() {
        this.focusEmailInput();
    },
    methods: {
        getCredentials() {
            return this.credentials;
        },
        focusEmailInput() {
            Vue.nextTick(() => {
                this.$refs.registerEmailInput.focus();
            });
        },
    },
};
</script>

<style lang="scss" scoped>
    #register-data-disclaimer-text {
        font-size: 0.8rem;
        font-style: italic;
    }
</style>