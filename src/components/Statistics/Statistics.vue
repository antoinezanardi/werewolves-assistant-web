<template>
    <div id="statistics" class="container-fluid page-with-navbar pb-2 d-flex flex-column">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center mt-2">
                    <i class="far fa-chart-bar mr-3"/>
                    <span v-html="$t('Statistics.statistics')"/>
                </h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <hr class="bg-dark mt-1 mb-2"/>
            </div>
        </div>
        <transition name="fade" mode="out-in">
            <div v-if="games === null" key="loading" class="flex-grow-1 d-flex justify-content-center align-items-center">
                <Loading :text="$t('Statistics.loadingStatistics')"/>
            </div>
            <div v-else-if="!games.length" key="no-game" class="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
                <h1 class="text-center text-muted">
                    <i class="fa fa-sad-cry mr-3"/>
                    <span v-html="$t('Statistics.youDontHaveGamesCreatedYet')"/>
                </h1>
                <router-link to="/game-lobby" class="btn btn-primary btn-lg mt-3">
                    <i class="fa fa-play-circle mr-2"/>
                    <span v-html="$t('Statistics.createGameNow')"/>
                </router-link>
            </div>
            <div v-else id="statistics-container" key="statistics" class="container-fluid flex-grow-1">
                <div class="row">
                    <div class="col-12">
                        <ul>
                            <li>
                                <span v-html="$tc('Statistics.createdGames', games.length, { count: games.length })"/>
                            </li>
                            <li>
                                <span v-html="$tc('Statistics.averageNumberOfPlayers', averageNumberOfPlayers, { count: averageNumberOfPlayers })"/>
                            </li>
                            <li>
                                <span v-html="$tc('Statistics.averageNumberOfTurns', averageNumberOfTurns, { count: averageNumberOfTurns })"/>
                            </li>
                            <li>
                                <span v-html="`${$t('Statistics.mostUsedRole')}: `"/>
                                <RoleImage width="30" :role="mostUsedRole.role" class="mr-2"/>
                                <span class="mr-2" v-html="`(${$tc(`Role.${mostUsedRole.role}`, 1)})`"/>
                                <span v-html="$tc('Statistics.withUsage', mostUsedRole.count, { count: mostUsedRole.count })"/>
                            </li>
                            <li>
                                <span v-html="`${$t('Statistics.leastUsedRole')}: `"/>
                                <RoleImage width="30" :role="leastUsedRole.role" class="mr-2"/>
                                <span class="mr-2" v-html="`(${$tc(`Role.${leastUsedRole.role}`, 1)})`"/>
                                <span v-html="$tc('Statistics.withUsage', leastUsedRole.count, { count: leastUsedRole.count })"/>
                            </li>
                            <li>
                                <span v-html="averageVillagersWinningText"/>
                            </li>
                            <li>
                                <span v-html="averageWerewolvesWinningText"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
        <div class="row">
            <div class="col">
                <hr class="bg-dark mt-1 mb-2"/>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 col-12">
                <router-link class="btn btn-secondary btn-block" to="/">
                    <i class="fa fa-sign-out-alt mr-2"/>
                    <span v-html="$t('Statistics.backToHome')"/>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from "../shared/Loading";
import Game from "../../classes/Game";
import RoleImage from "../shared/Game/Role/RoleImage";

export default {
    name: "Statistics",
    components: { RoleImage, Loading },
    data() {
        return { games: null };
    },
    computed: {
        doneGames() {
            return this.games ? this.games.filter(({ status }) => status === "done") : undefined;
        },
        gamesWonByVillagers() {
            return this.games ? this.games.filter(({ won }) => won.by === "villagers") : undefined;
        },
        gamesWonByWerewolves() {
            return this.games ? this.games.filter(({ won }) => won.by === "werewolves") : undefined;
        },
        averageNumberOfPlayers() {
            return this.games ? Math.round(this.games.reduce((acc, game) => acc + game.players.length, 0) / this.games.length) : undefined;
        },
        averageNumberOfTurns() {
            return this.games ? Math.round(this.games.reduce((acc, game) => acc + game.turn, 0) / this.games.length) : undefined;
        },
        averageVillagersWinning() {
            return this.gamesWonByVillagers ? Math.round(this.gamesWonByVillagers.length * 100 / this.doneGames.length) : undefined;
        },
        averageVillagersWinningText() {
            return this.$tc("Statistics.averageVillagersWinning", this.averageVillagersWinning, { count: this.averageVillagersWinning });
        },
        averageWerewolvesWinning() {
            return this.gamesWonByVillagers ? Math.round(this.gamesWonByWerewolves.length * 100 / this.doneGames.length) : undefined;
        },
        averageWerewolvesWinningText() {
            return this.$tc("Statistics.averageWerewolvesWinning", this.averageWerewolvesWinning, { count: this.averageWerewolvesWinning });
        },
        roleUsage() {
            if (this.games) {
                const roles = {};
                for (const { players } of this.games) {
                    for (const { role } of players) {
                        if (roles[role.original] === undefined) {
                            roles[role.original] = 1;
                        } else {
                            roles[role.original]++;
                        }
                    }
                }
                return roles;
            }
            return undefined;
        },
        mostUsedRole() {
            let mostUsedRole;
            for (const role in this.roleUsage) {
                if (!mostUsedRole || mostUsedRole.count < this.roleUsage[role]) {
                    mostUsedRole = { role, count: this.roleUsage[role] };
                }
            }
            return mostUsedRole;
        },
        leastUsedRole() {
            let leastUsedRole;
            for (const role in this.roleUsage) {
                if (!leastUsedRole || leastUsedRole.count > this.roleUsage[role]) {
                    leastUsedRole = { role, count: this.roleUsage[role] };
                }
            }
            return leastUsedRole;
        },
    },
    created() {
        this.getGames();
    },
    methods: {
        async getGames() {
            try {
                const { data } = await this.$werewolvesAssistantAPI.getGames();
                this.games = data.map(game => new Game(game));
            } catch (err) {
                this.$error.display(err);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
    @import "../../../node_modules/bootstrap/scss/bootstrap";
    @import "../../assets/scss/variables";

    #statistics-container {
        overflow-y: scroll;

        li {
            @include font-size(1.5rem);
            margin-bottom: 1.15rem;
        }
    }
</style>