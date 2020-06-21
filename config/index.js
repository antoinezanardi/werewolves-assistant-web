const { env } = process;

export default {
    API: {
        werewolvesAssistant: {
            baseURL: env.VUE_APP_WEREWOLVES_ASSISTANT_API_URL,
            basicAuth: {
                username: env.VUE_APP_WEREWOLVES_ASSISTANT_API_USERNAME,
                password: env.VUE_APP_WEREWOLVES_ASSISTANT_API_PASSWORD,
            },
        },
    },
};