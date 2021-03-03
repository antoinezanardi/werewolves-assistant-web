import AudioManager from "@/classes/AudioManager";

export default {
    namespaced: true,
    state: { audioManager: new AudioManager() },
    getters: {
        audioManager(state) {
            return state.audioManager;
        },
    },
    mutations: {
        toggleMute(state) {
            state.audioManager.toggleMute();
        },
    },
    actions: {
        async toggleMute({ commit, dispatch, state }) {
            commit("toggleMute");
            await dispatch("user/setPreferenceAudioIsMuted", state.audioManager.isMuted, { root: true });
        },
    },
};