import AudioManager from "@/classes/AudioManager";

export default {
    namespaced: true,
    state: { audioManager: new AudioManager() },
    getters: {
        audioManager(state) {
            return state.audioManager;
        },
    },
    mutations: {},
    actions: {},
};