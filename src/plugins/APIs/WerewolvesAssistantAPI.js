import Axios from "axios";
import JWT from "jsonwebtoken";
import Config from "../../../config";

const WerewolvesAssistantAPI = {
    // eslint-disable-next-line no-unused-vars,max-lines-per-function
    install(Vue) {
        const axiosConfig = {
            baseURL: Config.API.werewolvesAssistant.baseURL,
            timeout: 0,
            headers: { "Content-Type": "application/json" },
        };
        const axios = {
            basic: Axios.create({
                ...axiosConfig,
                auth: {
                    username: Config.API.werewolvesAssistant.basicAuth.username,
                    password: Config.API.werewolvesAssistant.basicAuth.password,
                },
            }),
            JWT: Axios.create(axiosConfig),
        };

        Vue.prototype.$werewolvesAssistantAPI = {};

        Vue.prototype.$werewolvesAssistantAPI.setToken = token => {
            axios.JWT.defaults.headers["Authorization"] = `Bearer ${token}`;
        };

        Vue.prototype.$werewolvesAssistantAPI.register = user => axios.basic.post(`/users`, user);

        Vue.prototype.$werewolvesAssistantAPI.login = user => axios.basic.post(`/users/login`, user);

        Vue.prototype.$werewolvesAssistantAPI.decodeToken = () => {
            let decoded = { userId: 0 };
            const token = localStorage.getItem("token");
            if (token) {
                decoded = JWT.decode(token);
            }
            return decoded;
        };

        Vue.prototype.$werewolvesAssistantAPI.getUser = user => {
            const decoded = Vue.prototype.$werewolvesAssistantAPI.decodeToken();
            return axios.JWT.get(`/users/${decoded.userId}`, user);
        };
    },
};

export default WerewolvesAssistantAPI;