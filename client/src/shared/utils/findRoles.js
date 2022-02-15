export function findRoles(userId, redactedBattleDetailed) {

    const roles = ["battleAdmins", "moderators"];
    const rolesObj = {
        battleAdmins: false,
        // juries: false,
        moderators: false
    }

    roles.forEach(role => {
        if (redactedBattleDetailed[role].find(item => item.userId === +userId))
            rolesObj[role] = true;
    });

    return rolesObj;
}

export function findUsersWithRoles(allUsers, redactedBattleDetailed) {

    let foundRoles = {};
    let users = {
        battleAdmins: [],
        moderators: [],
        juries: []
    };

    allUsers.forEach(user => {
        foundRoles = findRoles(user.id, redactedBattleDetailed);
        if (foundRoles.battleAdmins) {
            users.battleAdmins.push(user);
        }
        if (foundRoles.moderators) {
            users.moderators.push(user);
        }
        if (foundRoles.juries) {
            users.juries.push(user);
        }
    });

    return users;
}
