<template>
    <div :id="`game-play-alert-${type}`" class="game-play-alert">
        <v-popover>
            <div class="p-2 d-flex justify-content-between align-items-center">
                <RoleImage class="game-play-alert-role-image" :role="gamePlayAlertRole"/>
                <i class="game-play-alert-role-icon fa" :class="gamePlayAlertIconClasses"/>
            </div>
            <template #popover>
                <div class="d-flex align-items-center">
                    <i class="game-play-alert-role-icon fa fa-2x mr-2" :class="gamePlayAlertIconClasses"/>
                    <span v-html="$t(`GamePlayAlert.description.${type}`)"/>
                </div>
                <hr class="bg-light my-2"/>
                <div v-if="!game.options.repartition.isHidden" class="d-flex align-items-center font-italic game-play-alert-popover-footer">
                    <i class="fa fa-exclamation-circle text-info mr-2"/>
                    <span v-html="$t('GamePlayAlert.shareThisWithPlayers')"/>
                </div>
                <div v-else>
                    <i class="fa fa-exclamation-triangle animate__animated animate__heartBeat animate__infinite text-warning mr-2"/>
                    <span v-html="$t('GamePlayAlert.keepThisForYourself')"/>
                </div>
            </template>
        </v-popover>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoleImage from "@/components/shared/Game/Role/RoleImage";

export default {
    name: "GamePlayAlert",
    components: { RoleImage },
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        gamePlayAlertMetadata() {
            return {
                ...this.gamePlayAlertIdiotMetadata,
                ...this.gamePlayAlertVillagerVillagerMetadata,
                ...this.gamePlayAlertAncientMetadata,
                ...this.gamePlayAlertScapegoatMetadata,
                ...this.gamePlayAlertAngelMetadata,
                ...this.gamePlayAlertGuardMetadata,
                ...this.gamePlayAlertWitchMetadata,
                ...this.gamePlayAlertVileFatherOfWolvesMetadata,
                ...this.gamePlayAlertStutteringJudgeMetadata,
                ...this.gamePlayAlertPiedPiperMetadata,
                ...this.gamePlayAlertBearTamerMetadata,
            };
        },
        gamePlayAlertIdiotMetadata() {
            const role = "idiot";
            return {
                "idiot-wont-delegate": {
                    role,
                    icon: "fa-grimace",
                },
                "idiot-wont-die-from-votes": {
                    role,
                    icon: "fa-shield-alt",
                },
            };
        },
        gamePlayAlertVillagerVillagerMetadata() {
            return {
                "villager-villager-can-be-trusted": {
                    role: "villager-villager",
                    icon: "fa-thumbs-up",
                },
            };
        },
        gamePlayAlertAncientMetadata() {
            const role = "ancient";
            return {
                "ancient-can-make-all-powerless": {
                    role,
                    icon: "fa-bolt",
                },
                "ancient-can-survive-werewolves": {
                    role,
                    icon: "fa-fist-raised",
                },
            };
        },
        gamePlayAlertScapegoatMetadata() {
            return {
                "scapegoat-will-die-from-tie": {
                    role: "scapegoat",
                    icon: "fa-comment-slash",
                },
            };
        },
        gamePlayAlertAngelMetadata() {
            return {
                "angel-will-win-if-he-dies": {
                    role: "angel",
                    icon: "fa-trophy",
                },
            };
        },
        gamePlayAlertGuardMetadata() {
            const role = "guard";
            return {
                "guard-can-protect-target": {
                    role,
                    icon: "fa-shield-alt",
                },
                "guard-cant-protect-little-girl": {
                    role,
                    icon: "fa-female",
                },
            };
        },
        gamePlayAlertWitchMetadata() {
            return {
                "witch-can-protect-target": {
                    role: "witch",
                    icon: "fa-magic",
                },
            };
        },
        gamePlayAlertVileFatherOfWolvesMetadata() {
            return {
                "vile-father-of-wolves-can-infect": {
                    role: "vile-father-of-wolves",
                    icon: "fa-people-arrows",
                },
            };
        },
        gamePlayAlertStutteringJudgeMetadata() {
            return {
                "stuttering-judge-can-request-vote": {
                    role: "stuttering-judge",
                    icon: "fa-gavel",
                },
            };
        },
        gamePlayAlertPiedPiperMetadata() {
            return {
                "pied-piper-will-loose-powers-if-infected": {
                    role: "pied-piper",
                    icon: "fa-ban",
                },
            };
        },
        gamePlayAlertBearTamerMetadata() {
            const role = "bear-tamer";
            const icon = "fa-users";
            return {
                "bear-tamer-growls-and-infected": {
                    role,
                    icon,
                },
                "bear-tamer-growls": {
                    role,
                    icon,
                },
            };
        },
        gamePlayAlertRole() {
            return this.gamePlayAlertMetadata[this.type] ? this.gamePlayAlertMetadata[this.type].role : undefined;
        },
        gamePlayAlertIconClasses() {
            return this.gamePlayAlertMetadata[this.type] ? this.gamePlayAlertMetadata[this.type].icon : undefined;
        },
    },
};
</script>

<style lang="scss" scoped>
    .game-play-alert {
        border: 2px solid #7e7e7e;
        border-radius: 10px;
        transition: all 0.25s ease;
        cursor: pointer;
        min-width: 75px;

        &:hover {
            border-color: #eaeaea;
        }

        .game-play-alert-role-image {
            width: 30px;
            height: 30px;
        }

        .game-play-alert-role-icon {
            transition: all 0.25s ease;
        }

    }
    .game-play-alert-popover-footer {
        font-size: 0.70rem;
    }
</style>