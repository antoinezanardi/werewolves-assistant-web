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

export function isSkippableAction(action) {
    const skippableActions = ["use-potion", "mark", "meet-each-other"];
    return skippableActions.includes(action);
}