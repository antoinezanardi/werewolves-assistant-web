import uniqId from "uniqid";
import { getProp } from "@/helpers/functions/Class";
import Player from "./Player";

class GameEvent {
    constructor(gameEvent = null) {
        this._id = getProp(gameEvent, "_id", uniqId());
        this.type = getProp(gameEvent, "type");
        this.targets = getProp(gameEvent, "targets", [], targets => targets.map(target => ({
            player: new Player(target.player),
            potion: {
                life: getProp(target, "potion.life"),
                death: getProp(target, "potion.death"),
            },
        })));
        this.side = getProp(gameEvent, "side");
    }
}

export default GameEvent;