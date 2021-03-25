<template>
    <VFacebookLogin ref="facebook" :app-id="appId" :login-options="loginOptions" class="btn-block btn-lg"
                    @login="login" @sdk-init="initSDK">
        <template #login>
            <span v-html="$t('FacebookLoginButton.logInWithFacebook')"/>
        </template>
        <template #working>
            <Loading :icon-size="20"/>
        </template>
    </VFacebookLogin>
</template>

<script>
import { mapActions } from "vuex";
import VFacebookLogin from "vue-facebook-login-component";
import Config from "../../../../config";
import Loading from "@/components/shared/Loading";

export default {
    name: "FacebookLoginButton",
    components: { Loading, VFacebookLogin },
    data() {
        return {
            "SDK": undefined,
            "appId": Config.facebook.app.ID,
            "version": "v10.0",
            "loginOptions": {
                scope: "email",
                // eslint-disable-next-line camelcase
                auth_type: "rerequest",
            },
            "sdk-locale": "fr-FR",
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
                }
            } catch (err) {
                this.$error.display(err);
            } finally {
                this.SDK.scope.logout();
            }
        },
    },
};
</script>

<style scoped>

</style>