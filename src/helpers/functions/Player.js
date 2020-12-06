function incrementPlayerVoteCount(votedPlayers, playerId, game, inc = 1) {
    const votedPlayer = votedPlayers.find(player => player._id === playerId);
    if (votedPlayer) {
        votedPlayer.vote += inc;
    } else {
        const player = game.players.find(({ _id }) => _id === playerId);
        votedPlayers.push({ ...player, vote: inc });
    }
}

export function getNominatedPlayers(votes, game, action) {
    const votedPlayers = [];
    const sheriffPlayer = game.getPlayerWithAttribute("sheriff");
    for (const vote of votes) {
        if (action === "vote" && sheriffPlayer && sheriffPlayer._id === vote.from) {
            incrementPlayerVoteCount(votedPlayers, vote.for, game, 2);
        } else {
            incrementPlayerVoteCount(votedPlayers, vote.for, game);
        }
    }
    if (action === "vote") {
        const ravenMarkedPlayer = game.getPlayerWithAttribute("raven-marked");
        if (ravenMarkedPlayer && ravenMarkedPlayer.isAlive) {
            incrementPlayerVoteCount(votedPlayers, ravenMarkedPlayer._id, game, 2);
        }
    }
    const maxVotes = Math.max(...votedPlayers.map(player => player.vote));
    return votedPlayers.filter(player => player.vote === maxVotes);
}

export function maxTargetLengthForPlayerAttribute(attribute) {
    if (attribute === "seen" || attribute === "eaten" || attribute === "drank-life-potion" || attribute === "protected" ||
        attribute === "raven-marked" || attribute === "worshiped") {
        return 1;
    } else if (attribute === "in-love") {
        return 2;
    }
}