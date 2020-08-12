import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home/Home";
import GameLobby from "@/components/GameLobby/GameLobby";
import Game from "@/components/Game/Game";
import Statistics from "@/components/Statistics/Statistics";
import About from "@/components/About/About";
import NotFound from "@/components/NotFound/NotFound";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch(err => err);
};

const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(query, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalReplace.call(this, query, onResolve, onReject);
    }
    return originalReplace.call(this, query).catch(err => err);
};

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    }, {
        path: "/about",
        name: "About",
        component: About,
    }, {
        path: "/game-lobby",
        name: "GameLobby",
        component: GameLobby,
    }, {
        path: "/game/:id",
        name: "Game",
        component: Game,
    }, {
        path: "/statistics",
        name: "Statistics",
        component: Statistics,
    }, {
        path: "/404",
        name: "NotFound",
        component: NotFound,
    }, {
        path: "*",
        redirect: "/404",
    },
];

const Router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default Router;