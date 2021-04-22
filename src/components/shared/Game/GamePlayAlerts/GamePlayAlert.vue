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
        gamePlayAlertRole() {
            const gamePlayAlertRoles = {
                "idiot-wont-delegate": "idiot",
                "villager-villager-can-be-trusted": "villager-villager",
                "ancient-can-make-all-powerless": "ancient",
                "idiot-wont-die-from-votes": "idiot",
                "scapegoat-will-die-from-tie": "scapegoat",
                "angel-will-win-if-he-dies": "angel",
                "ancient-can-survive-werewolves": "ancient",
                "guard-can-protect-target": "guard",
                "witch-can-protect-target": "witch",
                "vile-father-of-wolves-can-infect": "vile-father-of-wolves",
                "stuttering-judge-can-request-vote": "stuttering-judge",
                "guard-cant-protect-little-girl": "little-girl",
                "pied-piper-will-loose-powers-if-infected": "pied-piper",
            };
            return gamePlayAlertRoles[this.type];
        },
        gamePlayAlertIconClasses() {
            const gamePlayAlertIcons = {
                "idiot-wont-delegate": "fa-grimace",
                "villager-villager-can-be-trusted": "fa-thumbs-up",
                "ancient-can-make-all-powerless": "fa-bolt",
                "idiot-wont-die-from-votes": "fa-shield-alt",
                "scapegoat-will-die-from-tie": "fa-comment-slash",
                "angel-will-win-if-he-dies": "fa-trophy",
                "ancient-can-survive-werewolves": "fa-fist-raised",
                "guard-can-protect-target": "fa-shield-alt",
                "witch-can-protect-target": "fa-magic",
                "vile-father-of-wolves-can-infect": "fa-people-arrows",
                "stuttering-judge-can-request-vote": "fa-gavel",
                "guard-cant-protect-little-girl": "fa-female",
                "pied-piper-will-loose-powers-if-infected": "fa-ban",
            };
            return gamePlayAlertIcons[this.type];
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