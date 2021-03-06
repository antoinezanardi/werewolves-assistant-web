import Axios from "axios";
import JWT from "jsonwebtoken";
import { stringify } from "qs";
import Config from "../../../config";

const WerewolvesAssistantAPI = {
    // eslint-disable-next-line no-unused-vars,max-lines-per-function
    install(Vue) {
        const axiosConfig = {
            baseURL: Config.API.werewolvesAssistant.baseURL,
            timeout: 0,
            headers: { "Content-Type": "application/json" },
        };
        const axios = Axios.create(axiosConfig);

        Vue.prototype.$werewolvesAssistantAPI = {};

        Vue.prototype.$werewolvesAssistantAPI.setToken = token => {
            axios.defaults.headers.Authorization = `Bearer ${token}`;
        };

        Vue.prototype.$werewolvesAssistantAPI.register = user => axios.post(`/users`, user);

        Vue.prototype.$werewolvesAssistantAPI.login = user => axios.post(`/users/login`, user);

        Vue.prototype.$werewolvesAssistantAPI.loginWithFacebook = data => axios.post(`/users/login/facebook`, data);

        Vue.prototype.$werewolvesAssistantAPI.loginWithGoogle = data => axios.post(`/users/login/google`, data);

        Vue.prototype.$werewolvesAssistantAPI.decodeToken = () => {
            let decoded = { userId: 0 };
            const token = localStorage.getItem("token");
            if (token) {
                decoded = JWT.decode(token);
            }
            return decoded;
        };

        Vue.prototype.$werewolvesAssistantAPI.getUser = userId => axios.get(`/users/${userId}`);

        Vue.prototype.$werewolvesAssistantAPI.getGames = queryStrings => axios.get(`/games?${stringify(queryStrings)}`);

        Vue.prototype.$werewolvesAssistantAPI.getGame = gameId => axios.get(`/games/${gameId}`);

        Vue.prototype.$werewolvesAssistantAPI.getGameRepartition = queryStrings => axios.get(`/games/repartition?${stringify(queryStrings)}`);

        Vue.prototype.$werewolvesAssistantAPI.createGame = data => axios.post("/games", data);

        Vue.prototype.$werewolvesAssistantAPI.patchGame = (gameId, data) => axios.patch(`/games/${gameId}`, data);

        Vue.prototype.$werewolvesAssistantAPI.makeAPlay = (gameId, play) => axios.post(`/games/${gameId}/play`, play);

        Vue.prototype.$werewolvesAssistantAPI.getGameHistory = (gameId, queryStrings) => {
            const URL = `/games/${gameId}/history?${stringify(queryStrings)}`;
            return axios.get(URL);
        };

        Vue.prototype.$werewolvesAssistantAPI.getRoles = () => axios.get(`/roles`);
    },
};

export default WerewolvesAssistantAPI;