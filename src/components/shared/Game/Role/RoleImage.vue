<template>
    <img :src="roleImage" alt="Role Image" class="img-fluid rounded"/>
</template>

<script>
import back from "@/assets/img/roles/back.png";
import guard from "@/assets/img/roles/guard.png";
import hunter from "@/assets/img/roles/hunter.png";
import raven from "@/assets/img/roles/raven.png";
import seer from "@/assets/img/roles/seer.png";
import villager from "@/assets/img/roles/villager.png";
import werewolf from "@/assets/img/roles/werewolf.png";
import witch from "@/assets/img/roles/witch.png";
import sheriff from "@/assets/img/attributes/sheriff.png";

export default {
    name: "RoleImage",
    props: {
        role: {
            type: String,
            default: undefined,
        },
    },
    data() {
        return {
            IMGs: {
                back,
                guard,
                hunter,
                raven,
                seer,
                villager,
                werewolf,
                werewolves: werewolf,
                witch, all: villager,
                villagers: villager,
                sheriff,
            },
        };
    },
    computed: {
        roleImage() {
            return this.role ? this.IMGs[this.role] : this.IMGs.back;
        },
    },
};
</script>

<style scoped>

</style>