<template>
    <div id="game-roles-options">
        <div v-if="!game.canUpdateOptions">
            <div class="row">
                <div class="col-12 text-warning d-flex align-items-center">
                    <i class="fa fa-exclamation-triangle fa-2x mr-3 mb-1"/>
                    <span v-html="$t('GameRolesOptions.gameOptionsCantBeUpdated')"/>
                </div>
            </div>
            <hr class="bg-dark my-1"/>
        </div>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.general')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-game-repartition-option" class="option-label"
                       v-html="$t('GameRolesOptions.isGameRepartitionHidden.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-game-repartition-option" v-model="isGameRepartitionHidden" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="isGameRepartitionHiddenText"/>
        </div>
        <hr class="bg-dark my-2"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="are-roles-revealed-on-death-option" class="option-label"
                       v-html="$t('GameRolesOptions.areRolesRevealedOnDeath.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="are-roles-revealed-on-death-option" v-model="areRolesRevealedOnDeath" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="areRolesRevealedOnDeathText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <img :src="SVGs['sheriff']" class="mr-2" alt="Sheriff" width="50"/>
                <div v-html="$t('GameRolesOptions.sheriff')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-sheriff-enabled-option" class="option-label"
                       v-html="$t('GameRolesOptions.isSheriffEnabled.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-sheriff-enabled-option" v-model="isSheriffEnabled" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.withWithout')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="isSheriffEnabledText"/>
        </div>
        <hr class="bg-dark mb-2 mt-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="sheriff-elected-at-turn-option" class="option-label"
                       v-html="$t('GameRolesOptions.sheriffElectedAt.turn.label')"/>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="col-lg-8">
                    <input id="sheriff-elected-at-turn-option" v-model.number="sheriffElectedAtTurn" class="form-control"
                           type="number" min="1" max="5" :disabled="!game.canUpdateOptions"/>
                </div>
            </div>
        </div>
        <div class="row align-items-center mt-1">
            <div class="col-8">
                <label for="sheriff-elected-at-phase-option" class="option-label"
                       v-html="$t('GameRolesOptions.sheriffElectedAt.phase.label')"/>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="col-lg-8 text-center">
                    <toggle-button id="sheriff-elected-at-phase-option" v-model="sheriffElectedAtPhase" :disabled="!game.canUpdateOptions"
                                   :labels="$t('VueToggleButton.dayNight')" :height="25" :width="60" :sync="true"
                                   :color="{ checked: '#e2b663', unchecked: '#576bff' }"/>
                </div>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="sheriffElectedAtText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-sheriff-vote-doubled-option" class="option-label"
                       v-html="$t('GameRolesOptions.isSheriffVoteDoubled.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-sheriff-vote-doubled-option" v-model="isSheriffVoteDoubled"
                               :disabled="!game.canUpdateOptions" :labels="$t('VueToggleButton.yesNo')"
                               :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="isSheriffVoteDoubledText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="big-bad-wolf" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.bigBadWolf')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-big-bad-wolf-powerless-if-werewolf-dies" class="option-label"
                       v-html="$t('GameRolesOptions.isBigBadWolfPowerlessIfWerewolfDies.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-big-bad-wolf-powerless-if-werewolf-dies" v-model="isBigBadWolfPowerlessIfWerewolfDies"
                               :disabled="!game.canUpdateOptions" :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="isBigBadWolfPowerlessIfWerewolfDiesText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="white-werewolf" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.whiteWerewolf')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="white-werewolf-waking-up-interval" class="option-label"
                       v-html="$t('GameRolesOptions.whiteWerewolfWakingUpInterval.label')"/>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="col-lg-8">
                    <input id="white-werewolf-waking-up-interval" v-model.number="whiteWerewolfWakingUpInterval" class="form-control"
                           type="number" min="1" max="5" :disabled="!game.canUpdateOptions"/>
                </div>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="whiteWerewolfWakingUpIntervalText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="seer" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.seer')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-seer-talkative-option" class="option-label"
                       v-html="$t('GameRolesOptions.isSeerTalkative.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-seer-talkative-option" v-model="isSeerTalkative" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row align-items-center mt-1">
            <div class="col-8">
                <label for="can-seer-see-roles-option" class="option-label"
                       v-html="$t('GameRolesOptions.canSeerSeeRoles.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="can-seer-see-roles-option" v-model="canSeerSeeRoles" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="seerOptionsText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="little-girl" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.littleGirl')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-little-girl-protected-by-guard" class="option-label"
                       v-html="$t('GameRolesOptions.isLittleGirlProtectedByGuard.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-little-girl-protected-by-guard" v-model="isLittleGirlProtectedByGuard" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="isLittleGirlProtectedByGuardText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="guard" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.guard')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="can-guard-protect-twice" class="option-label"
                       v-html="$t('GameRolesOptions.canGuardProtectTwice.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="can-guard-protect-twice" v-model="canGuardProtectTwice" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="canGuardProtectTwiceText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="idiot" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.idiot')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="does-idiot-die-on-ancient-death" class="option-label"
                       v-html="$t('GameRolesOptions.doesIdiotDieOnAncientDeath.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="does-idiot-die-on-ancient-death" v-model="doesIdiotDieOnAncientDeath" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="doesIdiotDieOnAncientDeathText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="two-sisters" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.twoSisters')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="sisters-waking-up-interval-option" class="option-label"
                       v-html="$t('GameRolesOptions.sistersWakingUpInterval.label')"/>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="col-lg-8">
                    <input id="sisters-waking-up-interval-option" v-model.number="sistersWakingUpInterval" class="form-control"
                           type="number" min="0" max="5" :disabled="!game.canUpdateOptions"/>
                </div>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="sistersWakingUpIntervalText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="three-brothers" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.threeBrothers')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="brothers-waking-up-interval-option" class="option-label"
                       v-html="$t('GameRolesOptions.brothersWakingUpInterval.label')"/>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="col-lg-8">
                    <input id="brothers-waking-up-interval-option" v-model.number="brothersWakingUpInterval" class="form-control"
                           type="number" min="0" max="5" :disabled="!game.canUpdateOptions"/>
                </div>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="brothersWakingUpIntervalText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="fox" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.fox')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-fox-powerless-if-misses-werewolf" class="option-label"
                       v-html="$t('GameRolesOptions.isFoxPowerlessIfMissesWerewolf.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-fox-powerless-if-misses-werewolf" v-model="isFoxPowerlessIfMissesWerewolf" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="isFoxPowerlessIfMissesWerewolfText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="bear-tamer" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.bearTamer')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="does-bear-tamer-growl-if-infected" class="option-label"
                       v-html="$t('GameRolesOptions.doesBearTamerGrowlIfInfected.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="does-bear-tamer-growl-if-infected" v-model="doesBearTamerGrowlIfInfected" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="doesBearTamerGrowlIfInfectedText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="stuttering-judge" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.stutteringJudge')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="stuttering-judge-request-count-option" class="option-label"
                       v-html="$t('GameRolesOptions.stutteringJudgeVoteRequestsCount.label')"/>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="col-lg-8">
                    <input id="stuttering-judge-request-count-option" v-model.number="stutteringJudgeVoteRequestsCount" class="form-control"
                           type="number" min="1" max="5" :disabled="!game.canUpdateOptions"/>
                </div>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="stutteringJudgeVoteRequestsCountText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="wild-child" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.wildChild')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-wild-child-transformation-revealed" class="option-label"
                       v-html="$t('GameRolesOptions.isWildChildTransformationRevealed.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-wild-child-transformation-revealed" v-model="isWildChildTransformationRevealed"
                               :disabled="!game.canUpdateOptions" :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="isWildChildTransformationRevealedText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="dog-wolf" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.dogWolf')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="is-dog-wolf-chosen-side-revealed" class="option-label"
                       v-html="$t('GameRolesOptions.isDogWolfChosenSideRevealed.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="is-dog-wolf-chosen-side-revealed" v-model="isDogWolfChosenSideRevealed"
                               :disabled="!game.canUpdateOptions" :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="isDogWolfChosenSideRevealedText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div id="thief-section" class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="thief" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.thief')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-md-6 col-12">
                <label for="thief-additional-cards" class="option-label" v-html="$t('GameRolesOptions.additionalCardsForThief')"/>
            </div>
            <div v-if="game.thiefPlayer" class="col-md-6 col-12 text-center">
                <VSelect v-if="game.thiefPlayer" id="thief-additional-cards" :filter="filterByRoleName" :options="thiefAdditionalCardsOptions"
                         :placeholder="$t('GameRolesOptions.chooseTwoCards')" label="role" multiple :value="game.thiefAdditionalCards"
                         :selectable="() => game.thiefAdditionalCards.length < 2" :disabled="!game.canUpdateOptions" @input="selectAdditionalCard">
                    <template #selected-option="{ role }">
                        <RoleImage :role="role" class="role-image-option"/>
                    </template>
                    <template #option="{ displayedName, role }" class="d-flex flex-row">
                        <RoleImage :role="role" class="role-image-option mr-2"/>
                        <span class="text-capitalize" v-html="displayedName"/>
                    </template>
                    <template #no-options>
                        <i class="fa fa-ban mr-2"/>
                        <span v-html="$t('VSelect.noOption')"/>
                    </template>
                </VSelect>
                <transition mode="out-in" name="fade">
                    <div :key="thiefAdditionalCardsValidationText" class="text-center mt-2">
                        <i class="fa mr-2" :class="thiefAdditionalCardsValidationIcon"/>
                        <span v-html="thiefAdditionalCardsValidationText"/>
                    </div>
                </transition>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="thiefAdditionalCardsText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="must-thief-choose-between-werewolves" class="option-label"
                       v-html="$t('GameRolesOptions.mustThiefChooseBetweenWerewolves.label')"/>
            </div>
            <div class="col-4 text-center">
                <toggle-button id="must-thief-choose-between-werewolves" v-model="mustThiefChooseBetweenWerewolves" :disabled="!game.canUpdateOptions"
                               :labels="$t('VueToggleButton.yesNo')" :height="25" :width="60" :sync="true"/>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="mustThiefChooseBetweenWerewolvesText"/>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row">
            <div class="option-section col-12 d-flex align-items-center">
                <RoleImage role="raven" class="mr-2 option-section-image"/>
                <div v-html="$t('GameRolesOptions.raven')"/>
            </div>
        </div>
        <hr class="bg-dark my-1"/>
        <div class="row align-items-center">
            <div class="col-8">
                <label for="raven-mark-penalty-option" class="option-label"
                       v-html="$t('GameRolesOptions.ravenMarkPenalty.label')"/>
            </div>
            <div class="col-4 d-flex justify-content-center">
                <div class="col-lg-8">
                    <input id="raven-mark-penalty-option" v-model.number="ravenMarkPenalty" class="form-control"
                           type="number" min="1" max="5" :disabled="!game.canUpdateOptions"/>
                </div>
            </div>
        </div>
        <div class="row mt-1">
            <div class="col-12 text-muted font-italic" v-html="ravenMarkPenaltyText"/>
        </div>
    </div>
