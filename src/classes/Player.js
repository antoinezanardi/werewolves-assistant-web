import { getProp } from "@/helpers/functions/Class";

class Player {
    constructor(player = null) {
        this._id = getProp(player, "_id");
        this.name = getProp(player, "name");
        this.role = {
            original: getProp(player, "role.original"),
            current: getProp(player, "role.current"),
            group: getProp(player, "role.group"),
        };
        this.attributes = getProp(player, "attributes", [], attributes => attributes.map(attribute => attribute));
        this.isAlive = getProp(player, "isAlive");
        this.murdered = {
            by: getProp(player, "murdered.by"),
            of: getProp(player, "murdered.of"),
        };
    }

    hasAttribute(attributeName) {
        return !!this.attributes.find(({ attribute }) => attribute === attributeName);
    }
}

export default Player;