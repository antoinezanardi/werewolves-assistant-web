import { getProp } from "@/helpers/functions/Class";

class UserPreferences {
    constructor() {
        const localUserPreferences = localStorage.getItem("userPreferences");
        this.game = {
            repartition: {
                forbiddenRoles: getProp(localUserPreferences, "game.repartition.forbidden-roles", []),
                areRecommendedMinPlayersRespected: getProp(localUserPreferences, "game.repartition.areRecommendedMinPlayersRespected", true),
                arePowerfulVillagerRolesPrioritized: getProp(localUserPreferences, "game.repartition.arePowerfulVillagerRolesPrioritized", true),
                arePowerfulWerewolfRolesPrioritized: getProp(localUserPreferences, "game.repartition.arePowerfulWerewolfRolesPrioritized", false),
            },
        };
    }

    save() {
        localStorage.setItem("userPreferences", JSON.stringify(this));
    }
}

export default UserPreferences;