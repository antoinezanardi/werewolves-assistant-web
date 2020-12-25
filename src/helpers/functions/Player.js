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
    const oneTargetAttributes = [
        "seen",
        "eaten",
        "drank-life-potion",
        "drank-death-potion",
        "protected",
        "raven-marked",
        "worshiped",
        "chosen-for-vote",
        "delegate",
    ];
    const twoTargetsAttributes = ["in-love"];
    if (oneTargetAttributes.includes(attribute)) {
        return 1;
    } else if (twoTargetsAttributes.includes(attribute)) {
        return 2;
    }
    return 0;
}