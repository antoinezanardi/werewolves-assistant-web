import { getProp } from "@/helpers/functions/Class";

class UserPreferences {
    constructor() {
        const localUserPreferences = JSON.parse(localStorage.getItem("userPreferences"));
        this.game = {
            repartition: {
                forbiddenRoles: getProp(localUserPreferences, "game.repartition.forbiddenRoles", []),
                areRecommendedMinPlayersRespected: getProp(localUserPreferences, "game.repartition.areRecommendedMinPlayersRespected", true),
                arePowerfulVillagerRolesPrioritized: getProp(localUserPreferences, "game.repartition.arePowerfulVillagerRolesPrioritized", true),
                arePowerfulWerewolfRolesPrioritized: getProp(localUserPreferences, "game.repartition.arePowerfulWerewolfRolesPrioritized", false),
                isProTipShown: getProp(localUserPreferences, "game.repartition.isProTipShown", true),
            },
        };
        this.audio = {
            isMuted: getProp(localUserPreferences, "audio.isMuted", false),
            ambient: { volume: getProp(localUserPreferences, "audio.ambient.volume", 100) },
            soundEffects: { volume: getProp(localUserPreferences, "audio.soundEffects.volume", 100) },
        };
    }

    save() {
        localStorage.setItem("userPreferences", JSON.stringify(this));
    }
}

export default UserPreferences;