export default function findUserWithId(users, id) {

    if (!users || !id) 
        return null;

    if (!Array.isArray(users)) {
        Object.entries(users).map(value => 
            value[1].map(user => {
                if (user.id === +id)
                    return user.name || user.login;
            })
        )
    } 

    let user = users.find(user => user.id === +id);
    return user.name || user.login;
}