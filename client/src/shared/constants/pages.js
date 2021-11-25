export const myworks = "/myworks/" //страница собственных работ пользователя
export const works = `/works/` //страница всех работ баттла
export const works_stage2 = `/works_stage2/` //страница всех работ баттла
export const mission = "/mission/" //страница задания
export const materials = "/materials/" //страница с матералами по баттлам
export const moderate = "/moderate/" //страница с матералами по баттлам
export const battles = "/battles/" //страница баттлов
export const work_viewing = "/work_viewing/" //страница просмотра полной версии работы 
export const results = "/results/" //страница итогов баттла
export const restore = "/restore/" //страница восстановления
export const restore_psw = "/restore_psw/" //страница восстановления
export const winners = "/winners/" //страница победителей баттла
export const activate = "/activate/" //страница активации аккаунта
export const battleWithParamURL = (battleId = null) => {
    if (battleId !== null)
        return `${battles}${battleId}`;
    return `${battles}:battleId`;
}