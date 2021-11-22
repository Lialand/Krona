import React from "react";

import Battles from "../../components/Battles/Battles";
import WorkViewing from "../../components/WorkViewing/WorkViewing";
import Mission from "../../components/Mission/Mission";
import Winners from "../../components/Winners/Winners";
import Results from "../../components/Results/Results";
import Materials from "../../components/Materials/Materials";
import MyWorks from "../../components/Works/MyWorks";

import { 
    mission, 
    battles, 
    winners,
    results, 
    myworks, 
    work_viewing, 
    materials,
    battleWithParamURL
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