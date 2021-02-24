import { getProp } from "@/helpers/functions/Class";
import { isPlayerAttributeActive } from "@/helpers/functions/Player";

class Player {
    constructor(player = null) {
        this._id = getProp(player, "_id");
        this.name = getProp(player, "name");
        this.role = {
            original: getProp(player, "role.original"),
            current: getProp(player, "role.current"),
            isRevealed: getProp(player, "role.isRevealed"),
        };
        this.side = {
            original: getProp(player, "side.original"),
            current: getProp(player, "side.current"),
        };
        this.attributes = getProp(player, "attributes", [], attributes => attributes.map(attribute => attribute));
        this.isAlive = getProp(player, "isAlive");
        this.murdered = {
            by: getProp(player, "murdered.by"),
            of: getProp(player, "murdered.of"),
        };
    }

    hasAttribute(attributeName) {
        return !!this.attributes.find(({ name }) => name === attributeName);
    }

    hasActiveAttribute(attributeName, game) {
        return !!this.attributes.find(attribute => attribute.name === attributeName && isPlayerAttributeActive(attribute, game));
    }

    get currentRole() {
        return this.role.current;
    }

    get originalRole() {
        return this.role.original;
    }

    get isRoleRevealed() {
        return this.role.isRevealed;
    }

    get isAliveAndPowerful() {
        return this.isAlive && !this.hasAttribute("powerless");
    }
}

export default Player;