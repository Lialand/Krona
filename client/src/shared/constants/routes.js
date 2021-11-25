import React from "react";

import Battles from "components/Battles/Battles";
import WorkViewing from "components/WorkViewing/WorkViewing";
import Mission from "components/Mission/Mission";
import Winners from "components/Winners/Winners";
import Results from "components/Results/Results";
import Materials from "components/Materials/Materials";
import MyWorks from "components/Works/MyWorks";

import Main from "components/Main/Main";
import Moderate from "components/Moderate/Moderate";
import Activate from "components/Activate/Activate";
import RestoreAccount from "components/Restore/RestoreAccount/RestoreAccount";
import RestorePassword from "components/Restore/RestorePassword/RestorePassword";

import { 
    mission, 
    winners,
    results, 
    myworks, 
    work_viewing, 
    materials,
    battleWithParamURL,
    
    activate, 
    battles, 
    restore, 
    restore_psw,
    moderate
} from  "./pages";

export const routes = [
    {
        exact: true,
        path: battles,
        children: () => <Battles />
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
        path: battleWithParamURL()+myworks,
        children: () => <MyWorks />
    },
    {
        children: () => <h4>Not found</h4>
    },
];

export const topRoutes = [
    {
        path: battles,
        children: () => <Main />
    },
    {
        exact: true,
        path: moderate,
        children: () => <Moderate />
    },
    {
        exact: true,
        path: activate,
        children: () => <Activate />
    },
    {
        exact: true,
        path: restore,
        children: () => <RestoreAccount />
    },
    {
        exact: true,
        path: restore_psw,
        children: () => <RestorePassword />
    },
]