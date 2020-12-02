import { getProp } from "@/helpers/functions/Class";

class Role {
    constructor(role = null) {
        this.name = getProp(role, "name");
        this.side = getProp(role, "side");
        this.minInGame = getProp(role, "minInGame");
        this.maxInGame = getProp(role, "maxInGame");
        this.recommendedMinPlayers = getProp(role, "recommendedMinPlayers");
    }
}

export default Role;