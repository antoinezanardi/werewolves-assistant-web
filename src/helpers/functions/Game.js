import defaultGameOptions from "../constants/default-game-options.json";

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

export function areAllAdditionalCardsWerewolves(additionalCards) {
    const werewolfRoles = ["werewolf", "white-werewolf", "vile-father-of-wolves", "big-bad-wolf"];
    return additionalCards.every(({ role }) => werewolfRoles.includes(role));
}

export function isSkippableAction(action, source, game) {
    const { additionalCards, aliveVillagerPlayers, options } = game;
    const skippableActions = ["use-potion", "mark", "meet-each-other", "ban-voting", "choose-sign", "sniff"];
    const areAllVillagersEaten = aliveVillagerPlayers.every(player => player.hasAttribute("eaten"));
    return skippableActions.includes(action) ||
        action === "eat" && (source === "white-werewolf" || source === "big-bad-wolf" && areAllVillagersEaten) ||
        action === "choose-card" && additionalCards &&
        (!options.roles.thief.mustChooseBetweenWerewolves || !areAllAdditionalCardsWerewolves(additionalCards));
}

export function isPreFirstNightPlay(action, turn, phase) {
    const preFirstNightActions = ["elect-sheriff", "vote", "settle-votes", "delegate", "ban-voting", "shoot"];
    return turn === 1 && phase === "night" && preFirstNightActions.includes(action);
}

export function getDefaultGameOptions() {
    return JSON.parse(JSON.stringify(defaultGameOptions));
}