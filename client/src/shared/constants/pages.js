//Страницы, доступные всем пользователям
export const works = `/works/` //страница всех работ баттла
export const works_stage2 = `/works_stage2/` //страница работ 2го этапа
export const mission = "/mission/" //страница задания
export const materials = "/materials/" //страница с материалами по баттлам
export const battles = "/battles/" //страница баттлов
export const work_viewing = "/work_viewing/" //страница просмотра полной версии работы 
export const results = "/results/" //страница итогов баттла
export const winners = "/winners/" //страница победителей баттла
export const activate = "/activate/" //страница активации аккаунта
export const battleWithParamURL = (battleId = null) => {
    if (battleId !== null)
        return `${battles}${battleId}`;
    return `${battles}:battleId`;
} //Страница баттлов с параметром id

//Страницы, доступные авторизованным пользователям
export const restore_psw = "/restore_psw/" //страница восстановления пароля
export const profile = "/profile/" //страница профиля пользователя

//Страницы, доступные модератору
export const moderate = "/moderate/" //страница с матералами по баттлам

//Страницы, доступные администратору
export const admin = "/admin/" //страница для администратора
export const approve_user_site = "approve_user_site/" //страница для подтверждения соцсети
export const redact_battle = "redact_battle/" //страница для редактирования баттла
export const redact_battle_roles = "/roles_redact/" //страница для редактирования ролей пользователей в баттле
export const redact_battle_mission = "/mission_redact/" //страница для редактирования задания, условий участия и призов баттла
export const redact_battle_materials = "/materials_redact/" //страница для редактирования материалов баттла
export const redact_battle_basic = "/basic_redact/" //страница для редактирования основной информации баттла
export const redact_battle_criterions = "/criterions_redact/" //страница для редактирования критериев и типов критериев оценок баттла
export const redact_grades = "redact_grades/" //страница для редактирования оценок работ
export const add_battle = "add_battle" //страница для добавления баттла
export const transfer_works = "transfer_works/" //страница для перевода работ на второй этап