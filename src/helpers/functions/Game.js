export function isVoteAction(action) {
    const voteActions = ["elect-sheriff", "vote"];
    return voteActions.includes(action);
}

export function isForbiddenTieVoteAction(action) {
    const forbiddenTieVoteActions = ["elect-sheriff"];
    return forbiddenTieVoteActions.includes(action);
}

export function isTimedAction(action) {
    const timedActions = ["elect-sheriff", "vote", "meet-each-other"];
    return timedActions.includes(action);
}

export function isTargetAction(action) {
    const targetActions = ["look", "eat", "protect", "shoot", "settle-votes", "delegate", "charm", "choose-model"];
    return targetActions.includes(action);
}

export function isSkippableAction(action, additionalCards) {
    const skippableActions = ["use-potion", "mark", "meet-each-other", "ban-voting", "choose-sign"];
    const werewolfRoles = ["werewolf", "white-werewolf", "vile-father-of-wolves", "big-bad-wolf"];
    return skippableActions.includes(action) || action === "choose-card" && !additionalCards.every(({ role }) => werewolfRoles.includes(role));
}

export function isPreFirstNightPlay(action, turn, phase) {
    const preFirstNightActions = ["elect-sheriff", "vote", "settle-votes", "delegate", "ban-voting"];
    return turn === 1 && phase === "night" && preFirstNightActions.includes(action);
}