import { getProp } from "../helpers/functions/Class";

class Role {
    constructor(role = null) {
        this.name = getProp(role, "name");
        this.group = getProp(role, "group");
        this.maxInGame = getProp(role, "maxInGame");
    }
}

export default Role;