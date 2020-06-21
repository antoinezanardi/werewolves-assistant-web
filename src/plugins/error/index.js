import Vue from "vue";
import { isAPIError } from "../helpers/Error";

const Error = {
    install(Vue) {
        Vue.prototype.$error = {};

        Vue.prototype.$error.display = error => {
            if (isAPIError(error)) {
                Vue.prototype.$toasted.error("Mauvaise requête serveur", { icon: "times" });
            } else {
                Vue.prototype.$toasted.error("Erreur inconnue", { icon: "times" });
                throw error;
            }
        };
    },
};

Vue.use(Error);

export default Error;