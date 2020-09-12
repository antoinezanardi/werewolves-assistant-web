import { isAPIError } from "@/helpers/functions/Error";
import i18n from "../vue-i18n";
import Router from "../router";

const Error = {
    install(Vue) {
        Vue.prototype.$error = {};
        Vue.prototype.$error.display = error => {
            if (isAPIError(error)) {
                const { response } = error;
                Vue.prototype.$toasted.error(i18n.t(`Error.${response.data.type}`), { icon: "times" });
            } else if (Router.currentRoute.name !== "Home" && error.response.status === 401) {
                Router.push("/");
                Vue.prototype.$toasted.error(i18n.t(`Error.yourSessionHasExpired`), { icon: "times" });
            } else {
                Vue.prototype.$toasted.error(i18n.t("Error.unknownError"), { icon: "times" });
                throw error;
            }
        };
    },
};

import Vue from "vue";

Vue.use(Error);

export default Error;