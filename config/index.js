export default {
    sentry: {
        enabled: process.env.VUE_APP_SENTRY_ENABLED === "true",
        projectId: process.env.VUE_APP_SENTRY_PROJECT_ID,
        key: process.env.VUE_APP_SENTRY_KEY,
    },
    API: { werewolvesAssistant: { baseURL: process.env.VUE_APP_WEREWOLVES_ASSISTANT_API_URL } },
};