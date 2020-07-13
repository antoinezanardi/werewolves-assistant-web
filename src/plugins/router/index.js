import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../../components/Home/Home";
import GameLobby from "../../components/GameLobby/GameLobby";
import Game from "../../components/Game/Game";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
}, {
    path: "/game-lobby",
    name: "GameLobby",
    component: GameLobby,
}, {
    path: "/game/:id",
    name: "Game",
    component: Game,
}];

const Router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default Router;