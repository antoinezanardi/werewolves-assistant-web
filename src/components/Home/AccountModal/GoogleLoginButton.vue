<template>
    <GoogleLogin :params="params" :on-success="login" :logout-button="false" class="btn btn-primary btn-block btn-lg" type="button">
        <i class="fab fa-google mr-2"/>
        <span v-html="$t('GoogleLoginButton.logInWithGoogle')"/>
    </GoogleLogin>
</template>

<script>
import { mapActions } from "vuex";
import GoogleLogin from "vue-google-login";
import Config from "../../../../config";

export default {
    name: "GoogleLoginButton",
    components: { GoogleLogin },
    data() {
        return {
            params: {
                // eslint-disable-next-line camelcase
                client_id: Config.google.auth.client.ID,
            },
        };
    },
    methods: {
        ...mapActions("user", { loginWithGoogle: "loginWithGoogle" }),
        async login(data) {
            console.log(data);
            try {
                if (data) {
                    await this.loginWithGoogle(data.tc.id_token);
                    // this.$emit("hide-account-modal");
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