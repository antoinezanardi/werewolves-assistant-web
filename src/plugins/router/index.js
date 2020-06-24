import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../../components/Home/Home";
import GameLobby from "../../components/GameLobby/GameLobby";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
}, {
    path: "/game-lobby",
    name: "GameLobby",
    component: GameLobby,
}];

const Router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default Router;