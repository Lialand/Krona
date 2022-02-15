const { BATTLE_STAGE_IDS } = require("server/constants");
const { CREATED, PLANNED, STAGE1, FILTER, STAGE2, GRADE, CLOSED } = BATTLE_STAGE_IDS;

export const regInputs = (isActivePassView) => [
    {
        info: "Придумайте логин *",
        name: "login",
        type: "text",
        desc: "Для авторизации и виден всем пользователям"
    },
    {
        info: "Придумайте пароль *",
        name: "password",
        type: isActivePassView ? "text" : "password"
    },
    {
        info: "Введите email *",
        name: "email",
        type: "e-mail",
        desc: "Для подтверждения аккаунта и отправки уведомлений"
    },
    {
        info: "Ссылка на вашу соцсеть *",
        name: "site",
        type: "text",
        desc: "Для перехода в ваш аккаунт и привязки предыдущих работ (при участии ранее)"
    },
    // {
    //     info: "Ваше имя",
    //     name: "name",
    //     type: "text",
    //     desc: "Имя отображается на сайте"
    // },
];

export const redactBattleInputs = {
    basic: [
        {
            id: 1,
            info: "Название баттла",
            name: "name",
        },
        {
            id: 12,
            info: "Категория баттла",
            name: "categoryId",
            type: "select"
        },
        {
            id: 6,
            info: "Стадия баттла",
            name: "battleStageId",
            type: "select",
            options: [
                {
                    name: "Создан",
                    value: CREATED
                },
                {
                    name: "Запланирован",
                    value: PLANNED
                },
                {
                    name: "Первый этап. Прием работ",
                    value: STAGE1
                },
                {
                    name: "Отбор работ",
                    value: FILTER
                },
                {
                    name: "Второй этап. Прием исправлений работ",
                    value: STAGE2
                },
                {
                    name: "Оценка работ",
                    value: GRADE
                },
                {
                    name: "Завершен",
                    value: CLOSED
                },
            ]
        },
        {
            id: 2,
            info: "Изображение баттла",
            name: "battleImage",
            type: "file"
        },
        {
            id: 3,
            info: "Дата начала баттла",
            name: "startDate",
            type: "date",
        },
        {
            id: 4,
            info: "Дата завершения баттла",
            name: "finishDate",
            type: "date",
        },
        {
            id: 5,
            info: "Максимальное число работ баттла",
            name: "worksLimit",
            type: "number"
        },
    ],
    materials: [
        {
            id: 7,
            info: "Ссылка на видеоматериал",
            name: "href",
        },
        {
            id: 8,
            info: "Описание видеоматериала",
            name: "description",
        },
    ],
    mission: [
        {
            id: 9,
            info: "Условия участия",
            name: "conditions",
        },
        {
            id: 10,
            info: "Задание",
            name: "target",
        },
        {
            id: 11,
            info: "Призы",
            name: "prizes",
        },
    ],
    roles: [
        {
            key: 12,
            text: "Администратор баттла",
            value: "battleAdmins"
        },
        {
            key: 13,
            text: "Модератор",
            value: "moderators"
        }
    ]
}