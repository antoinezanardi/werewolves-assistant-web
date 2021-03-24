<template>
    <VFacebookLogin ref="facebook" :app-id="appId" :login-options="loginOptions" @login="login" @sdk-init="initSDK"/>
</template>

<script>
import { mapActions } from "vuex";
import VFacebookLogin from "vue-facebook-login-component";
import Config from "../../../../config";

export default {
    name: "FacebookLoginButton",
    components: { VFacebookLogin },
    data() {
        return {
            SDK: undefined,
            appId: Config.facebook.app.ID,
            version: "v10.0",
            loginOptions: {
                scope: "email",
                // eslint-disable-next-line camelcase
                auth_type: "rerequest",
            },
        };
    },
    methods: {
        ...mapActions("user", { loginWithFacebook: "loginWithFacebook" }),
        initSDK(SDK) {
            this.SDK = SDK;
        },
        async login(data) {
            try {
                if (data) {
                    await this.loginWithFacebook(data.authResponse.accessToken);
                    this.$emit("hide-account-modal");
                    this.SDK.scope.logout();
                }
            } catch (err) {
                this.$error.display(err);
            }
        },
    },
};
</script>

<style scoped>

</style>