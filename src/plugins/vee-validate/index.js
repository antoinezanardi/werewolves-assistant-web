import Vue from "vue";
import { ValidationProvider, ValidationObserver, configure, extend } from "vee-validate";
import { email, required, min } from "vee-validate/dist/rules";
import i18n from "../vue-i18n";

extend("required", required);
extend("email", email);
extend("min", min);
extend("confirm_password", {
    validate: (value, { other }) => value === other,
    params: [{ name: "other", isTarget: true }],
});
configure({
    defaultMessage: (field, values) => i18n.t(`VeeValidate.${values._rule_}`, values),
    classes: {
        valid: "is-valid",
        invalid: "is-invalid",
    },
});
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);