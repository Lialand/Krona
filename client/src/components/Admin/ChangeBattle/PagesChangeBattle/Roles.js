import React, { useEffect, useState } from "react";
import { Button, Select } from "semantic-ui-react";

import findUserWithId from "utils/findUserWithId";
import { findRoles, findUsersWithRoles } from "utils/findRoles";
import { redactBattleInputs as inputs } from "constants/inputs";

const getRoleName = (text, arr) => arr.find(item => item.value === text).text;

function Roles({
    changeRole,
    redactedBattleDetailed,
    distributePrevBattleRoles,
    isLastBattle,
    users
}) {

    const [userId, setId] = useState(-1);
    const [name, setName] = useState("");
    const [roles, setRoles] = useState({});
    const [usersWithRoles, setUsersWithRoles] = useState({});

    useEffect(() => setRoles(findRoles(userId, redactedBattleDetailed)), [userId, redactedBattleDetailed]);

    useEffect(() => {

        if (users.length) {
            setUsersWithRoles(findUsersWithRoles(users, redactedBattleDetailed));
        }
    }, [users, redactedBattleDetailed]);

    if (users.length === 0) 
        return <></>;
    return (
        <div className="redactRoles">
            {!isLastBattle && 
                <Button onClick={distributePrevBattleRoles} className="distributePrevBattleRoles">
                    Распределить роли, как в последнем баттле
                </Button>
            }
            <p className="selectHeading">Выберите пользователя для редактирования ролей:</p>
            <Select
                search
                searchInput={{ type: "text" }}
                text={users.length ? "Все пользователи" : "Пользователи не найдены"} 
                className="selectStyled selectUsers"
                onChange={(e, { value }) => {
                    setId(+value); 
                    setName(findUserWithId(users, +value));
                }} 
                options={users?.map(user => (
                    {
                        key: user.id,
                        text: user.name || user.login, 
                        value: user.id
                    }
                )) || []}
            />
            <Select
                text={usersWithRoles?.battleAdmins?.length ? "Администраторы баттла" : "Администраторы баттла не найдены"} 
                className="selectStyled selectUsers"
                onChange={(e, { value }) => {
                    setId(+value); 
                    setName(findUserWithId(users, +value));
                }} 
                options={usersWithRoles?.battleAdmins?.map(user => (
                    {
                        key: user.id,
                        text: user.name || user.login, 
                        value: user.id
                    }
                )) || []}
            />
            <Select
                text={usersWithRoles?.moderators?.length ? "Модераторы" : "Модераторы не найдены"} 
                className="selectStyled selectUsers"
                onChange={(e, { value }) => {
                    setId(+value); 
                    setName(findUserWithId(users, +value));
                }} 
                options={usersWithRoles?.moderators?.map(user => (
                    {
                        key: user.id,
                        text: user.name || user.login, 
                        value: user.id
                    }
                )) || []}
            />
            {userId !== -1 && 
                <>
                    <p className="selectHeading">Выбранный пользователь: {name}, id: {userId}</p>
                    <p className="selectHeading">Назначить роль:</p>
                    <Select 
                        text="Роли"
                        className="selectStyled"
                        onChange={(e, { value }) => changeRole("add", value, userId)} 
                        options={
                            inputs.roles.map(role => ({
                                key: role.key,
                                text: role.text, 
                                value: role.value
                            }))
                        }
                    />
                    <p className="selectHeading">Роли, имеющиеся у пользователя:</p>
                    <ul className="rolesUl">
                        {Object.entries(roles)?.map(role => 
                            role[1] 
                                && 
                                <li key={role[0]}>
                                    {getRoleName(role[0], inputs.roles)}
                                    <div onClick={() => changeRole("remove", role[0], userId)} className="roleDelete">Удалить роль</div>
                                </li>    
                        )}
                    </ul>
                </>
            }
        </div>
    )
}

export default Roles;