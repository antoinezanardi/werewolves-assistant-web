import Vue from "vue";
import Vuex from "vuex";
import Game from "./modules/Game";
import User from "./modules/User";
import AudioManager from "./modules/AudioManager";
import Role from "./modules/Role";

Vue.use(Vuex);

export default new Vuex.Store({ modules: { game: Game, user: User, audioManager: AudioManager, role: Role } });