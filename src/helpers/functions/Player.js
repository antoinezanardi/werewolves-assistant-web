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
    for (const vote of votes) {
        incrementPlayerVoteCount(votedPlayers, vote.for, game);
    }
    if (action === "vote") {
        const ravenMarkedPlayer = game.getPlayerWithAttribute("raven-marked");
        if (ravenMarkedPlayer.isAlive) {
            incrementPlayerVoteCount(votedPlayers, ravenMarkedPlayer._id, game, 2);
        }
    }
    const maxVotes = Math.max(...votedPlayers.map(player => player.vote));
    return votedPlayers.filter(player => player.vote === maxVotes);
}