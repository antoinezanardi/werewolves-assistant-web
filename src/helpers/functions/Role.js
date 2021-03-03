import i18n from "@/plugins/vue-i18n";

export function listRoles(roles, prefix = "the", conjunction = "and") {
    let rolesText = "";
    for (let i = 0; i < roles.length; i++) {
        rolesText += i18n.t(`Role.${prefix}.${roles[i].name}`);
        if (i + 2 < roles.length) {
            rolesText += ", ";
        } else if (i + 2 === roles.length) {
            rolesText += ` ${i18n.t(`helpers.Role.${conjunction}`)} `;
        }
    }
    return rolesText;
}