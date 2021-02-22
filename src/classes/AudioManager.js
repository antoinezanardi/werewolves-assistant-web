import { Howler, Howl } from "howler";
import { randomIntFromInterval } from "@/helpers/functions/Number";

class AudioManager {
    constructor() {
        this.ambient = {
            volume: 1,
            dayMusics: [],
            nightMusics: [],
        };
        this.soundEffects = {
            volume: 1,
            sounds: {},
        };
        this.isMuted = false;
        this._loadAmbientMusics();
        this._loadSoundEffects();
    }

    _loadAmbientMusics() {
        const options = {
            loop: true,
            volume: this.ambient.volume,
        };
        const ambientNightFiles = ["/audio/ambient/night/night-1.wav"];
        for (const ambientNightFile of ambientNightFiles) {
            this.ambient.nightMusics.push(new Howl({ src: ambientNightFile, ...options }));
        }
        const ambientDayFiles = ["/audio/ambient/day/day-1.mp3"];
        for (const ambientDayFile of ambientDayFiles) {
            this.ambient.dayMusics.push(new Howl({ src: ambientDayFile, ...options }));
        }
    }

    _loadSoundEffects() {
        const basePath = "/audio/sounds";
        const options = { volume: this.soundEffects.volume };
        this.soundEffects.sounds = { "sheriff-election": new Howl({ src: `${basePath}/sheriff-election.mp3`, ...options }) };
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        Howler.mute(this.isMuted);
    }

    playDayMusic() {
        this.stopNightMusic();
        const dayMusicsRandomIdx = randomIntFromInterval(0, this.ambient.dayMusics.length - 1);
        this.ambient.dayMusics[dayMusicsRandomIdx].fade(0, this.ambient.volume, 5000);
        this.ambient.dayMusics[dayMusicsRandomIdx].play();
    }

    stopDayMusic() {
        for (const dayMusic of this.ambient.dayMusics) {
            dayMusic.fade(this.ambient.volume, 0, 5000);
            setTimeout(() => dayMusic.stop(), 5000);
        }
    }

    playNightMusic() {
        this.stopDayMusic();
        const nightMusicsRandomIdx = randomIntFromInterval(0, this.ambient.nightMusics.length - 1);
        this.ambient.nightMusics[nightMusicsRandomIdx].fade(0, this.ambient.volume, 500);
        this.ambient.nightMusics[nightMusicsRandomIdx].play();
    }

    stopNightMusic() {
        for (const nightMusic of this.ambient.nightMusics) {
            nightMusic.fade(this.ambient.volume, 0, 5000);
            setTimeout(() => nightMusic.stop(), 5000);
        }
    }

    playSoundEffect(soundEffect) {
        if (this.soundEffects.sounds[soundEffect]) {
            this.soundEffects.sounds[soundEffect].play();
        }
    }
}

export default AudioManager;