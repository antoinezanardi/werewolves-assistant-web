import i18n from "@/plugins/vue-i18n";

function incrementPlayerVoteCount(votedPlayers, playerId, game, inc = 1) {
    const votedPlayer = votedPlayers.find(player => player._id === playerId);
    if (votedPlayer) {
        votedPlayer.vote += inc;
    } else {
        const player = game.players.find(({ _id }) => _id === playerId);
        votedPlayers.push({ ...player, vote: inc });
    }
}

export function getVotedPlayers(votes, game, action) {
    const votedPlayers = [];
    const sheriffPlayer = game.getPlayerWithAttribute("sheriff");
    for (const vote of votes) {
        if (action === "vote" && sheriffPlayer && sheriffPlayer._id === vote.from && game.options.roles.sheriff.hasDoubledVote) {
            incrementPlayerVoteCount(votedPlayers, vote.for, game, 2);
        } else {
            incrementPlayerVoteCount(votedPlayers, vote.for, game);
        }
    }
    if (action === "vote") {
        const ravenMarkedPlayer = game.getPlayerWithAttribute("raven-marked");
        if (ravenMarkedPlayer && ravenMarkedPlayer.isAlive) {
            incrementPlayerVoteCount(votedPlayers, ravenMarkedPlayer._id, game, game.options.roles.raven.markPenalty);
        }
    }
    return votedPlayers;
}

export function getNominatedPlayers(votes, game, action) {
    const votedPlayers = getVotedPlayers(votes, game, action);
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
        "shoot",
        "sniff",
    ];
    const twoTargetsAttributes = ["in-love", "charmed"];
    if (oneTargetAttributes.includes(attribute)) {
        return 1;
    } else if (twoTargetsAttributes.includes(attribute)) {
        return 2;
    }
    return 0;
}

export function isPlayerAttributeActive({ activeAt }, game) {
    return !activeAt || activeAt.turn <= game.turn && (!activeAt.phase || activeAt.phase === "night" || game.phase === "day");
}

export function listPlayerNames(players) {
    let playersText = "";
    for (let i = 0; i < players.length; i++) {
        playersText += players[i].name;
        if (i + 2 < players.length) {
            playersText += ",";
        } else if (i + 2 === players.length) {
            playersText += ` ${i18n.t("helpers.Player.and")} `;
        }
    }
    return playersText;
}

export function getNearestNeighbor(playerId, players, direction, options = {}) {
    let checkedNeighborsCount = 0;
    const player = players.find(({ _id }) => _id.toString() === playerId.toString());
    if (!player) {
        return null;
    }
    let checkingNeighborPosition = player.position;
    while (checkedNeighborsCount < players.length) {
        const checkingNeighbor = players[checkingNeighborPosition];
        if (checkingNeighbor.position !== player.position && (!options.isAlive || checkingNeighbor.isAlive) &&
            (!options.side || checkingNeighbor.side.current === options.side)) {
            return checkingNeighbor;
        }
        if (direction === "left") {
            checkingNeighborPosition = checkingNeighborPosition + 1 === players.length ? 0 : checkingNeighborPosition + 1;
        } else if (direction === "right") {
            checkingNeighborPosition = checkingNeighborPosition - 1 === -1 ? players.length - 1 : checkingNeighborPosition - 1;
        }
        checkedNeighborsCount++;
    }
    return null;
}