</template>

<script>
import uniqId from "uniqid";
import { mapActions, mapGetters } from "vuex";
import { adjustNumber } from "@/helpers/functions/Number";
import sheriffSVG from "@/assets/svg/attributes/sheriff.svg";
import RoleImage from "@/components/shared/Game/Role/RoleImage";
import { fuseSearch } from "@/helpers/functions/VSelect";
import GameAdditionalCard from "@/classes/GameAdditionalCard";
import { listRoles } from "@/helpers/functions/Role";

export default {
    name: "GameRolesOptions",
    components: { RoleImage },
    data() {
        return {
            SVGs: { sheriff: sheriffSVG },
            additionalCardPickedAtTs: Date.now(),
        };
    },
    computed: {
        ...mapGetters("game", { game: "game" }),
        ...mapGetters("role", { roles: "roles" }),
        isGameRepartitionHidden: {
            get() {
                return this.game.options.repartition.isHidden;
            },
            set(isGameRepartitionHidden) {
                this.setGameOptionIsGameRepartitionHidden(isGameRepartitionHidden);
                this.$emit("options-updated");
            },
        },
        areRolesRevealedOnDeath: {
            get() {
                return this.game.options.roles.areRevealedOnDeath;
            },
            set(areRolesRevealedOnDeath) {
                this.setGameOptionAreRolesRevealedOnDeath(areRolesRevealedOnDeath);
                this.$emit("options-updated");
            },
        },
        isSheriffEnabled: {
            get() {
                return this.game.options.roles.sheriff.isEnabled;
            },
            set(isSheriffEnabled) {
                this.setGameOptionIsSheriffEnabled(isSheriffEnabled);
                this.$emit("options-updated");
            },
        },
        sheriffElectedAtTurn: {
            get() {
                return this.game.options.roles.sheriff.electedAt.turn;
            },
            set(sheriffElectedAtTurn) {
                sheriffElectedAtTurn = adjustNumber(sheriffElectedAtTurn, { min: 1, max: 5 });
                this.setGameOptionSheriffElectedAtTurn(sheriffElectedAtTurn);
                this.$emit("options-updated");
            },
        },
        sheriffElectedAtPhase: {
            get() {
                return this.game.options.roles.sheriff.electedAt.phase === "day";
            },
            set(sheriffElectedAtPhase) {
                sheriffElectedAtPhase = sheriffElectedAtPhase ? "day" : "night";
                this.setGameOptionSheriffElectedAtPhase(sheriffElectedAtPhase);
                this.$emit("options-updated");
            },
        },
        isSheriffVoteDoubled: {
            get() {
                return this.game.options.roles.sheriff.hasDoubledVote;
            },
            set(isSheriffVoteDoubled) {
                this.setGameOptionIsSheriffVoteDoubled(isSheriffVoteDoubled);
                this.$emit("options-updated");
            },
        },
        isBigBadWolfPowerlessIfWerewolfDies: {
            get() {
                return this.game.options.roles.bigBadWolf.isPowerlessIfWerewolfDies;
            },
            set(isBigBadWolfPowerlessIfWerewolfDies) {
                this.setGameOptionIsBigBadWolfPowerlessIfWerewolfDies(isBigBadWolfPowerlessIfWerewolfDies);
                this.$emit("options-updated");
            },
        },
        whiteWerewolfWakingUpInterval: {
            get() {
                return this.game.options.roles.whiteWerewolf.wakingUpInterval;
            },
            set(whiteWerewolfWakingUpInterval) {
                whiteWerewolfWakingUpInterval = adjustNumber(whiteWerewolfWakingUpInterval, { min: 1, max: 5 });
                this.setGameOptionWhiteWerewolfWakingUpInterval(whiteWerewolfWakingUpInterval);
                this.$emit("options-updated");
            },
        },
        isSeerTalkative: {
            get() {
                return this.game.options.roles.seer.isTalkative;
            },
            set(isSeerTalkative) {
                this.setGameOptionIsSeerTalkative(isSeerTalkative);
                this.$emit("options-updated");
            },
        },
        canSeerSeeRoles: {
            get() {
                return this.game.options.roles.seer.canSeeRoles;
            },
            set(canSeerSeeRoles) {
                this.setGameOptionCanSeerSeeRoles(canSeerSeeRoles);
                this.$emit("options-updated");
            },
        },
        isLittleGirlProtectedByGuard: {
            get() {
                return this.game.options.roles.littleGirl.isProtectedByGuard;
            },
            set(isLittleGirlProtectedByGuard) {
                this.setGameOptionIsLittleGirlProtectedByGuard(isLittleGirlProtectedByGuard);
                this.$emit("options-updated");
            },
        },
        canGuardProtectTwice: {
            get() {
                return this.game.options.roles.guard.canProtectTwice;
            },
            set(canGuardProtectTwice) {
                this.setGameOptionCanGuardProtectTwice(canGuardProtectTwice);
                this.$emit("options-updated");
            },
        },
        doesIdiotDieOnAncientDeath: {
            get() {
                return this.game.options.roles.idiot.doesDieOnAncientDeath;
            },
            set(doesIdiotDieOnAncientDeath) {
                this.setGameOptionDoesIdiotDieOnAncientDeath(doesIdiotDieOnAncientDeath);
                this.$emit("options-updated");
            },
        },
        sistersWakingUpInterval: {
            get() {
                return this.game.options.roles.twoSisters.wakingUpInterval;
            },
            set(newSistersWakingUpInterval) {
                newSistersWakingUpInterval = adjustNumber(newSistersWakingUpInterval, { min: 0, max: 5 });
                this.setGameOptionSistersWakingUpInterval(newSistersWakingUpInterval);
                this.$emit("options-updated");
            },
        },
        brothersWakingUpInterval: {
            get() {
                return this.game.options.roles.threeBrothers.wakingUpInterval;
            },
            set(newBrothersWakingUpInterval) {
                newBrothersWakingUpInterval = adjustNumber(newBrothersWakingUpInterval, { min: 0, max: 5 });
                this.setGameOptionBrothersWakingUpInterval(newBrothersWakingUpInterval);
                this.$emit("options-updated");
            },
        },
        isFoxPowerlessIfMissesWerewolf: {
            get() {
                return this.game.options.roles.fox.isPowerlessIfMissesWerewolf;
            },
            set(isFoxPowerlessIfMissesWerewolf) {
                this.setGameOptionIsFoxPowerlessIfMissesWerewolf(isFoxPowerlessIfMissesWerewolf);
                this.$emit("options-updated");
            },
        },
        doesBearTamerGrowlIfInfected: {
            get() {
                return this.game.options.roles.bearTamer.doesGrowlIfInfected;
            },
            set(doesBearTamerGrowlIfInfected) {
                this.setGameOptionDoesBearTamerGrowlIfInfected(doesBearTamerGrowlIfInfected);
                this.$emit("options-updated");
            },
        },
        stutteringJudgeVoteRequestsCount: {
            get() {
                return this.game.options.roles.stutteringJudge.voteRequestsCount;
            },
            set(stutteringJudgeVoteRequestsCount) {
                stutteringJudgeVoteRequestsCount = adjustNumber(stutteringJudgeVoteRequestsCount, { min: 1, max: 5 });
                this.setGameOptionStutteringJudgeVoteRequestsCount(stutteringJudgeVoteRequestsCount);
                this.$emit("options-updated");
            },
        },
        isWildChildTransformationRevealed: {
            get() {
                return this.game.options.roles.wildChild.isTransformationRevealed;
            },
            set(isWildChildTransformationRevealed) {
                this.setGameOptionIsWildChildTransformationRevealed(isWildChildTransformationRevealed);
                this.$emit("options-updated");
            },
        },
        isDogWolfChosenSideRevealed: {
            get() {
                return this.game.options.roles.dogWolf.isChosenSideRevealed;
            },
            set(isDogWolfChosenSideRevealed) {
                this.setGameOptionIsDogWolfChosenSideRevealed(isDogWolfChosenSideRevealed);
                this.$emit("options-updated");
            },
        },
        thiefAdditionalCardsOptions() {
            const availableRoles = this.roles.filter(role => {
                const roleCountInPlayers = this.game.getPlayersWithRole(role.name).length;
                const roleCountInAdditionalCards = this.game.additionalCards.filter(({ role: roleName }) => roleName === role.name).length;
                const roleCount = roleCountInPlayers + roleCountInAdditionalCards;
                return !role.minInGame && role.maxInGame > roleCount;
            });
            return availableRoles.map(({ name }) => ({
                ...new GameAdditionalCard({ _id: uniqId(this.additionalCardPickedAtTs), for: "thief", role: name, isUsed: false }),
                displayedName: this.$t(`Role.the.${name}`),
            }));
        },
        mustThiefChooseBetweenWerewolves: {
            get() {
                return this.game.options.roles.thief.mustChooseBetweenWerewolves;
            },
            set(mustThiefChooseBetweenWerewolves) {
                this.setGameOptionMustThiefChooseBetweenWerewolves(mustThiefChooseBetweenWerewolves);
                this.$emit("options-updated");
            },
        },
        ravenMarkPenalty: {
            get() {
                return this.game.options.roles.raven.markPenalty;
            },
            set(newRavenMarkPenalty) {
                newRavenMarkPenalty = adjustNumber(newRavenMarkPenalty, { min: 1, max: 5 });
                this.setGameOptionRavenMarkPenalty(newRavenMarkPenalty);
                this.$emit("options-updated");
            },
        },
        isGameRepartitionHiddenText() {
            const description = this.isGameRepartitionHidden ? "gameRepartitionIsHidden" : "gameRepartitionIsNotHidden";
            return this.$t(`GameRolesOptions.isGameRepartitionHidden.description.${description}`);
        },
        areRolesRevealedOnDeathText() {
            const description = this.areRolesRevealedOnDeath ? "rolesAreRevealedOnDeath" : "rolesAreNotRevealedOnDeath";
            return this.$t(`GameRolesOptions.areRolesRevealedOnDeath.description.${description}`);
        },
        isSheriffEnabledText() {
            const description = this.isSheriffEnabled ? "sheriffIsEnabled" : "sheriffIsNotEnabled";
            return this.$t(`GameRolesOptions.isSheriffEnabled.description.${description}`);
        },
        sheriffElectedAtText() {
            const { sheriffElectedAtTurn: turn } = this;
            let { sheriffElectedAtPhase: phase } = this;
            phase = phase ? "day" : "night";
            phase = this.$t(`GameRolesOptions.sheriffElectedAt.phase.${phase}`);
            return this.$t(`GameRolesOptions.sheriffElectedAt.description`, { phase, turn });
        },
        isSheriffVoteDoubledText() {
            const description = this.isSheriffVoteDoubled ? "sheriffVoteIsDoubled" : "sheriffVoteIsNotDoubled";
            return this.$t(`GameRolesOptions.isSheriffVoteDoubled.description.${description}`);
        },
        isBigBadWolfPowerlessIfWerewolfDiesText() {
            let description;
            if (this.isBigBadWolfPowerlessIfWerewolfDies) {
                description = "bigBadWolfIsPowerlessIfWerewolfDies";
            } else {
                description = "bigBadWolfIsNotPowerlessIfWerewolfDies";
            }
            return this.$t(`GameRolesOptions.isBigBadWolfPowerlessIfWerewolfDies.description.${description}`);
        },
        whiteWerewolfWakingUpIntervalText() {
            const { whiteWerewolfWakingUpInterval: wakingUpInterval } = this;
            return this.$tc(`GameRolesOptions.whiteWerewolfWakingUpInterval.description`, wakingUpInterval, { wakingUpInterval });
        },
        seerOptionsText() {
            const text = "GameRolesOptions.seerOptionsText";
            if (this.isSeerTalkative) {
                return this.canSeerSeeRoles ? this.$t(`${text}.talkativeAndCanSeeRoles`) : this.$t(`${text}.talkativeAndCantSeeRoles`);
            }
            return this.canSeerSeeRoles ? this.$t(`${text}.notTalkativeAndCanSeeRoles`) : this.$t(`${text}.notTalkativeAndCantSeeRoles`);
        },
        isLittleGirlProtectedByGuardText() {
            const description = this.isLittleGirlProtectedByGuard ? "littleGirlIsProtected" : "littleGirlIsNotProtected";
            return this.$t(`GameRolesOptions.isLittleGirlProtectedByGuard.description.${description}`);
        },
        canGuardProtectTwiceText() {
            const description = this.canGuardProtectTwice ? "guardCanProtectTwice" : "guardCantProtectTwice";
            return this.$t(`GameRolesOptions.canGuardProtectTwice.description.${description}`);
        },
        doesIdiotDieOnAncientDeathText() {
            const description = this.doesIdiotDieOnAncientDeath ? "idiotDiesOnAncientDeath" : "idiotDoesntDieOnAncientDeath";
            return this.$t(`GameRolesOptions.doesIdiotDieOnAncientDeath.description.${description}`);
        },
        sistersWakingUpIntervalText() {
            const { sistersWakingUpInterval } = this;
            return this.$tc("GameRolesOptions.sistersWakingUpInterval.description", sistersWakingUpInterval, { sistersWakingUpInterval });
        },
        brothersWakingUpIntervalText() {
            const { brothersWakingUpInterval } = this;
            return this.$tc("GameRolesOptions.brothersWakingUpInterval.description", brothersWakingUpInterval, { brothersWakingUpInterval });
        },
        isFoxPowerlessIfMissesWerewolfText() {
            const description = this.isFoxPowerlessIfMissesWerewolf ? "foxIsPowerlessIfMissesWerewolf" : "foxIsNotPowerlessIfMissesWerewolf";
            return this.$t(`GameRolesOptions.isFoxPowerlessIfMissesWerewolf.description.${description}`);
        },
        doesBearTamerGrowlIfInfectedText() {
            const description = this.doesBearTamerGrowlIfInfected ? "bearTamerGrowlsIfInfected" : "bearTamerDoesntGrowlIfInfected";
            return this.$t(`GameRolesOptions.doesBearTamerGrowlIfInfected.description.${description}`);
        },
        stutteringJudgeVoteRequestsCountText() {
            const { stutteringJudgeVoteRequestsCount: count } = this;
            return this.$tc("GameRolesOptions.stutteringJudgeVoteRequestsCount.description", count, { count });
        },
        isWildChildTransformationRevealedText() {
            const description = this.isWildChildTransformationRevealed ? "wildChildTransformationRevealed" : "wildChildTransformationNotRevealed";
            return this.$t(`GameRolesOptions.isWildChildTransformationRevealed.description.${description}`);
        },
        isDogWolfChosenSideRevealedText() {
            const description = this.isDogWolfChosenSideRevealed ? "dogWolfChosenSideRevealed" : "dogWolfChosenSideNotRevealed";
            return this.$t(`GameRolesOptions.isDogWolfChosenSideRevealed.description.${description}`);
        },
        thiefAdditionalCardsValidationIcon() {
            const { thiefAdditionalCards } = this.game;
            const leftToPick = 2 - thiefAdditionalCards.length;
            if (leftToPick) {
                return "fa-exclamation-circle text-danger animate__animated animate__heartBeat animate__infinite";
            }
            return "fa-check-circle text-success";
        },
        thiefAdditionalCardsValidationText() {
            const { thiefAdditionalCards } = this.game;
            const leftToPick = 2 - thiefAdditionalCards.length;
            return this.$tc("GameRolesOptions.thiefAdditionalCardsLeftToPick", leftToPick, { leftToPick });
        },
        thiefAdditionalCardsText() {
            if (!this.game.thiefPlayer) {
                return this.$t("GameRolesOptions.thereIsNoThiefInParty");
            }
            const { thiefAdditionalCards } = this.game;
            let additionalCardsText;
            if (!thiefAdditionalCards.length) {
                additionalCardsText = "..";
            } else {
                additionalCardsText = listRoles(thiefAdditionalCards.map(({ role }) => ({ name: role })), "a", "or");
            }
            return this.$t("GameRolesOptions.thiefWillBeAbleToPlay", { additionalCardsText });
        },
        mustThiefChooseBetweenWerewolvesText() {
            const description = this.mustThiefChooseBetweenWerewolves ? "thiefMustChooseBetweenWerewolves" : "thiefMustNotChooseBetweenWerewolves";
            return this.$t(`GameRolesOptions.mustThiefChooseBetweenWerewolves.description.${description}`);
        },
        ravenMarkPenaltyText() {
            const { ravenMarkPenalty } = this;
            return this.$tc("GameRolesOptions.ravenMarkPenalty.description", ravenMarkPenalty, { ravenMarkPenalty });
        },
    },
    methods: {
        ...mapActions("game", {
            setGameOptionIsGameRepartitionHidden: "setGameOptionIsGameRepartitionHidden",
            setGameOptionAreRolesRevealedOnDeath: "setGameOptionAreRolesRevealedOnDeath",
            setGameOptionIsSheriffEnabled: "setGameOptionIsSheriffEnabled",
            setGameOptionSheriffElectedAtTurn: "setGameOptionSheriffElectedAtTurn",
            setGameOptionSheriffElectedAtPhase: "setGameOptionSheriffElectedAtPhase",
            setGameOptionIsSheriffVoteDoubled: "setGameOptionIsSheriffVoteDoubled",
            setGameOptionIsBigBadWolfPowerlessIfWerewolfDies: "setGameOptionIsBigBadWolfPowerlessIfWerewolfDies",
            setGameOptionWhiteWerewolfWakingUpInterval: "setGameOptionWhiteWerewolfWakingUpInterval",
            setGameOptionIsSeerTalkative: "setGameOptionIsSeerTalkative",
            setGameOptionCanSeerSeeRoles: "setGameOptionCanSeerSeeRoles",
            setGameOptionDoesIdiotDieOnAncientDeath: "setGameOptionDoesIdiotDieOnAncientDeath",
            setGameOptionIsLittleGirlProtectedByGuard: "setGameOptionIsLittleGirlProtectedByGuard",
            setGameOptionCanGuardProtectTwice: "setGameOptionCanGuardProtectTwice",
            setGameOptionSistersWakingUpInterval: "setGameOptionSistersWakingUpInterval",
            setGameOptionBrothersWakingUpInterval: "setGameOptionBrothersWakingUpInterval",
            setGameOptionIsFoxPowerlessIfMissesWerewolf: "setGameOptionIsFoxPowerlessIfMissesWerewolf",
            setGameOptionDoesBearTamerGrowlIfInfected: "setGameOptionDoesBearTamerGrowlIfInfected",
            setGameOptionIsWildChildTransformationRevealed: "setGameOptionIsWildChildTransformationRevealed",
            setGameOptionIsDogWolfChosenSideRevealed: "setGameOptionIsDogWolfChosenSideRevealed",
            setGameOptionStutteringJudgeVoteRequestsCount: "setGameOptionStutteringJudgeVoteRequestsCount",
            setGameThiefAdditionalCards: "setGameThiefAdditionalCards",
            setGameOptionMustThiefChooseBetweenWerewolves: "setGameOptionMustThiefChooseBetweenWerewolves",
            setGameOptionRavenMarkPenalty: "setGameOptionRavenMarkPenalty",
        }),
        filterByRoleName(option, search) {
            return fuseSearch(option, search, ["displayedName"]);
        },
        selectAdditionalCard(thiefAdditionalCards) {
            this.additionalCardPickedAtTs = Date.now();
            this.setGameThiefAdditionalCards(thiefAdditionalCards);
            this.$emit("options-updated");
        },
    },
};
</script>

<style scoped>
    .option-section {
        font-size: 1.2rem;
    }

    .option-label {
        font-size: 1rem;
        margin-bottom: 0;
    }

    .option-section-image {
        width: 50px;
        height: 50px;
    }

    .role-image-option {
        min-width: 20px;
        min-height: 20px;
        max-width: 20px;
        max-height: 20px;
    }
</style>