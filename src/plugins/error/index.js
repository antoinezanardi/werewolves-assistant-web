import Vue from "vue";
import { isAPIError } from "../../helpers/functions/Error";
import i18n from "../vue-i18n";

const Error = {
    install(Vue) {
        Vue.prototype.$error = {};

        Vue.prototype.$error.display = error => {
            if (isAPIError(error)) {
                const { response } = error;
                Vue.prototype.$toasted.error(i18n.t(`Error.${response.data.type}`), { icon: "times" });
            } else {
                Vue.prototype.$toasted.error(i18n.t("Error.unknownError"), { icon: "times" });
                throw error;
            }
        };
    },
};

Vue.use(Error);

export default Error;