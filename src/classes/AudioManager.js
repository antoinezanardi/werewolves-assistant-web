import { Howler, Howl } from "howler";
import UserPreferences from "@/classes/UserPreferences";
import { randomIntFromInterval } from "@/helpers/functions/Number";

class AudioManager {
    constructor() {
        const userPreferences = new UserPreferences();
        this.isMuted = userPreferences.audio.isMuted;
        this.ambient = {
            volume: 1,
            dayMusics: [],
            nightMusics: [],
        };
        this.soundEffects = {
            volume: 1,
            sounds: {},
        };
        Howler.mute(this.isMuted);
        this._loadAmbientMusics();
        this._loadSoundEffects();
    }

    _loadAmbientMusics() {
        const options = {
            loop: true,
            volume: this.ambient.volume,
        };
        const ambientNightFiles = [
            "/audio/ambient/night/night-1.mp3",
            "/audio/ambient/night/night-2.mp3",
            "/audio/ambient/night/night-3.mp3",
        ];
        for (const ambientNightFile of ambientNightFiles) {
            this.ambient.nightMusics.push(new Howl({ src: ambientNightFile, ...options }));
        }
        const ambientDayFiles = [
            "/audio/ambient/day/day-1.mp3",
            "/audio/ambient/day/day-2.mp3",
        ];
        for (const ambientDayFile of ambientDayFiles) {
            this.ambient.dayMusics.push(new Howl({ src: ambientDayFile, ...options }));
        }
    }

    // eslint-disable-next-line max-lines-per-function
    _loadSoundEffects() {
        const basePath = "/audio/sounds";
        const options = { volume: this.soundEffects.volume };
        this.soundEffects.sounds = {
            "sheriff-election": new Howl({ src: `${basePath}/sheriff-election.mp3`, ...options }),
            "time-is-up": new Howl({ src: `${basePath}/time-is-up.mp3`, ...options }),
            "sheriff-is-elected": new Howl({ src: `${basePath}/sheriff-is-elected.mp3`, ...options }),
            "death": new Howl({ src: `${basePath}/death.mp3`, ...options }),
            "night-falls": new Howl({ src: `${basePath}/night-falls.mp3`, ...options }),
            "thief-plays": new Howl({ src: `${basePath}/thief-plays.mp3`, ...options }),
            "dog-wolf-plays": new Howl({ src: `${basePath}/dog-wolf-plays.mp3`, ...options }),
            "cupid-plays": new Howl({ src: `${basePath}/cupid-plays.mp3`, ...options }),
            "lovers-play": new Howl({ src: `${basePath}/lovers-play.mp3`, ...options }),
            "stuttering-judge-plays": new Howl({ src: `${basePath}/stuttering-judge-plays.mp3`, ...options }),
            "seer-plays": new Howl({ src: `${basePath}/seer-plays.mp3`, ...options }),
            "guard-plays": new Howl({ src: `${basePath}/guard-plays.mp3`, ...options }),
            "raven-plays": new Howl({ src: `${basePath}/raven-plays.mp3`, ...options }),
            "witch-plays": new Howl({ src: `${basePath}/witch-plays.mp3`, ...options }),
            "werewolves-play": new Howl({ src: `${basePath}/werewolves-play.mp3`, ...options }),
            "big-bad-wolf-plays": new Howl({ src: `${basePath}/big-bad-wolf-plays.mp3`, ...options }),
            "wild-child-plays": new Howl({ src: `${basePath}/wild-child-plays.mp3`, ...options }),
            "two-sisters-play": new Howl({ src: `${basePath}/two-sisters-play.mp3`, ...options }),
            "three-brothers-play": new Howl({ src: `${basePath}/three-brothers-play.mp3`, ...options }),
            "vile-father-of-wolves-infects": new Howl({ src: `${basePath}/vile-father-of-wolves-infects.mp3`, ...options }),
            "white-werewolf-plays": new Howl({ src: `${basePath}/white-werewolf-plays.mp3`, ...options }),
            "pied-piper-plays": new Howl({ src: `${basePath}/pied-piper-plays.mp3`, ...options }),
            "charmed-play": new Howl({ src: `${basePath}/charmed-play.mp3`, ...options }),
            "day-rises": new Howl({ src: `${basePath}/day-rises.mp3`, ...options }),
            "hunter-plays": new Howl({ src: `${basePath}/hunter-plays.mp3`, ...options }),
            "scapegoat-plays": new Howl({ src: `${basePath}/scapegoat-plays.mp3`, ...options }),
        };
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
        this.ambient.nightMusics[nightMusicsRandomIdx].fade(0, this.ambient.volume, 5000);
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