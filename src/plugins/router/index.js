import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../../components/Home/Home";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
}];

const Router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default Router;