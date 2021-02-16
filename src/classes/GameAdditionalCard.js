import { getProp } from "@/helpers/functions/Class";

class GameAdditionalCard {
    constructor(additionalCard = null) {
        this._id = getProp(additionalCard, "_id");
        this.role = getProp(additionalCard, "role");
        this.for = getProp(additionalCard, "for");
        this.isUsed = getProp(additionalCard, "isUsed");
    }
}

export default GameAdditionalCard;