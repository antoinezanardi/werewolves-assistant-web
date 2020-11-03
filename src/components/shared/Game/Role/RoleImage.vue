<template>
    <img :key="roleImageSource" v-lazy="roleImageSource" alt="Role Image" class="img-fluid rounded"/>
</template>

<script>
import back from "@/assets/img/roles/back.png";
import sheriff from "@/assets/img/attributes/sheriff.png";
import Config from "../../../../../config";

export default {
    name: "RoleImage",
    props: {
        role: {
            type: String,
            default: undefined,
        },
    },
    computed: {
        roleImageSource() {
            let fileName;
            if (!this.role) {
                return back;
            } else if (this.role === "sheriff") {
                return sheriff;
            } else if (this.role === "werewolves") {
                fileName = "werewolf";
            } else if (this.role === "villagers" || this.role === "all") {
                fileName = "villager";
            } else {
                fileName = this.role;
            }
            return `${Config.API.werewolvesAssistant.baseURL}/img/roles/${fileName}.png`;
        },
    },
};
</script>

<style scoped>

</style>