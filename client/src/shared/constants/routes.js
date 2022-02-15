import React from "react";

import Admin from "components/Admin/Admin";
import Battles from "components/Battles/Battles";
import WorkViewing from "components/WorkViewing/WorkViewing";
import Mission from "components/Mission/Mission";
import MainHeader from "components/Header/MainHeader";
import BattlesHeader from "components/Header/BattlesHeader"
import Winners from "components/Winners/Winners";
import Results from "components/Results/Results";
import Materials from "components/Materials/Materials";
import Works from "components/Works/Works";
import Routes from "components/Routes/Routes";
import Moderate from "components/Moderate/Moderate";
import Activate from "components/Activate/Activate";
import Profile from "components/Profile/Profile";
import RestorePassword from "components/Restore/RestorePassword/RestorePassword";
import Basic from "components/Admin/ChangeBattle/PagesChangeBattle/Basic";
import Criterions from "components/Admin/ChangeBattle/PagesChangeBattle/Criterions";
import RedactBattleMaterials from "components/Admin/ChangeBattle/PagesChangeBattle/Materials";
import RedactBattleMission from "components/Admin/ChangeBattle/PagesChangeBattle/Mission";
import Roles from "components/Admin/ChangeBattle/PagesChangeBattle/Roles";

import { 
    admin,
    mission, 
    winners,
    results, 
    myworks, 
    work_viewing, 
    works,
    works_stage2,
    materials,
    battleWithParamURL,
    
    activate, 
    battles, 
    restore_psw,
    moderate,
    profile,

    redact_battle_roles,
    redact_battle_mission,
    redact_battle_materials,
    redact_battle_basic,
    redact_battle_criterions,
} from  "./pages";

export const routes = [
    {
        path: [battleWithParamURL()+works, battleWithParamURL()+works_stage2],
        children: ({worksConditions}) => worksConditions && <Works />
    },
    {
        path: battleWithParamURL()+work_viewing+":workId/",
        children: () => <WorkViewing />
    },
    {
        path: battleWithParamURL()+mission,
        children: () => <Mission />
    },
    {
        path: battleWithParamURL()+winners,
        children: () => <Winners />
    },
    {
        path: battleWithParamURL()+results,
        children: () => <Results />
    },
    {
        path: battleWithParamURL()+materials,
        children: () => <Materials />
    },
    {
        children: () => <h4>Not found</h4>
    },
];

export const topRoutes = [
    {
        path: battleWithParamURL(),
        children: ({ openSidebar }) => <>
            <MainHeader openSidebar={openSidebar} />
            <Routes />
        </>
    },
    {
        exact: true,
        path: battles,
        children: ({ openSidebar }) => <>
            <BattlesHeader openSidebar={openSidebar} />
            <Battles />
        </>
    },
    {
        exact: true,
        path: profile,
        children: () => <Profile />
    },
    {
        path: admin,
        children: ({ storeAuth }) => <Admin storeAuth={storeAuth} />
    },
    {
        exact: true,
        path: moderate,
        children: ({ storeAuth }) => <Moderate storeAuth={storeAuth} />
    },
    {
        exact: true,
        path: activate,
        children: () => <Activate />
    },
    {
        exact: true,
        path: restore_psw,
        children: ({ storeAuth }) => <RestorePassword storeAuth={storeAuth} />
    },
]

export const redactBattleRoutes = [
    {
        id: 1,
        path: redact_battle_roles,
        children: ({ handleChanges, redactedBattleDetailed, otherData }) => 
            <Roles 
                changeRole={handleChanges.changeRole}
                changeJury={handleChanges.changeJury}
                isLastBattle={otherData.isLastBattle}
                redactedBattleDetailed={redactedBattleDetailed}
                distributePrevBattleRoles={handleChanges.distributePrevBattleRoles}
                users={otherData.users}
            />
    },
    {
        id: 2,
        path: redact_battle_mission,
        children: ({ redactedBattleDetailed, handleChanges }) => 
            <RedactBattleMission 
                redactedBattleDetailed={redactedBattleDetailed} 
                handleHTML={handleChanges.handleHTML}
            />
    },
    {
        id: 3,
        path: redact_battle_materials,
        children: ({ redactedBattleDetailed, handleChanges }) => 
            <RedactBattleMaterials 
                redactedBattleDetailed={redactedBattleDetailed} 
                handleInputChange={handleChanges.handleInputChange}
                changeMaterial={handleChanges.changeMaterial}
            />
    },
    {
        id: 4,
        path: redact_battle_basic,
        children: ({ redactedBattleDetailed, handleChanges, otherData }) => 
            <Basic 
                redactedBattleDetailed={redactedBattleDetailed} 
                handleInputChange={handleChanges.handleInputChange}
                handleFile={handleChanges.handleFile}
                categories={otherData.categories}
                typeOfForm={otherData.typeOfForm}
            />
    },
    {
        id: 5,
        path: redact_battle_criterions,
        children: ({ redactedBattleDetailed, handleChanges, otherData }) => 
            <Criterions 
                redactedBattleDetailed={redactedBattleDetailed} 
                criterions={otherData.criterions}
                changeJury={handleChanges.changeJury}
                users={otherData.users}
                changeCriterion={handleChanges.changeCriterion}
                handleInputChange={handleChanges.handleInputChange}
                changeCriterionType={handleChanges.changeCriterionType}
            />
    },
]