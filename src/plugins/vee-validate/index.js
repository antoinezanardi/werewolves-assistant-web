import Vue from "vue";
import { ValidationProvider, configure, extend } from "vee-validate";
import { email, required, min } from "vee-validate/dist/rules";
import i18n from "../vue-i18n";

extend("required", required);
extend("email", email);
extend("min", min);

configure({
    mode: "eager",
    defaultMessage: (field, values) => i18n.t(`VeeValidate.${values._rule_}`, values),
    classes: {
        valid: "is-valid",
        invalid: "is-invalid",
    },
});

Vue.component("ValidationProvider", ValidationProvider);