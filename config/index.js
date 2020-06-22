export default {
    API: {
        werewolvesAssistant: {
            baseURL: process.env.VUE_APP_WEREWOLVES_ASSISTANT_API_URL,
            basicAuth: {
                username: process.env.VUE_APP_WEREWOLVES_ASSISTANT_API_USERNAME,
                password: process.env.VUE_APP_WEREWOLVES_ASSISTANT_API_PASSWORD,
            },
        },
    },
};