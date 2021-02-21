<template>
    <div :id="`game-play-alert-${type}`" class="game-play-alert">
        <v-popover>
            <div class="p-2 d-flex align-items-center">
                <RoleImage class="game-play-alert-role-image mr-2" :role="gamePlayAlertRole"/>
                <i class="game-play-alert-role-icon fa" :class="gamePlayAlertIconClasses"/>
            </div>
            <template #popover>
                <div class="d-flex align-items-center">
                    <i class="game-play-alert-role-icon fa fa-2x mr-2" :class="gamePlayAlertIconClasses"/>
                    <span v-html="$t(`GamePlayAlert.description.${type}`)"/>
                </div>
                <hr class="bg-light my-2"/>
                <div class="d-flex align-items-center font-italic game-play-alert-popover-footer">
                    <i class="fa fa-exclamation-circle text-info mr-2"/>
                    <span v-html="$t('GamePlayAlert.shareThisWithPlayers')"/>
                </div>
            </template>
        </v-popover>
    </div>
</template>

<script>
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
        gamePlayAlertRole() {
            const gamePlayAlertRoles = {
                "idiot-wont-delegate": "idiot",
                "villager-villager-can-be-trusted": "villager-villager",
            };
            return gamePlayAlertRoles[this.type];
        },
        gamePlayAlertIconClasses() {
            const gamePlayAlertIcons = {
                "idiot-wont-delegate": "fa-grimace",
                "villager-villager-can-be-trusted": "fa-thumbs-up text-success",
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