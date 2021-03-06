import { getProp } from "@/helpers/functions/Class";

class Role {
    constructor(role = null) {
        this.name = getProp(role, "name");
        this.side = getProp(role, "side");
        this.type = getProp(role, "type");
        this.minInGame = getProp(role, "minInGame");
        this.maxInGame = getProp(role, "maxInGame");
        this.recommendedMinPlayers = getProp(role, "recommendedMinPlayers");
    }

    minimumReached(game) {
        const roleCount = game.getPlayersWithRole(this.name).length;
        return !roleCount || this.minInGame <= roleCount;
    }

    get isInWerewolvesSide() {
        return this.side === "werewolves";
    }

    get isInVillagersSide() {
        return this.side === "villagers";
    }
}

export default Role;