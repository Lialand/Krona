import { NavLink } from "react-router-dom";
import {
    redact_battle_roles,
    redact_battle_mission,
    redact_battle_materials,
    redact_battle_basic,
    redact_battle_criterions
} from "constants/pages";

export const changeBattlePanes = url => [
    {
        menuItem: {
            as: NavLink,
            to: url + redact_battle_basic,
            exact: true,
            key: 1,
            content: "Основная информация",
            className: "changeBattleLink"
        }
    },
    {
        menuItem: {
            as: NavLink,
            to: url + redact_battle_mission,
            exact: true,
            key: 2,
            content: "Задание, условия участия и призы",
            className: "changeBattleLink"
        }
    },
    {
        menuItem: {
            as: NavLink,
            to: url + redact_battle_materials,
            exact: true,
            key: 3,
            content: "Материалы",
            className: "changeBattleLink"
        }
    },
    {
        menuItem: {
            as: NavLink,
            to: url + redact_battle_criterions,
            exact: true,
            key: 4,
            content: "Критерии оценок и жюри",
            className: "changeBattleLink"
        }
    },
    {
        menuItem: {
            as: NavLink,
            to: url + redact_battle_roles,
            exact: true,
            key: 5,
            content: "Роли",
            className: "changeBattleLink"
        }
    },
]