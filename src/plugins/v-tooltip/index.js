import Vue from "vue";
import VTooltip from "v-tooltip";
import { isTouchDevice } from "@/helpers/functions/Device";

Vue.use(VTooltip, {
    defaultContainer: "body",
    defaultTrigger: isTouchDevice() ? "hover focus click" : "hover",
});