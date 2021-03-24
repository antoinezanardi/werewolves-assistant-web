export default {
    sentry: {
        enabled: process.env.VUE_APP_SENTRY_ENABLED === "true",
        projectId: process.env.VUE_APP_SENTRY_PROJECT_ID,
        key: process.env.VUE_APP_SENTRY_KEY,
    },
    googleAnalytics: {
        enabled: process.env.VUE_APP_GOOGLE_ANALYTICS_ENABLED === "true",
        id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
    },
    facebook: { app: { ID: process.env.VUE_APP_FACEBOOK_APP_ID } },
    API: { werewolvesAssistant: { baseURL: process.env.VUE_APP_WEREWOLVES_ASSISTANT_API_URL } },
};