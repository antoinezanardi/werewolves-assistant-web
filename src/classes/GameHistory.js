import { getProp } from "../helpers/functions/Class";

class GameHistory {
    constructor(gameHistory = null) {
        this._id = getProp(gameHistory, "_id");
    }
}

export default GameHistory;