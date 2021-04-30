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
        setAmbientVolume(state, volume) {
            state.audioManager.setAmbientVolume(volume);
        },
        setSoundEffectsVolume(state, volume) {
            state.audioManager.setSoundEffectsVolume(volume);
        },
    },
    actions: {
        async toggleMute({ commit, dispatch, state }) {
            commit("toggleMute");
            await dispatch("user/setPreferenceAudioIsMuted", state.audioManager.isMuted, { root: true });
        },
        async setAmbientVolume({ commit, dispatch }, volume) {
            commit("setAmbientVolume", volume / 100);
            await dispatch("user/setPreferenceAmbientVolume", volume, { root: true });
        },
        async setSoundEffectsVolume({ commit, dispatch }, volume) {
            commit("setSoundEffectsVolume", volume / 100);
            await dispatch("user/setPreferenceSoundEffectsVolume", volume, { root: true });
        },
    },
};