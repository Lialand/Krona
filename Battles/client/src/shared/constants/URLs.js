const HOST = window.location.origin;

export const worksURL = battleId => `${HOST}/api/common/work/bybattleId/${battleId}`;
export const myWorksURL = battleId => `${HOST}/api/user/work/byBattleId/${battleId}`;
export const battleDetailedURL = battleId => `${HOST}/api/common/battle/detailed/${battleId}`;
export const adminBattleDetailedURL = (battleId = null) => 
    battleId === null 
        ? `${HOST}/api/admin/battle/detailed`
        : `${HOST}/api/admin/battle/detailed/${battleId}`;
export const gradesURL = (battleId = null) => 
    battleId === null 
        ? `${HOST}/api/user/work/grades`
        : `${HOST}/api/user/work/grades/${battleId}`;
export const workDetailedURL = workId => `${HOST}/api/common/work/detailed/${workId}`;
export const resultsURL = battleId => `${HOST}/api/common/battle/summary/byBattleId/${battleId}`;
export const likeURL = workId => `${HOST}/api/user/work/like/${workId}`;

export const battlesURL = `${HOST}/api/common/battle/all`;
export const lastBattleURL = `${HOST}/api/common/work/lastbattle`;
export const usersURL = `${HOST}/api/admin/user/all`;
export const authURL = `${HOST}/api`;
export const startRestorePswURL = `${HOST}/api/auth/start_restore_psw`;
export const activateURL = `${HOST}/api/auth/activate`;
export const activateAccountURL = `${HOST}/api/auth/activate_acc`;
export const loginURL = `${HOST}/api/auth/login`;
export const logoutURL = `${HOST}/api/auth/logout`;
export const registerURL = `${HOST}/api/auth/register`;
export const restorePasswordURL = `${HOST}/api/auth/restore_psw`;
export const uploadURL = `${HOST}/api/user/work/upload`;
export const moderateURL = `${HOST}/api/user/work/moderate`;
export const approveUserSiteURL = `${HOST}/api/admin/approve_user_site`;
export const categoriesURL = `${HOST}/api/common/categories/all`;
export const criterionsURL = `${HOST}/api/common/criteries/all`;
export const filterURL = `${HOST}/api/user/work/filter`;